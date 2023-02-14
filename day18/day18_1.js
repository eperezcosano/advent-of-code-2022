/*
*   --- Day 18: Boiling Boulders ---
*           --- Part One ---
*         Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day18.txt')
})

const grid = []

lineReader.on('line', line => {
    const [x, y, z] = line.split(',').map(item => parseInt(item))
    grid.push({x, y, z})
}).on('close', () => countSides())

function isAdjacentX(item) {
    return grid.find(cube => cube.x === item.x + 1 && cube.y === item.y && cube.z === item.z)
}

function isAdjacentY(item) {
    return grid.find(cube => cube.x === item.x && cube.y === item.y + 1 && cube.z === item.z)
}

function isAdjacentZ(item) {
    return grid.find(cube => cube.x === item.x && cube.y === item.y && cube.z === item.z + 1)
}

function countSides() {
    let totalSides = grid.length * 6
    for (const cube of grid) {
        if (isAdjacentX(cube)) totalSides -= 2
        if (isAdjacentY(cube)) totalSides -= 2
        if (isAdjacentZ(cube)) totalSides -= 2
    }
    console.log('Total:', totalSides)
    // Total: 3390
}
