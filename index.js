
// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getFirestore, query, collection, doc, getDocs, orderBy, addDoc, Timestamp, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7Laqsy1Z3wwenTHniQz6_nRWAw7ruDxY",
  authDomain: "coder-33.firebaseapp.com",
  projectId: "coder-33",
  storageBucket: "coder-33.firebasestorage.app",
  messagingSenderId: "1002395629822",
  appId: "1:1002395629822:web:22db202e9274c1e79acdaf",
  measurementId: "G-ELJZ37S24S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const obtenerTurnos = async () => {

        const q = query(
            collection(db, "Turnos"),
            orderBy("Dia", "asc"),
        )

        const querySnapshot = await getDocs(q);
        
        const turnosArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        return turnosArray;
    }

//Obtenemos el boton de turnos y el contenedor main
let botonNuevoTurno = document.getElementById("nuevoTurno");
let mainContainer = document.getElementById("main");

//OBTENEMOS EL ARRAY DE TURNOS
const proximosTurnos = await obtenerTurnos() || [];

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
            <input type="datetime-local" name="dia" id="diaTurno">
            <input type="button" value="REGISTRAR TURNO" id="botonRegistrarTurno">
        </form>
        <button class="cerrarTurnoBoton" id="vueltaInicio">VOLVER A INICIO</button>
    </article>`;

//Obtenemos todos los inputs para procesar el turno
let inputNombre = document.getElementById("nombreInput");
let inputServicio = document.getElementById("inputServicio");
let inputDia = document.getElementById("diaTurno");
let botonRegistrarTurno = document.getElementById("botonRegistrarTurno");


//REALIZAMOS LA LOGICA PARA AGENDAR TURNOS

const handleReserva = async (e) => {
    e.preventDefault();

    try{    
      await addDoc(collection(db, "Turnos" ), {
      Nombre: inputNombre.value,
      Servicio: inputServicio.value,
      Dia: Timestamp.fromDate(new Date (inputDia.value))
    });
    alert("turno agendado con exito");
    location.reload();
  }catch (error) {
    console.error(error.message);
  }


  };

botonRegistrarTurno.addEventListener("click", async (e)=>{

    await handleReserva(e);
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
                <p>${turno.Nombre}</p>
                <p>${turno.Servicio}</p>
                <p>${turno.Dia.toDate().toLocaleString()}</p>
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
    boton.addEventListener("click", async (e) => {
        const idEliminar = e.target.getAttribute("data-id");

        await deleteDoc(doc(db, "Turnos", idEliminar));
        alert("turno eliminado")
        location.reload();
    })
})