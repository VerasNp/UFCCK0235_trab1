# [UFC](https://pt.wikipedia.org/wiki/Universidade_Federal_do_Cear%C3%A1) | 2023.1 - Técnicas de Programação I, CK0235, Primeiro Trabalho

Aplicação web desenvolvida em java, utilizando o framework Spring, que se propõe a gerar um dashboard interativo dos dados que o usuário fizer o upload (no formato .csv). Nesse dashboard, é apresentada a distribuição dos dados em gráficos apropriados de acordo com a coluna selecionada, bem como medidas resumo e de dispersão associadas. Além disso, é possível modificar valores da tabela em tempo real e fazer o download do arquivo atualizado.

### Medidas Resumo
- Média
- Mediana
- Moda

### Medidas de Dispersão
- Desvio padrão médio
- Variância
- Coeficiente de variação
- Amplitude total (máximo e mínimo)

### Gráficos suportados
- Histograma
- Boxplot
- Diagrama Ramo-e-folhas

### Exemplo de gráfico
![histograma](https://github.com/VerasNp/UFCCK0235_trab1/assets/66584326/b1129f0f-e890-4301-82ed-0e64581a8a9d)


## Requisitos
- Instalar [docker](https://docs.docker.com/engine/install/)

## Inicialização
1. Caso queira inicializar a aplicação, vá para a pasta raiz do projeto e execute:
- `docker compose up -d`
2. Caso queira parar a aplicação:
- `docker compose down`

## 
Repositório com solução do primeiro trabalho passado na cadeira CK0235, Técnicas de Programação I, com tema **plotar distribuição de dados e medidas descritivas estatísticas dos dados**.
