/*
*           --- Day 22: Monkey Map ---
*               --- Part One ---
*             Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day22.txt')
})

const maze = []
let movements = []
let space = false
let pos = [0, 0]
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

function simulation() {
    // Starting position at top leftmost
    pos = [0, maze[0].indexOf('.')]

    for (let i = 0; i < movements.length; i++) {
        const steps = parseInt(movements[i])
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
    console.log('Password:', password())
    // Password: 133174
}

function password() {
    return (pos[0] + 1) * 1000 + 4 * (pos[1] + 1) + facing
}

function mod(n, m) {
    return ((n % m) + m) % m
}

function moveRight(steps) {
    const row = maze[pos[0]]
    for (let i = 0; i < steps; i++) {
        let neighbour = mod(pos[1] + 1, row.length)
        if (row[neighbour] === ' ') neighbour = row.findIndex(item => item !== ' ')
        if (row[neighbour] === '#') return
        pos[1] = neighbour
    }
}

function moveLeft(steps) {
    const row = maze[pos[0]]
    for (let i = 0; i < steps; i++) {
        let neighbour = mod(pos[1] - 1, row.length)
        if (row[neighbour] === ' ') neighbour = row.length - row.slice().reverse().findIndex(item => item !== ' ') - 1
        if (row[neighbour] === '#') return
        pos[1] = neighbour
    }
}

function moveUp(steps) {
    const col = maze.map(row => row[pos[1]])
    for (let i = 0; i < steps; i++) {
        let neighbour = mod(pos[0] - 1, col.length)
        if (col[neighbour] === ' ') neighbour = col.length - col.slice().reverse().findIndex(item => item !== ' ') - 1
        if (col[neighbour] === '#') return
        pos[0] = neighbour
    }
}

function moveDown(steps) {
    const col = maze.map(row => row[pos[1]])
    for (let i = 0; i < steps; i++) {
        let neighbour = mod(pos[0] + 1, col.length)
        if (col[neighbour] === ' ') neighbour = col.findIndex(item => item !== ' ')
        if (col[neighbour] === '#') return
        pos[0] = neighbour
    }
}
