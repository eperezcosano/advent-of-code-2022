/*
*   --- Day 16: Proboscidea Volcanium ---
*           --- Part One ---
*         Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day16.txt')
})

const graph = {}
const rates = {}
const distances = {}

lineReader.on('line', (line) => {
    const tokens = line.replace(/,/g, '').split(' ')
    graph[tokens[1]] = tokens.slice(9)
    rates[tokens[1]] = parseInt(tokens[4].replace(';', '').split('=')[1])
})

function findDistances() {
    Object.keys(graph).forEach(start => {
        Object.keys(graph).forEach(end => {
            if (!distances[start]) distances[start] = {}
            distances[start][end] = findDistance(graph, start, end).length - 1
        })
    })
}

// Bread-first algorithm
function findDistance(graph, start, end) {
    const queue = []
    const visited = [start]

    if (start === end) return [start]
    queue.push([start])

    while (queue.length > 0) {
        const path = queue.shift()
        const valve = path[path.length - 1]
        for (const neighbor of graph[valve]) {
            if (visited.includes(neighbor)) continue
            if (neighbor === end) return [...path, neighbor]
            visited.push(neighbor)
            queue.push([...path, neighbor])
        }
    }

    return []
}

function findRates(distances, valve, minutes, left, opened = {}) {
    let allRates = [opened]

    left.forEach((other, index) => {
        let leftMinutes = minutes - distances[valve][other] - 1
        if (leftMinutes < 1) return

        let newOpened = JSON.parse(JSON.stringify(opened))
        newOpened[other] = leftMinutes

        let newLeft = [...left]
        newLeft.splice(index, 1)

        allRates.push(...findRates(distances, other, leftMinutes, newLeft, newOpened))
    })

    return allRates
}

function part1() {
    findDistances()
    const filteredValves = Object.keys(graph).filter(valve => rates[valve] !== 0)
    const res = findRates(distances, 'AA', 30, filteredValves)
         .map(path => Object.entries(path).reduce((acc, [key, value]) => acc + rates[key] * value, 0))
         .sort((a,b) => b - a)[0]
    console.log('Total:', res)
}

lineReader.on('close', () => part1())