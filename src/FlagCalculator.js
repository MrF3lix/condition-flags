import { useState } from 'react'
import * as Flags from './lib/flags'

export const FlagCalculator = () => {
  const [flags, setFlags] = useState({ n: 0, z: 0, c: 0, v: 0, result: 0 })
  const [mode, setMode] = useState(0)
  const [operation, setOperation] = useState(0)

  const [a, setA] = useState('0111')
  const [b, setB] = useState('0010')

  const submit = e => {
    e.preventDefault()

    const resultFlags = Flags.exec(a, b, operation, mode);
    setFlags(resultFlags)
  }

  const reset = () => {
    setMode(0)
    setOperation(0)
    setFlags({ n: 0, z: 0, c: 0, v: 0, result: 0 })
  }

  return (
    <div className="row">
      <div className="col">
        <h2>Input</h2>
        <form onSubmit={submit}>
          <div className="input__container">
            <label>
              <span>Mode</span>

              <select onChange={e => setMode(parseInt(e.target.value))} defaultValue={mode}>
                <option value={Flags.SIGNED}>Signed</option>
                <option value={Flags.UNSIGNED}>Unsigned</option>
              </select>
            </label>
          </div>
          <div className="input__container">
            <label>
              <span>Operation</span>

              <select onChange={e => setOperation(parseInt(e.target.value))} defaultValue={operation}>
                <option value={Flags.ADD}>ADD</option>
                <option value={Flags.SUB}>SUB</option>
                <option value={Flags.MUL}>MUL</option>
              </select>
            </label>
          </div>
          <div className="input__container">
            <label>
              <span>Operand A</span>

              <input type="text" onChange={e => setA(e.target.value)} value={a} />
            </label>
          </div>
          <div className="input__container">
            <label>
              <span>Operand B</span>

              <input type="text" onChange={e => setB(e.target.value)} value={b} />
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
              <td>{flags.n}</td>
            </tr>
            <tr>
              <th>Z</th>
              <td>{flags.z}</td>
            </tr>
            <tr>
              <th>C</th>
              <td>{flags.c}</td>
            </tr>
            <tr>
              <th>V</th>
              <td>{flags.v}</td>
            </tr>
            <tr>
              <th>Result</th>
              <td>{flags.result}</td>
            </tr>
          </tbody>
        </table>
        <h2>Raw Output</h2>
        <div>
          <pre><code>{JSON.stringify(flags)}</code></pre>
        </div>
      </div>
    </div>
  )

}