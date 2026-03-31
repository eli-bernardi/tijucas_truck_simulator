let des = document.getElementById('des').getContext('2d')

// ============ OBJETOS ============
let cenario = new Cenario()
let telaFinal = false
let caminhao = new Caminhao(80, 210, 300, 80, '../assets/images/veiculo/caminhao_madeira.png')

let inimigos = [
      // new VeiculoInimigo(750, 130, 155, 52, '../assets/images/veiculo/f250.png'),
      // new VeiculoInimigo(950, 260, 140, 50, '../assets/images/veiculo/fusca.png'),
      // new VeiculoInimigo(1150, 380, 145, 52, '../assets/images/veiculo/chevette.png'),
      // new VeiculoInimigo(1350, 210, 155, 52, '../assets/images/veiculo/saveiro.png'),
      // new VeiculoInimigo(1550, 340, 120, 60, '../assets/images/veiculo/uno_mille.png'),
]

const velocidadesBase = [3.0, 3.5, 2.8, 3.2, 2.6]

let coletaveis = []
let fase = 1
let cargaNome = 'Levando Madeira'
let cargaValor = 1000
let jogar = true

// ============ IMAGENS PARA TELA FINAL ============
const imagensTelaFinal = {
imagemFinal : new Image(),
}
imagensTelaFinal.imagemFinal.src = '../assets/images/game/final.png'

// ============ ÁUDIO ============
const sons = {
      batida: new Audio('../assets/sounds/crash-car.mp3'),
      coleta: new Audio('../assets/sounds/collect-item.mp3'),
      entrega: new Audio('../assets/sounds/mission-complete.mp3'),
      gameOver: new Audio('../assets/sounds/game-over.mp3'),
      mouseClique: new Audio('../assets/sounds/mouse-click.mp3'),
}

const musica = new Audio('../assets/music/sonho_caminhoneiro_karaoke.mp3')
musica.loop = true
musica.volume = 0.3

document.addEventListener('keydown', () => musica.play(), { once: true })
document.addEventListener('click', () => {
      musica.play()
      sons.mouseClique.play()
}, { once: true })


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
            const tipo = Math.random() < 0.5 ? 'dinheiro' : 'cargaExtra'
            const imagem = tipo === 'dinheiro'
                  ? '../assets/images/game/dinheiro.png'
                  : '../assets/images/game/carga-extra.png'
            coletaveis.push(new Coletavel(1300, Math.random() * 300 + 100, 60, 60, imagem, tipo))
      }
}

function colisao() {
      inimigos.forEach(inimigo => {
            if (caminhao.x < inimigo.x + inimigo.w &&
                  caminhao.x + caminhao.w > inimigo.x &&
                  caminhao.y < inimigo.y + inimigo.h &&
                  caminhao.y + caminhao.h > inimigo.y) {
                  caminhao.sofrerDano(inimigo.getDano(), inimigo.getMulta())
                  inimigo.x = 1500
                  sons.batida.currentTime = 0
                  sons.batida.play()
            }
      })

      coletaveis.forEach((c, i) => {
            if (caminhao.x < c.x + c.w &&
                  caminhao.x + caminhao.w > c.x &&
                  caminhao.y < c.y + c.h &&
                  caminhao.y + caminhao.h > c.y) {
                  if (c.tipo === 'dinheiro') caminhao.coletarDinheiro(50)
                  else caminhao.recuperarCarga(20)
                  coletaveis.splice(i, 1)
                  sons.coleta.currentTime = 0
                  sons.coleta.play()
            }
      })
}

function pontuacao() {
      inimigos.forEach(inimigo => {
            if (inimigo.x + inimigo.w < 0) {
                  caminhao.dinheiro += 50
                  inimigo.x = 1500
            }
      })
}

const cargas = {
      1: { nome: 'Levando Madeira', valor: 1000 },
      2: { nome: 'Contêiner Refrigerado', valor: 2500 },
      3: { nome: 'Carga de Areia', valor: 2000 },
}

function verificarEntrega() {
      if (caminhao.x + caminhao.w > 1150 && jogar) {
            caminhao.dinheiro += cargaValor
            caminhao.entregas++
            sons.entrega.play()

            if (fase < 3) {
                  fase++
                  caminhao.fase = fase
                  cenario.fase = fase
                  caminhao.trocarImagemFase(fase)
                  caminhao.x = 80
                  caminhao.carga = 100
                  cargaNome = cargas[fase].nome
                  cargaValor = cargas[fase].valor
                  inimigos.forEach(i => i.velocidade += 1)
            } else {
                  jogar = false
                  telaFinal = true
                  musica.pause()
                  musica.currentTime = 0
                  sons.entrega.play()
            }
      }
}

function game_over() {
      if (caminhao.carga <= 0 || caminhao.dinheiro <= 0) {
            jogar = false
            musica.pause()
            musica.currentTime = 0
            sons.gameOver.play()
      }
}

function reiniciarJogo() {
      telaFinal = false
      caminhao = new Caminhao(80, 210, 300, 80, '../assets/images/veiculo/caminhao_madeira.png')
      fase = 1
      cargaNome = cargas[1].nome
      cargaValor = cargas[1].valor
      coletaveis = []
      jogar = true
      cenario.resetar()
      musica.currentTime = 0
      musica.play()

      inimigos.forEach((inimigo, i) => {
            inimigo.x = 750 + i * 200
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
      } else if (telaFinal) {
            des.fillStyle = 'rgba(0,0,0,0.88)'
            des.fillRect(0, 0, 1200, 500)
            des.textAlign = 'center'

            des.fillStyle = '#f1c40f'
            des.font = 'bold 52px Arial'
            des.fillText('ENTREGAS CONCLUÍDAS!', 600, 130)

            des.fillStyle = 'white'
            des.font = '26px Arial'
            des.fillText('Dinheiro total: R$ ' + caminhao.dinheiro, 600, 210)

            des.fillStyle = '#aaa'
            des.font = '18px Arial'
            des.fillText('Entregas realizadas: ' + caminhao.entregas + '/3', 600, 255)

            // Botão "Jogar novamente"
            des.fillStyle = '#27ae60'
            des.beginPath()
            des.roundRect(370, 300, 220, 54, 10)
            des.fill()
            des.fillStyle = 'white'
            des.font = 'bold 20px Arial'
            des.fillText('Jogar novamente', 480, 333)

            // Botão "Voltar ao início"
            des.fillStyle = '#2980b9'
            des.beginPath()
            des.roundRect(610, 300, 220, 54, 10)
            des.fill()
            des.fillStyle = 'white'
            des.font = 'bold 20px Arial'
            des.fillText('Voltar ao início', 720, 333)

      } else {
            des.fillStyle = 'rgba(0,0,0,0.85)'
            des.fillRect(0, 0, 1200, 500)
            des.textAlign = 'center'

            des.fillStyle = '#e94560'
            des.font = 'bold 64px Arial'
            des.fillText('GAME OVER', 600, 180)

            des.fillStyle = 'white'
            des.font = '28px Arial'
            des.fillText('Dinheiro Final: R$ ' + caminhao.dinheiro, 600, 260)

            des.fillStyle = '#888'
            des.font = '20px Arial'
            des.fillText('Pressione F5 para jogar novamente', 600, 320)
      }
}

function atualiza() {
      if (!jogar) return
      caminhao.mov_car()
      inimigos.forEach(i => i.mov_car())
      cenario.atualizarLinhas()
      coletaveis.forEach(c => c.mov_car())
      coletaveis = coletaveis.filter(c => c.x > -100)
      spawnarColetavel()
      colisao()
      pontuacao()
      verificarEntrega()
      game_over()
}

function main() {
      des.clearRect(0, 0, 1200, 500)
      desenha()
      atualiza()
      requestAnimationFrame(main)
}

document.getElementById('des').addEventListener('click', (e) => {
      if (!telaFinal) return

      const rect = e.target.getBoundingClientRect()
      const x = (e.clientX - rect.left) * (1200 / rect.width)
      const y = (e.clientY - rect.top) * (500 / rect.height)

      if (x >= 370 && x <= 590 && y >= 300 && y <= 354) {
            telaFinal = false
            reiniciarJogo()
      }
      if (x >= 610 && x <= 830 && y >= 300 && y <= 354) {
            window.location.href = '../index.html'
      }
})

main()