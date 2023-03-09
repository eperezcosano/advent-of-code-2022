/*
*           --- Day 22: Monkey Map ---
*               --- Part Two ---
*             Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./test2.txt')
})

const side = 4
const maze = []
let movements = []
let space = false
let pos = [0, 8]
let facing = 0
/*
    Right:  0
    Down:   1
    Left:   2
    Up:     3
 */

lineReader.on('line', line => {
    if (!line) {
        space = true
        return
    }
    space ? movements = line.match(/\d+|[LR]/g) : maze.push(line.split(''))
}).on('close', () => test())

function test() {
    //console.log('Start', pos, maze[pos[0]][pos[1]])
    for (let i = 0; i < 20; i++) {
        pos = [11, 8]
        facing = 2
        moveLeft(i)
    }
}

function simulation() {
    // Starting position at top leftmost
    pos = [0, maze[0].indexOf('.')]

    for (let i = 0; i < movements.length; i++) {
        const steps = parseInt(movements[i])
        // console.log('current pos', pos)
        if (steps) {
            // Move to the facing direction the number of steps
            switch (facing) {
                case 0:
                    moveRight(steps)
                    break
                case 1:
                    moveDown(steps)
                    break
                case 2:
                    moveLeft(steps)
                    break
                case 3:
                    moveUp(steps)
                    break
            }
        } else {
            // Turn clockwise (R) or counterclockwise (L)
            if (movements[i] === 'R') facing = mod(facing + 1, 4)
            else if (movements[i] === 'L') facing = mod(facing - 1, 4)
        }
    }
    console.log(pos, facing)
    console.log(password())
}

function password() {
    return (pos[0] + 1) * 1000 + 4 * (pos[1] + 1) + facing
}

function mod(n, m) {
    return ((n % m) + m) % m
}

function getRow() {
    if (pos[0] < side) {
        // Top row
        const topRow = maze[pos[0]].slice(side * 2).map((item, index) => [item, [pos[0], index + side * 2], facing])
        const btmRow = maze[side * 3 - 1 - pos[0]].slice(side * 2).map((item, index) => [item, [side * 3 - 1 - pos[0], index + side * 2], mod(facing + 2, 4)]).reverse()
        const midCol = maze.map((row, index) => [row[side + pos[0]], [index, side + pos[0]], mod(facing + 3, 4)]).slice(side, side * 2).reverse()
        return [...topRow, ...btmRow, ...midCol]
    } else if (pos[0] >= side && pos[0] < (side * 2)) {
        // Middle row
        const midRow = maze[pos[0]].map((item, index) => [item, [pos[0], index], facing])
        const rgtCol = maze.slice(side * 2).map((row, index) => [row[side * 5 - 1 - pos[0]], [index + side * 2, side * 5 - 1 - pos[0]], mod(facing + 1, 4)])
        return [...midRow, ...rgtCol]
    } else if (pos[0] >= (side * 2)) {
        // Bottom row
        const btmRow = maze[pos[0]].slice(side * 2).map((item, index) => [item, [pos[0], index + side * 2], facing])
        const topRow = maze[side * 3 - 1 - pos[0]].slice(side * 2).map((item, index) => [item, [side * 3 - 1 - pos[0], index + side * 2], mod(facing + 2, 4)]).reverse()
        const midCol = maze.map((row, index) => [row[side * 4 - 1 - pos[0]], [index, side * 4 - 1 - pos[0]], mod(facing + 1, 4)]).slice(side, side * 2)
        return [...btmRow, ...topRow, ...midCol]
    }
}

function getCol() {
    if (pos[1] < 4 || pos[1] > 7 && pos[1] < 12) {// Left col or mid

    } else { // Mid or

    }
}

function moveRight(steps) {
    const row = getRow()
    let neighbor = row.findIndex(item => item[1][0] === pos[0] && item[1][1] === pos[1])
    // console.log(row, neighbor, row[start], row.map(item => item[0]).join(''))
    for (let i = 0; i < steps; i++) {
        neighbor = mod(neighbor + 1, row.length)
        if (row[neighbor][0] === '#') break
        pos = row[neighbor][1]
        facing = row[neighbor][2]
    }
    console.log(pos, maze[pos[0]][pos[1]], facing)
}

function moveLeft(steps) {
    const row = getRow()
    let neighbor = row.findIndex(item => item[1][0] === pos[0] && item[1][1] === pos[1])
    //console.log(row, neighbor, row[neighbor], row.map(item => item[0]).join(''))
    for (let i = 0; i < steps; i++) {
        neighbor = mod(neighbor - 1, row.length)
        if (row[neighbor][0] === '#') break
        pos = row[neighbor][1]
        facing = row[neighbor][2]
    }
    console.log(pos, maze[pos[0]][pos[1]], facing)
}

function moveUp(steps) {
    const col = getCol()
    // console.log(col)
    for (let i = 0; i < steps; i++) {
        const neighbor = mod(pos[0] - 1, col.length)
        // console.log(i, pos[0], neighbour, col[pos[0]], col[neighbour])
        if (col[neighbor] === '#') break
        pos[0] = neighbor
    }
    updatePosCol()
}

function moveDown(steps) {
    const col = getCol()
    // console.log(col)
    for (let i = 0; i < steps; i++) {
        const neighbor = mod(pos[0] + 1, col.length)
        // console.log(i, pos[0], neighbour, col[pos[0]], col[neighbour])
        if (col[neighbor] === '#') break
        pos[0] = neighbor
    }
    updatePosCol()
}
