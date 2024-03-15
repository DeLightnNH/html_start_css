// Для отримання випадкового числа від 0 до (size-1)
function getRandomNumber(size) {
    // Math.random()  -->  [0,1)
    // [0,1) * 5 = [0*5,1*5) -->  [0;5)
    // [0,1) * size = [0*size,1*size) -->  [0;size)
    // Math.random() * size -->  [0;size)
    let num = Math.floor(Math.random() * size);
    return num;
}

// Розраховує відстань від кліку (event) до скарбу (target)
function getDistance(event, target) {
    const diffX = event.offsetX - target.x;
    const diffY = event.offsetY - target.y;
    const dist = Math.sqrt((diffX * diffX) + (diffY * diffY));
    return dist;
}

// Задання відстані для отримання підсказки
function getDistanceHint(distance) {
    if (distance < 10) {
        return "Пече!";
    } else if (distance < 20) {
        return "Дуже гаряче";
    } else if (distance < 40) {
        return "Гаряче";
    } else if (distance < 80) {
        return "Тепло";
    } else if (distance < 160) {
        return "Холодно";
    } else if (distance < 320) {
        return "Дуже холодно";
    } else {
        return "Можна замерзнути!";
    }
}

// Створюємо змінні
const width = 450;
const height = 400;
let click = 0; // для підрахунку кількості кліків
const maxMoves = 10

// Випадкове розміщення скарбу
const target = {
    x: getRandomNumber(width),
    y: getRandomNumber(height)
}

// Додаємо елементу #map обробник кліку
const mapElement = document.getElementById("map");
mapElement.addEventListener("click", (event) => {
    click++; // click = click + 1
    const answer = getDistanceHint(getDistance(event, target))
    document.getElementById("distance").innerHTML = `Результат: ${getDistanceHint(getDistance(event, target))}`
    document.getElementById("counter").innerHTML = `Кількість ходів: ${click}`;
    if (answer === "Пече!") {
        alert("gg")
    }

    if (click === maxMoves ) {
        alert("ezezezezez looseeer")
    }
});
