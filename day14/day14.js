/*
*   --- Day 14: Regolith Reservoir ---
*          Advent Of Code 2022
* */
const fs = require('fs')
const lines = fs.readFileSync('./day14.txt', { encoding: 'utf-8'})
    .replace(/\r/g, '')
    .trim()
    .split('\n')

function getInput() {
    const map = new Set()
    let maxY = 0
    for (const line of lines) {
        const points = line.split(' -> ').map(point => {
            const [x, y] = point.split(',').map(Number)
            if (y > maxY) maxY = y
            return {x, y}
        })
        let currentPoint = points.shift()
        while (points.length) {
            let targetPoint = points.shift()
            while (currentPoint.x !== targetPoint.x || currentPoint.y !== targetPoint.y) {
                map.add(`${currentPoint.x},${currentPoint.y}`)
                if (currentPoint.x !== targetPoint.x) currentPoint.x += Math.sign(targetPoint.x - currentPoint.x)
                else currentPoint.y += Math.sign(targetPoint.y - currentPoint.y)
                map.add(`${currentPoint.x},${currentPoint.y}`)
            }
        }
    }
    return {map, maxY}

}

function part1() {
    const {map, maxY} = getInput()
    let sandIntoEndlessVoid = false
    let sandUnits = 0
    while (!sandIntoEndlessVoid) {
        let sand = {x: 500, y: 0}
        sandUnits++
        while (!sandIntoEndlessVoid) {
            if (!map.has(`${sand.x},${sand.y + 1}`)) {
                sand.y++
            } else if (!map.has(`${sand.x - 1},${sand.y + 1}`)) {
                sand.y++
                sand.x--
            } else if (!map.has(`${sand.x + 1},${sand.y + 1}`)) {
                sand.y++
                sand.x++
            } else {
                map.add(`${sand.x},${sand.y}`)
                break
            }
            if (sand.y >= maxY) {
                sandIntoEndlessVoid = true
                sandUnits--
            }
        }
    }
    console.log('Part One:', sandUnits)
}

function part2() {
    const {map, maxY} = getInput()
    let sandUnits = 0
    while (true) {
        if (map.has(`500,0`)) break
        let sand = {x: 500, y: 0}
        sandUnits++
        while (true) {
            if (sand.y === maxY + 1) {
                map.add(`${sand.x},${sand.y}`)
                break
            } else if (!map.has(`${sand.x},${sand.y + 1}`)) {
                sand.y++
            } else if (!map.has(`${sand.x - 1},${sand.y + 1}`)) {
                sand.y++
                sand.x--
            } else if (!map.has(`${sand.x + 1},${sand.y + 1}`)) {
                sand.y++
                sand.x++
            } else {
                map.add(`${sand.x},${sand.y}`)
                break
            }
        }
    }
    console.log('Part Two:', sandUnits)
}

part1()
part2()