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

  const submit = e => {
    e.preventDefault()
    setFlags(Flags.exec(a, b, operation, mode))
  }

  useEffect(() => {
    console.log(registryLength)
    if (mode === Flags.SIGNED) {
      setMin(Math.pow(-2,(registryLength - 1)))
      setMax(Math.pow(2,(registryLength - 1)))
    } else {
      setMin(0)
      setMax(Math.pow(2,registryLength)-1)
    }
  }, [registryLength, mode])

  const reset = () => {
    setFlags()
  }

  const secondComplement = (val, registryLength) => {
    val = (~val + 1)
    let valString = val.toString(2)


    while (valString.length < registryLength) {
      valString = "0" + valString
    }

    return valString.substring(valString.length - registryLength)
  }

  const dec2bin = (val, registryLength) => {
    val = (val >>> 0)
    let valString = val.toString(2)


    while (valString.length < registryLength) {
      valString = "0" + valString
    }

    return valString.substring(valString.length - registryLength)
  }

  const onChangeA = (value, base) => {
    if (mode === Flags.SIGNED && value.startsWith('1')) {
      value = secondComplement(value)
    }

    let decimalValue = parseInt(value, base)

    if (base === 10) {
      setA(dec2bin(value, registryLength))
    } else {
      setA(value)
    }
    setADec(decimalValue)
  }

  const onChangeB = (value, base) => {
    if (mode === Flags.SIGNED && value.startsWith('1')) {
      value = secondComplement(value)
    }


    let decimalValue = parseInt(value, base)

    if (base === 10) {
      setB(dec2bin(value, registryLength))
    } else {
      setB(value)
    }
    setBDec(decimalValue)
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
                <option value={Flags.ADD}>ADD</option>
                <option value={Flags.SUB}>SUB</option>
              </select>
            </label>
          </div>
          <div className="input__container">
            <label>
              <span>Registry Length</span>
              <input type="number" onChange={e => setRegistryLength(e.target.value, 2)} value={registryLength} />
            </label>
          </div>
          <div className="input__container">
            <label>
              <span>Operand A Binary</span>
              <input type="text" onChange={e => onChangeA(e.target.value, 2)} value={a} />
            </label>
            <label>
              <span>Operand A Decimal ({min},{max})</span>
              <input type="number" onChange={e => onChangeA(e.target.value, 10)} value={aDec} min={min} max={max}/>
            </label>
          </div>
          <div className="input__container">
            <label>
              <span>Operand B Binary</span>

              <input type="text" onChange={e => onChangeB(e.target.value, 2)} value={b} />
            </label>
            <label>
              <span>Operand B Decimal ({min},{max})</span>
              <input type="number" onChange={e => onChangeB(e.target.value, 10)} value={bDec} min={min} max={max}/>
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>N</th>
              <td>{flags && flags.n}</td>
            </tr>
            <tr>
              <th>Z</th>
              <td>{flags && flags.z}</td>
            </tr>
            <tr>
              <th>C</th>
              <td>{flags && flags.c}</td>
            </tr>
            <tr>
              <th>V</th>
              <td>{flags && flags.v}</td>
            </tr>
            <tr>
              <th>Mode</th>
              <td>{flags ? flags.mode === Flags.SIGNED ? 'Signed' : 'Unsigned' : ''}</td>
            </tr>
            <tr>
              <th>Operation</th>
              <td>{flags ? flags.operation === Flags.ADD ? 'ADD' : 'SUB' : ''}</td>
            </tr>
            <tr>
              <th>Result</th>
              <td>{flags && flags.result}</td>
            </tr>
            <tr>
              <th>Result Decimal</th>
              <td>{flags && parseInt(flags.result.join(''), 2).toString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
