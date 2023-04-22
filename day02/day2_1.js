/*
*   --- Day 2: Rock Paper Scissors ---
*               --- Part One ---
*             Advent Of Code 2022
* */

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day2_input.txt')
})

// A & X: Rock      (1pt)
// B & Y: Paper     (2pt)
// C & Z: Scissors  (3pt)
// Lost 0pt
// Draw 3pt
// Win  6pt

// - A B C
// X 4 1 7
// Y 8 5 2
// Z 3 9 6

const letter = {
    'A': 0,
    'B': 1,
    'C': 2,
    'X': 0,
    'Y': 1,
    'Z': 2
}

const points = [
    [4, 1, 7],
    [8, 5, 2],
    [3, 9, 6]
]

let score = 0

lineReader.on('line', (line) => {
    const [opponent, hand] = line.split(' ')
    score += points[letter[hand]][letter[opponent]]
})

lineReader.on('close', () => {
    console.log('Total score:', score)
    // Total score: 15523
})
