import Link from 'next/link'

export default ({ name, children, href }) => (
  <Link href={href || '#'}>
    <a className='card link-card'>
      <div className='card-header'>
        <h4 className='my-0 font-weight-normal'>{name}</h4>
      </div>
      <div className='card-body'>
        {children}
      </div>
    </a>
  </Link>
)