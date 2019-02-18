import Code from './Code'

export default ({ message, code }) => (
  <div>
    <p>
      Response code {code}
    </p>
    <Code code={`
{
  error: '${message}'
}
    `} />
  </div>
)