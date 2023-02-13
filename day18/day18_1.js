/*
*   --- Day 18: Boiling Boulders ---
*           --- Part One ---
*         Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./test.txt')
})

lineReader.on('line', line => {
    const [x, y, z] = line.split(',').map(item => parseInt(item))
    console.log(x, y, z)
})