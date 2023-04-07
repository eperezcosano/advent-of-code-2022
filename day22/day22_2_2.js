/*
*           --- Day 22: Monkey Map ---
*               --- Part Two ---
*             Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day22.txt')
})

const side = 50
const maze = []
let movements = []
let space = false
let [row, col] = [0, side]
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
}).on('close', () => simulation())

function password() {
    return (row + 1) * 1000 + (col + 1) * 4 + facing
}

function mod(n, m) {
    return ((n % m) + m) % m
}

function nextPos() {
    switch (facing) {
        case 0: return [row, col + 1]
        case 1: return [row + 1, col]
        case 2: return [row, col - 1]
        case 3: return [row - 1, col]
    }
}

function inRange(variable, from) {
    return (variable >= from && variable < (from + side))
}

function simulation() {
    for (let i = 0; i < movements.length; i++) {
        const steps = parseInt(movements[i])
        if (steps) {
            for (let j = 0; j < steps; j++) {
                let prevFacing = facing
                let [y, x] = nextPos()
                console.log('Pre', x, y, facing)
                if (facing === 3 && y < 0 && inRange(x, side)) {                        // 1
                    console.log('1')
                    facing = 0
                    y = x + side * 2
                    x = 0
                } else if (facing === 2 && x < 0 && inRange(y, side * 3)) {        // 2
                    console.log('2')
                    facing = 1
                    x = y - side * 2
                    y = 0
                } else if (facing === 3 && y < 0 && inRange(x, side * 2)) {         // 3
                    console.log('3')
                    y = side * 4 - 1
                    x = x - side * 2
                } else if (facing === 1 && y >= side * 4 && inRange(x, 0)) {        // 4
                    console.log('4')
                    y = 0
                    x = x + side * 2
                } else if (facing === 0 && x >= side * 3 && inRange(y, 0)) {        // 5
                    console.log('5')
                    facing = 2
                    y = side * 3 - 1 - y
                    x = side * 2 - 1
                } else if (facing === 0 && x === side * 2 && inRange(y, side * 2)) { // 6
                    console.log('6')
                    facing = 2
                    y = side * 3 - 1 - y
                    x = side * 3 - 1
                } else if (facing === 1 && y === side && inRange(x, side * 2)) {     // 7
                    console.log('7')
                    facing = 2
                    y = x - side
                    x = side * 2 - 1
                } else if (facing === 0 && x === side * 2 && inRange(y, side)) {         // 8
                    console.log('8')
                    facing = 3
                    x = y + side
                    y = side * 2 - 1
                } else if (facing === 1 && y === side * 3 && inRange(x, side)) {         // 9
                    console.log('9')
                    facing = 2
                    y = x + side * 2
                    x = side - 1
                } else if (facing === 0 && x === side && inRange(y, side * 3)) {    // 10
                    console.log('10')
                    facing = 3
                    x = y - side * 2
                    y = side * 3 - 1
                } else if (facing === 3 && y === side * 2 - 1 && inRange(x, 0)) {        // 11
                    console.log('11')
                    facing = 0
                    y = x + side
                    x = side
                } else if (facing === 2 && x === side - 1 && inRange(y, side)) {              // 12
                    console.log('12')
                    facing = 1
                    x = y - side
                    y = side * 2
                } else if (facing === 2 && x === side - 1 && inRange(y, 0)) {            // 13
                    console.log('13')
                    facing = 0
                    y = side * 3 - 1 - y
                    x = 0
                } else if (facing === 2 && x < 0 && inRange(y, side * 2)) {
                    console.log('14')
                    facing = 0
                    y = side * 3 - 1 - y
                    x = side
                }
                console.log('Post', x, y, facing)
                if (maze[y][x] === '#') {
                    facing = prevFacing
                    break
                }
                row = y
                col = x
            }
        } else {
            if (movements[i] === 'R') facing = mod(facing + 1, 4)
            else if (movements[i] === 'L') facing = mod(facing - 1, 4)
        }
    }
    console.log(password())
}
