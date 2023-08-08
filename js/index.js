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
let timerStarted = false,
    timerPaused = false,
    relaxTime = false,
    timerId,
    initialMinutes = 25,
    initialSeconds = 0,
    minutesRemaining = 0,
    secondsRemaining = 0;

// Función para contar hacia abajo el temporizador
const countdown = () => {
    if (minutesRemaining > 0 || secondsRemaining > 0) {
        if (secondsRemaining > 0) {
            secondsRemaining--;
        } else {
            secondsRemaining = 59;
            minutesRemaining--;
        }

        showMinutes.textContent = minutesRemaining.toString().padStart(2, "0");
        showSeconds.textContent = secondsRemaining.toString().padStart(2, "0");

        timerId = setTimeout(countdown, 1000);
    }
};

const updateButtons = (activeButton, inactiveButton) => {
    activeButton.classList.add("timer__button--active");
    inactiveButton.classList.remove("timer__button--active");
};

const reset = (firstButton, secondButton, min, sec) => {
    timerPaused
        ? btnPause.classList.remove("timer__button--active")
        : timerStarted
        ? btnStart.classList.remove("timer__button--active")
        : btnRestart.classList.remove("timer__button--active");

    if (timerStarted) {
        timerStarted = false;
        clearTimeout(timerId);
    }

    updateButtons(firstButton, secondButton);
    showMinutes.textContent = min.toString().padStart(2, "0");
    showSeconds.textContent = sec.toString().padStart(2, "0");
};

btnPomodoro.addEventListener("click", () => {
    if (relaxTime) {
        relaxTime = false;
        reset(btnPomodoro, btnRelax, initialMinutes, initialSeconds);
    }
});

let minutesRelax = 5,
    secondsRelax = 0;

btnRelax.addEventListener("click", () => {
    if (!relaxTime) {
        relaxTime = true;
        reset(btnRelax, btnPomodoro, minutesRelax, secondsRelax);
    }
});

btnStart.addEventListener("click", () => {
    if (!timerStarted) {
        timerPaused = false;
        timerStarted = true; // El temporizador ya está iniciado
        updateButtons(btnStart, btnRestart);
        minutesRemaining = relaxTime ? minutesRelax : initialMinutes;
        secondsRemaining = relaxTime ? secondsRelax : initialSeconds;
        timerId = setTimeout(countdown, 1000);
    } else if (timerPaused) {
        timerId = setTimeout(countdown, 1000);
        pause = false; //Ya no está en pausa (reanudado)
        updateButtons(btnStart, btnPause);
    }
});

btnPause.addEventListener("click", () => {
    if (timerStarted) {
        timerPaused = true;
        clearTimeout(timerId);
        updateButtons(btnPause, btnStart);
        btnStart.textContent = "Reanudar";
    }
});

btnRestart.addEventListener("click", () => {
    if (timerStarted) {
        timerStarted = false;
        clearTimeout(timerId);
        timerPaused
            ? updateButtons(btnRestart, btnPause)
            : updateButtons(btnRestart, btnStart);
        btnStart.textContent = "Iniciar";
        showMinutes.textContent = relaxTime
            ? minutesRelax.toString().padStart(2, "0")
            : initialMinutes.toString().padStart(2, "0");
        showSeconds.textContent = relaxTime
            ? secondsRelax.toString().padStart(2, "0")
            : initialSeconds.toString().padStart(2, "0");
    }
});
