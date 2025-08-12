

//Obtenemos el boton de turnos y el contenedor main
let botonNuevoTurno = document.getElementById("nuevoTurno");
let mainContainer = document.getElementById("main");

//OBTENEMOS EL ARRAY DE TURNOS
const proximosTurnos = JSON.parse(localStorage.getItem("turnos")) || [];

//guardamos el contenido html anterior a la pantalla nueva;
let contenidoMainContainer = mainContainer.innerHTML;

//constructor de turno
class Turno {
    constructor(nombre,servicio,dia,hora,id) {
        this.nombre = nombre;
        this.servicio = servicio;
        this.dia = dia;
        this.hora = hora;
        this.id = id;
    }
}

//añadimos evente listener al click

botonNuevoTurno.addEventListener("click", ()=>{

    mainContainer.innerHTML += `    <article class="formTurnoContainer">
                    <img src="./Logo.png" class="logoBarber" alt="">
        <form action="" class="formularioTurno">
            <label for="nombre">NOMBRE:</label>
            <input type="text" id="nombreInput">
            <label for="servicio">SERVICIO</label>
            <select name="servicios" id="inputServicio">
                <option value="corte">CORTE</option>
                <option value="corte y barba">CORTE Y BARBA</option>
                <option value="color">COLOR</option>
            </select>
            <label for="dia">DIA:</label>
            <input type="date" name="dia" id="diaTurno">
            <label for="hora">HORA:</label>
            <input type="time" name="hora" id="horaTurno">
            <input type="button" value="REGISTRAR TURNO" id="botonRegistrarTurno">
        </form>
        <button class="cerrarTurnoBoton" id="vueltaInicio">VOLVER A INICIO</button>
    </article>`;

//Obtenemos todos los inputs para procesar el turno
let inputNombre = document.getElementById("nombreInput");
let inputServicio = document.getElementById("inputServicio");
let inputDia = document.getElementById("diaTurno");
let inputHora = document.getElementById("horaTurno");
let botonRegistrarTurno = document.getElementById("botonRegistrarTurno");

//agregamos un contador de ID momentaneo para poder hacer un incremental en las reservas que luego sera remplazado por el ID de base de datos
let turnoID = JSON.parse(localStorage.getItem("turnoID")) || 1;

//REALIZAMOS LA LOGICA PARA AGENDAR TURNOS
botonRegistrarTurno.addEventListener("click", ()=>{

    let nuevoTurno = new Turno(
        inputNombre.value,
        inputServicio.value,
        inputDia.value,
        inputHora.value,
        turnoID
    );

    proximosTurnos.push(nuevoTurno);
    localStorage.setItem("turnos", JSON.stringify(proximosTurnos));

    turnoID += 1;
    localStorage.setItem("turnoID", JSON.stringify(turnoID));
    location.reload();
})
//obtenemos el boton de vuelta a inicio
let botonVueltaInicio = document.getElementById("vueltaInicio");

// añadimos el event listener para volver al principio
botonVueltaInicio.addEventListener("click", ()=>{
    location.reload();
});

});

// Logica para realizar displays de los turnos
let detalleTurnos = document.getElementById("detalleTurnos");

const mostrarTurnos = (turnos) => {
    if (turnos.length >= 1) {
        detalleTurnos.innerHTML = turnos.map(turno => `
            <div class="filaTurno">
                <p>${turno.nombre}</p>
                <p>${turno.servicio}</p>
                <p>${turno.dia}</p>
                <p>${turno.hora}</p>
                <button class="eliminarTurnoBoton" data-id="${turno.id}"> X</button>
            </div>
            `
        ).join("");
    }else {
        detalleTurnos.innerHTML = `
        <p>NO HAY TURNOS AGENDADOS</p>
        `
    }
}
mostrarTurnos(proximosTurnos);

//aca añadimos la logica para poder eliminar los turnos

let botonesEliminar = document.querySelectorAll(".eliminarTurnoBoton");

botonesEliminar.forEach(boton => {
    boton.addEventListener("click", (e) => {
        const idEliminar = parseInt(e.target.getAttribute("data-id"));

        const nuevosTurnos = proximosTurnos.filter(turno => turno.id !== idEliminar);

        localStorage.setItem("turnos", JSON.stringify(nuevosTurnos));

        location.reload();
    })
})