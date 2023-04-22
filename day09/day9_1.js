/*
*   --- Day 9: Rope Bridge ---
*         --- Part One ---
*       Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day9_input.txt')
})


const size = 525
let grid = new Array(size).fill(null).map(() => Array(size).fill(0))
let hx = (size - 1) / 2
let hy = hx
let tx = hx
let ty = hx
grid[ty][tx] = 1

function moveDown() {
    hy++
    if (Math.abs(tx - hx) > 0 && Math.abs(ty - hy) > 1) tx = hx
    if (Math.abs(ty - hy) > 1) ty = hy - 1
    grid[ty][tx] = 1
}

function moveUp() {
    hy--
    if (Math.abs(tx - hx) > 0 && Math.abs(ty - hy) > 1) tx = hx
    if (Math.abs(ty - hy) > 1) ty = hy + 1
    grid[ty][tx] = 1
}

function moveLeft() {
    hx--
    if (Math.abs(ty - hy) > 0 && Math.abs(tx - hx) > 1) ty = hy
    if (Math.abs(tx - hx) > 1) tx = hx + 1
    grid[ty][tx] = 1
}

function moveRight() {
    hx++
    if (Math.abs(ty - hy) > 0 && Math.abs(tx - hx) > 1) ty = hy
    if (Math.abs(tx - hx) > 1) tx = hx - 1
    grid[ty][tx] = 1
}

lineReader.on('line', (line) => {
    const [move, steps] = line.split(' ')
    for (let i = 0; i < steps; i++) {
        switch (move) {
            case 'D':
                moveDown()
                break
            case 'U':
                moveUp()
                break
            case 'L':
                moveLeft()
                break
            case 'R':
                moveRight()
                break
        }
    }
})

lineReader.on('close', () => {
    const res = grid.reduce((total, col) => total + col.reduce((sum, row) => sum + row, 0), 0)
    console.log('Total:', res)
    // Total: 5930
})