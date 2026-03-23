// Canvas agora é 700x500 (horizontal)
let des = document.getElementById('des').getContext('2d')

// ============ CRIAÇÃO DOS OBJETOS ============
let cenario = new Cenario()
cenario.criarLinhas()

// Caminhão começa no lado esquerdo, centrado verticalmente
let caminhao = new Caminhao(80, 210, 80, 60, '../assets/images/caminhao-113.png')

// Inimigos aparecem à DIREITA e vêm para a esquerda
let inimigo1 = new VeiculoInimigo(750, 130, 75, 50, '../assets/images/moto-vermelha.png')
let inimigo2 = new VeiculoInimigo(870, 260, 75, 50, '../assets/images/moto-vermelha.png')
let inimigo3 = new VeiculoInimigo(1000, 380, 90, 55, '../assets/images/moto-vermelha.png')
let coletaveis = []
let fase = 1
let cargaNome = 'Caixas de Madeira'
let cargaValor = 1000
let jogar = true

// ============ TEXTOS ============
class Text {
      des_text(texto, x, y, cor, fonte) {
            des.fillStyle = cor
            des.font = fonte
            des.fillText(texto, x, y)
      }
}

let t1 = new Text()
let t2 = new Text()
let fase_txt = new Text()

// ============ CONTROLES (igual, W/S agora movem vertical, A/D horizontal) ============
document.addEventListener('keydown', (e) => {
      if (jogar) {
            if (e.key === 'w' || e.key === 'ArrowUp') caminhao.pos = -5
            else if (e.key === 's' || e.key === 'ArrowDown') caminhao.pos = 5
            else if (e.key === 'a' || e.key === 'ArrowLeft') caminhao.dir = -5
            else if (e.key === 'd' || e.key === 'ArrowRight') caminhao.dir = 5
      }
})
document.addEventListener('keyup', (e) => {
      if (e.key === 'w' || e.key === 'ArrowUp' || e.key === 's' || e.key === 'ArrowDown')
            caminhao.pos = 0
      if (e.key === 'a' || e.key === 'ArrowLeft' || e.key === 'd' || e.key === 'ArrowRight')
            caminhao.dir = 0
})

// ============ FUNÇÕES ============
function spawnarColetavel() {
      if (Math.random() < 0.005 && jogar) {
            // Aparece à direita, Y aleatório dentro da pista
            let y = Math.random() * 360 + 70
            let tipo = Math.random() < 0.7 ? 'dinheiro' : 'cargaExtra'
            let imagem = tipo === 'dinheiro' ? './assets/images/dinheiro.png' : './assets/images/carga-extra.png'
            coletaveis.push(new Coletavel(730, y, 30, 30, imagem, tipo))
      }
}

function colisao() {
      // Lógica de colisão é igual, só muda onde os inimigos resetam
      [inimigo1, inimigo2, inimigo3].forEach(inimigo => {
            if (caminhao.x < inimigo.x + inimigo.w &&
                  caminhao.x + caminhao.w > inimigo.x &&
                  caminhao.y < inimigo.y + inimigo.h &&
                  caminhao.y + caminhao.h > inimigo.y) {
                  caminhao.sofrerDano(inimigo.getDano(), inimigo.getMulta())
                  inimigo.x = 750 // reseta à direita da tela
            }
      })

      coletaveis.forEach((coletavel, index) => {
            if (caminhao.x < coletavel.x + coletavel.w &&
                  caminhao.x + caminhao.w > coletavel.x &&
                  caminhao.y < coletavel.y + coletavel.h &&
                  caminhao.y + caminhao.h > coletavel.y) {
                  if (coletavel.tipo === 'dinheiro') caminhao.coletarDinheiro(50)
                  else caminhao.recuperarCarga(20)
                  coletaveis.splice(index, 1)
            }
      })
}

function pontuacao() {
      // Inimigo passou pelo lado esquerdo = ponto
      [inimigo1, inimigo2, inimigo3].forEach(inimigo => {
            if (inimigo.x + inimigo.w < 0) {
                  caminhao.dinheiro += 50
                  inimigo.x = 750
            }
      })
}

function verificarEntrega() {
      // Entrega: caminhão chega ao lado DIREITO da tela (x > 580)
      if (caminhao.x + caminhao.w > 580 && jogar) {
            caminhao.dinheiro += cargaValor
            caminhao.entregas++

            if (fase < 3) {
                  fase++
                  caminhao.fase = fase
                  cenario.fase = fase
                  caminhao.x = 80 // volta para o lado esquerdo

                  const cargas = {
                        1: { nome: 'Caixas de Madeira', valor: 1000 },
                        2: { nome: 'Contêiner Refrigerado', valor: 2500 },
                        3: { nome: 'Tanque Inflamável', valor: 5000 }
                  }
                  cargaNome = cargas[fase].nome
                  cargaValor = cargas[fase].valor

                  inimigo1.velocidade += 1
                  inimigo2.velocidade += 1
                  inimigo3.velocidade += 1
            } else {
                  alert('🏆 PARABÉNS! Você completou todas as entregas!')
                  reiniciarJogo()
            }
      }
}

function game_over() {
      if (caminhao.carga <= 0 || caminhao.dinheiro <= 0) jogar = false
}

function reiniciarJogo() {
      caminhao = new Caminhao(80, 210, 80, 60, './assets/images/caminhao.png')
      fase = 1
      cenario.resetar()
      cargaNome = 'Caixas de Madeira'
      cargaValor = 1000
      coletaveis = []
      jogar = true

      inimigo1.x = 750
      inimigo2.x = 870
      inimigo3.x = 1000
      inimigo1.velocidade = 3.0
      inimigo2.velocidade = 3.5
      inimigo3.velocidade = 2.8
}

// ============ LOOP PRINCIPAL ============
function desenha() {
      if (jogar) {
            cenario.desenhar()
            inimigo1.des_ret()
            inimigo2.des_ret()
            inimigo3.des_ret()
            coletaveis.forEach(c => c.des_ret())
            caminhao.des_ret()

            // HUD no topo
            t1.des_text('💰 ' + caminhao.dinheiro, 560, 30, '#f1c40f', '20px Arial')
            t2.des_text('📦 ' + caminhao.carga + '%', 560, 55, caminhao.getCorCarga(), '20px Arial')
            fase_txt.des_text('FASE ' + fase + '/3', 20, 30, '#f1c40f', '24px Arial')
            fase_txt.des_text(cargaNome, 20, 55, 'white', '16px Arial')
      } else {
            t1.des_text('GAME OVER', 350, 220, '#e94560', '48px Arial')
            t2.des_text('Dinheiro Final: R$ ' + caminhao.dinheiro, 350, 270, 'white', '20px Arial')
            fase_txt.des_text('Pressione F5 para jogar novamente', 350, 320, '#888', '16px Arial')
      }
}

function atualiza() {
      if (jogar) {
            caminhao.mov_car()
            inimigo1.mov_car()
            inimigo2.mov_car()
            inimigo3.mov_car()
            cenario.atualizarLinhas()
            coletaveis.forEach(c => c.mov_car())
            coletaveis = coletaveis.filter(c => c.x > -50) // remove quando sai pela esquerda
            spawnarColetavel()
            colisao()
            pontuacao()
            verificarEntrega()
            game_over()
      }
}

function main() {
      des.clearRect(0, 0, 700, 500) // canvas 700x500
      desenha()
      atualiza()
      requestAnimationFrame(main)
}