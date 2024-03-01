var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var balls = [];
var maxBalls = 10; // Максимальна кількість фігур
var ballSpeed = 2; // Початкова швидкість руху фігур
var mouseX = 0; // Координати миші
var mouseY = 0;
var transparencyCounter = 0; // Лічильник для кожного третього фігури
var currentShape = 1; // Поточний тип фігури: 1 - трикутник, 2 - шестикутник, 3 - квадрат
var clickCounter = 0; // Лічильник кліків

// Функція для генерації випадкового числа в заданому діапазоні
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функція для генерації випадкового кольору
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Функція для зміни кольору canvas
function changeCanvasColor() {
    canvas.style.backgroundColor = getRandomColor();
}

// Запускати функцію changeCanvasColor() кожні 5 секунд
setInterval(changeCanvasColor, 5000);

// Функція для малювання трикутника
function drawTriangle(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x + size / 2, y + size);
    ctx.closePath();
    ctx.fill();
}

// Функція для малювання шестикутника
function drawHexagon(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
    for (var i = 1; i <= 6; i++) {
        ctx.lineTo(x + size * Math.cos(i * 2 * Math.PI / 6), y + size * Math.sin(i * 2 * Math.PI / 6));
    }
    ctx.closePath();
    ctx.fill();
}

// Функція для малювання квадрата
function drawSquare(x, y, size) {
    ctx.fillRect(x, y, size, size);
}

// Функція для малювання випадкової фігури залежно від поточного типу
function drawRandomShape(x, y, size) {
    switch (currentShape) {
        case 1: // Трикутник
            drawTriangle(x, y, size);
            break;
        case 2: // Шестикутник
            drawHexagon(x, y, size);
            break;
        case 3: // Квадрат
            drawSquare(x, y, size);
            break;
        default:
            drawHexagon(x, y, size);
    }
}

function onCanvasClick(e) {
    clickCounter++;
    if (clickCounter > 3) {
        clickCounter = 1;
    }
    switch (clickCounter) {
        case 1:
            currentShape = 1;
            break;
        case 2:
            currentShape = 2;
            break;
        case 3:
            currentShape = 3;
            break;
    }

    if (balls.length < maxBalls) {
        var x = e.clientX;
        var y = e.clientY;
        var size = Math.random() * 40 + 20; // Випадковий розмір фігури
        var dx = (Math.random() - 0.5) * ballSpeed * 2; // Випадкова швидкість руху по осі X
        var dy = (Math.random() - 0.5) * ballSpeed * 2; // Випадкова швидкість руху по осі Y
        var color = getRandomColor(); // Випадковий колір фігури

        balls.push({ x: x, y: y, size: size, dx: dx, dy: dy, color: color });

        moveBalls();
    }
}

function moveBalls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(function (ball, index) {
        ctx.fillStyle = ball.color;

        // Встановлюємо напівпрозорість для кожного третього фігури
        if (transparencyCounter % 3 === 0) {
            ctx.globalAlpha = 0.2; // Змінено на 0.2
        } else {
            ctx.globalAlpha = 1;
        }

        drawRandomShape(ball.x, ball.y, ball.size);
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Відштовхування від країв canvas
        if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
            ball.dx = -ball.dx;
        }
        if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
            ball.dy = -ball.dy;
        }

        // Відштовхування від інших фігур
        for (var i = 0; i < balls.length; i++) {
            if (i !== index) {
                if (detectCollision(ball, balls[i])) {
                    // Міняємо напрямок руху обох фігур
                    var tempDx = ball.dx;
                    var tempDy = ball.dy;
                    ball.dx = balls[i].dx;
                    ball.dy = balls[i].dy;
                    balls[i].dx = tempDx;
                    balls[i].dy = tempDy;
                }
            }
        }
        transparencyCounter++; // Збільшуємо лічильник
    });

    requestAnimationFrame(moveBalls);
}

// Функція для визначення колізій між фігурами
function detectCollision(ball1, ball2) {
    var distance = Math.sqrt(Math.pow(ball2.x - ball1.x, 2) + Math.pow(ball2.y - ball1.y, 2));
    return distance < ball1.size + ball2.size;
}

function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

// Викликаємо функцію при кліку на canvas
canvas.addEventListener('click', onCanvasClick);

// Викликаємо функцію при русі миші на canvas
canvas.addEventListener('mousemove', onMouseMove);
