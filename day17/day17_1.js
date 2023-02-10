/*
*   --- Day 16: Pyroclastic Flow ---
*           --- Part One ---
*         Advent Of Code 2022
* */


const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./test.txt')
})

let jetPattern
lineReader
    .on('line', (line) => jetPattern = line)
    .on('close', () => simulation())

let room = []

function simulation() {
    for (let i = 0, n = 0; i < 10; i++) {
        let rock = getRock(i % 5)
        addThreeSpacesUp()
        console.log(`The #${i + 1} rock begins to falling`)
        print(rock)
        print(room)
        while (true) {
            const direction = jetPattern[n++ % jetPattern.length]
            if (canMoveToSide(direction, rock)) moveToSide(direction, rock)
            print(rock)
            print(room)
            if (canMoveDown(rock)) {
                console.log('Rock falls 1 unit')
                moveDown(rock)
                print(rock)
                print(room)
            } else {
                console.log('Casing it to come to rest')
                const restingRock = rock.map(row => row.map(item => item.replace('@', '#')))
                restingRock.reverse().forEach(row => room.unshift(row))
                print(room)
                break
            }
        }
    }

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
    return !topRoom.some((point, i) => point === '#' && bottomRock[i] === '@')
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
        let res = rock.every(row => {
            const leftEdge = row.indexOf('@')
            return leftEdge > 0 && row[leftEdge - 1] === '.'
        })
        if (!res) console.log('Jet of gas pushes rock left, but nothing happens')
        return res
    } else {
        let res = rock.every(row => {
            const rightEdge = row.length - row.slice().reverse().indexOf('@') - 1
            return rightEdge < (row.length - 1) && row[rightEdge + 1] === '.'
        })
        if (!res) console.log('Jet of gas pushes rock right, but nothing happens')
        return res
    }
}

function moveToSide(direction, rock) {
    if (direction === '<') {
        console.log('Jet of gas pushes rock left')
        return rock.map(row => {
            const leftEdge = row.indexOf('@')
            const rightEdge = row.length - row.slice().reverse().indexOf('@') - 1
            row[leftEdge - 1] = '@'
            row[rightEdge] = '.'
            return row
        })
    } else {
        console.log('Jet of gas pushes rock right')
        return rock.every(row => {
            const leftEdge = row.indexOf('@')
            const rightEdge = row.length - row.slice().reverse().indexOf('@') - 1
            row[rightEdge + 1] = '@'
            row[leftEdge] = '.'
            return row
        })
    }
}

function print(element) {
    element.map(row => row.join('')).forEach(row => console.log(row))
}

