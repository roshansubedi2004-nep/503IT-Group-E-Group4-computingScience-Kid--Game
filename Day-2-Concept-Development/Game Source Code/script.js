document.addEventListener('DOMContentLoaded', () => {
    const screens = Array.from(document.querySelectorAll('.screen'));
    const showScreen = (id) => {
        screens.forEach(s => s.classList.toggle('active', s.id === id));
    };

    const startBtn = document.getElementById('start-btn');
    const beginBtn = document.getElementById('begin-mission-btn');

    if (startBtn) startBtn.addEventListener('click', () => showScreen('screen-rules'));
    if (beginBtn) beginBtn.addEventListener('click', () => showScreen('screen-start'));
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') showScreen('screen-start');
    });
});
