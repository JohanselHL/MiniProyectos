class Cubo{
    constructor(x,y){
        this.x = x
        this.y = y
        this.lado = 40
        this.dirX = (Math.random() * 2) - 1
        this.dirY = (Math.random() * 2) - 1
        this.velocidad = 2

        this.anguloX = Math.random() * Math.PI * 2
        this.anguloY = Math.random() * Math.PI * 2
        this.velRotX = 0.01
        this.velRotY = 0.01

        const l = this.lado / 2
        // 8 vértices del cubo en 3D (centrado en el origen)
        this.vertices = [
            [-l,-l,-l], [l,-l,-l], [l,l,-l], [-l,l,-l],
            [-l,-l, l], [l,-l, l], [l,l, l], [-l,l, l]
        ]
        // Pares de vértices que forman cada arista
        this.aristas = [
            [0,1],[1,2],[2,3],[3,0],
            [4,5],[5,6],[6,7],[7,4],
            [0,4],[1,5],[2,6],[3,7]
        ]
    }

    dibujar(){
        const cosX = Math.cos(this.anguloX), sinX = Math.sin(this.anguloX)
        const cosY = Math.cos(this.anguloY), sinY = Math.sin(this.anguloY)

        const proyectados = this.vertices.map(([vx, vy, vz]) => {
            // Rotación en el eje Y
            let x1 = vx * cosY - vz * sinY
            let z1 = vx * sinY + vz * cosY
            // Rotación en el eje X
            let y2 = vy * cosX - z1 * sinX
            let z2 = vy * sinX + z1 * cosX

            // Perspectiva simple: lo que está más "lejos" (z2 mayor) se ve más chico
            const escala = 200 / (200 + z2)

            return {
                x: this.x + x1 * escala,
                y: this.y + y2 * escala
            }
        })

        contexto.beginPath()
        this.aristas.forEach(([a, b]) => {
            contexto.moveTo(proyectados[a].x, proyectados[a].y)
            contexto.lineTo(proyectados[b].x, proyectados[b].y)
        })
        contexto.stroke()
    }

    mover(){
        this.x += this.dirX * this.velocidad
        this.y += this.dirY * this.velocidad
        this.anguloX += this.velRotX
        this.anguloY += this.velRotY

        if(this.x + this.lado > canvas.width || this.x < 0){
            this.dirX *= -1
        }

        if(this.y + this.lado > canvas.height || this.y < 0){
            this.dirY *= -1
        }
    }
}