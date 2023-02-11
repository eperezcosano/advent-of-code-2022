const { complex, add, multiply } = require('mathjs')
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day17.txt')
})

const rocks = [
    [complex(0, 0), complex(1, 0), complex(2, 0), complex(3, 0)],
    [complex(1, 0), complex(0, 1), complex(1, 1), complex(2, 1), complex(1, 2)],
    [complex(0, 0), complex(1, 0), complex(2, 0), complex(2, 1), complex(2, 2)],
    [complex(0, 0), complex(0, 1), complex(0, 2), complex(0, 3)],
    [complex(0, 0), complex(1, 0), complex(0, 1), complex(1, 1)]
]

let solid = [
    complex(0, -1),
    complex(1, -1),
    complex(2, -1),
    complex(3, -1),
    complex(4, -1),
    complex(5, -1),
    complex(6, -1)
]

let height = 0
let offset = 0
let jets = []
let seen = new Map()
const T = 1_000_000_000_000

lineReader.on('line', (line) => {
    line.split('').forEach(char => {
        char === '>' ? jets.push(1) : jets.push(-1)
    })
}).on('close', () => simulation())


function topRock() {
    let min = [-20, -20, -20, -20, -20, -20, -20]
    solid.forEach(x => min[x.re] = Math.max(min[x.re], x.im))
    let top = Math.max(...min)
    return min.map(x => x - top)
}

function simulation() {
    let rocksCount = 0
    let rocksIndex = 0
    let rock = rocks[rocksIndex].map(x => add(add(x, 2), multiply(height + 3, complex(0 , 1))))
    while (rocksCount < T) {
        for (const [jetIndex, jet] of jets.entries()) {
            let moved = rock.map(x => add(x, jet))
            if (moved.every(x => x.re >= 0 && x.re < 7) && !moved.some(x => solid.find(y => x.re === y.re && x.im === y.im)))
                rock = moved
            moved = rock.map(x => add(x, complex(0, -1)))
            if (moved.some(x => solid.find(y => x.re === y.re && x.im === y.im))) {
                solid = [...new Set([...solid, ...rock])]
                rocksCount++
                height = Math.max(...solid.map(x => x.im)) + 1
                if (rocksCount >= T) break
                rocksIndex = (rocksIndex + 1) % 5
                rock = rocks[rocksIndex].map(x => add(add(x, 2), multiply(height + 3, complex(0 , 1))))
                let key = [jetIndex, rocksIndex, topRock()].toString()
                if (seen.has(key)) {
                    let [lastRockCount, lastHeight] = seen.get(key)
                    let remaining = T - rocksCount
                    let repetition = Math.floor(remaining / (rocksCount - lastRockCount))
                    offset = repetition * (height - lastHeight)
                    rocksCount += repetition * (rocksCount - lastRockCount)
                    seen = new Map()
                }
                seen.set(key, [rocksCount, height])
            } else {
                rock = moved
            }
        }
    }
    console.log(height + offset)
}