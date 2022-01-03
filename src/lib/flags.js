export const ADD = 0
export const SUB = 1

export const SIGNED = 0
export const UNSIGNED = 1

const getNegativeFlag = input => input[0]
const getZeroFlag = input => input.includes(1) ? 0 : 1

const toBinaryArray = (input, mode) => {
  input = input.split('').map(i => parseInt(i))

  if (mode === SIGNED && input[0] === 1) {
    return input.map(i => i === 1 ? 0 : 1)
  }

  return input
}

export const exec = (a, b, operation, mode) => {
  a = toBinaryArray(a, mode)
  b = toBinaryArray(b, mode)

  let [c, v, result] = getCarryAndOverflowFlag(a, b, operation)
  let n = getNegativeFlag(result)
  let z = getZeroFlag(result)

  return { n, z, c, v, result, mode, operation }
}

const getCarryAndOverflowFlag = (a, b, operation) => {
  let c = 0, v = 0
  let result = new Array(a.length)

  if (operation === SUB) {
    for (let i = 0; i < b.length; i++) {
      b[i] = b[i] === 1 ? 0 : 1
    }

    let running = 1
    for (let i = a.length - 1; i >= 0 && running; i--) {
      if (b[i] === 1) {
        b[i] = 0
      } else {
        b[i] = 0
        running = false
      }
    }
    if (running) {
      b.fill(0)
      b[b.length - 1] = 1
    }
  }

  if (operation === ADD || operation === SUB) {
    for (let i = a.length - 1; i >= 0; i--) {
      v = c
      let sum = a[i] + b[i] + c
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

  if (operation === SUB) {
    c = c === 1 ? 0 : 1
  }

  return [c, v, result]
}