import { useEffect, useState } from 'react'
import * as Flags from './lib/flags'
import { OperandInput } from './operand-input'

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

    const formData = new FormData(e.target)
    for (var pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    setFlags(Flags.exec(a, b, operation, mode, registryLength))
  }

  useEffect(() => {
    if (!a || !b) {
      return
    }

    if (mode === Flags.SIGNED) {
      setMin(-1 * Math.pow(2, (registryLength - 1)))
      setMax(Math.pow(2, (registryLength - 1)) - 1)
    } else {
      setMin(0)
      setMax(Math.pow(2, registryLength) - 1)
    }

    // onChangeA(0, 10)
    // onChangeB(0, 10)

    // onChangeA(aDec, 10)
    // onChangeB(bDec, 10)

  }, [mode, registryLength])

  useEffect(() => {
    setRegistryLength(a.length)
  }, [a])

  const reset = () => setFlags()

  return (
    <div className="row">
      <div className="col">
        <h2>Input</h2>
        <form onSubmit={submit}>
          <div className="input__container">
            <label>
              <span>Operation</span>

              <select name="operation" onChange={e => setOperation(parseInt(e.target.value))} value={operation}>
                <option value={Flags.ADD}>ADDS</option>
                <option value={Flags.SUB}>SUBS</option>
              </select>
            </label>
          </div>
          <div className="input__container">
            <label>
              <span>Mode</span>

              <select name="mode" onChange={e => setMode(parseInt(e.target.value))} value={mode}>
                <option value={Flags.SIGNED}>Signed</option>
                <option value={Flags.UNSIGNED}>Unsigned</option>
              </select>
            </label>
          </div>
          <div className="input__container">
            <label>
              <span>Registry Length</span>
              <input name="registryLength" type="number" onChange={e => setRegistryLength(e.target.value, 2)} value={registryLength} />
            </label>
          </div>
          <OperandInput id="A" registryLength={registryLength} mode={mode} min={min} max={max} />
          <OperandInput id="B" registryLength={registryLength} mode={mode} min={min} max={max} />

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
              <th>Name</th>
              <th>Value</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {flags && flags.map((item, i) => {
              if (!item || !item.displayName || item.hidden || !item.value) return <></>
              return (
                <tr key={i}>
                  <th>{item?.displayName}</th>
                  <td colSpan={item.note ? 1 : 2}>{item.value}</td>
                  {item.note &&
                    <td>{item.note}</td>
                  }
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
