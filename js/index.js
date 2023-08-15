// Variables del DOM
const showMinutes = document.getElementById("showMinutes"), // Minutos en el DOM
  showSeconds = document.getElementById("showSeconds"), // Segundos en el DOM
  btnStart = document.getElementById("btn-start"), // Botón de inicio
  btnPause = document.getElementById("btn-pause"), // Botón de pausa
  btnRestart = document.getElementById("btn-restart"), // Botón de reinicio
  btnPomodoro = document.getElementById("btn-pomodoro"), // Botón de modo pomodoro
  btnRelax = document.getElementById("btn-relax"); // Botón de modo de descanso

// Inicialización de variables
let timerStarted = false, // Variable para saber si el temporizador está iniciado
  timerPaused = false, // Variable para saber si el temporizador está en pausa
  relaxTime = false, // Variable para saber si el temporizador está en modo de descanso
  timerInterval, // Variable para el intervalo del temporizador
  minutesPomodoro = 25, // Minutos de trabajo
  secondsPomodoro = 0, // Segundos de trabajo
  minutesRelax = 5, // Minutos de descanso
  secondsRelax = 0, // Segundos de descanso
  minutesRemaining = 0, // Minutos restantes
  secondsRemaining = 0; // Segundos restantes

// Variables del DOM para cambiar la paleta de colores
const headerContainer = document.getElementById("headerContainer"), // Contenedor del encabezado
  mainContainer = document.getElementById("mainContainer"), // Contenedor principal
  timerContainer = document.getElementById("timerContainer"), // Contenedor del temporizador
  footerContainer = document.getElementById("footerContainer"); // Contenedor del pie de página

// FUNCIONES

// Función para cambiar el modo del temporizador
const changeMode = (firstButton, secondButton, min, sec) => {
  // Elimina el estado activo de los botones
  timerPaused
    ? btnPause.classList.remove("timer__button--active")
    : timerStarted
    ? btnStart.classList.remove("timer__button--active")
    : btnRestart.classList.remove("timer__button--active");

  if (timerStarted) {
    // Detener el temporizador si está activo
    timerStarted = false;
    clearInterval(timerInterval);
  }

  if (timerPaused) {
    btnStart.textContent = "Iniciar"; // Actualizar el texto del botón de inicio
  }

  // Actualizar los botones
  updateButtons(firstButton, secondButton);
  // Actualizar el temporizador en el DOM
  showMinutes.textContent = min.toString().padStart(2, "0");
  showSeconds.textContent = sec.toString().padStart(2, "0");
};

// Función para actualizar el estado de los botones
const updateButtons = (activeButton, inactiveButton) => {
  // Agrega el estado activo al botón activo y elimina el estado activo del botón inactivo
  activeButton.classList.add("timer__button--active");
  inactiveButton.classList.remove("timer__button--active");
};

// Función para la alerta del temporizador
const timerAlert = () => {
  const alertSound = document.getElementById("alertSound");
  alertSound.play(); // Reproducir el sonido de la alerta
  relaxTime ? modePomodoro() : modeRelax(); // Cambiar al modo correspondiente
};

// Función para el temporizador
const countdown = () => {
  // Si quedan minutos o segundos
  if (minutesRemaining > 0 || secondsRemaining > 0) {
    if (secondsRemaining > 0) {
      secondsRemaining--;
    } else {
      secondsRemaining = 59;
      minutesRemaining--;
    }

    // Formatear los minutos y segundos (00:00)
    let minutesFormatted = minutesRemaining.toString().padStart(2, "0"),
      secondsFormatted = secondsRemaining.toString().padStart(2, "0");

    // Actualizar el tiempo en el DOM
    showMinutes.textContent = minutesFormatted;
    showSeconds.textContent = secondsFormatted;
    // Mostrar el temporizador en el título de la ventana
    document.title = `${minutesFormatted}:${secondsFormatted}`;
  } else if (timerStarted) {
    clearInterval(timerInterval); // Detener el intervalo cuando el temporizador llega a 0
    document.title = "Pomodoro Timer";
    timerAlert(); // Llamar a la alerta del temporizador
  }
};

// Función para iniciar el temporizador
const startTimer = () => {
  if (!timerStarted) {
    // Si el temporizador no está iniciado, iniciarlo
    timerStarted = true;
    timerPaused = false;
    updateButtons(btnStart, btnRestart); // Actualizar los botones
    // Inicializar los minutos y segundos dependiendo del modo
    minutesRemaining = relaxTime ? minutesRelax : minutesPomodoro;
    secondsRemaining = relaxTime ? secondsRelax : secondsPomodoro;
    timerInterval = setInterval(countdown, 1000); // Iniciar el intervalo
  } else if (timerPaused) {
    // Si el temporizador está en pausa, reanudarlo
    timerInterval = setInterval(countdown, 1000); // Reanudar el intervalo
    timerPaused = false; //Ya no está en pausa (reanudado)
    updateButtons(btnStart, btnPause); // Actualizar los botones
  }
};

// Función para pausar el temporizador
const pauseTimer = () => {
  if (timerStarted && !timerPaused) {
    // Si el temporizador está iniciado, pausarlo
    timerPaused = true; // El temporizador está en pausa
    clearInterval(timerInterval); // Detener el intervalo
    updateButtons(btnPause, btnStart); // Actualizar los botones
    btnStart.textContent = "Reanudar"; // Actualizar el texto del botón de inicio
  }
};

// Función para reiniciar el temporizador
const resetTimer = () => {
  if (timerStarted) {
    timerStarted = false; // El temporizador se detuvo
    clearInterval(timerInterval); // Detener el intervalo
    btnStart.textContent = "Iniciar"; // Actualizar el texto del botón de inicio
    // Actualizar los botones dependiendo del estado del temporizador
    timerPaused
      ? updateButtons(btnRestart, btnPause)
      : updateButtons(btnRestart, btnStart);
    // Actualizar los minutos dependiendo del modo
    showMinutes.textContent = relaxTime
      ? minutesRelax.toString().padStart(2, "0")
      : minutesPomodoro.toString().padStart(2, "0");
    // Actualizar los segundos dependiendo del modo
    showSeconds.textContent = relaxTime
      ? secondsRelax.toString().padStart(2, "0")
      : secondsPomodoro.toString().padStart(2, "0");
  }
};

// Función para cambiar al modo relax
const modeRelax = () => {
  if (!relaxTime) {
    relaxTime = true; // El temporizador pasa a modo descanso
    // Cambiar el modo del temporizador y actualiza los minutos y segundos
    changeMode(btnRelax, btnPomodoro, minutesRelax, secondsRelax);

    // Agregar clases para el modo de descanso
    headerContainer.classList.add("header--relax");
    mainContainer.classList.add("main--relax");
    timerContainer.classList.add("timer--relax");
    footerContainer.classList.add("footer--relax");
  }
};

// Función para cambiar al modo pomodoro
const modePomodoro = () => {
  if (relaxTime) {
    relaxTime = false; // El temporizador pasa a modo pomodoro
    // Cambiar el modo del temporizador y actualiza los minutos y segundos
    changeMode(btnPomodoro, btnRelax, minutesPomodoro, secondsPomodoro);

    // Eliminar las clases del modo descanso
    headerContainer.classList.remove("header--relax");
    mainContainer.classList.remove("main--relax");
    timerContainer.classList.remove("timer--relax");
    footerContainer.classList.remove("footer--relax");
  }
};

// Evento para el modo pomodoro
btnPomodoro.addEventListener("click", modePomodoro);

// Evento para el modo de descanso
btnRelax.addEventListener("click", modeRelax);

// Evento para el botón de inicio
btnStart.addEventListener("click", startTimer);

// Evento para el botón de pausa
btnPause.addEventListener("click", pauseTimer);

// Evento para el botón de reinicio
btnRestart.addEventListener("click", resetTimer);