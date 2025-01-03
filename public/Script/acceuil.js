document.querySelectorAll('.card').forEach(card => {
    const image = card.querySelector('.card-image');

    const zoomImage = (x, y) => {
        image.style.transformOrigin = `${x}px ${y}px`;
        image.style.transform = 'scale(2)';
    };

    const resetImage = () => {
        image.style.transform = 'scale(1) translate(0%, 0.5%)';
        image.style.transformOrigin = 'center center';
        setTimeout(() => {
            image.style.transition = '';
        }, 100);
    };

    const handleMouseEvent = (e) => {
        const cardRect = card.getBoundingClientRect();
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        zoomImage(x, y);
    };

    const handleTouchEvent = (e) => {
        const touch = e.touches[0];
        const cardRect = card.getBoundingClientRect();
        const x = touch.clientX - cardRect.left;
        const y = touch.clientY - cardRect.top;
        zoomImage(x, y);
    };

    card.addEventListener('mousemove', handleMouseEvent);
    card.addEventListener('mouseleave', resetImage);
    card.addEventListener('touchmove', handleTouchEvent);
    card.addEventListener('touchend', resetImage);
});

const matrixContainer = document.createElement('div');
matrixContainer.classList.add('matrix');
document.body.appendChild(matrixContainer);

const symbols = "⚚A☾✯<⌬O☽♅K♇♃G♁T♄#U☥⌖(☍S☿⛢☬✶⟁F⟠⍟J✙❖N⁜⁂{⧫P⚟✿C⟡⍰ʘX✣]☼⚞M✎I✆⎆⍜★DZ12✤3V45;6P789⎈R0!@#Y$%^F&E*)_♆+-W=[B}|:L',H.>/?";
const colors = ["green"];
const numColumns = Math.floor(window.innerWidth / 28); // Réduire le nombre de colonnes
const minSpacing = 3;

let positions = Array.from({ length: numColumns }, (_, i) => i);

const createColumn = () => {
    if (positions.length < 3) {
        positions = Array.from({ length: numColumns }, (_, i) => i);
    }

    let index = Math.floor(Math.random() * positions.length);
    let position = positions[index];
    positions = positions.filter(pos => Math.abs(pos - position) > minSpacing);

    const column = document.createElement('div');
    column.classList.add('column');
    column.style.left = `${position * 28}px`; // Ajuster la largeur des colonnes
    column.style.animationDuration = `${Math.random() * 5 + 5}s`;
    column.style.animationTimingFunction = 'linear'; // Assurez-vous que l'animation est linéaire pour qu'elle aille jusqu'en bas
    column.style.color = colors[Math.floor(Math.random() * colors.length)];
    return column;
};

const createSymbol = (opacity) => {
    const symbol = document.createElement('span');
    symbol.classList.add('symbol');
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.opacity = opacity;
    return symbol;
};

for (let i = 0; i < numColumns; i++) {
    const column = createColumn();
    for (let j = 0; j < 8; j++) { // Train de 8 caractères
        const symbol = createSymbol(j * 0.1); // Dégradé d'opacité croissante
        column.appendChild(symbol);
    }
    matrixContainer.appendChild(column);

    setInterval(() => {
        const symbols = column.querySelectorAll('.symbol');
        column.removeChild(symbols[symbols.length - 1]); // Supprime le dernier symbole

        // Met à jour les opacités des symboles restants
        symbols.forEach((symbol, index) => {
            symbol.style.opacity = (index * 0.1);
        });

        const firstOpacity = parseFloat(symbols[0].style.opacity);
        const newSymbol = createSymbol(firstOpacity + 0.1); // Nouveau symbole avec opacité croissante
        column.insertBefore(newSymbol, symbols[0]); // Ajoute le nouveau symbole au début
    }, Math.random() * 960 + 860); // Intervalle de temps aléatoire entre 1000ms et 2000ms
}

    const text = "Imaginez-vous que j'ai appris le développement en quelques mois ?";
    const wavyText = document.getElementById('wavyText');

    wavyText.innerHTML = "";

    // Ajouter des spans pour chaque lettre du texte
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i]; // Utiliser l'espace insécable pour les espaces
        span.classList.add('wave-animation');
        wavyText.appendChild(span);
    }

    // Appliquer l'animation à chaque lettre
    const spans = wavyText.querySelectorAll('.wave-animation');
    spans.forEach((span, index) => {
        const delay = index < text.length / 2 ? index * 0.1 : (text.length - index) * 0.1;
        span.style.animationDelay = `${delay}s`;
    });
