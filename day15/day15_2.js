/*
*   --- Day 15: Beacon Exclusion Zone ---
*              --- Part Two ---
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

function part2() {
    const inputs = getInputs()

    const ascLines = []
    const descLines = []

    for (const {sensor, dist} of inputs) {
        descLines.push(sensor.x + sensor.y - dist, sensor.x + sensor.y + dist)
        ascLines.push(sensor.x - sensor.y - dist, sensor.x - sensor.y + dist)
    }

    let posLine
    let negLine

    for (let i = 0; i < 2 * inputs.length; i++) {
        for (let j = i + 1; j < 2 * inputs.length; j++){
            if (Math.abs(ascLines[i] - ascLines[j]) === 2) {
                posLine = Math.min(ascLines[i], ascLines[j]) + 1
            }
            if (Math.abs(descLines[i] - descLines[j]) === 2) {
                negLine = Math.min(descLines[i], descLines[j]) + 1
            }
        }
    }

    const x = (posLine + negLine) / 2
    const y = (negLine - posLine) / 2
    let res = x * 4_000_000 + y
    console.log('Result:', res)
    // Result: 10908230916597
}

part2()