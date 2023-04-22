/*
*        --- Day 25: Full of Hot Air ---
*               --- Part One ---
*             Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./sample.txt')
})

function simulation() {}

lineReader.on('line', line => {
    //grid.push(line.split(''))
}).on('close', () => simulation())
