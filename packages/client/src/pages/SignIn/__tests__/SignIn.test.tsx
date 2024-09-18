import { cleanup, render, screen } from "@testing-library/react";
import SingIn from "../index";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Страница регистрации", () => {
    afterAll(() => cleanup());

    it("Базовый рендер", () => {
        const { baseElement } = render(<SingIn />, {
            wrapper: BrowserRouter,
        });
        expect(baseElement).toMatchSnapshot();
    });

    it("Выдает ошибку при некорректном email", async () => {
        const { baseElement } = render(<SingIn />, {
            wrapper: BrowserRouter,
        });

        const login = screen.getByPlaceholderText("Логин");

        await userEvent.type(login, "invalid text");

        expect(baseElement).toMatchSnapshot();
    });

    it("Не дает нажать на кнопку при некорректном email", async () => {
        render(<SingIn />, {
            wrapper: BrowserRouter,
        });

        const login = screen.getByPlaceholderText("Логин");

        await userEvent.type(login, "invalid text");

        const submit_button = await screen.findByTestId<HTMLButtonElement>(
            "submit_btn",
        );

        const spy = jest.spyOn(submit_button, "click");

        expect(spy).not.toHaveBeenCalled();
    });

    it("Выдает ошибку при некорректном password", async () => {
        const { baseElement } = render(<SingIn />, {
            wrapper: BrowserRouter,
        });

        const password = screen.getByPlaceholderText("Пароль");

        await userEvent.type(password, "invalid text");

        expect(baseElement).toMatchSnapshot();
    });

    it("Не дает нажать на кнопку при некорректном password", async () => {
        render(<SingIn />, {
            wrapper: BrowserRouter,
        });

        const login = screen.getByPlaceholderText("Логин");

        await userEvent.type(login, "invalid text");

        const submit_button = await screen.findByTestId<HTMLButtonElement>(
            "submit_btn",
        );

        const spy = jest.spyOn(submit_button, "click");

        expect(spy).not.toHaveBeenCalled();
    });
});
