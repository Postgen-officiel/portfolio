// Fonction pour recharger la page 
function reloadPage() { 
    location.reload(); 
} // Événement pour détecter la rotation de l'écran 
window.addEventListener('orientationchange', reloadPage);
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
        e.preventDefault();
        e.stopPropagation();
        const touch = e.touches[0];
        const cardRect = card.getBoundingClientRect();
        const x = touch.clientX - cardRect.left;
        const y = touch.clientY - cardRect.top;
        zoomImage(x, y);
    };

    const allowScrolling = () => {
        document.body.style.overflow = 'auto';
    };

    // Ajouter les événements pour la souris
    card.addEventListener('mousemove', handleMouseEvent);
    card.addEventListener('mouseleave', resetImage);

    // Ajouter les événements pour le toucher
    card.addEventListener('touchmove', handleTouchEvent);
    card.addEventListener('touchend', () => {
        resetImage();
        allowScrolling();
    });
    card.addEventListener('touchstart', () => {
        document.body.style.overflow = 'hidden';
    });
});


const matrixContainer = document.createElement('div');
matrixContainer.classList.add('matrix');
document.body.appendChild(matrixContainer);

const symbols = "⚚A☾✯<⌬O☽♅K♇♃G♁T♄#U☥⌖(☍S☿⛢☬✶⟁F⟠⍟J✙❖N⁜⁂{⧫P⚟✿C⟡⍰ʘX✣]☼⚞M✎I✆⎆⍜★DZ12✤3V45;6P789⎈R0!@#Y$%^F&E*)_♆+-W=[B}|:L',H.>/?";
const colors = ["rgb(0, 161, 0)"];
const minSpacing = 3;

let numColumns = Math.floor(window.innerWidth / 28); // Initial calculation of columns
let columns = [];

const updateColumns = () => {
    const newNumColumns = Math.floor(window.innerWidth / 28);
    if (newNumColumns > numColumns) {
        for (let i = numColumns; i < newNumColumns; i++) {
            const column = createColumn(i);
            for (let j = 0; j < 8; j++) {
                const symbol = createSymbol(j * 0.1);
                column.appendChild(symbol);
            }
            matrixContainer.appendChild(column);
            columns.push(column);
        }
    } else if (newNumColumns < numColumns) {
        for (let i = numColumns - 1; i >= newNumColumns; i--) {
            matrixContainer.removeChild(columns[i]);
            columns.pop();
        }
    }
    numColumns = newNumColumns;
};

const createColumn = (position) => {
    const column = document.createElement('div');
    column.classList.add('column');
    column.style.left = `${position * 28}px`;
    column.style.animationDuration = `${Math.random() * 5 + 5}s`;
    column.style.animationTimingFunction = 'linear';
    column.style.color = colors[Math.floor(Math.random() * colors.length)];

    setInterval(() => {
        const symbols = column.querySelectorAll('.symbol');
        column.removeChild(symbols[symbols.length - 1]);

        symbols.forEach((symbol, index) => {
            symbol.style.opacity = (index * 0.1);
        });

        const firstOpacity = parseFloat(symbols[0].style.opacity);
        const newSymbol = createSymbol(firstOpacity + 0.1);
        column.insertBefore(newSymbol, symbols[0]);
    }, Math.random() * 630 + 330);

    return column;
};

const createSymbol = (opacity) => {
    const symbol = document.createElement('span');
    symbol.classList.add('symbol');
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.opacity = opacity;
    return symbol;
};

// Initial call to set up columns
for (let i = 0; i < numColumns; i++) {
    const column = createColumn(i);
    for (let j = 0; j < 8; j++) {
        const symbol = createSymbol(j * 0.1);
        column.appendChild(symbol);
    }
    matrixContainer.appendChild(column);
    columns.push(column);
}

// Update columns on window resize
window.addEventListener('resize', updateColumns);


const text = "Imaginez-vous que j'ai appris le développement en quelques mois ?";
const wavyText = document.getElementById('wavyText');

wavyText.innerHTML = "";

// Ajouter des spans pour chaque mot du texte
const words = text.split(' ');
words.forEach(word => {
    const wordSpan = document.createElement('span');
    wordSpan.style.display = 'inline-block';
    wordSpan.style.whiteSpace = 'nowrap'; // Empêche la coupure du mot

    // Ajouter des spans pour chaque lettre du mot
    for (let i = 0; i < word.length; i++) {
        const span = document.createElement('span');
        span.textContent = word[i];
        span.classList.add('wave-animation');
        wordSpan.appendChild(span);
    }

    // Ajouter un espace insécable après chaque mot
    const spaceSpan = document.createElement('span');
    spaceSpan.textContent = '\u00A0';
    wordSpan.appendChild(spaceSpan);

    wavyText.appendChild(wordSpan);
});

// Appliquer l'animation à chaque lettre
const spans = wavyText.querySelectorAll('.wave-animation');
const centerIndex = Math.floor(spans.length / 2);

spans.forEach((span, index) => {
    const delay = index <= centerIndex ? index * 0.1 : (spans.length - index) * 0.1;
    span.style.animationDelay = `${delay}s`;
     // Ajuster cette valeur selon tes besoins
});

