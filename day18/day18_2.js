/*
*   --- Day 18: Boiling Boulders ---
*           --- Part Two ---
*         Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./test.txt')
})

const grid = [
    // Floor
    {x: 2, y: 1, z: 2},
    {x: 3, y: 1, z: 2},
    {x: 4, y: 1, z: 2},
    // Ceiling
    {x: 2, y: 3, z: 2},
    {x: 3, y: 3, z: 2},
    {x: 4, y: 3, z: 2},
    // Back
    {x: 2, y: 2, z: 3},
    {x: 3, y: 2, z: 3},
    {x: 4, y: 2, z: 3},
    // Front
    {x: 2, y: 2, z: 1},
    {x: 3, y: 2, z: 1},
    {x: 4, y: 2, z: 1},
    // Left
    {x: 1, y: 2, z: 2},
    // Right
    {x: 5, y: 2, z: 2}
]
const N = 20

lineReader.on('line', line => {
    const [x, y, z] = line.split(',').map(item => parseInt(item))
    //grid.push({x, y, z})
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

function hasCubeLeft(x, y, z) {
    return grid.find(cube => cube.x === x - 1 && cube.y === y && cube.z === z)
}

function hasCubeRight(x, y, z) {
    return grid.find(cube => cube.x === x + 1 && cube.y === y && cube.z === z)
}

function hasCubeTop(x, y, z) {
    return grid.find(cube => cube.x === x && cube.y === y + 1 && cube.z === z)
}

function hasCubeBottom(x, y, z) {
    return grid.find(cube => cube.x === x && cube.y === y - 1 && cube.z === z)
}

function hasCubeFront(x, y, z) {
    return grid.find(cube => cube.x === x && cube.y === y && cube.z === z + 1)
}

function hasCubeBack(x, y, z) {
    return grid.find(cube => cube.x === x && cube.y === y && cube.z === z - 1)
}

function isAirPocket(x, y, z) {
    return !!grid.find(cube => cube.x > x && cube.y === y && cube.z === z) &&
        !!grid.find(cube => cube.x < x && cube.y === y && cube.z === z) &&
        !!grid.find(cube => cube.x === x && cube.y > y && cube.z === z) &&
        !!grid.find(cube => cube.x === x && cube.y < y && cube.z === z) &&
        !!grid.find(cube => cube.x === x && cube.y === y && cube.z > z) &&
        !!grid.find(cube => cube.x === x && cube.y === y && cube.z < z)
}

function getFaces(cube) {
    return [
        {x: cube.x + 1, y: cube.y, z: cube.z},
        {x: cube.x - 1, y: cube.y, z: cube.z},
        {x: cube.x, y: cube.y + 1, z: cube.z},
        {x: cube.x, y: cube.y - 1, z: cube.z},
        {x: cube.x, y: cube.y, z: cube.z + 1},
        {x: cube.x, y: cube.y, z: cube.z - 1}
    ]
}

function sameCubes(cubeA, cubeB) {
    return cubeA.x === cubeB.x && cubeA.y === cubeB.y && cubeA.z && cubeB.z
}

function countSides() {
    let totalSides = grid.length * 6
    console.log('Total Faces', totalSides)
    for (const cube of grid) {
        if (isAdjacentX(cube)) totalSides -= 2
        if (isAdjacentY(cube)) totalSides -= 2
        if (isAdjacentZ(cube)) totalSides -= 2
    }
    console.log('Total Sides', totalSides)
    for (let x = -5; x < N; x++) {
        for (let y = -5; y < N; y++) {
            for (let z = -5; z < N; z++) {
                if (grid.find(cube => cube.x === x && cube.y === y && cube.z === z)) continue
                if (isAirPocket(x, y, z)) {
                    console.log('Air Pocket', x, y, z)
                    if (hasCubeLeft(x, y, z)) totalSides--
                    if (hasCubeTop(x, y, z)) totalSides--
                    if (hasCubeBottom(x, y, z)) totalSides--
                    if (hasCubeRight(x, y, z)) totalSides--
                    if (hasCubeFront(x, y, z)) totalSides--
                    if (hasCubeBack(x, y, z)) totalSides--
                }
            }
        }
    }
    console.log('Total:', totalSides)
    // Total:
}
