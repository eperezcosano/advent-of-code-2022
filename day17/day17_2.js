/*
*   --- Day 17: Pyroclastic Flow ---
*           --- Part Two ---
*         Advent Of Code 2022
* */

const readline = require('readline')

let jetPattern
const lineReader = readline.createInterface({
    input: require('fs').createReadStream('./day17.txt')
})
lineReader.on('line', (line) => jetPattern = line).on('close', () => simulation())

let room = []
let offset = 0
let cache = new Map()
const TOTAL_ROCKS = 1_000_000_000_000

async function simulation() {
    for (let i = 0, n = 0; i < TOTAL_ROCKS; i++) {
        let rockIndex = i % 5
        let rock = getRock(rockIndex)
        addThreeSpacesUp()
        while (true) {
            const jetIndex = n++ % jetPattern.length
            const direction = jetPattern[jetIndex]
            if (canMoveToSide(direction, rock)) moveToSide(direction, rock)
            if (canMoveDown(rock)) {
                moveDown(rock)
            } else {
                const restingRock = rock.map(row => row.map(item => item.replace('@', '#')))
                for (let i = restingRock.length - 1; i >= 0; i--) {
                    room.unshift(restingRock[i])
                }
                const state = [jetIndex, rockIndex, getTop()].toString()
                if (cache.has(state)) {
                    let [stateIteration, stateHeight] = cache.get(state)
                    let remainingIterations = TOTAL_ROCKS - i
                    let repetition = Math.floor(remainingIterations / (i - stateIteration))
                    offset = repetition * (room.length - stateHeight)
                    i += repetition * (i - stateIteration)
                    cache = new Map()
                }
                cache.set(state, [i, room.length])
                break
            }
        }
    }
    console.log(room.length + offset)
}

function getTop() {
    let levels = []
    for (let i = 0; i < 7; i++) {
        const col = room.map(row => row[i])
        let topEdge = col.indexOf('#')
        levels.push(topEdge)
    }
    const max = Math.max(...levels)
    return levels.map(level => level - max)
}

function addThreeSpacesUp() {
    for (let i = 0; i < 3; i++) {
        room.unshift('.......'.split(''))
    }
}

function getRock(i) {
    switch (i) {
        case 0:
            return [
                '..@@@@.'.split('')
            ]
        case 1:
            return [
                '...@...'.split(''),
                '..@@@..'.split(''),
                '...@...'.split('')
            ]
        case 2:
            return [
                '....@..'.split(''),
                '....@..'.split(''),
                '..@@@..'.split('')
            ]
        case 3:
            return [
                '..@....'.split(''),
                '..@....'.split(''),
                '..@....'.split(''),
                '..@....'.split(''),
            ]
        case 4:
            return [
                '..@@...'.split(''),
                '..@@...'.split(''),
            ]
    }
}

function canMoveDown(rock) {
    if (!room.length) return false
    const bottomRock = rock[rock.length - 1]
    const topRoom = room[0]
    let secondLayer = true
    if (rock.length > 1) {
        const midRock = rock[rock.length - 2]
        secondLayer = !bottomRock.some((point, i) => point === '#' && midRock[i] === '@')
    }
    const firstLayer = !topRoom.some((point, i) => point === '#' && bottomRock[i] === '@')
    return firstLayer && secondLayer
}

function moveDown(rock) {
    rock.push(room.shift())
    for (let i = 0; i < 7; i++) {
        const col = rock.map(row => row[i])
        const topEdge = col.indexOf('@')
        if (topEdge < 0) continue
        const bottomEdge = col.length - col.slice().reverse().indexOf('@') - 1
        rock[topEdge][i] = '.'
        rock[bottomEdge + 1][i] = '@'
    }
    if (rock[0].every(item => item === '.')) rock.shift()
    return rock
}

function canMoveToSide(direction, rock) {
    if (direction === '<') {
        return rock.every(row => {
            const leftEdge = row.indexOf('@')
            if (leftEdge < 0 && row.indexOf('#') >= 0) return true
            return leftEdge > 0 && row[leftEdge - 1] === '.'
        })
    } else {
        return rock.every(row => {
            const rightEdge = row.length - row.slice().reverse().indexOf('@') - 1
            if (row.indexOf('@') < 0 && row.indexOf('#') >= 0) return true
            return rightEdge < (row.length - 1) && row[rightEdge + 1] === '.'
        })
    }
}

function moveToSide(direction, rock) {
    if (direction === '<') {
        return rock.map(row => {
            const leftEdge = row.indexOf('@')
            if (leftEdge < 0 && row.indexOf('#') >= 0) return row
            const rightEdge = row.length - row.slice().reverse().indexOf('@') - 1
            row[leftEdge - 1] = '@'
            row[rightEdge] = '.'
            return row
        })
    } else {
        return rock.every(row => {
            const leftEdge = row.indexOf('@')
            if (leftEdge < 0 && row.indexOf('#') >= 0) return row
            const rightEdge = row.length - row.slice().reverse().indexOf('@') - 1
            row[rightEdge + 1] = '@'
            row[leftEdge] = '.'
            return row
        })
    }
}
