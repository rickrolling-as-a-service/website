export default ({ children }) => {
  const id = children.toLowerCase().replace(/\s+/g, '-')
  return (
    <h2 className='mb-4' id={id}>
      {children + ' '}
      <a className='btn btn-sm btn-secondary' href={'#' + id}>
        Anchor
      </a>
    </h2>
  )
}