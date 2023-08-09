// Variables del DOM
let showMinutes = document.getElementById("showMinutes"),
    showSeconds = document.getElementById("showSeconds"),
    btnStart = document.getElementById("btn-start"),
    btnPause = document.getElementById("btn-pause"),
    btnRestart = document.getElementById("btn-restart"),
    btnPomodoro = document.getElementById("btn-pomodoro"),
    btnRelax = document.getElementById("btn-relax"),
    timerContainer = document.getElementById("timerContainer");

// Inicialización de variables
let timerStarted = false, // Variable para saber si el temporizador está iniciado
    timerPaused = false, // Variable para saber si el temporizador está en pausa
    relaxTime = false, // Variable para saber si el temporizador está en modo de descanso
    timerInterval, // Variable para el intervalo del temporizador
    initialMinutes = 25, // Minutos iniciales
    initialSeconds = 0, // Segundos iniciales
    minutesRemaining = 0, // Minutos restantes
    secondsRemaining = 0; // Segundos restantes

// Función para el temporizador
const countdown = () => {
    // Si quedan minutos o segundos
    if (minutesRemaining > 0 || secondsRemaining > 0) {
        if (secondsRemaining > 0) {
            // Si quedan segundos, restar 1
            secondsRemaining--;
        } else {
            // Si no quedan segundos, restar un minuto y poner los segundos a 59
            secondsRemaining = 59;
            minutesRemaining--;
        }

        // Actualizar el temporizador en el DOM
        showMinutes.textContent = minutesRemaining.toString().padStart(2, "0");
        showSeconds.textContent = secondsRemaining.toString().padStart(2, "0");
    } else {
        clearInterval(timerInterval); // Detener el intervalo cuando el temporizador llega a 0
    }
};

// Función para reiniciar el temporizador
const reset = (firstButton, secondButton, min, sec) => {
    // Elimina el estado activo de los botones
    timerPaused
        ? btnPause.classList.remove("timer__button--active")
        : timerStarted
        ? btnStart.classList.remove("timer__button--active")
        : btnRestart.classList.remove("timer__button--active");

    if (timerStarted) {
        // Si el temporizador ya está iniciado, detenerlo
        timerStarted = false;
        clearInterval(timerInterval);
    }

    // Actualizar los botones
    updateButtons(firstButton, secondButton);
    // Actualizar el temporizador en el DOM
    showMinutes.textContent = min.toString().padStart(2, "0");
    showSeconds.textContent = sec.toString().padStart(2, "0");
};

// Función para actualizar los botones
const updateButtons = (activeButton, inactiveButton) => {
    // Agrega el estado activo al botón activo y elimina el estado activo del botón inactivo
    activeButton.classList.add("timer__button--active");
    inactiveButton.classList.remove("timer__button--active");
};

// Evento para el modo pomodoro
btnPomodoro.addEventListener("click", () => {
    if (relaxTime) {
        // Reiniciará el temporizador si está en modo de descanso
        relaxTime = false;
        reset(btnPomodoro, btnRelax, initialMinutes, initialSeconds);
    }
});

// Variables para el modo de descanso
let minutesRelax = 5, secondsRelax = 0;

// Evento para el modo de descanso
btnRelax.addEventListener("click", () => {
    if (!relaxTime) {
        // Reiniciará el temporizador si está en modo pomodoro
        relaxTime = true;
        reset(btnRelax, btnPomodoro, minutesRelax, secondsRelax);
    }
});

// Evento para el botón de inicio
btnStart.addEventListener("click", () => {
    if (!timerStarted) {
        // Si el temporizador no está iniciado, iniciarlo
        timerPaused = false; // El temporizador no está en pausa
        timerStarted = true; // El temporizador está iniciado
        updateButtons(btnStart, btnRestart); // Actualizar los botones
        // Inicializar los minutos y segundos restantes dependiendo del modo
        minutesRemaining = relaxTime ? minutesRelax : initialMinutes;
        secondsRemaining = relaxTime ? secondsRelax : initialSeconds;
        timerInterval = setInterval(countdown, 1000); // Iniciar el intervalo
    } else if (timerPaused) {
        // Si el temporizador está en pausa, reanudarlo
        timerInterval = setInterval(countdown, 1000); // Reanudar el intervalo
        timerPaused = false; //Ya no está en pausa (reanudado)
        updateButtons(btnStart, btnPause); // Actualizar los botones
    }
});

// Evento para el botón de pausa
btnPause.addEventListener("click", () => {
    if (timerStarted) {
        // Si el temporizador está iniciado, pausarlo
        timerPaused = true; // El temporizador está en pausa
        clearInterval(timerInterval); // Detener el intervalo
        updateButtons(btnPause, btnStart); // Actualizar los botones
        btnStart.textContent = "Reanudar"; // Actualizar el texto del botón de inicio
    }
});

// Evento para el botón de reinicio
btnRestart.addEventListener("click", () => {
    if (timerStarted) {
        // Si el temporizador está iniciado, reiniciarlo
        timerStarted = false; // El temporizador no está iniciado
        clearInterval(timerInterval); // Detener el intervalo
        // Actualizar los botones dependiendo del estado del temporizador
        timerPaused
            ? updateButtons(btnRestart, btnPause)
            : updateButtons(btnRestart, btnStart);
        btnStart.textContent = "Iniciar"; // Actualizar el texto del botón de inicio
        // Actualizar los minutos y segundos restantes dependiendo del modo
        showMinutes.textContent = relaxTime
            ? minutesRelax.toString().padStart(2, "0")
            : initialMinutes.toString().padStart(2, "0");
        showSeconds.textContent = relaxTime
            ? secondsRelax.toString().padStart(2, "0")
            : initialSeconds.toString().padStart(2, "0");
    }
});