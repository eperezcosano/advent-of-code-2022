/*
*   --- Day 10: Cathode-Ray Tube ---
*         --- Part One ---
*       Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day10_input.txt')
})

let cycle = 0
let x = 1
let signal = 0

function nextCycle() {
    cycle++
    if (cycle === 20 || cycle > 20 && (cycle - 20) % 40 === 0) {
        signal += cycle * x
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
    console.log('Total:', signal)
    // Total: 14860
})