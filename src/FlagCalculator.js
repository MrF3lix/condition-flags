import { useState } from 'react'
import * as Flags from './lib/flags'

export const FlagCalculator = () => {
  const [flags, setFlags] = useState()
  const [mode, setMode] = useState(0)
  const [operation, setOperation] = useState(0)

  const [a, setA] = useState('0111')
  const [b, setB] = useState('0010')

  const [aDec, setADec] = useState(0)
  const [bDec, setBDec] = useState(1)

  const submit = e => {
    e.preventDefault()
    setFlags(Flags.exec(a, b, operation, mode))
  }

  const reset = () => {
    setFlags()
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
              <span>Operand A Binary</span>
              <input type="text" onChange={e => setA(e.target.value)} value={a} />
            </label>
            <label>
              <span>Operand A Decimal</span>
              <input type="text" onChange={e => setADec(e.target.value)} value={aDec} />
            </label>
          </div>
          <div className="input__container">
            <label>
              <span>Operand B Binary</span>

              <input type="text" onChange={e => setB(e.target.value)} value={b} />
            </label>
            <label>
              <span>Operand B Decimal</span>
              <input type="text" onChange={e => setBDec(e.target.value)} value={bDec} />
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
          </tbody>
        </table>
      </div>
    </div>
  )
}
