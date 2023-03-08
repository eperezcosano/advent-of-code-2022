/*
*           --- Day 22: Monkey Map ---
*               --- Part Two ---
*             Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./test2.txt')
})

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
    pos = [3, 8]
    console.log('Start', pos, maze[pos[0]][pos[1]])
    for (let i = 0; i < 20; i++) {
        moveRight(1)
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
    if (pos[0] > 3 && pos[0] < 8) { // Middle row
        const middleRow = maze[pos[0]]
        // row 4 --> col 15
        // row 5 --> col 14
        // row 6 --> col 13
        // row 7 --> col 12
        const cornerCol = maze.map(row => row[19 - pos[0]])
        return middleRow.concat(cornerCol)
    } else {    // Top or bottom row
        // row 0 -> 0
        // row 1 -> 1
        // row 2 -> 2
        // row 3 -> 3

        // row 8 -> 3
        // row 9 -> 2
        // row 10 -> 1
        // row 11 -> 0
        const row = (pos[0] < 4) ? pos[0] : 11 - pos[0]
        const topRow = maze[row].slice(8).map((item, index) => [item, [row, index + 8]])
        // row 0 --> col 4
        // row 1 --> col 5
        // row 2 --> col 6
        // row 3 --> col 7

        // row 8 --> col 7
        // row 9 --> col 6
        // row 10 --> col 5
        // row 11 --> col 4
        const col = (pos[0] < 4) ? 4 + pos[0] : 15 - pos[0]
        const cornerCol = maze.map((row, index) => [row[col], [index, col]]).slice(4, 8).reverse()

        // row 0 --> 11
        // row 1 --> 10
        // row 2 --> 9
        // row 3 --> 8

        // row 8 --> 8
        // row 9 --> 9
        // row 10 --> 10
        // row 11 --> 11
        const btmRow = (pos[0] < 4) ? 11 - pos[0] : pos[0]
        const bottomRowLeft = maze[btmRow].slice(8, 12).map((item, index) => [item, [btmRow, index + 8]]).reverse()
        const bottomRowRight = maze[btmRow].slice(12).map((item, index) => [item, [btmRow, index + 12]]).reverse()

        return [...bottomRowLeft, ...cornerCol, ...topRow, ...bottomRowRight]
    }
}

function getCol() {
    if (pos[1] < 4 || pos[1] > 7 && pos[1] < 12) {// Left col or mid

    } else { // Mid or

    }
}

function moveRight(steps) {
    const row = getRow()
    const start = row.findIndex(item => item[1][0] === pos[0] && item[1][1] === pos[1])
    //console.log(row, start, row[start], row.map(item => item[0]).join(''))
    let neighbor = start
    for (let i = 0; i < steps; i++) {
        neighbor = mod(neighbor + 1, row.length)
        if (row[neighbor][0] === '#') break
        pos = row[neighbor][1]
    }
    console.log(pos, maze[pos[0]][pos[1]])
}

function moveLeft(steps) {
    const row = getRow()
    // console.log(row)
    for (let i = 0; i < steps; i++) {
        const neighbor = mod(pos[1] - 1, row.length)
        // console.log(i, pos[1], neighbour, row[pos[1]], row[neighbour])
        if (row[neighbor] === '#') break
        pos[1] = neighbor
    }
    updatePosRow()
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
