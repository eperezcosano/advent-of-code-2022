/*
*       --- Day 24: Blizzard Basin ---
*               --- Part One ---
*             Advent Of Code 2022
* */
const {lcm, mod} = require('mathjs')
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day24.txt')
})

const grid = []
const blizzards = Array.from({ length: 4 }, () => new Set())

function bfs() {
    const maxY = grid.length - 1
    const maxX = grid[0].length - 1
    const repetition = lcm(maxY, maxX)
    const queue = []
    const seen = new Set()
    queue.push([0, -1, 0])
    while (queue.length) {
        let [time, y, x] = queue.shift()
        time++
        for (const [dy, dx] of [[0, 1], [0, -1], [-1, 0], [1, 0], [0, 0]]) {
            const [nextY, nextX] = [y + dy, x + dx]
            if (nextY === maxY && nextX === maxX - 1)
                return time
            if ((nextY < 0 || nextX < 0 || nextY >= maxY || nextX >= maxX) && !(nextY === -1 && nextX === 0))
                continue

            let canMove = true
            if (!(nextY === -1 && nextX === 0)) {
                for (const [direction, [testY, testX]] of [[0, -1], [0, 1], [-1, 0], [1, 0]].entries()) {
                    const stateY = mod(nextY - testY * time, maxY)
                    const stateX = mod(nextX - testX * time, maxX)
                    if (blizzards[direction].has(`${stateY}-${stateX}`)) {
                        canMove = false
                        break
                    }
                }
            }
            if (canMove) {
                const key = [nextY, nextX, mod(time, repetition)].join('-')
                if (seen.has(key)) continue
                seen.add(key)
                queue.push([time, nextY, nextX])
            }
        }
    }
}

function isBlizzard(char) {
    return ['<', '>', '^', 'v'].includes(char)
}

function getBlizzardDirection(char) {
    return ['<', '>', '^', 'v'].indexOf(char)
}

function mapBlizzard(y, x) {
    const direction = getBlizzardDirection(grid[y][x])
    blizzards[direction].add(`${y}-${x}`)
}

function mapBlizzards() {
    for (let y = 0; y < grid.length - 1; y++) {
        for (let x = 0; x < grid[y].length - 1; x++) {
            if (isBlizzard(grid[y][x])) mapBlizzard(y, x)
        }
    }
}

function cropGrid() {
    grid.shift()
    grid.forEach(row => row.shift())
}

function simulation() {
    cropGrid()
    mapBlizzards()
    console.log('Result:', bfs())
    // Result: 247
}

lineReader.on('line', line => {
    grid.push(line.split(''))
}).on('close', () => simulation())
