export const ADD = 0
export const SUB = 1
export const MUL = 2

export const SIGNED = 0
export const UNSIGNED = 1

const getNegativeFlag = input => input[0]
const getZeroFlag = input => input.includes(1) ? 0 : 1

const toBinaryArray = (input, mode) => {
  if (mode === SIGNED) {
    return input.split('').map(i => i === '1' ? 0 : 1)
  }
  return input.split('').map(parseInt)
}

export const exec = (a, b, operation, mode) => {
  a = toBinaryArray(a, mode)
  b = toBinaryArray(b, mode)

  let [c, v, result] = getCarryAndOverflowFlag(a, b, operation, mode)
  let n = getNegativeFlag(result)
  let z = getZeroFlag(result)

  return { n, z, c, v, result }
}

const getCarryAndOverflowFlag = (v1, v2, op, mode) => {
  console.log({v1, v2, op, mode})

  let c = 0, v = 0
  let result = new Array(v1.length)

  if (op === 1) {
    for (let i = 0; i < v2.length; i++) {
      v2[i] = v2[i] === 1 ? 0 : 1
    }

    let running = 1
    for (let i = v1.length - 1; i >= 0 && running; i--) {
      if (v2[i] === 1) {
        v2[i] = 0
      } else {
        v2[i] = 0
        running = false
      }
    }
    if (running) {
      v2.fill(0)
      v2[v2.length - 1] = 1
    }
  }

  if (op === 0 || op === 1) {
    for (let i = v1.length - 1; i >= 0; i--) {
      v = c
      let sum = v1[i] + v2[i] + c
      if (sum > 1) {
        result[i] = sum - 2
        c = 1
      } else {
        result[i] = sum
        c = 0
      }
    }
  }

  v = v ^ c

  if (op === 1) {
    c = c === 1 ? 0 : 1
  }

  return [c, v, result]
}