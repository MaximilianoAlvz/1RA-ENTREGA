const reservas = [];

const realizarReserva = () => {
        let nombre = prompt("Ingrese el nombre del cliente");
        let servicio = prompt("¿Que tipo de servicio sera? Corte/Barba/Color");
        let horario = prompt("¿A que hora sera?");

            reservas.push({nombre,servicio,horario});

                alert("Reserva realizada exitosamente")
}

const crearReserva = () =>{
    let nuevaReserva = prompt("¿Desea realizar una nueva reserva? si/no").toUpperCase();
        do {
            if (nuevaReserva == "SI"){

                realizarReserva();
                nuevaReserva = prompt("¿Desea realizar una nueva reserva? si/no").toUpperCase();

        }else {
            
            alert("Proceso finalizado");
            nuevaReserva = false;

    }}while(nuevaReserva);

    console.log(reservas);
}

crearReserva();
