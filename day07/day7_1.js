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
    for (let [dir, size] of map) {
        if (size <= 100000) {
            sum += size
        }
    }
    console.log('Total:', sum)
    // Total: 1543140
})
