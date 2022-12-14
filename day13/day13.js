/*
*   --- Day 13: Distress Signal ---
*          Advent Of Code 2022
* */
const fs = require('fs')
const input = fs.readFileSync('./day13_input.txt', { encoding: 'utf-8'})
    .replace(/\r/g, '')
    .trim()

function getInput1() {
    return input.split('\n\n').map(group => {
        const [left, right] = group.split('\n').map(line => JSON.parse(line))
        return {left, right}
    })
}

function getInput2() {
    return input.replace(/\n\n/g, '\n').split('\n').map(line => JSON.parse(line))
}

function checkOrder(left, right, result) {
    const leftIsNumber = typeof left === 'number'
    const rightIsNumber = typeof right === 'number'
    if (leftIsNumber && rightIsNumber) {
        if (left < right) result.rightOrder = true
        else if (left > right) result.rightOrder = false
    } else if (!leftIsNumber && !rightIsNumber) {
        let index = 0
        while (true) {
            if (index > left.length - 1 && index <= right.length - 1) {
                result.rightOrder = true
                return
            } else if (index <= left.length - 1 && index > right.length -1) {
                result.rightOrder = false
                return
            } else if (index > left.length - 1 && index > right.length - 1) {
                return
            }

            checkOrder(left[index], right[index], result)
            if (typeof result.rightOrder !== 'undefined') return
            index++
        }
    } else {
        if (leftIsNumber) checkOrder([left], right, result)
        else checkOrder(left, [right], result)
    }
}

function part1() {
    const res = getInput1().map(({left, right}, index) => {
        let result = {}
        checkOrder(left, right, result)
        return result.rightOrder ? index + 1 : 0
    })
    .reduce((a,b) => a + b, 0)
    console.log('Part One:', res)
}

function part2() {
    const strings = getInput2().concat([[[2]], [[6]]]).sort((a, b) => {
        const result = {}
        checkOrder(a, b, result)
        return result.rightOrder ? -1 : 1
    })
    .map(item => JSON.stringify(item))

    const pos2 = strings.indexOf('[[2]]') + 1
    const pos6 = strings.indexOf('[[6]]') + 1
    console.log('Part Two:', pos2 * pos6)
}

part1()
part2()