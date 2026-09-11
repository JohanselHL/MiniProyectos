const canvas = document.querySelector("canvas")
const contexto = canvas. getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

contexto.fillStyle = "white"
contexto.strokeStyle = "white"

let bolas = []
let cubos = []
let ondas = []
let modo = "particulas"

function crearParticulas(){
    bolas = []
    for(let i = 0; i < 100; i++){
        bolas.push(new Bola(canvas.width/2, canvas.height/2))
    }
}

function crearCubos(){
    cubos = []
    for(let i = 0; i < 50; i++){
        cubos.push(new Cubo(canvas.width/2, canvas.height/2))
    }
}

function crearGotas(){
    ondas = []
}

document.querySelector("#btn1").addEventListener("click", () => {
    modo = "particulas"
    crearParticulas()
})

document.querySelector("#btn2").addEventListener("click", () => {
    modo = "cubos"
    crearCubos()
})

document.querySelector("#btn3").addEventListener("click", () => {
    modo = "gotas"
    crearGotas()
})

crearParticulas()

function animar(){

    contexto.clearRect(0,0, canvas.width, canvas.height)

    if(modo === "particulas"){
        bolas.forEach(bola=> {
            bolas.forEach(bola2=> {
                let dx = bola2.x - bola.x 
                let dy = bola2.y - bola.y
                let dist = Math.sqrt(dx **2 + dy ** 2) 

                if(dist < 150){
                    contexto.beginPath()
                    contexto.moveTo(bola.x, bola.y)
                    contexto.lineTo(bola2.x, bola2.y)
                    contexto.stroke()
                    contexto.closePath()
                }
            })
            bola.dibujar()
            bola.mover()
        })
    }

    if(modo === "cubos"){
        cubos.forEach(cubo => {
            cubo.dibujar()
            cubo.mover()
        })
    }

    if(modo === "gotas"){
        if(Math.random() < 0.1){
            ondas.push(new Gota(Math.random() * canvas.width, Math.random() * canvas.height))
        }

        ondas.forEach(onda => {
            onda.dibujar()
            onda.actualizar()
        })

        ondas = ondas.filter(onda => !onda.terminada())
    }

    requestAnimationFrame(animar)
}

animar()