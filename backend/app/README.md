# Backend

Foi utilizado [Apache Maven](https://mvnrepository.com/) visando a automatização do build e utilização de pacotes quando
necessário.

Contamos com a utilização do swagger para documentação de nossas rotas: http://localhost:8081/swagger-ui/index.html

## Como utilizar

Para levantarmos a API do Backend será necessário ter instalado o [Maven](https://maven.apache.org/download.cgi) e assim
utilizar o comando:

```shell
mvn spring-boot:run
```

Será então disponibilizado a utilização da API estando com host `localhost` e na porta `8081` (qual é possível ser
alterada caso necessário no arquivo `application.properties`).

## Sobre a arquitetura utilizada

Foi utilizado o padrão de arquitetura MVC, com a aplicação de Services e DTOs para melhor itegração de toda a aplicação.

Nossa API conta com 2 rotas atualmente:

- `/api/upload/csv`: Trata do envio de arquivo pela aplicação Frontend;
- `/api/statistic`: Trata dos cálculos feitos pelo Backend.
