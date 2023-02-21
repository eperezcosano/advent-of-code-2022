/*
*   --- Day 19: Not Enough Minerals ---
*            --- Part Two ---
*          Advent Of Code 2022
* */
const [ORE, CLAY, OBSIDIAN, GEODE] = [0, 1, 2, 3]
const TYPES = [ORE, CLAY, OBSIDIAN, GEODE]
const ROBOT = TYPES.map(v => 1 << (v * 6))
const MASKS = TYPES.map(i => 0x3f << (i * 6))
const [MASK_ORE, MASK_CLAY, MASK_OBS, MASK_GEODE] = MASKS
const BOT_TIMES = [15, 6, 3, 1]
const PRIORITY_ORDER = [...TYPES].reverse()

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./test.txt')
})
const { MaxHeap } = require('@datastructures-js/heap')
let res = new MaxHeap()

lineReader.on('line', (line) => {
    console.log(harvest(24, 2)(parseBlueprints(line)))
})

function parseBlueprints(line) {
    const [ , ore, clay, obs_ore, obs_clay, geode_ore, geode_obs, ] = line.split(' ').filter(word => word.match(/\d+/)).map(number => parseInt(number))
    return [
        [ore, 0, 0, 0],
        [clay, 0, 0, 0],
        [obs_ore, obs_clay, 0, 0],
        [geode_ore, 0, geode_obs, 0],
    ].map(cost => cost.reduce((previousValue, currentValue, currentIndex) => previousValue | (currentValue << (currentIndex * 6))))
}

function hasResourcesFactory(costs) {
    return function (type, resources, cost = costs[type]) {
        return (resources & MASK_ORE) >= (cost & MASK_ORE)
            && (resources & MASK_CLAY) >= (cost & MASK_CLAY)
            && (resources & MASK_OBS) >= (cost & MASK_OBS)
    }
}

function maxBotsNeededFactory(costs) {
    return function (type, robots) {
        const maxBotsNeeded = MASKS.map(mask => costs.map(cost => cost & mask).reduce((max, v) => (max > v ? max : v))).reduce((t, v) => t | v, MASK_GEODE)
        return (maxBotsNeeded & MASKS[type]) > (robots & MASKS[type])
    }
}

function timeLeftForBot(type, timeLeft) {
    return BOT_TIMES[type] <= timeLeft
}

function score(timeLeft, resBots) {
    return (timeLeft * (timeLeft + 1 + 2 * resBots[1])) / 2 + resBots[0]
}

function harvest(minutes, beamFactor) {
    return function (costs) {
        const needsBot = maxBotsNeededFactory(costs)
        const hasResources = hasResourcesFactory(costs)

        let pq = [[0, [0, ROBOT[ORE]]]]
        let timeLeft = minutes
        let max = 0

        while (timeLeft--) {
            const nq = []
            nq.forEach(([, [resources, robots]]) =>
                PRIORITY_ORDER
                .filter(type => timeLeftForBot(type, timeLeft) && needsBot(type, robots) && hasResources(type, resources))
                .map(type => [resources + robots - costs[type], robots + ROBOT[type]])
                .concat([[resources + robots, robots]])
                .map(e => (max > e[0] || (max = e[0]), [score(timeLeft, e), e]))
                .forEach(e => e[0] > max >> 1 && res.push(nq, e))
            )
            nq.slice((minutes - timeLeft) << beamFactor)
            pq = nq
        }
        return max >> 18
    }
}

function qualityLevel(total, id) {
    return (id + 1) * total
}