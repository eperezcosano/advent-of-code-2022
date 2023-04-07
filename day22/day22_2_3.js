/*
*           --- Day 22: Monkey Map ---
*               --- Part Two ---
*             Advent Of Code 2022
* */
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./day22.txt')
})

let maze = []
let movements = []
let space = false
let r = 0
let c = 50
let dr = 0
let dc = 0

lineReader.on('line', line => {
    if (!line) {
        space = true
        return
    }
    space ? movements = line.match(/\d+|[LR]/g) : maze.push(line.split(''))
}).on('close', () => simulation())

function password(dr, dc) {
    let k
    if (dr === 0) {
        if (dc === 1) {
            k = 0
        } else {
            k = 2
        }
    } else {
        if (dr === 1) {
            k = 1
        } else {
            k = 3
        }
    }

    return (r + 1) * 1000 + 4 * (c + 1) + k
}

function simulation() {
/*    let width = Math.max(...maze.map(line => line.length));
    maze = maze.map(line => line + " ".repeat(width - line.length));
    while (maze[r][c] !== ".") {
        c++;
    }*/
    console.log(c)

    for (let i = 0; i < movements.length; i++) {
        const steps = parseInt(movements[i])
        if (steps) {
            for (let j = 0; j < steps; j++) {
                let [cdr, cdc] = [dr, dc]
                let [nr, nc] = [r + dr, c + dc]
                if (nr < 0 && 50 <= nc < 100 && dr === -1) {
                    dr = 0;
                    dc = 1;
                    nr = nc + 100;
                    nc = 0;
                } else if (nc < 0 && 150 <= nr < 200 && dc === -1) {
                    dr = 1;
                    dc = 0;
                    nr = 0;
                    nc = nr - 100;
                } else if (nr < 0 && 100 <= nc < 150 && dr === -1) {
                    nr = 199;
                    nc = nc - 100;
                } else if (nr >= 200 && 0 <= nc < 50 && dr === 1) {
                    nr = 0;
                    nc = nc + 100;
                } else if (nc >= 150 && 0 <= nr < 50 && dc === 1) {
                    dc = -1;
                    nr = 149 - nr;
                    nc = 99;
                } else if (nc === 100 && 100 <= nr < 150 && dc === 1) {
                    dc = -1;
                    nr = 149 - nr;
                    nc = 149;
                } else if (nr === 50 && 100 <= nc < 150 && dr === 1) {
                    dr = 0;
                    dc = -1;
                    nr = nc - 50;
                    nc = 99;
                } else if (nc === 100 && 50 <= nr < 100 && dc === 1) {
                    dr = -1;
                    dc = 0;
                    nr = 49;
                    nc = nr + 50;
                } else if (nr === 150 && 50 <= nc < 100 && dr === 1) {
                    dr = 0;
                    dc = -1;
                    nr = nc + 100;
                    nc = 49;
                } else if (nc === 50 && 150 <= nr < 200 && dc === 1) {
                    dr = -1;
                    dc = 0;
                    nr = 149;
                    nc = nr - 100;
                } else if (nr === 99 && 0 <= nc < 50 && dr === -1) {
                    dr = 0;
                    dc = 1;
                    nr = nc + 50;
                    nc = 50;
                } else if (nc === 49 && 50 <= nr < 100 && dc === -1) {
                    dr = 1;
                    dc = 0;
                    nr = 100;
                    nc = nr - 50;
                } else if (nc === 49 && 0 <= nr < 50 && dc === -1) {
                    dc = 1;
                    nr = 149 - nr;
                    nc = 0;
                } else if (nc < 0 && 100 <= nr < 150 && dc === -1) {
                    dc = 1;
                    nr = 149 - nr;
                    nc = 50;
                }

                if (maze[nr][nc] === '#') {
                    dr = cdr
                    dc = cdc
                    break
                }
                r = nr
                c = nc
            }
        } else {
            if (movements[i] === 'R') {
                dr = dc
                dc = -dr
            } else if (movements[i] === 'L') {
                dr = -dc
                dc = dr
            }
        }
    }
    console.log(password())
}
