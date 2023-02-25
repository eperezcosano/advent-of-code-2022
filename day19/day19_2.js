/*
*   --- Day 19: Not Enough Minerals ---
*            --- Part Two ---
*          Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day19.txt')
})

const blueprints = []

function maxGeodes(blueprint, maxTime) {

    const maxRobots = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];

    for (let i = 0; i < 3; i++) {
        let maxCost = 0;
        for (let j = 0; j < blueprint.length; j++) {
            maxCost = Math.max(maxCost, blueprint[j][i]);
        }
        maxRobots[i] = maxCost;
    }

    let maxGeodes = 0

    const queue = []
    queue.push([
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        0
    ])

    while (queue.length > 0) {
        const [ inventory, bots, elapsed ] = queue.shift()
        // for every bot cost, run simulation
        for (let i = 0; i < blueprint.length; i++) {
            if (bots[i] >= maxRobots[i]) continue
            const costs = blueprint[i]
            // Find the limiting resource type for the costs
            const waitTime = Math.max(...[0, 1, 2].map(item => {
                if (costs[item] <= inventory[item]) return 0
                if (bots[item] === 0) return maxTime + 1
                return Math.floor((costs[item] - inventory[item] + bots[item] - 1) / bots[item])
            }))

            // if that choice would cause the time limit be to exceeded, skip
            // the + 1 is so the built bot has the chance to do something, it merely being built is not enough
            const newElapsed = elapsed + waitTime + 1
            if (newElapsed >= maxTime) continue

            // gather ores with previously available bots
            const newInventory = [0, 0, 0, 0]
            for (let j = 0; j < bots.length; j++) {
                newInventory[j] = inventory[j] + bots[j] * (waitTime + 1) - costs[j]
            }

            // increase bot type for the bot we just built
            const newBots = bots.slice()
            newBots[i]++

            // extra optimization:
            // if we theoretically only built geode bots every turn, and we still don't beat the maximum, skip
            const remainingTime = maxTime - newElapsed
            if (((remainingTime - 1) * remainingTime) / 2 + newInventory[3] + remainingTime * newBots[3] < maxGeodes) continue

            queue.push([newInventory, newBots, newElapsed])
        }

        const geodes = inventory[3] + bots[3] * (maxTime - elapsed)
        maxGeodes = Math.max(geodes, maxGeodes)
    }

    return maxGeodes
}

lineReader.on('line', (line) => {
    const [ , oreCost, clayCost, obsidianCostOre, obsidianCostClay, geodeCostOre, geoCostObsidian] = line.split(' ').filter(word => word.match(/\d+/)).map(number => parseInt(number))
    blueprints.push([
        [oreCost, 0, 0, 0],
        [clayCost, 0, 0, 0],
        [obsidianCostOre, obsidianCostClay, 0, 0],
        [geodeCostOre, 0, geoCostObsidian, 0]
    ])
}).on('close', () => {
    const res = blueprints
        .slice(0, 3)
        .map(blueprint => maxGeodes(blueprint, 32))
        .reduce((acc, val) => acc * val, 1)
    console.log('Result:', res)
    // Result: 15510
})
