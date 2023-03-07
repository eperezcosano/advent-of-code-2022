/*
*           --- Day 22: Monkey Map ---
*               --- Part Two ---
*             Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./test.txt')
})

const maze = []
let movements = []
let space = false
let pos = [7, 0]
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
}).on('close', () => getRow())

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
        // pos 4 --> col 15
        // pos 5 --> col 14
        // pos 6 --> col 13
        // pos 7 --> col 12
        const cornerCol = maze.map(row => row[19 - pos[0]])
        return middleRow.concat(cornerCol)
    } else {                        // Top or bottom row
        return
    }
}

function updatePosRow() {
    if (pos[0] > 3 && pos[0] < 8 && pos[1] > 11) { // Middle row
        pos[0] = pos[1] - 4
        pos[1] = 19 - pos[0]
        // y: 4, x: 12 --> y: 8, x: 15
        // y: 4, x: 13 --> y: 9, x: 15
        // y: 4, x: 14 --> y: 10, x: 15
        // y: 4, x: 15 --> y: 11, x: 15
        // y: 5, x: 12 --> y: 8, x: 14
        // y: 5, x: 13 --> y: 9, x: 14
        // y: 5, x: 14 --> y: 10, x: 14
        // y: 5, x: 15 --> y: 11, x: 14
        // y: 6, x: 12 --> y: 8, x: 13
        // y: 6, x: 13 --> y: 9, x: 13
        // y: 6, x: 14 --> y: 10, x: 13
        // y: 6, x: 15 --> y: 11, x: 13
        // y: 7, x: 12 --> y: 8, x: 12
        // y: 7, x: 13 --> y: 9, x: 12
        // y: 7, x: 14 --> y: 10, x: 12
        // y: 7, x: 15 --> y: 11, x: 12
    } else {                        // Top or bottom row
        return
    }
}

function moveRight(steps) {
    const row = getRow()
    for (let i = 0; i < steps; i++) {
        const neighbor = mod(pos[1] + 1, row.length)
        if (row[neighbor] === '#') break
        pos[1] = neighbor
    }
    updatePosRow()
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
    const col = maze.map(row => row[pos[1]])
    // console.log(col)
    for (let i = 0; i < steps; i++) {
        let neighbour = mod(pos[0] - 1, col.length)
        if (col[neighbour] === ' ') neighbour = col.length - col.slice().reverse().findIndex(item => item !== ' ') - 1
        // console.log(i, pos[0], neighbour, col[pos[0]], col[neighbour])
        if (col[neighbour] === '#') return
        pos[0] = neighbour
    }
}

function moveDown(steps) {
    const col = maze.map(row => row[pos[1]])
    // console.log(col)
    for (let i = 0; i < steps; i++) {
        let neighbour = mod(pos[0] + 1, col.length)
        if (col[neighbour] === ' ') neighbour = col.findIndex(item => item !== ' ')
        // console.log(i, pos[0], neighbour, col[pos[0]], col[neighbour])
        if (col[neighbour] === '#') return
        pos[0] = neighbour
    }
}
