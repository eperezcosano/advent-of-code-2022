/*
*   --- Day 9: Rope Bridge ---
*         --- Part Two ---
*       Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day9_input.txt')
})

const tx = new Array(10).fill(0)
const ty = new Array(10).fill(0)
const map = new Map()

lineReader.on('line', (line) => {
    const [move, steps] = line.split(' ')
    const dir = move.charCodeAt(0) / 3 - 1 & 3
    const mag = (-1 + (dir >> 1) * 2)
    for (let i = 0; i < parseInt(steps); i++) {
        tx[0] += mag * (~dir & 1)
        ty[0] += mag * (dir & 1)
        for (let n = 1; n < tx.length; n++) {
            let dx = tx[n - 1] - tx[n]
            let dy = ty[n - 1] - ty[n]
            if (Math.abs(dx) === 2 || Math.abs(dy) === 2) {
                tx[n] += Math.sign(dx)
                ty[n] += Math.sign(dy)
            }
        }
        map.set(tx[tx.length - 1] + ',' + ty[ty.length - 1], 1)
    }
})

lineReader.on('close', () => {
    console.log('Total:', map.size)
    // Total: 5930
})