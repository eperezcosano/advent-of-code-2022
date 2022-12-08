/*
*   --- Day 8: Treetop Tree House ---
*          --- Part Two ---
*         Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day8_input.txt')
})

let grid = []
let score = 0

lineReader.on('line', (line) => grid.push(line))

function getScenicScore(i, j) {
    return getTreesUp(i, j) * getTreesDown(i, j) * getTreesLeft(i, j) * getTreesRight(i, j)
}

function getTreesUp(i, j) {
    let trees = 0
    for (let n = i - 1; n >= 0; n--) {
        if (grid[n][j] >= grid[i][j]) return trees + 1
        trees++
    }
    return trees
}

function getTreesDown(i, j) {
    let trees = 0
    for (let n = i + 1; n <= grid.length - 1; n++) {
        if (grid[n][j] >= grid[i][j]) return trees + 1
        trees++
    }
    return trees
}

function getTreesLeft(i, j) {
    let trees = 0
    for (let k = j - 1; k >= 0; k--) {
        if (grid[i][k] >= grid[i][j]) return trees + 1
        trees++
    }
    return trees
}

function getTreesRight(i, j) {
    let trees = 0
    for (let k = j + 1; k <= grid[i].length - 1; k++) {
        if (grid[i][k] >= grid[i][j])  return trees + 1
        trees++
    }
    return trees
}

lineReader.on('close', () => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let scenicScore = getScenicScore(i, j)
            scenicScore > score ? score = scenicScore : false
        }
    }
    console.log('Score:', score)
    // Score: 230112
})
