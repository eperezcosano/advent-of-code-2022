/*
*           --- Day 21: Monkey Math ---
*               --- Part Two ---
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

function involvesHuman(monkey) {
    const [firstMonkey, operation, secondMonkey] = monkeys.get(monkey).split(' ')
    if (!operation) return false
    if (firstMonkey === 'humn' || secondMonkey === 'humn') return true
    return involvesHuman(firstMonkey) || involvesHuman(secondMonkey)
}

function solveHuman(monkey, number) {
    let [firstMonkey, operation, secondMonkey] = monkeys.get(monkey).split(' ')
    let notHuman
    if (firstMonkey === 'humn') notHuman = secondMonkey
    if (secondMonkey === 'humn') notHuman = firstMonkey

    // Last iteration
    if (notHuman) {
        switch (operation) {
            case '+': return number - solveMonkey(notHuman)
            case '-': return number + solveMonkey(notHuman)
            case '*': return number / solveMonkey(notHuman)
            case '/': return number * solveMonkey(notHuman)
        }
    }

    const firstMonkeyInvolvesHuman = !!involvesHuman(firstMonkey)
    if (!firstMonkeyInvolvesHuman) {
        [firstMonkey, secondMonkey] = [secondMonkey, firstMonkey]
    }

    switch (operation) {
        case '+': return solveHuman(firstMonkey, number - solveMonkey(secondMonkey))
        case '-': return solveHuman(firstMonkey, solveMonkey(secondMonkey) + (firstMonkeyInvolvesHuman ? number : (-1 * number)))
        case '*': return solveHuman(firstMonkey, number / solveMonkey(secondMonkey))
        case '/': return solveHuman(firstMonkey, solveMonkey(secondMonkey) * (firstMonkeyInvolvesHuman ? number : (1 / number)))
    }
}

function solve() {
    const [firstMonkey, , secondMonkey] = monkeys.get('root').split(' ')
    let res
    if (involvesHuman(firstMonkey)) {
        res = solveHuman(firstMonkey, solveMonkey(secondMonkey))
    } else {
        res = solveHuman(secondMonkey, solveMonkey(firstMonkey))
    }
    console.log('Result:', res)
    // Result: 3558714869436
}

lineReader.on('line', (line) => {
    const [monkey, statement] = line.split(': ')
    monkeys.set(monkey, statement)
}).on('close', () => solve())
