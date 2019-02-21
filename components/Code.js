export default ({ code, jsxCode, className }) => (
  <pre className={`text-left styled-code ${className ? className : ''}`}>
    <code>{jsxCode || code.trim()}</code>
  </pre>
)