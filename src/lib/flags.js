export const ADD = 0
export const SUB = 1
export const SIGNED = 0
export const UNSIGNED = 1

const getNegativeFlag = input => input[0]
const getZeroFlag = input => input.includes(1) ? 0 : 1
const toBinaryArray = input => input.split('').map(i => parseInt(i))

export const complement2 = (val, length) => {
  let cpVal = toBinaryArray(val)
  for (let i = 0; i < cpVal.length; i++) {
    cpVal[i] = cpVal[i] === 1 ? 0 : 1
  }

  let running = 1
  for (let i = length - 1; i >= 0 && running; i--) {
    if (cpVal[i] === 1) {
      cpVal[i] = 0
    } else {
      cpVal[i] = 1
      running = false
    }
  }
  if (running) {
    cpVal.fill(0)
    cpVal[cpVal.length - 1] = 1
  }

  return cpVal
}

export const binToDec = (binaryValue, binaryLength, isSigned) => {
  if (isSigned && binaryValue.toString().startsWith('1')) {
    return parseInt(complement2(binaryValue, binaryLength).join(''), 2) * -1
  } 

  return parseInt(binaryValue, 2)
}


export const exec = (a, b, operation, mode) => {
  a = toBinaryArray(a, mode)
  b = toBinaryArray(b, mode)

  let [c, v, result] = getCarryAndOverflowFlag(a, b, operation)
  let n = getNegativeFlag(result)
  let z = getZeroFlag(result)

  return { n, z, c, v, result: result.join(''), mode, operation }
}

export const decToBin = (decVal, binaryLength) => {
  let n = false
  let val = decVal

  if (decVal < 0) {
    n = true
    val = -decVal
  }

  val = (val >>> 0).toString(2);
  let res = [val.toString()]
  if (val.length > 1) {
    res = val.toString().split('')
  }
  if (res.length > binaryLength) {
    throw new Error('Invalid binary length')
  }
  while (res.length < binaryLength) {
    res.unshift('0')
  }

  if (n) {
    return complement2(res.join(''), binaryLength).join('')
  }

  return res.join('')
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
        b[i] = 1
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