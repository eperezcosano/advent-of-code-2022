/*
*   --- Day 18: Boiling Boulders ---
*           --- Part One ---
*         Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./test.txt')
})
// 1,1,1 and 2,1,1 is 10
// Test input is 64

const grid = []

lineReader.on('line', line => {
    const [x, y, z] = line.split(',').map(item => parseInt(item))
    grid.push({x, y, z})
}).on('close', () => test())

function isAdjacentX(item) {
    return grid.find(cube => (Math.abs(cube.x - item.x) === 1) && cube.y === item.y && cube.z === item.z)
}

function isAdjacentY(item) {
    return grid.find(cube => cube.x === item.x && (Math.abs(cube.y - item.y) === 1) && cube.z === item.z)
}

function isAdjacentZ(item) {
    return grid.find(cube => cube.x === item.x && cube.y === item.y && (Math.abs(cube.z - item.z) === 1))
}


function test() {
    // TEST
    //console.log(grid)
    let totalSides = grid.length * 6
    console.log(totalSides)
    for (const cube of grid) {
        if (isAdjacentX(cube) || isAdjacentY(cube) || isAdjacentZ(cube)) totalSides -= 2
    }
    console.log(totalSides)

}
