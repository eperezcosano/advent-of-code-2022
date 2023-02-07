/*
*   --- Day 16: Proboscidea Volcanium ---
*           --- Part One ---
*         Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day16.txt')
})

const valves = {}
const tunnels = {}
const dists = {}
const nonempty = []
const indices = {}
const cache = new Map()

lineReader.on('line', (line) => {
    const words = line.replace(/,/g, '').split(' ')
    const valve = words[1]
    const rate = parseInt(words[4].slice(5, -1))
    const targets = words.slice(9)
    valves[valve] = rate
    tunnels[valve] = targets
}).on('close', () => part1())

function part1() {

    for (const valve in valves) {
        if (valve !== "AA" && !valves[valve]) continue
        if (valve !== "AA") nonempty.push(valve)
        dists[valve] = {}
        dists[valve][valve] = 0
        dists[valve]["AA"] = 0

        const visited = new Set(valve)
        const queue = [[0, valve]]

        while (queue.length) {
            const [distance, position] = queue.shift()
            for (const neighbor of tunnels[position]) {
                if (visited.has(neighbor)) continue
                visited.add(neighbor)
                if (valves[neighbor]) dists[valve][neighbor] = distance + 1
                queue.push([distance + 1, neighbor])
            }
        }

        delete dists[valve][valve]
        if (valve !== "AA") delete dists[valve]["AA"]
    }

    for (const [index, element] of nonempty.entries()) {
        indices[element] = index
    }

    function dfs(time, valve, bitmask) {
        if (cache.has([time, valve, bitmask]))
            return cache.get([time, valve, bitmask])
        let max = 0
        for (const neighbor in dists[valve]) {
            const bit = 1 << indices[neighbor]
            if (bitmask & bit) continue
            let remtime = time - dists[valve][neighbor] - 1
            if (remtime < 0) continue
            max = Math.max(max, dfs(remtime, neighbor, bitmask | bit) + valves[neighbor] * remtime)
        }
        cache.set([time, valve, bitmask], max)
        return max
    }

    console.log('Result:', dfs(30, "AA", 0))
    // Result: 1940
}
