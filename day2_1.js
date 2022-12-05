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

const points = [
    [4, 1, 7],
    [8, 5, 2],
    [3, 9, 6]
]

let score = 0

lineReader.on('line', (line) => {
    const round = line.split(' ')
    const opponent = round[0]
    const hand = round[1]
    if (opponent === 'A' && hand === 'X') score += points[0][0]
    else if (opponent === 'B' && hand === 'X') score += points[0][1]
    else if (opponent === 'C' && hand === 'X') score += points[0][2]
    else if (opponent === 'A' && hand === 'Y') score += points[1][0]
    else if (opponent === 'B' && hand === 'Y') score += points[1][1]
    else if (opponent === 'C' && hand === 'Y') score += points[1][2]
    else if (opponent === 'A' && hand === 'Z') score += points[2][0]
    else if (opponent === 'B' && hand === 'Z') score += points[2][1]
    else if (opponent === 'C' && hand === 'Z') score += points[2][2]
})

lineReader.on('close', () => {
    console.log('Total score:', score)
    // Total score: 15523
})
