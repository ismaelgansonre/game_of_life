// DOM elements
const grid = document.getElementById('grid');
const aliveCount = document.getElementById('aliveCount');
const deadCount = document.getElementById('deadCount');
const startGameButton = document.getElementById('startGame');
const pauseGameButton = document.getElementById('pauseGame');
const resetButton = document.getElementById('reset');
const updateSizeButton = document.getElementById('updateSize');
const rowsInput = document.getElementById('rows');
const columnsInput = document.getElementById('columns');
const generateRandomButton = document.getElementById('generateRandom');
const generateRandomButton5 = document.getElementById('generateRandom5');
const speedUpButton = document.getElementById('speedUp');
const speedDownButton = document.getElementById('speedDown');
const zoomInButton = document.getElementById('zoomIn');
const zoomOutButton = document.getElementById('zoomOut');
const gridContainer = document.getElementById('gridContainer');

// Game variables
let rows = 15;
let columns = 15;
let intervalId;
let cells = [];
let zoomLevel = 1;
let speed = 500; // Initial speed in milliseconds

// Constants
const zoomStep = 0.1; // Step size for each zoom in/out action
const baseCellSize = 30; // Base size of cells in pixels

// Event listeners
zoomInButton.addEventListener('click', zoomIn);
zoomOutButton.addEventListener('click', zoomOut);
generateRandomButton.addEventListener('click', generateRandomSetup);
generateRandomButton5.addEventListener('click', generateRandomSetup5);
speedUpButton.addEventListener('click', speedUp);
speedDownButton.addEventListener('click', speedDown);
startGameButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
updateSizeButton.addEventListener('click', updateSize);

// Functions
function zoomIn() {
    zoomLevel = Math.min(zoomLevel + zoomStep, 2); // Max zoom level 2x
    updateCellSize();
}

function zoomOut() {
    zoomLevel = Math.max(zoomLevel - zoomStep, 0.5); // Min zoom level 0.5x
    updateCellSize();
}

function updateCellSize() {
    const newSize = baseCellSize * zoomLevel;
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.style.width = `${newSize}px`;
        cell.style.height = `${newSize}px`;
    });
}

function createGrid() {
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${columns}, 30px)`;
    cells = [];
    for (let i = 0; i < rows * columns; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.addEventListener('click', () => toggleCellState(i));
        grid.appendChild(cell);
        cells.push(false);
    }
}

function generateRandomSetup() {
    for (let i = 0; i < cells.length; i++) {
        cells[i] = Math.random() < 0.3; // 30% chance for each cell to be alive
    }
    updateGrid();
}

function generateRandomSetup5() {
    for (let i = 0; i < cells.length; i++) {
        cells[i] = Math.random() < 0.5; // 50% chance for each cell to be alive
    }
    updateGrid();
}

function speedUp() {
    if (speed > 100) {
        speed -= 100;
        updateInterval();
    }
}

function speedDown() {
    if (speed < 2000) {
        speed += 100;
        updateInterval();
    }
}

function toggleCellState(index) {
    cells[index] = !cells[index];
    updateGrid();
}

function updateGrid() {
    cells.forEach((alive, index) => {
        grid.children[index].classList.toggle('alive', alive);
    });
    aliveCount.textContent = cells.filter(alive => alive).length;
    deadCount.textContent = cells.filter(alive => !alive).length;
}

/**
 * Calculates the next generation of cells based on the rules of the Game of Life.
 */
/**
 * Calculates the next generation of cells in the Game of Life.
 */
function nextGeneration() {
    const newCells = cells.slice();
    for (let i = 0; i < cells.length; i++) {
        const x = i % columns;
        const y = Math.floor(i / columns);
        const neighbors = getAliveNeighbors(x, y);
        const alive = cells[i];
        if (alive && (neighbors < 2 || neighbors > 3)) {
            newCells[i] = false;
        } else if (!alive && neighbors === 3) {
            newCells[i] = true;
        }
    }
    cells = newCells;
    updateGrid();
}

function getAliveNeighbors(x, y) {
    let count = 0;
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < columns && ny >= 0 && ny < rows) {
                count += cells[nx + ny * columns] ? 1 : 0;
            }
        }
    }
    return count;
}

function startGame() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(nextGeneration, speed);
}

function resetGame() {
    clearInterval(intervalId);
    cells = cells.map(() => false);
    updateGrid();
}

function updateSize() {
    rows = parseInt(rowsInput.value) || 35;
    columns = parseInt(columnsInput.value) || 35;
    createGrid();
    updateGrid();
}

function updateInterval() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = setInterval(nextGeneration, speed);
    }
}

// Initial setup
createGrid();
updateGrid();
