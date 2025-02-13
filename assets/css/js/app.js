'use strict';

(() => {
  // Seleção de elementos
  const form = document.getElementById('healthForm');
  const imcDisplay = document.getElementById('imcDisplay');
  const suggestion = document.getElementById('suggestion');
  const errorMessageEl = document.getElementById('errorMessage');
  const clearHistoryBtn = document.getElementById('clearHistory');
  const recordsTableBody = document.querySelector('#recordsTable tbody');
  const ctx = document.getElementById('imcChart').getContext('2d');

  // Recupera os registros salvos ou inicia com um array vazio
  let imcRecords = JSON.parse(localStorage.getItem('imcRecords')) || [];

  // Inicializa o gráfico
  const imcChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: imcRecords.map(record => record.date),
      datasets: [{
        label: 'IMC',
        data: imcRecords.map(record => record.imc),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 40
        }
      }
    }
  });

  /**
   * Salva os registros no localStorage.
   */
  const saveRecords = () => {
    localStorage.setItem('imcRecords', JSON.stringify(imcRecords));
  };

  /**
   * Atualiza o gráfico com os registros atuais.
   */
  const updateChart = () => {
    imcChart.data.labels = imcRecords.map(record => record.date);
    imcChart.data.datasets[0].data = imcRecords.map(record => record.imc);
    imcChart.update();
  };

  /**
   * Atualiza a tabela de registros.
   */
  const updateRecordsTable = () => {
    recordsTableBody.innerHTML = '';
    imcRecords.forEach(record => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${record.date}</td>
        <td>${record.nome}</td>
        <td>${record.imc.toFixed(2)}</td>
      `;
      recordsTableBody.appendChild(tr);
    });
  };

  // Atualiza a tabela ao carregar a página
  updateRecordsTable();

  // Evento de submissão do formulário
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    errorMessageEl.textContent = '';

    const nome = document.getElementById('nome').value.trim();
    const altura = parseFloat(document.getElementById('altura').value);
    const peso = parseFloat(document.getElementById('peso').value);

    // Validações dos campos
    if (!nome) {
      errorMessageEl.textContent = 'Por favor, insira seu nome.';
      return;
    }
    if (isNaN(altura) || altura <= 0) {
      errorMessageEl.textContent = 'Por favor, insira uma altura válida maior que zero.';
      return;
    }
    if (isNaN(peso) || peso <= 0) {
      errorMessageEl.textContent = 'Por favor, insira um peso válido maior que zero.';
      return;
    }

    const imc = calcularIMC(peso, altura);
    const categoria = obterCategoriaIMC(imc);

    // Exibe o resultado e a sugestão
    imcDisplay.textContent = `Olá ${nome}, seu IMC é ${imc.toFixed(2)} (${categoria}).`;
    suggestion.textContent = gerarSugestao(categoria);

    // Cria um registro com a data atual formatada
    const record = {
      nome,
      imc: parseFloat(imc.toFixed(2)),
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    };

    imcRecords.push(record);
    saveRecords();
    updateChart();
    updateRecordsTable();

    form.reset();
  });

  // Evento para limpar todo o histórico de registros
  clearHistoryBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
      imcRecords = [];
      saveRecords();
      updateChart();
      updateRecordsTable();
      imcDisplay.textContent = '';
      suggestion.textContent = '';
    }
  });
})();
