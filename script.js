function startGame() {
    myGameArea.start(); // Avvia l'area di gioco (canvas) e il ciclo di aggiornamento.

    // Listener per i tasti
    window.addEventListener("keydown", function (e) {
        const jumpStrength = -10;
        switch (e.key.toLowerCase()) {
            case "w":
                if (redRectangle.isOnGround()) {
                    redRectangle.speedY = jumpStrength;
                }
                break;
            case "a":
                redIntendedDirection = -1;
                redRectangle.speedX = -2;
                break;
            case "d":
                redIntendedDirection = 1;
                redRectangle.speedX = 2;
                break;
            case "arrowup":
                if (blueRectangle.isOnGround()) {
                    blueRectangle.speedY = jumpStrength;
                }
                break;
            case "arrowleft":
                blueIntendedDirection = -1;
                blueRectangle.speedX = -2;
                break;
            case "arrowright":
                blueIntendedDirection = 1;
                blueRectangle.speedX = 2;
                break;
        }
    });
    
    window.addEventListener("keyup", function (e) {
        switch (e.key.toLowerCase()) {
            case "a":
                if (redIntendedDirection === -1) redIntendedDirection = 0;
                redRectangle.speedX = 0;
                break;
            case "d":
                if (redIntendedDirection === 1) redIntendedDirection = 0;
                redRectangle.speedX = 0;
                break;
            case "arrowleft":
                if (blueIntendedDirection === -1) blueIntendedDirection = 0;
                blueRectangle.speedX = 0;
                break;
            case "arrowright":
                if (blueIntendedDirection === 1) blueIntendedDirection = 0;
                blueRectangle.speedX = 0;
                break;
        }
    });

    window.addEventListener("keyup", function (e) { // Aggiunge un listener per il rilascio dei tasti.
        switch (e.key.toLowerCase()) { // Controlla quale tasto è stato rilasciato.
            // Ferma il movimento del rettangolo rosso
            case "a":
            case "d":
                redRectangle.speedX = 0; // Ferma il movimento orizzontale.
                break;

            // Ferma il movimento del rettangolo blu
            case "arrowleft":
            case "arrowright":
                blueRectangle.speedX = 0; // Ferma il movimento orizzontale.
                break;
        }
    });
}

// Aggiungi queste variabili dopo la dichiarazione dei rettangoli
var redIntendedDirection = 0;  // -1 per sinistra, 0 per fermo, 1 per destra
var blueIntendedDirection = 0; // -1 per sinistra, 0 per fermo, 1 per destra

var myGameArea = {
    canvas: document.createElement("canvas"), // Crea un elemento canvas.
    start: function () {
        this.canvas.width = 480; // Imposta la larghezza del canvas.
        this.canvas.height = 270; // Imposta l'altezza del canvas.
        this.context = this.canvas.getContext("2d"); // Ottiene il contesto 2D per disegnare.
        document.body.insertBefore(this.canvas, document.body.childNodes[0]); // Inserisce il canvas nel DOM.
        this.interval = setInterval(updateGameArea, 15); // Chiama la funzione di aggiornamento ogni 20 ms.
    },

    drawGameObject: function (gameObject) { // Disegna un oggetto sul canvas.
        this.context.fillStyle = gameObject.color; // Imposta il colore di riempimento.
        this.context.fillRect(gameObject.x, gameObject.y, gameObject.width, gameObject.height); // Disegna un rettangolo.
    },

    clear: function () { // Pulisce il canvas.
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Cancella tutto il contenuto del canvas.
    }
};

var redRectangle = {
    speedX: 0, // Velocità orizzontale iniziale.
    speedY: 0, // Velocità verticale iniziale.
    width: 60, // Larghezza del rettangolo.
    height: 150, // Altezza del rettangolo.
    x: 10, // Posizione iniziale sull'asse X.
    y: 120, // Posizione iniziale sull'asse Y.
    color: "red", // Colore del rettangolo.
    gravity: 0.5, // Gravità applicata al rettangolo.
    gravitySpeed: 0, // Velocità accumulata dalla gravità.

    update: function () { // Aggiorna la posizione e lo stato del rettangolo.
        this.gravitySpeed += this.gravity; // Incrementa la velocità verticale con la gravità.
        this.x += this.speedX; // Aggiorna la posizione orizzontale.
        this.y += this.speedY + this.gravitySpeed; // Aggiorna la posizione verticale.

        // Controlla collisioni con il terreno
        if (this.y + this.height > myGameArea.canvas.height) { // Se tocca il terreno.
            this.y = myGameArea.canvas.height - this.height; // Rimane sul terreno.
            this.gravitySpeed = 0; // Ferma la gravità.
            this.speedY = 0; // Ferma il movimento verticale.
        }

        // Impedisce di uscire dai bordi della canvas
        if (this.x < 0) this.x = 0; // Bordo sinistro.
        if (this.x + this.width > myGameArea.canvas.width) this.x = myGameArea.canvas.width - this.width; // Bordo destro.
        if (this.y < 0) this.y = 0; // Bordo superiore.
    },

    isOnGround: function () { // Verifica se il rettangolo è a terra.
        return this.y + this.height >= myGameArea.canvas.height;
    }
};

var blueRectangle = { // Stesse proprietà e metodi del rettangolo rosso, ma con colore e posizione iniziale diversi.
    speedX: 0,
    speedY: 0,
    width: 60,
    height: 150,
    x: 100,
    y: 120,
    color: "blue",
    gravity: 0.5,
    gravitySpeed: 0,

    update: function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;

        if (this.y + this.height > myGameArea.canvas.height) {
            this.y = myGameArea.canvas.height - this.height;
            this.gravitySpeed = 0;
            this.speedY = 0;
        }

        if (this.x < 0) this.x = 0;
        if (this.x + this.width > myGameArea.canvas.width) this.x = myGameArea.canvas.width - this.width;
        if (this.y < 0) this.y = 0;
    },

    isOnGround: function () {
        return this.y + this.height >= myGameArea.canvas.height;
    }
};

// Aggiungi questa funzione dopo la dichiarazione dei rettangoli
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function updateGameArea() {
    let prevRedX = redRectangle.x;
    let prevBlueX = blueRectangle.x;
    
    myGameArea.clear();
    
    // Aggiorna le posizioni
    redRectangle.update();
    blueRectangle.update();
    
    // Controlla le collisioni
    if (checkCollision(redRectangle, blueRectangle)) {
        // Ripristina le posizioni
        redRectangle.x = prevRedX;
        blueRectangle.x = prevBlueX;
        
        // Applica le direzioni intese solo se c'è spazio per muoversi
        if (redIntendedDirection === -1 && redRectangle.x > 0) {
            redRectangle.speedX = -2;
        } else if (redIntendedDirection === 1 && redRectangle.x < myGameArea.canvas.width - redRectangle.width) {
            redRectangle.speedX = 2;
        }
        
        if (blueIntendedDirection === -1 && blueRectangle.x > 0) {
            blueRectangle.speedX = -2;
        } else if (blueIntendedDirection === 1 && blueRectangle.x < myGameArea.canvas.width - blueRectangle.width) {
            blueRectangle.speedX = 2;
        }
    }
    
    myGameArea.drawGameObject(redRectangle);
    myGameArea.drawGameObject(blueRectangle);
}