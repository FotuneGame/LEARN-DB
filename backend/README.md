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
URL_CORS = http://localhost:5173 https://localhost:5173 http://localhost https://localhost
SECRET_KEY = "MY_SALT"
MAX_COOCKIE_LIFE = 60 * 24 * 60 * 60 * 1000


DB_USER=my_user
DB_HOST=localhost
DB_NAME=learn_db
DB_PASSWORD=12345
DB_PORT=5432

TEST_DB_CLEAR=true

URL_SITE = "http://localhost:5173"
URL_BASE_INGRESS = ""

KAFKA_CLIENT_ID = "backend-app"
KAFKA_BROCKERS_HOST = 'localhost'
KAFKA_BROCKERS_PORT = 9092
KAFKA_BROCKERS_PARTIOTIONS = 3
KAFKA_BROCKERS_REPLICATION_FACTOR = 1
KAFKA_TIME_CONNECTION = 3000
KAFKA_TIME_REQUEST = 5000

REDIS_NAME = ""
REDIS_PASSWORD = ""
REDIS_HOST = "localhost"
REDIS_PORT = 6379
REDIS_DB = 0
```
### Для почт первых админов
```
ADMIN_EMAILS = titovgrisha04@gmail.com test@gmail.com
```