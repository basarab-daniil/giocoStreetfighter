function startGame() {
    myGameArea.start();

    // Listener per i tasti
    window.addEventListener("keydown", function (e) {
        const jumpStrength = -10; // Forza del salto
        switch (e.key.toLowerCase()) {
            // Controlli per il rettangolo rosso
            case "w": // Salto
                if (redRectangle.isOnGround()) {
                    redRectangle.speedY = jumpStrength;
                }
                break;
            case "a": // Sinistra
                redRectangle.speedX = -2;
                break;
            case "d": // Destra
                redRectangle.speedX = 2;
                break;

            // Controlli per il rettangolo blu
            case "arrowup": // Salto
                if (blueRectangle.isOnGround()) {
                    blueRectangle.speedY = jumpStrength;
                }
                break;
            case "arrowleft": // Sinistra
                blueRectangle.speedX = -2;
                break;
            case "arrowright": // Destra
                blueRectangle.speedX = 2;
                break;
        }
    });

    window.addEventListener("keyup", function (e) {
        switch (e.key.toLowerCase()) {
            // Ferma il movimento del rettangolo rosso
            case "a":
            case "d":
                redRectangle.speedX = 0;
                break;

            // Ferma il movimento del rettangolo blu
            case "arrowleft":
            case "arrowright":
                blueRectangle.speedX = 0;
                break;
        }
    });
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20); //ogni 20 ms chiamo il metodo updateGameArea
    },

    drawGameObject: function (gameObject) {
        this.context.fillStyle = gameObject.color;
        this.context.fillRect(gameObject.x, gameObject.y, gameObject.width, gameObject.height);
    },

    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

var redRectangle = {
    speedX: 0,
    speedY: 0,
    width: 60,
    height: 150,
    x: 10,
    y: 120, // Posizione iniziale
    color: "red",
    gravity: 0.5, // Gravità
    gravitySpeed: 0,

    update: function () {
        this.gravitySpeed += this.gravity; // Applica la gravità
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;

        // Controlla collisioni con il terreno
        if (this.y + this.height > myGameArea.canvas.height) {
            this.y = myGameArea.canvas.height - this.height; // Resta sul terreno
            this.gravitySpeed = 0; // Ferma la gravità
            this.speedY = 0; // Ferma il movimento verticale
        }

        // Impedisce di uscire dai bordi della canvas
        if (this.x < 0) this.x = 0; // Bordo sinistro
        if (this.x + this.width > myGameArea.canvas.width) this.x = myGameArea.canvas.width - this.width; // Bordo destro
        if (this.y < 0) this.y = 0; // Bordo superiore
    },

    isOnGround: function () {
        return this.y + this.height >= myGameArea.canvas.height;
    }
};

var blueRectangle = {
    speedX: 0,
    speedY: 0,
    width: 60,
    height: 150,
    x: 100,
    y: 120, // Posizione iniziale
    color: "blue",
    gravity: 0.5, // Gravità
    gravitySpeed: 0,

    update: function () {
        this.gravitySpeed += this.gravity; // Applica la gravità
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;

        // Controlla collisioni con il terreno
        if (this.y + this.height > myGameArea.canvas.height) {
            this.y = myGameArea.canvas.height - this.height; // Resta sul terreno
            this.gravitySpeed = 0; // Ferma la gravità
            this.speedY = 0; // Ferma il movimento verticale
        }

        // Impedisce di uscire dai bordi della canvas
        if (this.x < 0) this.x = 0; // Bordo sinistro
        if (this.x + this.width > myGameArea.canvas.width) this.x = myGameArea.canvas.width - this.width; // Bordo destro
        if (this.y < 0) this.y = 0; // Bordo superiore
    },

    isOnGround: function () {
        return this.y + this.height >= myGameArea.canvas.height;
    }
};

function updateGameArea() {
    myGameArea.clear();
    redRectangle.update();
    blueRectangle.update();
    myGameArea.drawGameObject(redRectangle);
    myGameArea.drawGameObject(blueRectangle);
}