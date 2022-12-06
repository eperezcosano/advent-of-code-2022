/*
*   --- Day 5: Supply Stacks ---
*        --- Part Two ---
*       Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day5_input.txt')
})

/*
    [H]         [D]     [P]
[W] [B]         [C] [Z] [D]
[T] [J]     [T] [J] [D] [J]
[H] [Z]     [H] [H] [W] [S]     [M]
[P] [F] [R] [P] [Z] [F] [W]     [F]
[J] [V] [T] [N] [F] [G] [Z] [S] [S]
[C] [R] [P] [S] [V] [M] [V] [D] [Z]
[F] [G] [H] [Z] [N] [P] [M] [N] [D]
 1   2   3   4   5   6   7   8   9
*/

const crates = [
    ['W', 'T', 'H', 'P', 'J', 'C', 'F'].reverse(),
    ['H', 'B', 'J', 'Z', 'F', 'V', 'R', 'G'].reverse(),
    ['R', 'T', 'P', 'H'].reverse(),
    ['T', 'H', 'P', 'N', 'S', 'Z'].reverse(),
    ['D', 'C', 'J', 'H', 'Z', 'F', 'V', 'N'].reverse(),
    ['Z', 'D', 'W', 'F', 'G', 'M', 'P'].reverse(),
    ['P', 'D', 'J', 'S', 'W', 'Z', 'V', 'M'].reverse(),
    ['S', 'D', 'N'].reverse(),
    ['M', 'F', 'S', 'Z', 'D'].reverse()
]

lineReader.on('line', (line) => {
    const [, quantity, , from, , to] = line.split(' ').map(value => parseInt(value))
    let crate = []
    for (let i = 0; i < quantity; i++) {
        crate.push(crates[from - 1].pop())
    }
    crate.reverse().forEach(item => crates[to - 1].push(item))
})

lineReader.on('close', () => {
    const res = crates.map(crate => crate[crate.length - 1]).join('')
    console.log('Result:', res)
    // Result: ZFSJBPRFP
})
