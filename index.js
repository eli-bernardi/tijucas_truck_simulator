let des = document.getElementById('des').getContext('2d')

// ============ OBJETOS ============
let cenario = new Cenario()

let caminhao = new Caminhao(80, 210, 240, 60, '../assets/images/caminhao_madeira.png')

let inimigos = [
      // new VeiculoInimigo(750, 130, 75, 50, '../assets/images/moto-vermelha.png'),
      // new VeiculoInimigo(870, 260, 75, 50, '../assets/images/moto-vermelha.png'),
      // new VeiculoInimigo(1000, 380, 90, 55, '../assets/images/moto-vermelha.png'),
      // new VeiculoInimigo(1130, 210, 80, 50, '../assets/images/moto-vermelha.png'),
      // new VeiculoInimigo(1260, 340, 75, 50, '../assets/images/moto-vermelha.png'),
      // new VeiculoInimigo(1390, 130, 90, 55, '../assets/images/moto-vermelha.png'),
      // new VeiculoInimigo(1520, 260, 80, 50, '../assets/images/moto-vermelha.png'),
      // new VeiculoInimigo(1650, 380, 75, 50, '../assets/images/moto-vermelha.png'),
      // new VeiculoInimigo(1780, 210, 90, 55, '../assets/images/moto-vermelha.png'),
      // new VeiculoInimigo(1910, 340, 80, 50, '../assets/images/moto-vermelha.png'),
      // new VeiculoInimigo(2040, 130, 75, 50, '../assets/images/moto-vermelha.png'),
      // new VeiculoInimigo(2170, 260, 90, 55, '../assets/images/moto-vermelha.png'),
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


// =============  ÁUDIO  =============
const sons = {
      batida: new Audio('../assets/sounds/crash-car.mp3'),
      coleta: new Audio('../assets/sounds/collect-item.mp3'),
      entrega: new Audio('../assets/sounds/mission-complete.mp3'),
      motor: new Audio('../assets/sounds/motor-engine.mp3'),
      gameOver: new Audio('../assets/sounds/game-over.mp3'),
      mouseClique: new Audio('../assets/sounds/mouse-click.mp3'),
}

const musicaTema = {
      sonho_caminhoneiro: new Audio('../assets/music/sonho_caminhoneiro_karaoke.mp3'),
      sublime_renuncia: new Audio('../assets/music/sublime_renuncia_karaoke.mp3'),
      convite_casamento: new Audio('../assets/music/convite_casamento_karaoke.mp3'),
}

musicaTema.loop = true
musicaTema.volume = 0.3


const musicaAleatorias = {
      1: new Audio('../assets/music/flores_vida.mp3'),
      // 2: new Audio('../assets/music/nos_bracos_teus.mp3'),
      3: new Audio('../assets/music/por_voce_que_canto.mp3'),
      4: new Audio('../assets/music/voce_nn_sabe_amar.mp3'),
}

let musicaAtual = null

function tocarMusicaAleatorio() {
      if (musicaAtual) {
            musicaAtual.pause()
            musicaAtual.currentTime = 0
      }
      const idx = Math.floor(Math.random() * musicaAleatorias.length)
      musicaAtual = musicaAleatorias[idx]
      musicaAtual.play()
      musicaAtual.loop = true
      musicaAtual.volume = 0.4
}

document.addEventListener('click', () => {
      sons.mouseClique.play()
})

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
            coletaveis.push(new Coletavel(730, y, 60, 60, imagem, tipo))
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
                  sons.batida.play()
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
                  sons.coleta.play()
            }
      })
}

function pontuacao() {
      inimigos.forEach(inimigo => {
            if (inimigo.x + inimigo.w < 0) {
                  caminhao.dinheiro += 50
                  inimigo.x = 2000
            }
      })
}

function verificarEntrega() {
      if (caminhao.x + caminhao.w > 1550 && jogar) {
            caminhao.dinheiro += cargaValor
            caminhao.entregas++
            sons.entrega.play()
            if (fase < 3) {
                  fase++
                  caminhao.fase = fase
                  cenario.fase = fase
                  caminhao.trocarImagemFase(fase)
                  caminhao.x = 80

                  const cargas = {
                        1: { nome: 'Levando Madeira', valor: 1000 },
                        2: { nome: 'Contêiner Refrigerado', valor: 2500 },
                        3: { nome: 'Carga de Areia', valor: 2000 }
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
      if (caminhao.carga <= 0 || caminhao.dinheiro <= 0) {
            jogar = false
            if (musicaAtual) {
                  musicaAtual.pause()
                  musicaAtual.currentTime = 0
            }
            sons.gameOver.play()
      }
}

function reiniciarJogo() {
      caminhao = new Caminhao(80, 240, 400 , 120, '../assets/images/caminhao_madeira.png')
      fase = 1
      cargaNome = 'Caixas de Madeira'
      cargaValor = 1000
      coletaveis = []
      jogar = true
      cenario.resetar()
      tocarMusicaAleatorio()

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

            document.getElementById('dinheiro').textContent = 'R$ ' + caminhao.dinheiro
            document.getElementById('carga').textContent = caminhao.carga + '%'
            document.getElementById('fase').textContent = fase + '/3'
            document.getElementById('cargaNome').textContent = cargaNome
            document.getElementById('cargaValor').textContent = 'R$ ' + cargaValor
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
      des.clearRect(0, 0, 1600, 600)
      desenha()
      atualiza()
      requestAnimationFrame(main)
}
main()