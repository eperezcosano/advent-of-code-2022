/*
*   --- Day 8: Treetop Tree House ---
*          --- Part One ---
*         Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./test.txt')
})

let grid = []
let res = 0

lineReader.on('line', (line) => grid.push(line))

function visibleFromTop(tree, i , j) {
    if (i <= 0) return false
    for (let n = i; n < i; n++) {
        if (tree > grid[])
    }
}

lineReader.on('close', () => {
    console.log(grid)
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (j === 0 || j === grid[i].length - 1 || i === 0 || i === grid.length - 1) {
                // Edges
                res++
            } else if (i > 0 && grid[i][j] > grid[i - 1][j]) {
                // Up
                res++
            } else if (i < grid.length - 1 && grid[i][j] > grid[i + 1][j]) {
                // Down
                res++
            } else if (j > 0 && grid[i][j] > grid[i][j - 1]) {
                // Left
                res++
            } else if (j < grid[i].length - 1 && grid[i][j] > grid[i][j + 1]) {
                // Right
                res++
            }
        }
    }
    console.log(res)
    // 6832
})
