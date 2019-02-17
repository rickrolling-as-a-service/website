export default ({ code, className }) => (
  <pre className={`text-left styled-code ${className ? className : ''}`}>
    <code>{code.trim()}</code>
  </pre>
)