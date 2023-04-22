/*
*   --- Day 3: Rucksack Reorganization ---
*               --- Part One ---
*             Advent Of Code 2022
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day3_input.txt')
})

function getPriority(letter) {
    return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(letter) + 1
}

let sum = 0

lineReader.on('line', (line) => {
    const [first, second] = [line.slice(0, line.length / 2), line.slice(line.length / 2)]
    for (let n in first) {
        if (second.includes(first[n])) {
            sum += getPriority(first[n])
            break
        }
    }
})

lineReader.on('close', () => {
    console.log('Total:', sum)
    // Total: 7917
})
