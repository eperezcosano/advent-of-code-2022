/*
*   --- Day 1: Calorie Counting ---
*          --- Part One ---
*        Advent Of Code 2022
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day1_input.txt')
})

let sum = 0
let calories = []

lineReader.on('line', (line) => {
    if (!isNaN(parseInt(line))) sum += parseInt(line)
    else {
        calories.push(sum)
        sum = 0
    }
})

lineReader.on('close', () => {
    calories.sort((a, b) => {
        return (a > b) ? -1 : 1
    })
    console.log('Total:', calories[0])
    // Total: 70296
})
