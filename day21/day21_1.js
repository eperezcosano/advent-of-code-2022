/*
*           --- Day 21: Monkey Math ---
*               --- Part One ---
*             Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day21.txt')
})

const monkeys = new Map()

function solveMonkey(monkey) {
    const [firstMonkey, operation, secondMonkey] = monkeys.get(monkey).split(' ')
    if (!operation) return parseInt(firstMonkey)
    return eval([solveMonkey(firstMonkey), operation, solveMonkey(secondMonkey)].join(' '))
}

lineReader.on('line', (line) => {
    const [monkey, statement] = line.split(': ')
    monkeys.set(monkey, statement)
}).on('close', () => console.log('Result:', solveMonkey('root')))
// Result: 49288254556480
