/*
*       --- Day 24: Blizzard Basin ---
*               --- Part One ---
*             Advent Of Code 2022
* */
const {lcm} = require('mathjs')
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./sample.txt')
})

let [maxY, maxX] = [0, 0]
let repetition = 0
const grid = []
const blizzards = Array.from({ length: 4 }, () => new Set())

function mod(n, m) {
    return ((n % m) + m) % m
}


function bfs() {
    const queue = []
    const seen = new Set()
    queue.push([0, 0, 1])
    while (queue.length) {
        let [time, y, x] = queue.shift()
        time++
        for (const [dy, dx] of [[0, 1], [0, -1], [-1, 0], [1, 0], [0, 0]]) {
            const [nextY, nextX] = [y + dy, x + dx]

            if (nextY === maxY && nextX === maxX - 1) return time

            if ((nextY < 1 || nextX < 1 || nextY > maxY || nextX > maxX) && (nextY !== 0 && nextX !== 1))
                continue

            let canMove = true
            if (nextY !== 0 && nextX !== 1) {
                for (const [direction, [testY, testX]] of [[0, -1], [0, 1], [-1, 0], [1, 0]].entries()) {
                    const state = [mod(nextY - testY * time, maxY), mod(nextX - testX * time, maxX)]
                    if (blizzards[direction].has(state.join('-'))) {
                        canMove = false
                        break
                    }
                }
            }
            if (canMove) {
                const key = [nextY, nextX, time % repetition].join('-')
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
    blizzards[direction].add(`${y - 1}-${x - 1}`)
}

function mapBlizzards() {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (isBlizzard(grid[y][x])) mapBlizzard(y, x)
        }
    }
}

function printGrid() {
    grid.forEach(row => console.log(row.join('')))
}


function simulation() {
    [maxY, maxX] = [grid.length - 1, grid[grid.length - 1].length - 1]
    repetition = lcm(maxY, maxX)
    console.log(bfs())
}

lineReader.on('line', line => {
    grid.push(line.split(''))
}).on('close', () => simulation())