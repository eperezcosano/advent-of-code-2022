/*
*   --- Day 8: Treetop Tree House ---
*          --- Part One ---
*         Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day8_input.txt')
})

let grid = []
let res = 0

lineReader.on('line', (line) => grid.push(line))

function isOnEdge(i, j) {
    return j === 0 || j === grid[i].length - 1 || i === 0 || i === grid.length - 1
}

function isUpTall(i, j) {
    for (let n = i - 1; n >= 0; n--) {
        if (grid[n][j] >= grid[i][j]) return false
    }
    return true
}

function isDownTall(i, j) {
    for (let n = i + 1; n <= grid.length - 1; n++) {
        if (grid[n][j] >= grid[i][j]) return false
    }
    return true
}

function isLeftTall(i, j) {
    for (let k = j - 1; k >= 0; k--) {
        if (grid[i][k] >= grid[i][j]) return false
    }
    return true
}

function isRightTall(i, j) {
    for (let k = j + 1; k <= grid[i].length - 1; k++) {
        if (grid[i][k] >= grid[i][j]) return false
    }
    return true
}

lineReader.on('close', () => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (isOnEdge(i, j) || isUpTall(i, j) || isDownTall(i, j) || isLeftTall(i, j) || isRightTall(i, j)) {
                res++
            }
        }
    }
    console.log('Total:', res)
    // Total: 1845
})
