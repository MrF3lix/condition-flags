let getNegativFlag = function (input) {
  return (input[0] == '1')
}

let getZeroFlag = function (input) {
  return (!input.includes('1'))
}

let getCarryAndOverflowFlag = function (v1, v2, op) {
  console.log("****************************")
  let c = 0, v = 0, inp = 0
  let result = new Array(v1.length)

  if (op == 2) {
    for (let i = 0; i < v2.length; i++) {
      v2[i] = v2[i] == '1' ? '0' : '1'
    }

    let running = 1
    for (let i = v1.length - 1; i >= 0 && running; i--) {
      if (v2[i] == '1') {
        v2[i] = '0'
      } else {
        v2[i] = '1'
        running = false
      }
    }
    if (running) {
      v2.fill('0')
      v2[v2.length - 1] = '1'
    }

    inp = 1
  }
  console.log("v1 = " + v1)
  console.log("v2 = " + v2)

  if (op == 1 || op == 2) {
    for (let i = v1.length - 1; i >= 0; i--) {
      v = c
      let add1 = parseInt(v1[i])
      let add2 = parseInt(v2[i])
      let sum = add1 + add2 + c
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

  if (op == 2) {
    c = c == '1' ? '0' : '1'
  }

  console.log("result = " + result)
  console.log("Carry " + (op == 1 ? "Add" : "Sub") + ": " + c)
  console.log("Overflow " + (op == 1 ? "Add" : "Sub") + ": " + v)
  return [c, v]
}

let exampleInput = '11000011'
let exInput = Array.from(exampleInput)


//console.log("Negativ: " + getNegativFlag(exInput))
//console.log("Zero: " + getZeroFlag(exInput))

// ****************** ADD ***************************
let v1 = Array.from('0111')
let v2 = Array.from('0010')
let carry, overflow
let res = getCarryAndOverflowFlag(v1, v2, 1)
v1 = Array.from('1010')
v2 = Array.from('1101')
res = getCarryAndOverflowFlag(v1, v2, 1)
v1 = Array.from('0001')
v2 = Array.from('1110')
res = getCarryAndOverflowFlag(v1, v2, 1)
v1 = Array.from('0011')
v2 = Array.from('1111')
res = getCarryAndOverflowFlag(v1, v2, 1)

// ****************** ADD ***************************
v1 = Array.from('10000010')
v2 = Array.from('00010010')
res = getCarryAndOverflowFlag(v1, v2, 1)

v1 = Array.from('00110100')
v2 = Array.from('01110010')
res = getCarryAndOverflowFlag(v1, v2, 1)

v1 = Array.from('11000010')
v2 = Array.from('10000111')
res = getCarryAndOverflowFlag(v1, v2, 1)

v1 = Array.from('10100011')
v2 = Array.from('01100010')
res = getCarryAndOverflowFlag(v1, v2, 1)


// ****************** SUB ***************************
v1 = Array.from('10000010')
v2 = Array.from('00010010')
res = getCarryAndOverflowFlag(v1, v2, 2)

v1 = Array.from('00110100')
v2 = Array.from('01110010')
res = getCarryAndOverflowFlag(v1, v2, 2)

v1 = Array.from('11000010')
v2 = Array.from('10000111')
res = getCarryAndOverflowFlag(v1, v2, 2)

v1 = Array.from('10100011')
v2 = Array.from('01100010')
res = getCarryAndOverflowFlag(v1, v2, 2)