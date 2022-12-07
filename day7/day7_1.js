/*
*   --- Day 7: No Space Left On Device ---
*               --- Part One ---
*             Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day7_input.txt')
})

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
    for (const value of map) {
        if (value[1] <= 100000) {
            sum += value[1]
        }
    }
    console.log('Total:', sum)
    // Total: 1543140
})
