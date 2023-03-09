/*
*           --- Day 22: Monkey Map ---
*               --- Part Two ---
*             Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./test3.txt')
})

const side = 5
const maze = []
const movements = []
let space = false
let pos = [0, side * 2]
let facing = 0
/*
    Right:  0
    Down:   1
    Left:   2
    Up:     3
 */

function test() {
    pos = [14, 2]
    facing = 0
    move(1)
}
function mod(n, m) {
    return ((n % m) + m) % m
}

function getRow() {
    if (pos[0] < side) {
        // 1st row
        const firstRow = maze[pos[0]].slice(side).map((item, index) => [item, [pos[0], index + side], facing])
        const thirdRowRev = maze[pos[0] + side * 2].map((item, index) => [item, [pos[0] + side * 2, index], mod(facing + 2, 4)]).reverse()
        return [...firstRow, ...thirdRowRev]
    } else if (pos[0] >= side && pos[0] < (side * 2)) {
        // 2nd row

    } else if (pos[0] >= (side * 2) && pos[0] < (side * 3)) {
        // 3rd row
        const thirdRow = maze[pos[0]].map((item, index) => [item, [pos[0], index], facing])
        const firstRowRev = maze[pos[0] - side * 2].slice(side).map((item, index) => [item, [pos[0] - side * 2, side + index], mod(facing + 2, 4)]).reverse()
        return [...thirdRow, ...firstRowRev]
    } else if (pos[0] >= (side * 3)) {
        // 4th row
    }
}

function getCol() {
    if (pos[1] < side) {
        // 1st col
        const firstCol = maze.slice(side * 2).map((row, index) => [row[pos[1]], [side * 2 + index, pos[1]], facing])
        const thirdCol = maze.slice(0, side).map((row, index) => [row[pos[1] + side * 2], [index, pos[1] + side * 2], facing])
        const secondRowRev = maze[pos[1] + side].slice(side).map((item, index) => [item, [pos[1] + side, side + index], mod(facing + 1, 4)]).reverse()
        return [...firstCol, ...thirdCol, ...secondRowRev]
    } else if (pos[1] >= side && pos[1] < (side * 2)) {
        // 2nd col
        const secondCol = maze.slice(0, side * 3).map((row, index) => [row[pos[1]], [index, pos[1]], facing])
        const fourthRowRev = maze[pos[1] + side * 2].map((item, index) => [item, [pos[1] + side * 2, index], mod(facing + 1, 4)]).reverse()
        return [...secondCol, ...fourthRowRev]
    } else if (pos[1] >= (side * 2)) {
        // 3rd col
        const thirdCol = maze.slice(0, side).map((row, index) => [row[pos[1]], [index, pos[1]], facing])
        const secondRowRev = maze[pos[1] - side].slice(side).map((item, index) => [item, [pos[1] - side, side + index], mod(facing + 1, 4)]).reverse()
        const firstCol = maze.slice(side * 2).map((row, index) => [row[pos[1] - side * 2], [side * 2 + index, pos[1] - side * 2], facing])
        return [...thirdCol, ...secondRowRev, ...firstCol]
    }
}
function move(steps) {
    const line = (facing % 2 === 0) ? getRow() : getCol()
    const direction = (facing < 2) ? 1 : -1
    let neighbor = line.findIndex(item => item[1][0] === pos[0] && item[1][1] === pos[1])
    //console.log(line)
    console.log(line, neighbor, line[neighbor], line.map(item => item[0]).join(''))
    for (let i = 0; i < steps; i++) {
        neighbor = mod(neighbor + direction, line.length)
        if (line[neighbor][0] === '#') break
        pos = line[neighbor][1]
        facing = line[neighbor][2]
    }
    console.log(pos, maze[pos[0]][pos[1]], facing)
}

function simulation() {
    for (let i = 0; i < movements.length; i++) {
        const steps = parseInt(movements[i])
        // console.log('Current pos', pos, facing, maze[pos[0]][pos[1]])
        if (steps) {
            // console.log('Move', facing, steps)
            // Move to the facing direction the number of steps
            move(steps)
        } else {
            // console.log('Turn', movements[i])
            // Turn clockwise (R) or counterclockwise (L)
            if (movements[i] === 'R') facing = mod(facing + 1, 4)
            else if (movements[i] === 'L') facing = mod(facing - 1, 4)
        }
    }
    // console.log(pos, facing)
    console.log('Result:', (pos[0] + 1) * 1000 + 4 * (pos[1] + 1) + facing)
}

lineReader.on('line', line => {
    if (!line) {
        space = true
        return
    }
    space ? movements.push(...line.match(/\d+|[LR]/g)) : maze.push(line.split(''))
}).on('close', () => test())

