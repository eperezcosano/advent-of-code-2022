/*
*   --- Day 6: Tuning Trouble ---
*        --- Part Two ---
*       Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day6_input.txt')
})

const marker = 14
let last = []
let res = 0

lineReader.on('line', (line) => {
    for (let n = 0; n < line.length; n++) {
        if (last.length < marker - 1) {
            last.push(line[n])
            continue
        }
        if (!last.includes(line[n]) && (new Set(last)).size === last.length) {
            res = n + 1
            break
        } else {
            last.shift()
            last.push(line[n])
        }
    }
})

lineReader.on('close', () => {
    console.log('Result:', res)
    // Result: 3120
})
