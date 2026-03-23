let des = document.getElementById('des').getContext('2d')

// ============ OBJETOS ============
let cenario = new Cenario()

let caminhao = new Caminhao(80, 210, 240, 60, '../assets/images/caminhao_madeira.png')

let inimigos = [
      new VeiculoInimigo(750, 130, 75, 50, '../assets/images/moto-vermelha.png'),
      new VeiculoInimigo(870, 260, 75, 50, '../assets/images/moto-vermelha.png'),
      new VeiculoInimigo(1000, 380, 90, 55, '../assets/images/moto-vermelha.png'),
      new VeiculoInimigo(1130, 210, 80, 50, '../assets/images/moto-vermelha.png'),
      new VeiculoInimigo(1260, 340, 75, 50, '../assets/images/moto-vermelha.png'),
      new VeiculoInimigo(1390, 130, 90, 55, '../assets/images/moto-vermelha.png'),
      new VeiculoInimigo(1520, 260, 80, 50, '../assets/images/moto-vermelha.png'),
      new VeiculoInimigo(1650, 380, 75, 50, '../assets/images/moto-vermelha.png'),
      new VeiculoInimigo(1780, 210, 90, 55, '../assets/images/moto-vermelha.png'),
      new VeiculoInimigo(1910, 340, 80, 50, '../assets/images/moto-vermelha.png'),
      new VeiculoInimigo(2040, 130, 75, 50, '../assets/images/moto-vermelha.png'),
      new VeiculoInimigo(2170, 260, 90, 55, '../assets/images/moto-vermelha.png'),
]

const velocidadesBase = [3.0, 3.5, 2.8, 3.2, 3.6, 2.9, 3.3, 3.7, 2.7, 3.4, 3.8, 2.6]

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

// ============ CONTROLES ============
document.addEventListener('keydown', (e) => {
      if (!jogar) return
      if (e.key === 'w' || e.key === 'ArrowUp') caminhao.pos = -5
      if (e.key === 's' || e.key === 'ArrowDown') caminhao.pos = 5
      if (e.key === 'a' || e.key === 'ArrowLeft') caminhao.dir = -5
      if (e.key === 'd' || e.key === 'ArrowRight') caminhao.dir = 5
})
document.addEventListener('keyup', (e) => {
      if (e.key === 'w' || e.key === 'ArrowUp' || e.key === 's' || e.key === 'ArrowDown') caminhao.pos = 0
      if (e.key === 'a' || e.key === 'ArrowLeft' || e.key === 'd' || e.key === 'ArrowRight') caminhao.dir = 0
})

// ============ FUNÇÕES ============
function spawnarColetavel() {
      if (Math.random() < 0.005 && jogar) {
            let y = Math.random() * 360 + 70
            let tipo = Math.random() < 0.7 ? 'dinheiro' : 'cargaExtra'
            let imagem = tipo === 'dinheiro' ? '../assets/images/dinheiro.png' : '../assets/images/carga-extra.png'
            coletaveis.push(new Coletavel(730, y, 30, 30, imagem, tipo))
      }
}

function colisao() {
      inimigos.forEach(inimigo => {
            if (caminhao.x < inimigo.x + inimigo.w &&
                  caminhao.x + caminhao.w > inimigo.x &&
                  caminhao.y < inimigo.y + inimigo.h &&
                  caminhao.y + caminhao.h > inimigo.y) {
                  caminhao.sofrerDano(inimigo.getDano(), inimigo.getMulta())
                  inimigo.x = 750
            }
      })

      coletaveis.forEach((coletavel, i) => {
            if (caminhao.x < coletavel.x + coletavel.w &&
                  caminhao.x + caminhao.w > coletavel.x &&
                  caminhao.y < coletavel.y + coletavel.h &&
                  caminhao.y + caminhao.h > coletavel.y) {
                  if (coletavel.tipo === 'dinheiro') caminhao.coletarDinheiro(50)
                  else caminhao.recuperarCarga(20)
                  coletaveis.splice(i, 1)
            }
      })
}

function pontuacao() {
      inimigos.forEach(inimigo => {
            if (inimigo.x + inimigo.w < 0) {
                  caminhao.dinheiro += 50
                  inimigo.x = 750
            }
      })
}

function verificarEntrega() {
      if (caminhao.x + caminhao.w > 580 && jogar) {
            caminhao.dinheiro += cargaValor
            caminhao.entregas++

            if (fase < 3) {
                  fase++
                  caminhao.fase = fase
                  cenario.fase = fase
                  caminhao.x = 80

                  const cargas = {
                        1: { nome: 'Caixas de Madeira', valor: 1000 },
                        2: { nome: 'Contêiner Refrigerado', valor: 2500 },
                        3: { nome: 'Tanque Inflamável', valor: 5000 }
                  }
                  cargaNome = cargas[fase].nome
                  cargaValor = cargas[fase].valor

                  inimigos.forEach(i => i.velocidade += 1)
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
      caminhao = new Caminhao(80, 210, 240, 60, '../assets/images/caminhao_madeira.png')
      fase = 1
      cargaNome = 'Caixas de Madeira'
      cargaValor = 1000
      coletaveis = []
      jogar = true
      cenario.resetar()

      inimigos.forEach((inimigo, i) => {
            inimigo.x = 750 + i * 130
            inimigo.velocidade = velocidadesBase[i]
      })
}

// ============ LOOP ============
function desenha() {
      if (jogar) {
            cenario.desenhar()
            inimigos.forEach(i => i.des_ret())
            coletaveis.forEach(c => c.des_ret())
            caminhao.des_ret()

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
      if (!jogar) return
      caminhao.mov_car()
      inimigos.forEach(i => i.mov_car())
      cenario.atualizarLinhas()
      coletaveis.forEach(c => c.mov_car())
      coletaveis = coletaveis.filter(c => c.x > -50)
      spawnarColetavel()
      colisao()
      pontuacao()
      verificarEntrega()
      game_over()
}

function main() {
      des.clearRect(0, 0,900, 500)
      desenha()
      atualiza()
      requestAnimationFrame(main)
}
main()