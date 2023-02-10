/*
*   --- Day 16: Pyroclastic Flow ---
*           --- Part One ---
*         Advent Of Code 2022
* */

const readline = require('readline')

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

const debug = true

let jetPattern = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>'

let room = []

async function simulation() {
    for (let i = 0, n = 0; i < 2022; i++) {
        let rock = getRock(i % 5)
        addThreeSpacesUp()
        if (debug) {
            console.log(`The #${i + 1} rock begins to falling`)
            print(rock)
            print(room)
            await askQuestion('Continue')
            console.log('\033[2J');
        }
        while (true) {
            const direction = jetPattern[n++ % jetPattern.length]
            if (canMoveToSide(direction, rock)) moveToSide(direction, rock)
            if (debug) {
                print(rock)
                print(room)
                await askQuestion('Continue')
                console.log('\033[2J');
            }
            if (canMoveDown(rock)) {
                if (debug) console.log('Rock falls 1 unit')
                moveDown(rock)
                if (debug) {
                    print(rock)
                    print(room)
                    await askQuestion('Continue')
                    console.log('\033[2J');
                }
            } else {
                if (debug) console.log('Causing it to come to rest')
                const restingRock = rock.map(row => row.map(item => item.replace('@', '#')))
                for (let i = restingRock.length - 1; i >= 0; i--) {
                    room.unshift(restingRock[i])
                }
                if (debug) print(room)
                await askQuestion('Continue')
                console.log('\033[2J');
                break
            }
        }
    }
    console.log(room.length)
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
            if (leftEdge < 0 && row.indexOf('#') >= 0) return true
            return leftEdge > 0 && row[leftEdge - 1] === '.'
        })
        if (!res && debug) console.log('Jet of gas pushes rock left, but nothing happens')
        return res
    } else {
        let res = rock.every(row => {
            const rightEdge = row.length - row.slice().reverse().indexOf('@') - 1
            if (row.indexOf('@') < 0 && row.indexOf('#') >= 0) return true
            return rightEdge < (row.length - 1) && row[rightEdge + 1] === '.'
        })
        if (!res && debug) console.log('Jet of gas pushes rock right, but nothing happens')
        return res
    }
}

function moveToSide(direction, rock) {
    if (direction === '<') {
        if (debug) console.log('Jet of gas pushes rock left')
        return rock.map(row => {
            const leftEdge = row.indexOf('@')
            if (leftEdge < 0 && row.indexOf('#') >= 0) return row
            const rightEdge = row.length - row.slice().reverse().indexOf('@') - 1
            row[leftEdge - 1] = '@'
            row[rightEdge] = '.'
            return row
        })
    } else {
        if (debug) console.log('Jet of gas pushes rock right')
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

function print(element) {
    element.slice(0, 20).map(row => row.join('')).forEach(row => console.log(row))
}

simulation()
