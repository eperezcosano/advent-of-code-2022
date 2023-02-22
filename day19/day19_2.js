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
    return function(type, resources, cost = costs[type]) {
        return (resources & MASK_ORE) >= (cost & MASK_ORE)
            && (resources & MASK_CLAY) >= (cost & MASK_CLAY)
            && (resources & MASK_OBS) >= (cost & MASK_OBS)
    }
}

function maxBotsNeededFactory(costs) {
    return function(type, robots) {
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

function maxHeap(array, item) {
    array.push(item);
    let index = array.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);
    while (index > 0 && array[index][0] > array[parentIndex][0]) {
        [array[index], array[parentIndex]] = [array[parentIndex], array[index]];
        index = parentIndex;
        parentIndex = Math.floor((index - 1) / 2);
    }
}

function harvest(minutes, beamFactor) {
    return function (costs) {
        let queue = [[0, [0, ROBOT[ORE]]]]
        let timeLeft = minutes
        let max = 0

        while (timeLeft--) {
            const newQueue = []
            queue.forEach(([, [resources, robots]]) => {
                PRIORITY_ORDER
                    .filter(type => timeLeftForBot(type, timeLeft) && maxBotsNeededFactory(costs)(type, robots) && hasResourcesFactory(costs)(type, resources))
                    .map(type => [resources + robots - costs[type], robots + ROBOT[type]])
                    .concat([[resources + robots, robots]])
                    .map(item => {
                        if (max <= item[0]) max = item[0]
                        return [score(timeLeft, item), item]
                    })
                    .forEach(item => {
                        if (item[0] > max >> 1) maxHeap(newQueue, item)
                    })
            })
            newQueue.slice((minutes - timeLeft) << beamFactor)
            queue = newQueue
        }
        return max >> 18
    }
}

const res = []
lineReader.on('line', (line) => {
    res.push(harvest(32, 7)(parseBlueprints(line)))
}).on('close', () => {
    console.log(res)
})
