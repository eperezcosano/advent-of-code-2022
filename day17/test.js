let bottomRock =    '#..#..##.'
let topRoom =       '.#......#'

let canDown = !topRoom.split('').some((point, i) => point === '#' && bottomRock[i] === '#')
console.log(canDown)
if (canDown) {
    let res = ''
    for (let i = 0; i < topRoom.length; i++) {
        if (bottomRock[i] === '#' || topRoom[i] === '#') res += '#'
        else res += '.'
    }
    console.log(res)
}


