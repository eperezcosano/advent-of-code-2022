/*
*   --- Day 18: Boiling Boulders ---
*           --- Part Two ---
*         Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day18.txt')
})

const cubes = []

function hasCubeLeft(x, y, z) {
    return cubes.includes([x - 1, y, z].toString())
}

function hasCubeRight(x, y, z) {
    return cubes.includes([x + 1, y, z].toString())
}

function hasCubeTop(x, y, z) {
    return cubes.includes([x, y + 1, z].toString())
}

function hasCubeBottom(x, y, z) {
    return cubes.includes([x, y - 1, z].toString())
}

function hasCubeBack(x, y, z) {
    return cubes.includes([x, y, z + 1].toString())
}

function hasCubeFront(x, y, z) {
    return cubes.includes([x, y, z - 1].toString())
}

function countSides(x, y, z) {
    let count = 0
    if (hasCubeLeft(x, y, z)) count++
    if (hasCubeRight(x, y, z)) count++
    if (hasCubeTop(x, y, z)) count++
    if (hasCubeBottom(x, y, z)) count++
    if (hasCubeBack(x, y, z)) count++
    if (hasCubeFront(x, y, z)) count++
    return count
}

function getMinAndMax() {
    let min = Infinity
    let max = -Infinity
    for (const cube of cubes) {
        const [x, y, z] = cube.split(',').map(item => parseInt(item))
        min = Math.min(min, x, y, z)
        max = Math.max(max, x, y, z)
    }
    return [min, max]
}

function isOutbounds(x, y, z, min, max) {
    return x < min - 1 || y < min - 1 || z < min - 1 || x > max + 1 || y > max + 1 || z > max + 1
}

function getAdjacentCubes(x, y, z) {
    return [[x + 1, y, z], [x - 1, y, z], [x, y + 1, z], [x, y - 1, z], [x, y, z + 1], [x, y, z - 1]]
}

function countVisibleSides() {
    let sides = 0
    const visited = []
    const queue = [[0, 0, 0]]
    const [min, max] = getMinAndMax()
    while (queue.length) {
        const [x, y, z] = queue.shift()
        const cube = [x, y, z].toString()
        if (visited.includes(cube) || cubes.includes(cube)) continue
        if (isOutbounds(x, y, z, min, max)) continue
        visited.push(cube)
        sides += countSides(x, y, z)
        queue.push(...getAdjacentCubes(x, y, z))
    }
    console.log('Total:', sides)
    // Total: 2058
}

lineReader.on('line', line => {
    cubes.push(line)
}).on('close', () => countVisibleSides())