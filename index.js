let des = document.getElementById('des').getContext('2d');

// ============ CRIAÇÃO DOS OBJETOS COM IMAGENS ============
let caminhao = new Caminhao(230, 550, 60, 80, './assets/images/caminhao.png');

// Criar linhas da estrada (continuam sendo desenhadas, não imagens)
let linhasEstrada = [];
for (let i = 0; i < 5; i++) {
      linhasEstrada.push(new LinhaEstrada(245, i * 150 - 100, 10, 40, '#ffffff'));
}

const colunas = [60, 130, 200, 270, 340, 410];

// Veículos inimigos com imagens
let inimigos = [
      new VeiculoInimigo(colunas[0], -50, 50, 70, './assets/images/carro-pequeno.png', 4.2, 'carroPequeno'),
      new VeiculoInimigo(colunas[1], -120, 55, 75, './assets/images/carro-grande.png', 5.1, 'carroGrande'),
      new VeiculoInimigo(colunas[2], -200, 70, 90, './assets/images/caminhao-inimigo.png', 3.8, 'caminhao'),
      new VeiculoInimigo(colunas[3], -80, 40, 60, './assets/images/moto.png', 6.0, 'moto'),
      new VeiculoInimigo(colunas[4], -150, 50, 70, './assets/images/carro-pequeno.png', 4.5, 'carroPequeno'),
      new VeiculoInimigo(colunas[5], -250, 55, 75, './assets/images/carro-grande.png', 5.5, 'carroGrande'),
      new VeiculoInimigo(colunas[0], -350, 70, 90, './assets/images/caminhao-inimigo.png', 4.8, 'caminhao'),
      new VeiculoInimigo(colunas[1], -420, 40, 60, './assets/images/moto.png', 5.2, 'moto'),
      new VeiculoInimigo(colunas[2], -500, 50, 70, './assets/images/carro-pequeno.png', 6.3, 'carroPequeno'),
      new VeiculoInimigo(colunas[3], -580, 55, 75, './assets/images/carro-grande.png', 4.0, 'carroGrande'),
      new VeiculoInimigo(colunas[4], -650, 70, 90, './assets/images/caminhao-inimigo.png', 5.7, 'caminhao'),
      new VeiculoInimigo(colunas[5], -720, 40, 60, './assets/images/moto.png', 4.3, 'moto')
];

let coletaveis = [];
let fase = 1;
let cargaNome = 'Caixas de Madeira';
let cargaValor = 1000;

// ============ CONTROLES ============
document.addEventListener('keydown', (e) => {
      if (e.key === 'w' || e.key === 'ArrowUp') {
            caminhao.pos = -5;
      } else if (e.key === 's' || e.key === 'ArrowDown') {
            caminhao.pos = 5;
      } else if (e.key === 'a' || e.key === 'ArrowLeft') {
            caminhao.dir = -5;
      } else if (e.key === 'd' || e.key === 'ArrowRight') {
            caminhao.dir = 5;
      }
});

document.addEventListener('keyup', (e) => {
      if (e.key === 'w' || e.key === 'ArrowUp' || e.key === 's' || e.key === 'ArrowDown') {
            caminhao.pos = 0;
      }
      if (e.key === 'a' || e.key === 'ArrowLeft' || e.key === 'd' || e.key === 'ArrowRight') {
            caminhao.dir = 0;
      }
});

// ============ FUNÇÕES ============
function desenhaCenario() {
      // Céu
      des.fillStyle = '#87CEEB';
      des.fillRect(0, 0, 500, 700);

      // Estrada
      des.fillStyle = '#2c3e50';
      des.fillRect(0, 0, 500, 700);

      // Faixas laterais
      des.strokeStyle = '#ecf0f1';
      des.lineWidth = 3;
      des.beginPath();
      des.moveTo(30, 0);
      des.lineTo(30, 700);
      des.stroke();
      des.beginPath();
      des.moveTo(470, 0);
      des.lineTo(470, 700);
      des.stroke();

      // Linhas da estrada
      linhasEstrada.forEach(linha => linha.des_ret());

      // Linha de chegada
      des.strokeStyle = '#f1c40f';
      des.lineWidth = 5;
      des.beginPath();
      des.moveTo(0, 100);
      des.lineTo(500, 100);
      des.stroke();

      des.fillStyle = '#f1c40f';
      des.font = 'bold 16px Arial';
      des.textAlign = 'center';
      des.fillText('🚩 ENTREGA', 250, 90);
}

function spawnarColetavel() {
      if (Math.random() < 0.005) {
            let coluna = colunas[Math.floor(Math.random() * colunas.length)];
            let tipo = Math.random() < 0.7 ? 'dinheiro' : 'cargaExtra';
            let imagem = tipo === 'dinheiro' ? './assets/images/dinheiro.png' : './assets/images/carga-extra.png';
            let coletavel = new Coletavel(coluna, -30, 30, 30, imagem, tipo);
            coletaveis.push(coletavel);
      }
}

function verificarColisoes() {
      inimigos.forEach(inimigo => {
            if (caminhao.x < inimigo.x + inimigo.w &&
                  caminhao.x + caminhao.w > inimigo.x &&
                  caminhao.y < inimigo.y + inimigo.h &&
                  caminhao.y + caminhao.h > inimigo.y) {

                  caminhao.sofrerDano(inimigo.getDano(), inimigo.getMulta());
                  inimigo.y = -100;
            }
      });

      coletaveis.forEach((coletavel, index) => {
            if (caminhao.x < coletavel.x + coletavel.w &&
                  caminhao.x + caminhao.w > coletavel.x &&
                  caminhao.y < coletavel.y + coletavel.h &&
                  caminhao.y + caminhao.h > coletavel.y) {

                  if (coletavel.tipo === 'dinheiro') {
                        caminhao.coletarDinheiro(50);
                  } else {
                        caminhao.recuperarCarga(20);
                  }
                  coletaveis.splice(index, 1);
            }
      });
}

function verificarEntrega() {
      if (caminhao.y < 120) {
            caminhao.dinheiro += cargaValor;

            if (fase < 3) {
                  fase++;
                  caminhao.fase = fase;
                  caminhao.y = 550;

                  const cargas = {
                        1: { nome: 'Caixas de Madeira', valor: 1000 },
                        2: { nome: 'Contêiner Refrigerado', valor: 2500 },
                        3: { nome: 'Tanque Inflamável', valor: 5000 }
                  };
                  cargaNome = cargas[fase].nome;
                  cargaValor = cargas[fase].valor;

                  inimigos.forEach(inimigo => {
                        inimigo.velocidade += 1;
                  });
            } else {
                  alert('🏆 PARABÉNS! Você completou todas as entregas! 🏆');
                  reiniciarJogo();
            }
      }
}

function atualizarUI() {
      document.getElementById('dinheiro').innerHTML = `R$ ${caminhao.dinheiro}`;
      document.getElementById('carga').innerHTML = `${caminhao.carga}%`;
      document.getElementById('fase').innerHTML = `${fase}/3`;
      document.getElementById('cargaNome').innerHTML = cargaNome;
      document.getElementById('cargaValor').innerHTML = `R$ ${cargaValor}`;
}

function reiniciarJogo() {
      caminhao = new Caminhao(230, 550, 60, 80, './assets/images/caminhao.png');
      fase = 1;
      cargaNome = 'Caixas de Madeira';
      cargaValor = 1000;
      coletaveis = [];

      inimigos.forEach((inimigo, index) => {
            inimigo.y = -100 - index * 50;
            inimigo.velocidade = 3 + Math.random() * 4;
      });
}

// ============ LOOP PRINCIPAL ============
function desenha() {
      desenhaCenario();
      inimigos.forEach(inimigo => inimigo.des_ret());
      coletaveis.forEach(coletavel => coletavel.des_ret());
      caminhao.des_ret();
}

function atualiza() {
      caminhao.mov_car();
      inimigos.forEach(inimigo => inimigo.mov_car());
      linhasEstrada.forEach(linha => linha.mov_car());
      coletaveis.forEach(coletavel => coletavel.mov_car());
      coletaveis = coletaveis.filter(c => c.y < 700);

      spawnarColetavel();
      verificarColisoes();
      verificarEntrega();

      if (caminhao.dinheiro <= 0 || caminhao.carga <= 0) {
            alert('💥 GAME OVER! 💥');
            reiniciarJogo();
      }

      atualizarUI();
}

function main() {
      des.clearRect(0, 0, 500, 700);
      desenha();
      atualiza();
      requestAnimationFrame(main);
}

main();