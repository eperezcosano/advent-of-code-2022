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

const points = [
    [3, 1, 2],
    [4, 5, 6],
    [8, 9, 7]
]

let score = 0

lineReader.on('line', (line) => {
    const [opponent, hand] = line.split(' ')
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
    // Total score: 15702
})
