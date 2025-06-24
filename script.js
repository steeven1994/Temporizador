document.addEventListener('DOMContentLoaded', () => {

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const messageElement = document.getElementById('message');
    const targetDateTimeInput = document.getElementById('targetDateTime');
    const startTimerBtn = document.getElementById('startTimerBtn');

    let countdownInterval; 
    let targetDate; 

    const now = new Date();
    now.setHours(now.getHours() + 24); 
    const defaultDateTime = now.toISOString().slice(0, 16); 
    targetDateTimeInput.value = defaultDateTime;

    function updateCountdown() {
        const now = new Date().getTime(); 
        const distance = targetDate - now; 

        
        if (distance < 0) {
            clearInterval(countdownInterval); 
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            messageElement.textContent = '¡La cuenta regresiva ha terminado!';
            return; 
        }

        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        
        daysElement.textContent = String(days).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
        messageElement.textContent = ''; 
    }

    function startCountdown() {
        
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        const selectedDateTime = targetDateTimeInput.value;
        if (!selectedDateTime) {
            alert('Por favor, selecciona una fecha y hora para la cuenta regresiva.');
            return;
        }

        targetDate = new Date(selectedDateTime).getTime();

        if (targetDate < new Date().getTime()) {
            alert('Por favor, selecciona una fecha y hora futura.');
            return;
        }

        updateCountdown();

        
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    
    startTimerBtn.addEventListener('click', startCountdown);

   
});