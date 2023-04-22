/*
*        --- Day 25: Full of Hot Air ---
*               --- Part One ---
*             Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day25.txt')
})

let sum = 0

function totalSum(snafu) {
    let exp = 1
    for (const x of snafu.split('').slice().reverse()) {
        sum += (['=', '-', '0', '1', '2'].indexOf(x) - 2) * exp
        exp *= 5
    }
}

function toSnafu() {
    let output = ''
    while (sum) {
        let remainder = sum % 5
        sum = Math.floor(sum / 5)
        if (remainder <= 2)
            output = remainder.toString() + output
        else {
            output = "   =-"[remainder] + output
            sum++
        }
    }
    return output
}

lineReader.on('line', line => {
    totalSum(line)
}).on('close', () => console.log('Result:', toSnafu()))
// Result: 2011-=2=-1020-1===-1
