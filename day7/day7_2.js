/*
*   --- Day 7: No Space Left On Device ---
*               --- Part Two ---
*             Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day7_input.txt')
})

const spaceNeeded = 30000000
let spaceAvailable = 70000000
let dirs = []
let map = new Map()
let sum = 0

lineReader.on('line', (line) => {
    const cmd = line.split(' ')
    let size = parseInt(cmd[0])
    if (cmd[1] === 'cd') {
        cmd[2] === '..' ? dirs.pop() : dirs.push(cmd[2])
    } else if (!isNaN(size)) {
        let path = ''
        for (let i = 0; i < dirs.length; i++) {
            path += dirs[i]
            let total = size
            if (map.get(path)) {
                total += parseInt(map.get(path))
            }
            map.set(path, total)
        }
    }
})

lineReader.on('close', () => {
    spaceAvailable -= map.get('/')
    for (const value of map) {
        const differenceResult = Math.abs(sum - spaceNeeded)
        const differenceValue = Math.abs((spaceAvailable + value[1]) - spaceNeeded)
        if (spaceAvailable + value[1] >= spaceNeeded && differenceValue < differenceResult) {
            sum = value[1]
        }
    }
    console.log('Total:', sum)
    // Total: 1117448
})

