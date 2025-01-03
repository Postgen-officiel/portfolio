

document.addEventListener("DOMContentLoaded", () => {
    const matrixContainer = document.createElement('div');
    matrixContainer.classList.add('matrix');
    document.body.appendChild(matrixContainer);

    const symbols = "⚚A☾✯<⌬O☽♅K♇♃G♁T♄#U☥⌖(☍S☿⛢☬✶⟁F⟠⍟J✙❖N⁜⁂{⧫P⚟✿C⟡⍰ʘX✣]☼⚞M✎I✆⎆⍜★DZ12✤3V45;6P789⎈R0!@#Y$%^F&E*)_♆+-W=[B}|:L',H.>/?";
    const numColumns = Math.floor(window.innerWidth / 14); // Nombre de colonnes en fonction de la largeur de la fenêtre

    const createColumn = () => {
        const column = document.createElement('div');
        column.classList.add('column');
        column.style.left = `${Math.floor(Math.random() * numColumns) * 14}px`;
        column.style.animationDuration = `${Math.random() * 5 + 5}s`;
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

            // Met à jour les positions et opacités des symboles restants
            symbols.forEach((symbol, index) => {
                symbol.style.opacity = (index * 0.1);
                let top = parseInt(symbol.style.top) || 0;
                symbol.style.top = `${top + 14}px`;
            });

            const newSymbol = createSymbol(0.1); // Nouveau symbole avec opacité croissante
            newSymbol.style.top = '0px';
            column.insertBefore(newSymbol, symbols[0]); // Ajoute le nouveau symbole au début
        }, Math.random() * 500 + 500); // Intervalle de temps aléatoire entre 500ms et 1000ms
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    const text = "Voici une partie de mes projets préférés.";
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
});