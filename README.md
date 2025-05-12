### Для запуска бекенда перейдите в backend и посмотрите README

> Предварительно установите Docker Desktop и wsl
> kubectl: https://kubernetes.io/ru/docs/tasks/tools/install-kubectl/ 
> minikube: https://kubernetes.io/ru/docs/tasks/tools/install-minikube/
>>Так же возможна настройка переменных окружения PATH для windows, (путь до minikube.exe): https://www.youtube.com/watch?v=TAM-DLPX9XA


### Запуск minicube 
```
minikube start
```

### Установка секрета (пароля с именем для обращения)
```
kubectl create secret generic pgpassword --from-literal PGPASSWORD=1234
kubectl create secret generic mailpassword --from-literal MAILPASSWORD=key
kubectl create secret generic githubpassword --from-literal GITHUBPASSWORD=key
kubectl create secret generic googlepassword --from-literal GOOGLEPASSWORD=key
kubectl get secrets
```

### Подклюение Ingress-Inginx к Minikebe
```
minikube addons enable ingress
kubectl get pods -n ingress-nginx
```

### Подключение манифестов доп ПО 
```
kubectl apply -f k8s/ingress/
kubectl apply -f k8s/kafka/
kubectl apply -f k8s/postgree/
kubectl apply -f k8s/redis/
```
```
kubectl get pods
kubectl logs kafka-0
```

### Подключение манифестов собственного ПО 
После запуска доп ПО.
```
kubectl apply -f k8s/backend/
kubectl apply -f k8s/frontend/
kubectl apply -f k8s/user/
```


### Проверка
```
kubectl get pods
kubectl get deployments
kubectl get svc
kubectl get jobs 
kubectl logs <номер-контейнера>
```

### Проверка постоянных томов
```
kubectl get pvc
kubectl get pv
```

### Запуск туннелирования Minikube
```
minikube tunnel  
```
или
```
minikube service my-ingress --url
```

#### Для захода в Pod в интерактивном режиме
Если захотелось зайти в контейнер и выполнить, например тесты...
```
kubectl exec -it <pod_name> -- /bin/bash 
```

#### Для проверки наличия топиков в kafka-0
```
kubectl exec kafka-0 -- kafka-topics.sh --list --bootstrap-server localhost:9092 
kubectl exec kafka-0 -- kafka-console-consumer.sh --topic auth-requests --from-beginning --bootstrap-server localhost:9092
kubectl exec kafka-0 -- kafka-console-consumer.sh --topic auth-responses --from-beginning --bootstrap-server localhost:9092
kubectl exec kafka-0 -- kafka-consumer-groups.sh --list --bootstrap-server localhost:9092
kubectl exec kafka-0 -- kafka-consumer-groups.sh --describe --group backend-service-group --bootstrap-server localhost:9092 
kubectl exec kafka-0 -- kafka-consumer-groups.sh --describe --group user-service-group --bootstrap-server localhost:9092 
```

#### Важное
1) При развертке для кажого микросервиса настроить свою бд
2) Если pg-job-create-db : Error, то базы данных созданы
3) Для настройки OAUTH передите и создате приложения в:
    1) Yandex: https://id.yandex.ru/security/app-passwords
    2) Google: https://console.cloud.google.com/
    3) Github: https://github.com/settings/developers

#### Для деплоя
1) Измените frontend/src/shared/const -> BASE_URL = ССЫЛКА НА ГЛАВНУЮ САЙТА
2) Измените в user[backend]/.env -> URL_CORS = Добавить через пробел новые адреса для CORS 
3) Изменить deployment.yaml файлы для user и backend 
4) Имбуля команды:
    ```
    kubectl create secret docker-registry regcred --docker-server=docker.io --docker-username=grigorytitov --docker-password=31478409nw3KL --docker-email=titovgrisha04@gmail.com  

    minikube delete --all --purge

    sudo minikube start --driver=docker --force 

    sudo minikube tunnel --cleanup --bind-address 0.0.0.0

    sudo netstat -tulnp

    sudo reboot
    ```