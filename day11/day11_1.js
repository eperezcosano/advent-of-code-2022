/*
*   --- Day 11: Monkey in the Middle ---
*         --- Part One ---
*       Advent Of Code 2022
* */

const monkeys = [
    {
        'items': [54, 61, 97, 63, 74],
        'operation': function(value) { return value * 7 },
        'test': function(value) { return value % 17 === 0 ? 5 : 3 }
    },
    {
        'items': [61, 70, 97, 64, 99, 83, 52, 87],
        'operation': function(value) { return value + 8 },
        'test': function(value) { return value % 2 === 0 ? 7 : 6 }
    },
    {
        'items': [60, 67, 80, 65],
        'operation': function(value) { return value * 13 },
        'test': function(value) { return value % 5 === 0 ? 1 : 6 }
    },
    {
        'items': [61, 70, 76, 69, 82, 56],
        'operation': function(value) { return value + 7 },
        'test': function(value) { return value % 3 === 0 ? 5 : 2 }
    },
    {
        'items': [79, 98],
        'operation': function(value) { return value + 2 },
        'test': function(value) { return value % 7 === 0 ? 0 : 3 }
    },
    {
        'items': [72, 79, 55],
        'operation': function(value) { return value + 1 },
        'test': function(value) { return value % 13 === 0 ? 2 : 1 }
    },
    {
        'items': [63],
        'operation': function(value) { return value + 4 },
        'test': function(value) { return value % 19 === 0 ? 7 : 4 }
    },
    {
        'items': [72, 51, 93, 63, 80, 86, 81],
        'operation': function(value) { return value * value },
        'test': function(value) { return value % 11 === 0 ? 0 : 4 }
    }
]

const business = [0, 0, 0, 0, 0, 0, 0, 0]

for (let n = 0; n < 20; n++) {
    for (let i = 0; i < monkeys.length; i++) {
        while (monkeys[i].items.length > 0) {
            let level = monkeys[i].items.shift()
            level = monkeys[i].operation(level)
            level = Math.floor(level / 3)
            let next = monkeys[i].test(level)
            monkeys[next].items.push(level)
            business[i]++
        }
    }
}

business.sort((a, b) => (a > b) ? -1 : 1)

console.log('Monkey Business:', business[0] * business[1])
// Monkey Business: 50172