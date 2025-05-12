# Добавьте файл с верными данными переменных .env

```
PORT = 6002
URL_CORS = http://localhost:5173 https://localhost:5173 http://localhost https://localhost
SECRET_KEY = "MY_SALT"
DEPTH_HASH = 3
MAX_FILE_SIZE = 10 * 1024 * 1024
MAX_COOCKIE_LIFE = 60 * 24 * 60 * 60 * 1000


URL_SITE = "http://localhost:5173"
URL_OAUTH = "http://localhost:5173/oauth"
URL_BASE_INGRESS = ""

MAIL_SERVICE = "yandex"
MAIL_USER = "some@yandex.ru"
MAIL_PASSWORD = "key"
MAIL_FROM="some@yandex.ru"

GITHUB_CLIENT_ID = "id"
GITHUB_CLIENT_SECRET="key"
GITHUB_URL_CALLBACK="/github/redirect"

GOOGLE_CLIENT_ID="id"
GOOGLE_CLIENT_SECRET="key"
GOOGLE_URL_CALLBACK="/google/redirect"

CODE_CONFIRM_ACTIVITY_MINUNTE=15



DB_NAME = "users"
DB_USER = "postgres"
DB_PASSWORD = "091234"
DB_HOST = "localhost"
DB_PORT = 5432

KAFKA_CLIENT_ID = "user-app"
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
## Если необходимо включить тестовый режим
```
TEST_EMAIL = test@gmail.com
TEST_CODE = 123456
```

Полезные ссылки для настройки Google, SMS, GitHub:
```
https://console.cloud.google.com/auth/clients

https://dev.exolve.ru/applications

https://github.com/settings/developers
```