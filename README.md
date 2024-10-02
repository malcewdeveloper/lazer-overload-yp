# Lazer Overload

## Описание проекта

**Lazer Overload** — это игра, которая разработана с использованием современных веб-технологий. Проект организован в виде monorepo с использованием `lerna` для управления зависимостями. Игра включает в себя клиентскую и серверную части, каждая из которых может быть запущена отдельно.
Цель игры довести луч энергии до батарейки с помощью отражающих пластин.

## Запуск проекта

Перед запуском убедитесь, что у вас установлены `node` и `docker`.

### Шаги для запуска:

1. Выполните команду `yarn bootstrap` — это обязательный шаг, без которого проект не будет работать.
2. Выполните команду `yarn dev` для запуска как клиента, так и сервера.
3. Чтобы запустить только клиентскую часть, выполните: `yarn dev --scope=client`.
4. Чтобы запустить только серверную часть, выполните: `yarn dev --scope=server`.

## Работа с зависимостями

Проект использует `monorepo` на основе [`lerna`](https://github.com/lerna/lerna).

### Добавление зависимостей:

-   Чтобы добавить зависимость для клиента:

```bash
    yarn lerna add {your_dep} --scope client
```

-   Чтобы добавить зависимость для сервера:

```bash
    yarn lerna add {your_dep} --scope server
```

-   Чтобы добавить зависимость для обоих, клиента и сервера:

```bash
    yarn lerna add {your_dep}
```

-   Чтобы добавить dev-зависимость, используйте флаг `--dev`:

```bash
    yarn lerna add {your_dep} --dev --scope server
```

## Тестирование

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

-   Запустить тесты можно командой

```bash
    yarn test
```

## Линтинг

Для проверки кода на соответствие стандартам используйте:

```bash
    yarn lint
```

## Сборка для продакшн

`yarn build`

### Просмотр продакшн сборки

После сборки вы можете посмотреть, что получилось, выполнив:

-   для клиента `yarn preview --scope client`
-   для сервера `yarn preview --scope server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook) пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Автодеплой статики на vercel

Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере

Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса

1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

## Выполненые задачи из беклога

-   настройка Service Workers [#60](https://github.com/malcewdeveloper/lazer-overload-yp/pull/60)
-   еще одно Web API [#68](https://github.com/malcewdeveloper/lazer-overload-yp/pull/68)
-   добавляем SSR [#69](https://github.com/malcewdeveloper/lazer-overload-yp/pull/69)
-   добавялем Zustand и Router в SSR [#70](https://github.com/malcewdeveloper/lazer-overload-yp/pull/70)
-   добавить API для лидерборда [#71](https://github.com/malcewdeveloper/lazer-overload-yp/pull/71)
-   Реализовать API для форума Ч.2 [#72](https://github.com/malcewdeveloper/lazer-overload-yp/pull/72)
-   oAuth авторизация [#73](https://github.com/malcewdeveloper/lazer-overload-yp/pull/73)
-   переключение темы (клиент) [#74](https://github.com/malcewdeveloper/lazer-overload-yp/pull/74)
-   переключение темы (сервер) [#75](https://github.com/malcewdeveloper/lazer-overload-yp/pull/75)
-   серверная инфраструктура [#76](https://github.com/malcewdeveloper/lazer-overload-yp/pull/76)

### [Видео с комментариями по задачам](https://disk.yandex.ru/i/kV7WKzlpBsofOQ)
