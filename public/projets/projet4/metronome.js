let metronomeInterval;
let polyrhythmInterval;

function updateBpmValue(value) {
    const bpmDisplay = document.getElementById('bpm-display');
    const slider = document.getElementById('bpm');
    bpmDisplay.textContent = value;
    const valueAsPercentage = (value - slider.min) / (slider.max - slider.min) * 100;
    const sliderWidth = slider.offsetWidth * 0.03;
    bpmDisplay.style.left = `calc(${valueAsPercentage}% + (${sliderWidth}px))`;
    bpmDisplay.style.top = '7px';
}

function startMetronome() {
    const bpm = parseInt(document.getElementById('bpm').value);
    const subdivision = document.getElementById('subdivision').value.split('/');
    const tickSoundSub = document.getElementById('tick-sound-sub');
    const polyrhythm = document.getElementById('polyrhythm').value.split('/');
    const tickSoundPoly = document.getElementById('tick-sound-poly');

    if (bpm && subdivision[0] && subdivision[1] && bpm >= 20 && bpm <= 240) {
        const subdivisionValue = parseInt(subdivision[0]) / parseInt(subdivision[1]);
        const beatInterval = 60000 / bpm;
        const subInterval = beatInterval / subdivisionValue;

        clearInterval(metronomeInterval);
        clearInterval(polyrhythmInterval);

        function playSub() {
            tickSoundSub.currentTime = 0;
            tickSoundSub.play();
        }

        function playPoly() {
            if (polyrhythm.length === 2) {
                const polyrhythmValue = parseInt(polyrhythm[0]) / parseInt(polyrhythm[1]);
                const polyInterval = 60000 / (bpm * polyrhythmValue);
                tickSoundPoly.currentTime = 0;
                tickSoundPoly.play();
            }
        }

        metronomeInterval = setInterval(playSub, subInterval);
        if (polyrhythm.length === 2) {
            const polyrhythmValue = parseInt(polyrhythm[0]) / parseInt(polyrhythm[1]);
            const polyInterval = 60000 / (bpm * polyrhythmValue);
            polyrhythmInterval = setInterval(playPoly, polyInterval);
        }
        playSub();
        if (polyrhythm.length === 2) {
            playPoly();
        }
    }
}

function stopMetronome() {
    clearInterval(metronomeInterval);
    clearInterval(polyrhythmInterval);
}

document.getElementById('play-button').addEventListener('click', startMetronome);
document.getElementById('stop-button').addEventListener('click', stopMetronome);
document.getElementById('bpm').addEventListener('input', (event) => {
    updateBpmValue(event.target.value);
    if (metronomeInterval) {
        startMetronome();
    }
});
document.getElementById('subdivision').addEventListener('change', () => {
    if (metronomeInterval) {
        startMetronome();
    }
});
document.getElementById('polyrhythm').addEventListener('change', () => {
    if (metronomeInterval) {
        startMetronome();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    updateBpmValue(document.getElementById('bpm').value);
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.container').forEach(particle => {
        let directionX = Math.random() < 0.5 ? 1 : -1;
        let directionY = Math.random() < 0.5 ? 1 : -1;
        let initialSpeedX = (Math.random() * 2) + 1;
        let initialSpeedY = (Math.random() * 2) + 1;
        let speedX = initialSpeedX;
        let speedY = initialSpeedY;
        let x = Math.random() * (window.innerWidth - 60);
        let y = Math.random() * (window.innerHeight - 60);
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        let isDragging = false;
        let offsetX, offsetY;
        let initialX, initialY, finalX, finalY;

        const handleStart = (e) => {
            isDragging = true;
            let touch = e.touches ? e.touches[0] : e;
            offsetX = touch.clientX - particle.getBoundingClientRect().left;
            offsetY = touch.clientY - particle.getBoundingClientRect().top;
            initialX = touch.clientX;
            initialY = touch.clientY;
            particle.style.cursor = 'grabbing';

            // Prevent scrolling on touch start
            e.preventDefault();
        };

        const handleMove = (e) => {
            if (isDragging) {
                let touch = e.touches ? e.touches[0] : e;
                x = touch.clientX - offsetX;
                y = touch.clientY - offsetY;
                x = Math.max(0, Math.min(window.innerWidth - 60, x));
                y = Math.max(0, Math.min(window.innerHeight - 60, y));
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;

                // Prevent scrolling on touch move
                e.preventDefault();
            }
        };

        const handleEnd = (e) => {
            if (isDragging) {
                isDragging = false;
                let touch = e.changedTouches ? e.changedTouches[0] : e;
                finalX = touch.clientX;
                finalY = touch.clientY;
                directionX = finalX - initialX > 0 ? 1 : -1;
                directionY = finalY - initialY > 0 ? 1 : -1;
                speedX = Math.abs(finalX - initialX) / 10;
                speedY = Math.abs(finalY - initialY) / 10;
                particle.style.cursor = 'grab';

                // Reset x and y to their initial values
                x = initialX;
                y = initialY;
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;

                setTimeout(() => {
                    let intervalId = setInterval(() => {
                        if (speedX > initialSpeedX) {
                            speedX -= 0.05;
                        } else {
                            speedX = initialSpeedX;
                        }

                        if (speedY > initialSpeedY) {
                            speedY -= 0.05;
                        } else {
                            speedY = initialSpeedY;
                        }

                        if (speedX === initialSpeedX && speedY === initialSpeedY) {
                            clearInterval(intervalId);
                        }
                    }, 50);
                }, 1453); 
            }
        };

        particle.addEventListener('mousedown', handleStart);
        particle.addEventListener('touchstart', handleStart);

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('touchmove', handleMove);

        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchend', handleEnd);

        function moveParticle() {
            if (!isDragging) {
                if (x + 60 > window.innerWidth) {
                    directionX *= -1;
                    x = window.innerWidth - 60;
                } else if (x < 0) {
                    directionX *= -1;
                    x = 0;
                }
                if (y + 60 > window.innerHeight) {
                    directionY *= -1;
                    y = window.innerHeight - 60;
                } else if (y < 0) {
                    directionY *= -1;
                    y = 0;
                }
                x += directionX * speedX;
                y += directionY * speedY;
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
            }
            requestAnimationFrame(moveParticle);
        }

        moveParticle();
    }); 
});
