/*
*   --- Day 3: Rucksack Reorganization ---
*               --- Part Two ---
*             Advent Of Code 2022
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day3_input.txt')
})

function getPriority(letter) {
    return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(letter) + 1
}

let sum = 0
let i = 1
let group = []

lineReader.on('line', (line) => {
    group.push(line)
    if (i % 3 === 0) {
        for (let n in group[0]) {
            if (group[1].includes(group[0][n]) && group[2].includes(group[0][n])) {
                sum += getPriority(group[0][n])
                break
            }
        }
        group = []
    }
    i++
})

lineReader.on('close', () => {
    console.log('Total:', sum)
    // Total: 2585
})
