### Для запуска в дев режиме
```
npm run dev
```
### Cборка
```
npm run build
```
### Запуск сборки
```
npm run start
```

### Запуск теста после сборки
Для внесения тестовых данных перед поммандой ниже, уберите флаг в .ENV: TEST_DB_CLEAR
```
npm run test:db_tables
```
Если бд заполнена, то можно использовать следующие тесты:
1) Тесты для таблиц и элементарных запросов к ним
    ```
    npm run test:db_tables
    ```
2) Тесты для статистических запросов к таблицам
    ```
    npm run test:db_statistics
    ```
3) Тесты для функций, процедур, триггеров и представлений
    ```
    npm run test:db_other
    ```



### Примерный вид файла ./backend/.env
```
PORT = 6001
URL_CORS = http://localhost:6001 https://localhost:6001


DB_USER=my_user
DB_HOST=localhost
DB_NAME=learn_db
DB_PASSWORD=12345
DB_PORT=5432

TEST_DB_CLEAR=true
```