/*
*   --- Day 2: Rock Paper Scissors ---
*               --- Part Two ---
*             Advent Of Code 2022
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day2_input.txt')
})

// A: Rock      (1pt)
// B: Paper     (2pt)
// C: Scissors  (3pt)
// X: Lose 0pt
// Y: Draw 3pt
// Z: Win  6pt

// - A B C
// X 3 1 2
// Y 4 5 6
// Z 8 9 7

const letter = {
    'A': 0,
    'B': 1,
    'C': 2,
    'X': 0,
    'Y': 1,
    'Z': 2
}

const points = [
    [3, 1, 2],
    [4, 5, 6],
    [8, 9, 7]
]

let score = 0

lineReader.on('line', (line) => {
    const [opponent, hand] = line.split(' ')
    score += points[letter[hand]][letter[opponent]]
})

lineReader.on('close', () => {
    console.log('Total score:', score)
    // Total score: 15702
})
