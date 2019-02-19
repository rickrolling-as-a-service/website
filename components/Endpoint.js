import Code from './Code'

export default ({ endpoint, method, required, optional, response }) => (
  <div>
    <p className='mb-0'>Endpoint: <code>{endpoint}</code></p>
    <p className='mb-0'>Method: <code>{method || 'POST'}</code></p>
    <p className='mb-0'>Body format: JSON</p>
    {required && (
      <div className='mt-2'>
        Required params:
        <ul className='mb-0'>
          {required.map(({ name, type }) => (
            <li key={name}>{name}: <code>{type}</code></li>
          ))}
        </ul>
      </div>
    )}
    {optional && (
      <div className='mt-2'>
        Optional params:
        <ul className='mb-0'>
          {optional.map(({ name, type }) => (
            <li key={name}>{name}: <code>{type}</code></li>
          ))}
        </ul>
      </div>
    )}
    <p className='mt-2 mb-1'>Example response:</p>
    <Code code={response} />
  </div>
)