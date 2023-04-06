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
let row = 0
let col = side
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
    return (row + 1) * 1000 + 4 * (col + 1) + facing
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

function simulation() {
    for (let i = 0; i < movements.length; i++) {
        const steps = parseInt(movements[i])
        if (steps) {
            for (let j = 0; j < steps; j++) {
                let prevFacing = facing
                let [y, x] = nextPos()
                console.log(x, y, facing)
                if (facing === 3 && y < 0 && x >= side && x < side * 2) {
                    facing = 0
                    y = x + side * 2
                    x = 0
                } else if (facing === 2 && x < 0 && y >= side * 3 && y < side * 4) {
                    facing = 1
                    y = 0
                    x = y - side * 2
                } else if (facing === 3 && y < 0 && x >= side * 2 && x < side * 3) {
                    y = side * 4 - 1
                    x = x - side * 2
                } else if (facing === 1 && y >= side * 4 && x >= 0 && x < side) {
                    y = 0
                    x = x + side * 2
                } else if (facing === 0 && x >= side * 3 && y >= 0 && y < side) {
                    facing = 2
                    y = side * 3 - 1 - y
                    x = side * 2 - 1
                } else if (facing === 0 && x >= side * 2 && y >= side * 2 && y < side * 3) {
                    facing = 2
                    y = side * 3 - 1 - y
                    x = side * 3 - 1
                } else if (facing === 1 && y >= side && x >= side * 3 && x < side * 4) {
                    facing = 2
                    y = x - side
                    x = side * 2 - 1
                } else if (facing === 0 && x >= side * 2 && y >= side && y < side * 2) {
                    facing = 3
                    y = side * 2 - 1
                    x = y + side * 2
                } else if (facing === 1 && y >= side * 3 && x >= side && x < side * 2) {
                    facing = 2
                    y = x + side * 2
                    x = side - 1
                } else if (facing === 0 && x >= side && y >= side * 3 && y < side * 4) {
                    facing = 3
                    y = side * 3 - 1
                    x = y - side * 2
                } else if (facing === 3 && y >= side * 2 && x >= 0 && x < side) {
                    facing = 0
                    y = x + side
                    x = side
                } else if (facing === 2 && x < side && y >= side && y < side * 2) {
                    facing = 1
                    y = side * 2
                    x = y - side
                } else if (facing === 2 && x < side && y >= 0 && y < side) {
                    facing = 0
                    y = side * 3 - 1 - y
                    x = 0
                } else if (facing === 2 && x < 0 && y >= side * 2 && y < side * 3) {
                    facing = 0
                    y = side * 3 - 1 - y
                    x = side
                }

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
