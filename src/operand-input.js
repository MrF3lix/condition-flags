import { useState } from "react"
import * as Flags from './lib/flags'

export const OperandInput = ({ id, registryLength, mode, min, max }) => {
  const [binary, setBinary] = useState(0)
  const [dec, setDecimal] = useState(0)
  const [hex, setHex] = useState(0)

  const onChangeInput = (value, base) => {
    if (base === 10) {
      setDecimal(value)
      setBinary(Flags.decToBin(value, registryLength))
      setHex(toHex(value))
    } else if (base === 2 && value) {
      let decimal = Flags.binToDec(value, registryLength, mode === Flags.SIGNED)
      setDecimal(decimal)
      setBinary(value)
      setHex(toHex(decimal))
    } else if (base === 16) {
      let decimal = parseInt(value, base)
      setDecimal(decimal)
      setBinary(Flags.decToBin(decimal, registryLength))
      setHex(value)
    }
  }

  const toHex = val => {
    return val >= 0 ? '0x' + val.toString(16) : '-0x' + val.toString(16).substring(1)
  }

  return (
    <>
      <h3>Operand {id}</h3>
      <div className="input__container">
        <label>
          <span>Binary</span>
          <input type="text" name={`${id}-binary`} pattern={`[01]{${registryLength}}`} onChange={e => onChangeInput(e.target.value, 2)} value={binary} />
        </label>
        <label>
          <span>Decimal ({min},{max})</span>
          <input type="number" name={`${id}-decimal`} onChange={e => onChangeInput(e.target.value, 10)} value={dec} min={min} max={max} />
        </label>
        <label>
          <span>Hex</span>
          <input type="text" name={`${id}-hex`} onChange={e => onChangeInput(e.target.value, 16)} value={hex} />
        </label>
      </div>
    </>
  )
}