import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: Number(process.env.CLIENT_PORT) || 3000,
    },
    define: {
        __SERVER_PORT__: process.env.SERVER_PORT,
    },
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "Lazer Overload Game",
                short_name: "LOG",
                description: "Игра созданная в рамках обучения в Я.Практикуме",
                theme_color: "#FFF",
                icons: [
                    {
                        src: "/sprite.png",
                        sizes: "1340x1340",
                        type: "image/png",
                    },
                    {
                        src: "/vite.svg",
                        sizes: "32x32",
                        type: "image/svg+xml",
                    },
                ],
            },
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: /^https?.*/,
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "my-react-app-runtime-cache",
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 24 * 60 * 60,
                            },
                        },
                    },
                ],
            },
        }),
    ],
});
