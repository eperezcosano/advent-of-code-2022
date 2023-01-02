/*
*   --- Day 15: Beacon Exclusion Zone ---
*              --- Part One ---
*            Advent Of Code 2022
* */
const fs = require('fs')
const lines = fs.readFileSync('./day15.txt', { encoding: 'utf-8'})
    .replace(/\r/g, '')
    .trim()
    .split('\n')

const regexp = /Sensor at x=(?<sensorX>-?\d+), y=(?<sensorY>-?\d+): closest beacon is at x=(?<beaconX>-?\d+), y=(?<beaconY>-?\d+)/;

function manhattan(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

function getInputs() {
    return lines.map(line => {
        const match = line.match(regexp).groups
        const res = {
            sensor: { x: parseInt(match.sensorX), y: parseInt(match.sensorY) },
            beacon: { x: parseInt(match.beaconX), y: parseInt(match.beaconY) }
        }
        res.dist = manhattan(res.sensor, res.beacon)
        return res
    })
}

function part1() {
    const inputs = getInputs()
    const y = 2_000_000

    const intervals = []
    const beacons = new Set()
    for (const {sensor, beacon, dist} of inputs) {
        if (beacon.y === y) beacons.add(beacon.x)
        const dx = dist - Math.abs(y - sensor.y)
        if (dx <= 0) continue
        intervals.push({ min: sensor.x - dx, max: sensor.x + dx })
    }

    const minX = Math.min(...intervals.map(interval => interval.min))
    const maxX = Math.max(...intervals.map(interval => interval.max))

    let res = 0
    for (let x = minX; x <= maxX; x++) {
        if (beacons.has(x)) continue
        if (intervals.find(({min, max}) => (x >= min && x <= max))) res++
    }
    console.log('Result:', res)
    // Result: 5870800
}

part1()