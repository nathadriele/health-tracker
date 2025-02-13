## Health Tracker

Aplicação para monitorar dados de saúde, calcular o IMC, e visualizar a evolução de indicadores por meio de gráficos e histórico de registros.

### Funcionalidades
- Cálculo do IMC com base em altura e peso.
- Exibição da categoria do IMC e sugestão personalizada.
- Armazenamento dos registros no _localStorage_.
- Visualização dos registros em um gráfico (usando [Chart.js](https://www.chartjs.org/)) e em uma tabela.
- Opção para limpar o histórico de registros.

### Tecnologias Utilizadas
- HTML5 semântico
- CSS3 (responsivo)
- JavaScript (ES6+)
- [Chart.js](https://www.chartjs.org/)

### Estrutura Básica

```plaintext
health-tracker/
├── README.md
├── .gitignore
├── package.json
├── index.html
└── assets
    ├── css
    │   └── styles.css
    └── js
        ├── utils.js
        └── app.js
