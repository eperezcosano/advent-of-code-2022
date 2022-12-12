/*
*   --- Day 12: Hill Climbing Algorithm ---
*               --- Part One ---
*             Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day12_input.txt')
})


let start = {}
let end = {}
let grid = []

function getNeighbors([x, y]) {
    const neighbors = []
    if (y + 1 < grid.length && grid[y + 1][x] <= grid[y][x] + 1) neighbors.push([x, y + 1].join())
    if (y - 1 >= 0 && grid[y - 1][x] <= grid[y][x] + 1) neighbors.push([x, y - 1].join())
    if (x + 1 < grid[y].length && grid[y][x + 1] <= grid[y][x] + 1) neighbors.push([x + 1, y].join())
    if (x - 1 >= 0 && grid[y][x - 1] <= grid[y][x] + 1) neighbors.push([x - 1, y].join())
    return neighbors
}
function dijkstra(grid, start, end) {
    const dist = {}
    let queue = []
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const v = [x, y].join()
            dist[v] = Infinity
            queue.push(v)
        }
    }
    dist[[start.x, start.y].join()] = 0
    while (queue.length) {
        let u = null
        for (const point of queue) {
            if (u === null || dist[point] < dist[u]) u = point
        }
        if (u === [end.x, end.y].join()) break
        queue = queue.filter(point => point !== u)
        const neighbors = getNeighbors(u.split(',').map(value => parseInt(value)))
        for (const v of neighbors) {
            if (!queue.includes(v)) continue
            const alt = dist[u] + 1
            if (alt < dist[v]) dist[v] = alt
        }
    }
    return dist
}

let y = 0
lineReader.on('line', (line) => {
    grid.push([...line].map((value, x) => {
        if (value === 'S') {
            start = { y, x }
            return 0
        }
        if (value === 'E') {
            end = { y, x }
            return 25
        }
        return value.charCodeAt(0) - 'a'.charCodeAt(0)
    }))
    y++
})

lineReader.on('close', () => {
    const steps = dijkstra(grid, start, end)[[end.x, end.y].join()]
    console.log('Steps:', steps)
    // Steps: 370
})