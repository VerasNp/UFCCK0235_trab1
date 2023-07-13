# Backend

Foi utilizado [Apache Maven](https://mvnrepository.com/) visando a automatização do build e utilização de pacotes quando
necessário.

Contamos com a utilização do swagger para documentação de nossas rotas: http://localhost:`<porta>`
/swagger-ui/index.html , onde a porta deve ser a mesma definida em `application.properties`.

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
  - Ao enviar um arquivo do tipo `.csv` é feito a conversão dele para um modelo de tabela para que seja consumido pela
    aplicação Frontend;
  - O arquivo deve conter seu conterudo uma tabela representada em forma de `.csv` onde a separação dos elementos deve
    ser feita obrigatoriamente pelo caractere "," (vírgula).
- `/api/statistic`: Trata dos cálculos feitos pelo Backend.
  - Separa-se em 2 possibilidades ao selecionar a coluna:
    - Dados de tipo **texto**: Feito o cálculo de [moda](<https://en.wikipedia.org/wiki/Mode_(statistics)>) e frequência dos elementos;
    - Dados de tipo **numérico**: Feito os cáculos
      de [moda](<https://en.wikipedia.org/wiki/Mode_(statistics)>), [média](https://en.wikipedia.org/wiki/Average), [mediana](https://en.wikipedia.org/wiki/Median), [primeiro e terceiro quartil](https://pt.wikipedia.org/wiki/Quartil), [variância amostral e populacional](https://en.wikipedia.org/wiki/Variance), [desvio padrão amostral e populacional](https://en.wikipedia.org/wiki/Standard_deviation), [coeficiente de variação](https://en.wikipedia.org/wiki/Coefficient_of_variation),
      máximo, mínimo, amplitude e frequência de elementos.
