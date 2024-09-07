import express from "express";
import path from "path";
import fs from "fs/promises";
import dotenv from "dotenv";
import { createServer as createViteServer, ViteDevServer } from "vite";
dotenv.config();

const port = process.env.PORT || 80;
const clientPath = path.join(__dirname, "..");
const isDev = process.env.NODE_ENV === "development";

async function createServer() {
    const app = express();
    let vite: ViteDevServer | undefined;

    if (isDev) {
        vite = await createViteServer({
            server: { middlewareMode: true },
            root: clientPath,
            appType: "custom",
        });

        app.use(vite.middlewares);
    } else {
        app.use(
            express.static(path.join(clientPath, "dist/client"), {
                index: false,
            }),
        );
    }

    app.get("*", async (req, res, next) => {
        const url = req.originalUrl;
        let render: () => Promise<string>;
        let template: string;

        try {
            if (isDev) {
                // Получаем файл client/index.html который мы правили ранее
                template = await fs.readFile(
                    path.resolve(clientPath, "index.html"),
                    "utf-8",
                );

                // Применяем встроенные HTML-преобразования vite и плагинов
                template = await vite.transformIndexHtml(url, template);

                // Загружаем модуль клиента, который писали выше,
                // он будет рендерить HTML-код
                render = (
                    await vite.ssrLoadModule(
                        path.join(clientPath, "src/entry-server.tsx"),
                    )
                ).render;
            } else {
                template = await fs.readFile(
                    path.join(clientPath, "dist/client/index.html"),
                    "utf-8",
                );

                // Получаем путь до модуля клиента, чтобы не тащить средства сборки клиента на сервер
                const pathToServer = path.join(
                    clientPath,
                    "dist/server/entry-server.js",
                );

                // Импортируем этот модуль и вызываем с начальным состоянием
                render = (await import(pathToServer)).render;
            }

            // Получаем HTML-строку из JSX
            const appHtml = await render();

            // Заменяем комментарий на сгенерированную HTML-строку
            const html = template.replace(`<!--ssr-outlet-->`, appHtml);

            // Завершаем запрос и отдаём HTML-страницу
            res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } catch (e) {
            vite.ssrFixStacktrace(e as Error);
            next(e);
        }
    });

    app.listen(port, () => {
        console.log(`Client is listening on port: ${port}`);
    });
}

createServer();