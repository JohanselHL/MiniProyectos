class Gota{
    constructor(x,y){
        this.x = x
        this.y = y
        this.radio = 2
        this.radioMax = 100
        this.velocidadCrecimiento = 1.0
        this.opacidad = 1
    }
    dibujar(){
        contexto.save()
        contexto.globalAlpha = this.opacidad
        contexto.beginPath()
        contexto.arc(this.x, this.y, this.radio, 0, Math.PI * 2)
        contexto.stroke()
        contexto.closePath()
        contexto.restore()
    }

    actualizar(){
        this.radio += this.velocidadCrecimiento
        this.opacidad = 1 - (this.radio / this.radioMax)
    }

    terminada(){
        return this.radio >= this.radioMax
    }
}