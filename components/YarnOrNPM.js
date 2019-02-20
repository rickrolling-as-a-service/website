import { useState } from 'react'

export default ({ onChange }) => {
  const [ pm, setPm ] = useState('yarn')
  return (
    <>
      <p>
        What package manager do you use?
      </p>
      <div className='btn-group'>
        <button
          className={`btn btn-outline-primary btn-sm ${pm === 'yarn' && 'active'}`}
          onClick={() => { setPm('yarn'); onChange('yarn') }}
        >
          Yarn
        </button>
        <button
          className={`btn btn-outline-primary btn-sm ${pm === 'npm' && 'active'}`}
          onClick={() => { setPm('npm'); onChange('npm') }}
        >
          NPM
        </button>
      </div>
    </>
  )
}