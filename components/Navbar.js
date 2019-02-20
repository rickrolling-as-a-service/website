import { useState } from 'react'
import Link from './Link'
import '../styles/brand.scss'

export default ({ absolute, dark }) => {
  const [ toggled, toggle ] = useState(false)
  return (
    <nav className={`navbar navbar-expand-sm navbar-${dark ? 'dark' : 'light'} ${absolute && 'navbar-absolute'}`}>
      <div className='container'>
        <Link href='/'>
          <a className='navbar-brand'>
            <img
              src='/static/images/logo-transparent.png'
              className='brand-logo'
            />
            RaaS
          </a>
        </Link>
        <button className={`navbar-toggler ${toggled ? '' : 'collapsed'}`} onClick={() => toggle(!toggled)}>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className={`collapse navbar-collapse custom-collapse ${toggled ? 'show' : ''}`}>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link href='/' activeClassName='active'>
                <a className='nav-link'>Home</a>
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/docs' activeClassName='active'>
                <a className='nav-link'>Docs</a>
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/downloads' activeClassName='active'>
                <a className='nav-link'>Downloads</a>
              </Link>
            </li>
          </ul>
          <Link href='/docs/start'>
            <button className={`btn btn-outline-${dark ? 'light' : 'primary'} btn-sm`}>
              Get started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}