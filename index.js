let des = document.getElementById('des').getContext('2d')

// ============ ÁUDIO ============
// let motor = new Audio('./assets/audio/motor.wav')
// let batida = new Audio('./assets/audio/batida.mp3')
// motor.volume = 0.3
// motor.loop = true
// batida.volume = 0.5

// ============ CRIAÇÃO DOS OBJETOS ============
let cenario = new Cenario()
cenario.criarLinhas()
let caminhao = new Caminhao(230, 550, 60, 80, './assets/images/caminhao-113.png')

let inimigo1 = new VeiculoInimigo(130, -50, 50, './assets/images/moto-vermelha.png')
let inimigo2 = new VeiculoInimigo(260, -120, 55, 75, './assets/images/moto-vermelha.png')
let inimigo3 = new VeiculoInimigo(390, -200, 70, 90, './assets/images/moto-vermelha.png')
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

let t1 = new Text() // Pontos/Dinheiro
let t2 = new Text() // Vida/Carga
let fase_txt = new Text() // Fase

// ============ CONTROLES ============
document.addEventListener('keydown', (e) => {
      if (jogar) {
            // motor.play()

            if (e.key === 'w' || e.key === 'ArrowUp') {
                  caminhao.pos = -5
            } else if (e.key === 's' || e.key === 'ArrowDown') {
                  caminhao.pos = 5
            } else if (e.key === 'a' || e.key === 'ArrowLeft') {
                  caminhao.dir = -5
            } else if (e.key === 'd' || e.key === 'ArrowRight') {
                  caminhao.dir = 5
            }
      }
})

document.addEventListener('keyup', (e) => {
      if (e.key === 'w' || e.key === 'ArrowUp' || e.key === 's' || e.key === 'ArrowDown') {
            caminhao.pos = 0
      }
      if (e.key === 'a' || e.key === 'ArrowLeft' || e.key === 'd' || e.key === 'ArrowRight') {
            caminhao.dir = 0
      }
})

// ============ FUNÇÕES ============
function spawnarColetavel() {
      if (Math.random() < 0.005 && jogar) {
            let x = Math.random() * 400 + 50 // Posição X aleatória
            let tipo = Math.random() < 0.7 ? 'dinheiro' : 'cargaExtra'
            let imagem = tipo === 'dinheiro' ? './assets/images/dinheiro.png' : './assets/images/carga-extra.png'
            let coletavel = new Coletavel(x, -30, 30, 30, imagem, tipo)
            coletaveis.push(coletavel)
      }
}

function colisao() {
      // Verifica colisão com inimigo1
      if (caminhao.x < inimigo1.x + inimigo1.w &&
            caminhao.x + caminhao.w > inimigo1.x &&
            caminhao.y < inimigo1.y + inimigo1.h &&
            caminhao.y + caminhao.h > inimigo1.y) {

            batida.play()
            caminhao.sofrerDano(inimigo1.getDano(), inimigo1.getMulta())
            inimigo1.y = -100
      }

      // Verifica colisão com inimigo2
      if (caminhao.x < inimigo2.x + inimigo2.w &&
            caminhao.x + caminhao.w > inimigo2.x &&
            caminhao.y < inimigo2.y + inimigo2.h &&
            caminhao.y + caminhao.h > inimigo2.y) {

            batida.play()
            caminhao.sofrerDano(inimigo2.getDano(), inimigo2.getMulta())
            inimigo2.y = -100
      }

      // Verifica colisão com inimigo3
      if (caminhao.x < inimigo3.x + inimigo3.w &&
            caminhao.x + caminhao.w > inimigo3.x &&
            caminhao.y < inimigo3.y + inimigo3.h &&
            caminhao.y + caminhao.h > inimigo3.y) {

            batida.play()
            caminhao.sofrerDano(inimigo3.getDano(), inimigo3.getMulta())
            inimigo3.y = -100
      }

      // Colisão com coletáveis
      coletaveis.forEach((coletavel, index) => {
            if (caminhao.x < coletavel.x + coletavel.w &&
                  caminhao.x + caminhao.w > coletavel.x &&
                  caminhao.y < coletavel.y + coletavel.h &&
                  caminhao.y + caminhao.h > coletavel.y) {

                  if (coletavel.tipo === 'dinheiro') {
                        caminhao.coletarDinheiro(50)
                  } else {
                        caminhao.recuperarCarga(20)
                  }
                  coletaveis.splice(index, 1)
            }
      })
}

function pontuacao() {
      // Sistema de pontos ao ultrapassar inimigos (igual ao segundo código)
      if (inimigo1.y > 750) {
            caminhao.dinheiro += 50
            inimigo1.y = -100
      }
      if (inimigo2.y > 750) {
            caminhao.dinheiro += 50
            inimigo2.y = -100
      }
      if (inimigo3.y > 750) {
            caminhao.dinheiro += 50
            inimigo3.y = -100
      }
}

function verificarEntrega() {
      if (caminhao.y < 120 && jogar) {
            caminhao.dinheiro += cargaValor
            caminhao.entregas++

            if (fase < 3) {
                  fase++
                  caminhao.fase = fase
                  cenario.fase = fase
                  caminhao.y = 550

                  // Atualiza a carga
                  const cargas = {
                        1: { nome: 'Caixas de Madeira', valor: 1000 },
                        2: { nome: 'Contêiner Refrigerado', valor: 2500 },
                        3: { nome: 'Tanque Inflamável', valor: 5000 }
                  }
                  cargaNome = cargas[fase].nome
                  cargaValor = cargas[fase].valor

                  // Aumenta velocidade dos inimigos (igual ao ver_fase do segundo código)
                  inimigo1.velocidade += 1
                  inimigo2.velocidade += 1
                  inimigo3.velocidade += 1
            } else {
                  alert('🏆 PARABÉNS! Você completou todas as entregas! 🏆')
                  reiniciarJogo()
            }
      }
}

function game_over() {
      if (caminhao.carga <= 0 || caminhao.dinheiro <= 0) {
            jogar = false
            motor.pause()
      }
}

function reiniciarJogo() {
      caminhao = new Caminhao(230, 550, 60, 80, './assets/images/caminhao.png')
      fase = 1
      cenario.resetar()
      cargaNome = 'Caixas de Madeira'
      cargaValor = 1000
      coletaveis = []
      jogar = true
      motor.currentTime = 0

      // Reinicia posições dos inimigos
      inimigo1.y = -50
      inimigo2.y = -120
      inimigo3.y = -200

      // Reinicia velocidades
      inimigo1.velocidade = 3.0
      inimigo2.velocidade = 3.5
      inimigo3.velocidade = 2.8
}

// ============ LOOP PRINCIPAL ============
function desenha() {
      if (jogar) {
            cenario.desenhar()

            // Desenha inimigos (individualmente, igual ao segundo código)
            inimigo1.des_ret()
            inimigo2.des_ret()
            inimigo3.des_ret()

            // Desenha coletáveis
            coletaveis.forEach(coletavel => coletavel.des_ret())

            // Desenha caminhão
            caminhao.des_ret()

            // Textos na tela (igual ao segundo código)
            t1.des_text('💰 ' + caminhao.dinheiro, 350, 40, '#f1c40f', '20px Arial')
            t2.des_text('📦 ' + caminhao.carga + '%', 350, 70, caminhao.getCorCarga(), '20px Arial')
            fase_txt.des_text('FASE ' + fase + '/3', 40, 40, '#f1c40f', '24px Arial')
            fase_txt.des_text(cargaNome, 40, 70, 'white', '16px Arial')
      } else {
            // Tela de GAME OVER (igual ao segundo código)
            t1.des_text('GAME OVER', 250, 350, '#e94560', '48px Arial')
            t2.des_text('Dinheiro Final: R$ ' + caminhao.dinheiro, 250, 400, 'white', '20px Arial')
            fase_txt.des_text('Entregas: ' + caminhao.entregas, 250, 430, 'white', '20px Arial')
            fase_txt.des_text('Pressione F5 para jogar novamente', 250, 500, '#888', '16px Arial')
      }
}

function atualiza() {
      if (jogar) {
            caminhao.mov_car()

            // Move inimigos (individualmente, igual ao segundo código)
            inimigo1.mov_car()
            inimigo2.mov_car()
            inimigo3.mov_car()

            // Move linhas da estrada
            cenario.atualizarLinhas()

            // Move coletáveis
            coletaveis.forEach(coletavel => coletavel.mov_car())
            coletaveis = coletaveis.filter(c => c.y < 700)

            spawnarColetavel()
            colisao()
            pontuacao()
            verificarEntrega()
            game_over()
      }
}

function main() {
      des.clearRect(0, 0, 500, 700)
      desenha()
      atualiza()
      requestAnimationFrame(main)
}

main()