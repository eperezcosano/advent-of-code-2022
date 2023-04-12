/*
*       --- Day 23: Unstable Diffusion ---
*               --- Part One ---
*             Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day23.txt')
})

const grid = []
const nextMoves = new Map()
const listDirections = [
    { dy: -1, dx: 0 },
    { dy: 1, dx: 0 },
    { dy: 0, dx: -1 },
    { dy: 0, dx: 1 },
]

function hasNeighbors(y, x) {
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dy === 0 && dx === 0) continue
            if (grid[y + dy][x + dx] === '#') return true
        }
    }
    return false
}

function hasAdjacentPosition(y, x, dy, dx) {
    if (dy !== 0) {
        for (let adjX = -1; adjX <= 1; adjX++) {
            if (grid[y + dy][x + adjX] === '#') return true
        }
    } else if (dx !== 0) {
        for (let adjY = -1; adjY <= 1; adjY++) {
            if (grid[y + adjY][x + dx] === '#') return true
        }
    }
    return false
}

function proposePosition(y, x) {
    if (!hasNeighbors(y, x)) return
    for (const {dy, dx} of listDirections) {
        if (!hasAdjacentPosition(y, x, dy, dx)) {
            nextMoves.set(`${y}-${x}`, `${y + dy}-${x + dx}`)
            break
        }
    }
}

function proposePositions() {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '#') {
                proposePosition(y, x)
            }
        }
    }
}

function deleteDuplicates() {
    const tmp = new Map()
    for (const [elf, position] of nextMoves) {
        if (tmp.has(position)) {
            nextMoves.delete(elf)
            nextMoves.delete(tmp.get(position))
        } else {
            tmp.set(position, elf)
        }
    }
}

function moveToPositions() {
    for (const [elf, position] of nextMoves) {
        const [fromY, fromX] = elf.split('-').map(value => parseInt(value))
        grid[fromY][fromX] = '.'
        const [toY, toX] = position.split('-').map(value => parseInt(value))
        grid[toY][toX] = '#'
    }
}

function populateGrid() {
    // Left
    if (grid.some(row => row[0] === '#')) grid.forEach(row => row.unshift('.'))
    // Right
    if (grid.some(row => row[row.length - 1] === '#')) grid.forEach(row => row.push('.'))
    // Top
    if (grid[0].some(col => col === '#')) grid.unshift(new Array(grid[0].length).fill('.'))
    // Bottom
    if (grid[grid.length - 1].some(col => col === '#')) grid.push(new Array(grid[grid.length - 1].length).fill('.'))
}

function cropGrid() {
    // Left
    while (grid.every(row => row[0] === '.')) {
        grid.forEach(row => row.shift())
    }
    // Right
    while (grid.every(row => row[row.length - 1] === '.')) {
        grid.forEach(row => row.pop())
    }
    // Top
    while (grid[0].every(col => col === '.')) {
        grid.shift()
    }
    // Bottom
    while (grid[grid.length - 1].every(col => col === '.')) {
        grid.pop()
    }
}

function countEmptySpaces() {
    return grid.map(row => row.reduce((sum, item) => item === '.' ? ++sum : sum, 0)).reduce((sum, num) => sum + num, 0)
}

function simulation() {
    for (let round = 1; round <= 10; round++) {
        populateGrid()
        proposePositions()
        deleteDuplicates()
        moveToPositions()
        listDirections.push(listDirections.shift())
        nextMoves.clear()
    }
    cropGrid()
    console.log('Result:', countEmptySpaces())
    // Result: 3849
}

lineReader.on('line', line => {
    grid.push(line.split(''))
}).on('close', () => simulation())