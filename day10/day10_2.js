/*
*   --- Day 10: Cathode-Ray Tube ---
*         --- Part Two ---
*       Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day10_input.txt')
})

let cycle = 0
let x = 1
let crt = []

function nextCycle() {
    (cycle >= (x - 1) && cycle <= (x + 1)) ? crt.push('#') : crt.push('.')
    cycle++
    if (cycle % 40 === 0) {
        cycle -= 40
        crt.push('\n')
    }
}
lineReader.on('line', (line) => {
    nextCycle()
    if (line.startsWith('addx')) {
        for (let i = 0; i < 2; i++) {
            if (i === 1) {
                x += parseInt(line.split(' ')[1])
            } else {
                nextCycle()
            }
        }
    }
})

lineReader.on('close', () => {
    console.log(crt.join(''))
    // RGZEHURK
})