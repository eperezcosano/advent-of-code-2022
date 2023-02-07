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
    const parts = line.replaceAll(',', '').split(' ')
    const valve = parts[1]
    graph[valve] = parts.slice(9)
    rates[valve] = parseInt(parts[4].slice(5, -1))
})

function findDistances() {
    Object.keys(graph).forEach(start => {
        Object.keys(graph).forEach(end => {
            if (!distances[start]) distances[start] = {}
            distances[start][end] = findDistance(graph, start, end)
        })
    })
}

// Bread-first algorithm
function findDistance(graph, start, end) {
    if (start === end) return 0
    const queue = [[start]]
    const visited = new Set(start)
    while (queue.length > 0) {
        const path = queue.shift()
        const node = path[path.length - 1]
        for (const neighbor of graph[node]) {
            if (visited.has(neighbor)) continue
            if (neighbor === end) return path.length
            visited.add(neighbor)
            queue.push(path.concat(neighbor))
        }
    }
    return 0
}

function findRates(valve, minutes, leftValves, opened = {}) {
    let allRates = [opened]

    leftValves.forEach((leftValve, index) => {
        let leftMinutes = minutes - distances[valve][leftValve] - 1
        if (leftMinutes < 1) return

        let newOpened = JSON.parse(JSON.stringify(opened))
        newOpened[leftValve] = leftMinutes

        let newLeft = [...leftValves]
        newLeft.splice(index, 1)

        allRates.push(...findRates(leftValve, leftMinutes, newLeft, newOpened))
    })

    return allRates
}

function part1() {
    findDistances()
    const res = findRates('AA', 30, Object.keys(graph).filter(valve => rates[valve] > 0))
          .map(path => Object.entries(path).reduce((acc, [key, value]) => acc + rates[key] * value, 0))
          .sort((a,b) => b - a)[0]
    console.log('Total:', res)
}

lineReader.on('close', () => part1())