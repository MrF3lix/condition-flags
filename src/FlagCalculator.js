import { useEffect, useState } from 'react'
import * as Flags from './lib/flags'

export const FlagCalculator = () => {
  const [flags, setFlags] = useState()
  const [registryLength, setRegistryLength] = useState(4)
  const [mode, setMode] = useState(0)
  const [operation, setOperation] = useState(0)

  const [a, setA] = useState('0000')
  const [b, setB] = useState('0000')

  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)

  const [aDec, setADec] = useState(0)
  const [bDec, setBDec] = useState(0)

  const [aHex, setAHex] = useState(0)
  const [bHex, setBHex] = useState(0)

  const submit = e => {
    e.preventDefault()
    setFlags(Flags.exec(a, b, operation, mode, registryLength))
  }

  useEffect(() => {
    if(!a || !b) {
      return
    }

    if (mode === Flags.SIGNED) {
      setMin(-1 * Math.pow(2, (registryLength - 1)))
      setMax(Math.pow(2, (registryLength - 1)) - 1)
    } else {
      setMin(0)
      setMax(Math.pow(2, registryLength) - 1)
    }

    onChangeA(0, 10)
    onChangeB(0, 10)

    onChangeA(aDec, 10)
    onChangeB(bDec, 10)

  }, [mode, registryLength])

  useEffect(() => {
    setRegistryLength(a.length)
  }, [a])

  const reset = () => setFlags()

  const onChangeInput = (value, base, setBinary, setDecimal, setHex) => {
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

  const onChangeA = (value, base) => {
    onChangeInput(value, base, setA, setADec, setAHex)
  }

  const onChangeB = (value, base) => {
    onChangeInput(value, base, setB, setBDec, setBHex)
  }

  const toHex = val => {
    return val >= 0 ? '0x' + val.toString(16) : '-0x' + val.toString(16).substring(1)
  }

  return (
    <div className="row">
      <div className="col">
        <h2>Input</h2>
        <form onSubmit={submit}>
          <div className="input__container">
            <label>
              <span>Mode</span>

              <select onChange={e => setMode(parseInt(e.target.value))} value={mode}>
                <option value={Flags.SIGNED}>Signed</option>
                <option value={Flags.UNSIGNED}>Unsigned</option>
              </select>
            </label>
          </div>
          <div className="input__container">
            <label>
              <span>Operation</span>

              <select onChange={e => setOperation(parseInt(e.target.value))} value={operation}>
                <option value={Flags.ADD}>ADDS</option>
                <option value={Flags.SUB}>SUBS</option>
              </select>
            </label>
          </div>
          <div className="input__container">
            <label>
              <span>Registry Length</span>
              <input type="number" onChange={e => setRegistryLength(e.target.value, 2)} value={registryLength} />
            </label>
          </div>
          <h3>Operand A</h3>
          <div className="input__container">
            <label>
              <span>Binary</span>
              <input type="text" pattern={`[01]{${registryLength}}`} onChange={e => onChangeA(e.target.value, 2)} value={a} />
            </label>
            <label>
              <span>Decimal ({min},{max})</span>
              <input type="number" onChange={e => onChangeA(e.target.value, 10)} value={aDec} min={min} max={max} />
            </label>
            <label>
              <span>Hex</span>
              <input type="text" onChange={e => onChangeA(e.target.value, 16)} value={aHex} />
            </label>
          </div>
          <h3>Operand B</h3>
          <div className="input__container">
            <label>
              <span>Binary</span>
              <input type="text" pattern={`[01]{${registryLength}}`} onChange={e => onChangeB(e.target.value, 2)} value={b} />
            </label>
            <label>
              <span>Decimal ({min},{max})</span>
              <input type="number" onChange={e => onChangeB(e.target.value, 10)} value={bDec} min={min} max={max} />
            </label>
            <label>
              <span>Hex</span>
              <input type="text" onChange={e => onChangeB(e.target.value, 16)} value={bHex} />
            </label>
          </div>
          <div className="input__container">
            <button type="submit" className="button button--primary">Calculate</button>
            <button type="button" className="button" onClick={reset}>Reset</button>
          </div>
        </form>

      </div>
      <div className="col">
        <h2>Output</h2>
        <table>
          <thead>
            <tr>
              <th>Flag</th>
              <th>Value</th>
              <th colSpan={2}>Note</th>
            </tr>
          </thead>
          <tbody>
            {flags ?
              <>
                <tr>
                  <th>N</th>
                  <td>{flags.n}</td>
                  <td colSpan={2}>{flags.n === 1 ? 'Result is negative' : 'Result is positive'} </td>
                </tr>
                <tr>
                  <th>Z</th>
                  <td>{flags.z}</td>
                  <td colSpan={2}>{flags.z === 1 ? 'Result is zero' : 'Result is not zero'} </td>
                </tr>
                <tr>
                  <th>C</th>
                  <td>{flags.c}</td>
                  <td colSpan={2}>{flags.mode === Flags.UNSIGNED ? flags.operation === Flags.SUB ? 'Borrow' : 'Carry' : 'Irrelevant for signed operations'}</td>
                </tr>
                <tr>
                  <th>V</th>
                  <td>{flags.v}</td>
                  <td colSpan={2}>{flags.mode === Flags.SIGNED ? 'Overflow' : 'Irrelevant for unsigned operations'}</td>
                </tr>
                <tr>
                  <th>Carry Sequence (Übertrag)</th>
                  <td colSpan={3}>{flags.cs}</td>
                </tr>
                {flags.operation === Flags.SUB &&
                  <tr>
                    <th>Two's complement of B (ZK)</th>
                    <td colSpan={3}>{flags.b2c}</td>
                  </tr>
                }
                <tr>
                  <th>Mode</th>
                  <td colSpan={3}>{flags.mode === Flags.SIGNED ? 'Signed' : 'Unsigned'}</td>
                </tr>
                <tr>
                  <th>Operation</th>
                  <td colSpan={3}>{flags.operation === Flags.ADD ? 'ADD' : 'SUB'}</td>
                </tr>
                <tr>
                  <th>Result</th>
                  <td>{flags.resultBinary}</td>
                  <td>{flags.resultDecimal}</td>
                  <td>{flags.resultHex}</td>
                </tr>
              </>
              :
              <tr>
                <td colSpan={3}>No results available</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
