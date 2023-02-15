/*
*   --- Day 19: Not Enough Minerals ---
*            --- Part One ---
*          Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./test.txt')
})

const blueprints = []

function executeBlueprint(id) {
    const blueprint = blueprints[id - 1]
    const inventory = {
        oreRobots: 1,
        ores: 0,
        clayRobots: 0,
        clay: 0,
        obsidianRobots: 0,
        obsidian: 0,
        geodeRobots: 0,
        geodes: 0
    }
    for (let t = 1; t <= 24; t++) {
        let buildClay = false
        let buildObsidian = false
        let buildGeode = false
        console.log(`== Minute ${t} ==`)
        if (blueprint.clayCost <= inventory.ores) {
            inventory.ores -= blueprint.clayCost
            buildClay = true
            console.log(`Spend ${blueprint.clayCost} ore to start building a clay-collecting robot.`)
        }
        if (blueprint.obsidianCostOre <= inventory.ores && blueprint.obsidianCostClay <= inventory.clay) {
            inventory.ores -= blueprint.obsidianCostOre
            inventory.clay -= blueprint.obsidianCostClay
            buildObsidian = true
            console.log(`Spend ${blueprint.obsidianCostOre} ore and ${blueprint.obsidianCostClay} clay to start building an obsidian-collecting robot.`)
        }
        if (blueprint.geodeCostOre <= inventory.ores && blueprint.geoCostObsidian <= inventory.obsidian) {
            inventory.ores -= blueprint.geodeCostOre
            inventory.obsidian -= blueprint.geoCostObsidian
            buildGeode = true
            console.log(`Spend ${blueprint.geodeCostOre} ore and ${blueprint.geoCostObsidian} obsidian to start building a geode-cracking robot.`)
        }
        // Collect minerals
        inventory.ores += inventory.oreRobots
        console.log(`${inventory.oreRobots} ore-collecting robot collects ${inventory.oreRobots} ore; you now have ${inventory.ores} ore.`)
        inventory.clay += inventory.clayRobots
        console.log(`${inventory.clayRobots} clay-collecting robot collects ${inventory.clayRobots} clay; you now have ${inventory.clay} clay.`)
        inventory.obsidian += inventory.obsidianRobots
        console.log(`${inventory.obsidianRobots} obsidian-collecting robot collects ${inventory.obsidianRobots} obsidian; you now have ${inventory.obsidian} obsidian.`)
        inventory.geodes += inventory.geodeRobots
        console.log(`${inventory.geodeRobots} geode-cracking robot crack ${inventory.geodeRobots} geodes; you now have ${inventory.geodes} geodes.`)
        if (buildClay) {
            inventory.clayRobots++
            console.log(`The new clay-collecting robot is ready; you now have ${inventory.clayRobots} of them`)
        }
        if (buildObsidian) {
            inventory.obsidianRobots++
            console.log(`The new obsidian-collecting robot is ready; you now have ${inventory.obsidianRobots} of them`)
        }
        if (buildGeode) {
            inventory.geodeRobots++
            console.log(`The new geode-cracking robot is ready; you now have ${inventory.geodeRobots} of them`)
        }
    }
}

lineReader.on('line', (line) => {
    const [, oreCost, clayCost, obsidianCostOre, obsidianCostClay, geodeCostOre, geoCostObsidian] = line.split(' ').filter(word => word.match(/\d+/)).map(number => parseInt(number))
    blueprints.push({oreCost, clayCost, obsidianCostOre, obsidianCostClay, geodeCostOre, geoCostObsidian})
}).on('close', () => executeBlueprint(1))