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
let res = 0

lineReader.on('line', (line) => {
    const [num, command, dir] = line.split(' ')
    let size = parseInt(num)
    if (command === 'cd') {
        dir === '..' ? dirs.pop() : dirs.push(dir)
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
    for (const [dir, size] of map) {
        const differenceResult = Math.abs(res - spaceNeeded)
        const differenceValue = Math.abs((spaceAvailable + size) - spaceNeeded)
        if (spaceAvailable + size >= spaceNeeded && differenceValue < differenceResult) {
            res = size
        }
    }
    console.log('Total:', res)
    // Total: 1117448
})

