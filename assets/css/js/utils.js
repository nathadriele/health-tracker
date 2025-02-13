'use strict';

/**
 * Calcula o IMC com base no peso (kg) e altura (m).
 * @param {number} peso 
 * @param {number} altura 
 * @returns {number} IMC
 */
const calcularIMC = (peso, altura) => peso / (altura * altura);

/**
 * Retorna a categoria do IMC.
 * @param {number} imc 
 * @returns {string} Categoria do IMC
 */
const obterCategoriaIMC = (imc) => {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 24.9) return 'Peso normal';
  if (imc < 29.9) return 'Sobrepeso';
  return 'Obesidade';
};

/**
 * Gera uma sugestão personalizada com base na categoria do IMC.
 * @param {string} categoria 
 * @returns {string} Sugestão
 */
const gerarSugestao = (categoria) => {
  switch (categoria) {
    case 'Abaixo do peso':
      return 'Procure um nutricionista para orientações sobre ganho de peso de forma saudável.';
    case 'Peso normal':
      return 'Continue mantendo uma alimentação equilibrada e praticando atividades físicas.';
    case 'Sobrepeso':
      return 'Considere adotar uma dieta balanceada e aumentar sua atividade física.';
    case 'Obesidade':
      return 'É recomendável procurar orientação médica para o gerenciamento do peso.';
    default:
      return '';
  }
};
