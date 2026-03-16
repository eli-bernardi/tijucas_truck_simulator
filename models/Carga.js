class Carga {
    constructor() {
        this.faseAtual = 1
        this.cargas = {
            1: { nome: 'Caixas de Madeira', valor: 1000, cor: '#8B4513' },
            2: { nome: 'Contêiner Refrigerado', valor: 2500, cor: '#3498db' },
            3: { nome: 'Tanque Inflamável', valor: 5000, cor: '#e74c3c' }
        }
    }

    getCargaAtual() {
        return this.cargas[this.faseAtual]
    }

    avancarFase() {
        if (this.faseAtual < 3) {
            this.faseAtual++
            return true
        }
        return false
    }

    resetar() {
        this.faseAtual = 1
    }
}