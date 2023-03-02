/*
*   --- Day 20: Grove Positioning System ---
*               --- Part Two ---
*             Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day20.txt')
})

let total = 0
const decKey = 811589153
const file = []

function getCoordinates() {
    const idZero = file.findIndex(x => x.num === 0)
    return [1000, 2000, 3000].reduce((acc, val) => acc + file[(idZero + val) % file.length].num, 0)
}

function mix() {
    const numbers = file.map(item => item.num)
    for (let n = 0; n < 10; n++) {
        for (let i = 0; i < numbers.length; i++) {
            const id = file.findIndex(item => item.id === i)
            file.splice(id, 1)
            const newId = (numbers[i] + id) % file.length
            file.splice(newId, 0, {num: numbers[i], id: i})
        }
    }
    console.log('Result:', getCoordinates())
    // Result: 7496649006261
}

lineReader.on('line', (line) => file.push({num: parseInt(line) * decKey, id: total++})).on('close', () => mix())
