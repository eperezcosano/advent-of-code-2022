/*
*   --- Day 19: Not Enough Minerals ---
*            --- Part One ---
*          Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day19.txt')
})

let qualityLevel = 0

function dfs(blueprint, maxCost, cache, time, robots, minerals) {
    if (time === 0) return minerals.geode
    const key = [time, ...Object.values(robots), ...Object.values(minerals)].toString()
    if (cache.has(key)) return cache.get(key)
    let maxGeodes = minerals.geode + robots.geode * time

    for (const [robotType, robotCost] of Object.entries(blueprint)) {
        if (robotType !== "geode" && robots[robotType] >= maxCost[robotType]) continue

        let maxWait = 0
        let canBuild = true
        for (const [mineralType, mineralAmount] of Object.entries(robotCost)) {
            if (robots[mineralType] === 0) {
                canBuild = false
                break
            }
            const wait = Math.ceil((mineralAmount - minerals[mineralType]) / robots[mineralType])
            maxWait = Math.max(maxWait, wait)
        }
        const remainingTime = time - maxWait - 1
        if (canBuild && remainingTime > 0) {
            const tmpRobots = {...robots}
            const tmpMinerals = {...minerals}
            for (const [mineralType, mineralAmount] of Object.entries(tmpMinerals)) {
                tmpMinerals[mineralType] = mineralAmount + tmpRobots[mineralType] * (maxWait + 1)
            }
            for (const [mineral, cost] of Object.entries(robotCost)) {
                tmpMinerals[mineral] -= cost
            }
            tmpRobots[robotType]++
            for (const mineralType of Object.entries(maxCost)) {
                tmpMinerals[mineralType] = Math.min(tmpMinerals[mineralType], maxCost[mineralType] * remainingTime)
            }
            maxGeodes = Math.max(maxGeodes, dfs(blueprint, maxCost, cache, remainingTime, tmpRobots, tmpMinerals))
        }
    }
    cache.set(key, maxGeodes)
    return maxGeodes
}

lineReader.on('line', (line) => {
    const [id, oreCost, clayCost, obsidianCostOre, obsidianCostClay, geodeCostOre, geoCostObsidian] = line.split(' ').filter(word => word.match(/\d+/)).map(number => parseInt(number))
    const maxCost = {
        ore: Math.max(oreCost, clayCost, obsidianCostOre, geodeCostOre),
        clay: obsidianCostClay,
        obsidian: geoCostObsidian
    }
    const blueprint = {
        ore: {ore: oreCost},
        clay: {ore: clayCost},
        obsidian: {ore: obsidianCostOre, clay: obsidianCostClay},
        geode: {ore: geodeCostOre, obsidian: geoCostObsidian}
    }
    const maxGeodes = dfs(blueprint, maxCost, new Map(), 24, {ore: 1, clay: 0, obsidian: 0, geode: 0}, {ore: 0, clay: 0, obsidian: 0, geode: 0})
    qualityLevel += id * maxGeodes
}).on('close', () => console.log('Result:', qualityLevel))
// Result: 1725
