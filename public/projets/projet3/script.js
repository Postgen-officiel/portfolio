document.addEventListener('DOMContentLoaded', () => { 
    function createRocket(direction) { 
        const rocket = document.createElement('div'); 
        rocket.classList.add('rocket', direction); 
        const stripes = document.createElement('div'); 
        stripes.classList.add('stripes'); 
        rocket.appendChild(stripes); 
        const leftWing = document.createElement('div'); 
        leftWing.classList.add('wing', 'left'); 
        const rightWing = document.createElement('div'); 
        rightWing.classList.add('wing', 'right'); 
        rocket.appendChild(leftWing); 
        rocket.appendChild(rightWing); 
        document.body.appendChild(rocket); 
        return rocket; 
    } 
    
    function startAnimation() { 
        // Supprime seulement les fusées sans bandes
        document.querySelectorAll('.rocket').forEach(rocket => rocket.remove());
        const rocketLeft = createRocket('left'); 
        const rocketRight = createRocket('right'); 
        const rocketCenter = createRocket('center'); 
        
        setTimeout(() => { 
            rocketLeft.style.transition = 'transform 4s linear'; 
            rocketLeft.style.transform = 'translate(80vw, -80vh) rotate(71deg)'; 
            rocketRight.style.transition = 'transform 4s linear'; 
            rocketRight.style.transform = 'translate(-80vw, -80vh) rotate(-71deg)'; 
            rocketCenter.style.transition = 'transform 4s linear'; 
            rocketCenter.style.transform = 'translate(0, -85vh)'; 
        }, 100); 
        
        rocketLeft.addEventListener('transitionend', () => { 
            handleTransitionEnd(rocketLeft); 
        }, { once: true }); 
        rocketRight.addEventListener('transitionend', () => { 
            handleTransitionEnd(rocketRight); 
        }, { once: true }); 
        rocketCenter.addEventListener('transitionend', () => { 
            handleTransitionEnd(rocketCenter); 
        }, { once: true }); 
    } 
    
    function handleTransitionEnd(rocket) { 
        explode(rocket.getBoundingClientRect().left, rocket.getBoundingClientRect().top); 
        rocket.remove(); 
        setTimeout(startAnimation, 300); // Redémarre l'animation après 0,3 seconde 
    } 
    
    function explode(x, y) { 
        for (let i = 0; i < 119; i++) { 
            const particle = document.createElement('div'); 
            particle.style.position = 'absolute'; 
            particle.style.width = '4px'; 
            particle.style.height = '4px'; 
            particle.style.background = ['yellow', 'pink', 'red', 'chartreuse', 'blue', 'purple', 'orange', 'aqua', 'white', 'green'] [Math.floor(Math.random() * 9)];
            particle.style.boxShadow = '0 0 10px ${particle.style.background}';
            particle.style.borderRadius = '50%';  
            particle.style.left = `${x}px`; 
            particle.style.top = `${y}px`; 
            document.body.appendChild(particle); 
            animateParticle(particle);
        }
        
        setTimeout(() => {
            document.querySelectorAll('.particle').forEach(particle => {
                if (particle.classList.contains('rocket') &&
                    particle.classList.contains('wing') &&
                    particle.classList.contains('stripes') &&
                    particle.classList.contains('particle')) {
                    particle.remove();
                }
            });
        }, 1500);        
    } 
    
    function animateParticle(particle) { 
        particle.classList.add('particle'); 
        const angle = Math.random() * 2 * Math.PI; 
        const velocity = Math.random() * 275 + 50; 
        const duration = Math.random() * 1 + 1; 
        particle.animate([ 
            { transform: `translate(0, 0)`, opacity: 1 }, 
            { transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px)`, opacity: 0 } 
        ], { 
            duration: duration * 1000, 
            easing: 'ease-out', 
            fill: 'forwards' 
        }); 
        
        setTimeout(() => { 
            particle.remove(); 
        }, duration * 1000); 
    } 
    
    startAnimation(); 
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

        particle.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - particle.getBoundingClientRect().left;
            offsetY = e.clientY - particle.getBoundingClientRect().top;
            initialX = e.clientX;
            initialY = e.clientY;
            particle.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                x = e.clientX - offsetX;
                y = e.clientY - offsetY;
                x = Math.max(0, Math.min(window.innerWidth - 60, x));
                y = Math.max(0, Math.min(window.innerHeight - 60, y));
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
            }
        });

        document.addEventListener('mouseup', (e) => {
            if (isDragging) {
                isDragging = false;
                finalX = e.clientX;
                finalY = e.clientY;
                directionX = finalX - initialX > 0 ? 1 : -1;
                directionY = finalY - initialY > 0 ? 1 : -1;
                speedX = Math.abs(finalX - initialX) / 10;
                speedY = Math.abs(finalY - initialY) / 10;
                particle.style.cursor = 'grab';

                // Ajoutez une temporisation avant de reprendre la vitesse initiale
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
                }, 1327); // Temporisation de 1,45 secondes
            }
        });

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
