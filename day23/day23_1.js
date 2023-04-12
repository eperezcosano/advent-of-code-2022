/*
*       --- Day 23: Unstable Diffusion ---
*               --- Part One ---
*             Advent Of Code 2022
* */
const {row} = require("mathjs");
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./small.txt')
})

const grid = []
const nextMoves = new Map()
const listDirections = [
    { dy: -1, dx: 0 },
    { dy: 1, dx: 0 },
    { dy: 0, dx: 1 },
    { dy: 0, dx: -1 },
]

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
    if (grid.some(row => row[0] === '#')) grid.forEach(row => row.unshift('.'))
    if (grid.some(row => row[row.length - 1] === '#')) grid.forEach(row => row.push('.'))
    if (grid[0].some(col => col === '#')) grid.unshift(new Array(grid[0].length).fill('.'))
    if (grid[grid.length - 1].some(col => col === '#')) grid.push(new Array(grid[grid.length - 1].length).fill('.'))
}
function simulation() {
    for (let round = 1; round <= 4; round++) {
        console.log('Round', round)
        populateGrid()
        console.log(grid)
        proposePositions()
        console.log(nextMoves)
        deleteDuplicates()
        console.log(nextMoves)
        moveToPositions()
        console.log(grid)
        listDirections.push(listDirections.shift())
    }
}

lineReader.on('line', line => {
    grid.push(line.split(''))
}).on('close', () => simulation())