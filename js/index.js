let minSpan = document.getElementById("minutes"),
    secSpan = document.getElementById("seconds"),
    btnIniciar = document.getElementById("btn-iniciar"),
    btnPausar = document.getElementById("btn-pausar"),
    btnReiniciar = document.getElementById("btn-reiniciar"),
    btnPomodoro = document.getElementById("btn-pomodoro"),
    btnDescanso = document.getElementById("btn-descanso"),
    timer = document.getElementById("timer");

// Inicialización de variables
let start = false,
    pause = false,
    descanso = false,
    timerId,
    secondsRemaining,
    minutesRemaining;

let minutes = 24,
    seconds = 59;

// Función para iniciar el temporizador
function startTimer() {
    minutesRemaining = minutes; //Reinicia los valores
    secondsRemaining = seconds;
    minSpan.textContent = minutesRemaining;
    secSpan.textContent = secondsRemaining; // Actualiza el valor en los Span
    timerId = setTimeout(
        countdown,
        1000
    ); /* Empieza el temporizador pasado un segundo y ejecuta la función */
}

function stopTimer() {
    clearTimeout(timerId);
    btnIniciar.classList.remove("timer__button--active");
    btnPausar.classList.remove("timer__button--active");
}

// Función para contar hacia abajo el temporizador
function countdown() {
    // Mientras haya minutos y segundos se seguirá ejecutando la función
    secondsRemaining--; /* Resta un segundo */
    let minutesFormat = minutesRemaining.toString().padStart(2, "0"); //Da formato 00 a los minutos
    let secondsFormat = secondsRemaining.toString().padStart(2, "0"); // Da formato 00 a los segundos

    secSpan.textContent = secondsFormat; /* Actualiza el valor en el Span */
    if (secondsRemaining > 0) {
        timerId = setTimeout(
            countdown,
            1000
        ); /* Ejecuta la instrucción cada segundo (recursividad) */
    } else {
        // Si ya no hay segundos, comprueba que aún hayan minutos
        minutesRemaining--; //Resta un minuto
        secondsRemaining = 60; //Resetea los segundos

        minSpan.textContent = minutesFormat; // Actualiza el valor de los minutos en el Span

        timerId = setTimeout(countdown, 1000); //Ejecuta nuevamente la función
    }
}

// Evento de escucha para cuando inicien el temporizador
btnDescanso.addEventListener("click", function () {
    if (start) {
        start = false;
        stopTimer();
    }
    descanso = true;
    timer.classList.add("timer--descanso");
    btnDescanso.classList.add("timer__button--active");
    btnPomodoro.classList.remove("timer__button--active");
    minSpan.textContent = "05";
    minutes = 4;
});

btnPomodoro.addEventListener("click", function () {
    if (descanso) {
        minutes = 25;
        minSpan.textContent = "25";
        timer.classList.remove("timer--descanso");
        btnDescanso.classList.remove("timer__button--active");
        btnPomodoro.classList.add("timer__button--active");
    }
});

btnIniciar.addEventListener("click", function () {
    if (!start) {
        start = true; // Permanecerá en true hasta que el temporizador se detenga por completo
        btnReiniciar.classList.remove("timer__button--active");
        btnIniciar.classList.add("timer__button--active");
        setTimeout(startTimer(), 1000); // Comienza el temporizador
    } else if (pause) {
        timerId = setTimeout(countdown, 1000);
        pause = false; //Ya no está en pausa (reanudado)
        btnIniciar.classList.add("timer__button--active"); // Agrega el estado activo a reanudar
        btnPausar.classList.remove("timer__button--active"); // Elimina el estado activo a pausa
    }
});

btnPausar.addEventListener("click", function () {
    if (start) {
        pause = true;
        stopTimer();
        btnPausar.classList.add("timer__button--active");
        btnIniciar.classList.remove("timer__button--active");
        btnIniciar.innerHTML = "Reanudar";
    }
});

btnReiniciar.addEventListener("click", function () {
    if (start) {
        start = false;
        stopTimer();
        btnReiniciar.classList.add("timer__button--active");
        btnIniciar.innerHTML = "Iniciar";
        minSpan.textContent = 25;
        secSpan.textContent = "00";
    }
});