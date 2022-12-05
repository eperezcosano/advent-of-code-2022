/*
*   --- Day 4: Camp Cleanup ---
*        --- Part One ---
*       Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day4_input.txt')
})

function range([start, stop]) {
    return Array(Math.ceil(parseInt(stop) - parseInt(start) + 1))
        .fill(parseInt(start))
        .map((x, y) => x + y)
}

let sum = 0

lineReader.on('line', (line) => {
    const elf = line.split(',')
    const [first, second] = [range(elf[0].split('-')), range(elf[1].split('-'))]
    if (first.every(value => second.includes(value)) || second.every(value => first.includes(value))) {
        sum++
    }
})

lineReader.on('close', () => {
    console.log('Total:', sum)
    // Total: 441
})
