import '../../styles/main.scss'

import { Component } from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Endpoint from '../../components/Endpoint'
import AnchoredHeading from '../../components/AnchoredHeading'
import Link from 'next/link'

export default class extends Component {
  state = {
    yarn: true
  }

  render() {
    return (
      <>
        <Navbar />
        <section className='container mt-5'>
          <h1 className='display-4'>API Reference</h1>
          <p className='lead mt-3'>
            A full reference of how to interact with our API correctly. If you're new, we recommend reading the quick start guide first.
          </p>
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Get API Key</AnchoredHeading>
          <Endpoint
            endpoint='/api/key/get'
            required={[
              { name: 'username', type: 'String' },
              { name: 'password', type: 'String' }
            ]}
            response={`
{
  key: 'xxx'
}
            `}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Revoke &amp; Regenerate API Key</AnchoredHeading>
          <Endpoint
            endpoint='/api/key/regen'
            required={[
              { name: 'username', type: 'String' },
              { name: 'password', type: 'String' }
            ]}
            response={`
{
  key: 'yyy'
}
            `}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Create a Deployment</AnchoredHeading>
          <Endpoint
            endpoint='/api/deployments/create'
            required={[
              { name: 'key', type: 'String' }
            ]}
            optional={[
              { name: 'memeIndex', type: 'Number' }
            ]}
            response={`
{
  code: 'I9htyZS8N',
  uri: 'https://raas.pw/d/I9htyZS8N'
}
            `}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>List Deployments</AnchoredHeading>
          <Endpoint
            endpoint='/api/deployments/list'
            required={[
              { name: 'key', type: 'String' }
            ]}
            response={`
{
  deployments: [
    {
      code: 'I9htyZS8N',
      memeIndex: 0,
      views: 1
    }
  ],
  count: 1
}
            `}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Get Deployment Info</AnchoredHeading>
          <Endpoint
            endpoint='/api/deployments/info'
            required={[
              { name: 'key', type: 'String' },
              { name: 'code', type: 'String' }
            ]}
            response={`
{
  memeIndex: 0,
  memeUri: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  views: 1,
  uri: 'https://raas.pw/d/I9htyZS8N'
}
            `}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>View a Deployment</AnchoredHeading>
          <div className='alert alert-warning'>
            <strong>Warning!</strong> Note that a deployment's view count is automatically incremented every time it's viewed.
          </div>
          <Endpoint
            endpoint='/api/deployments/view'
            required={[
              { name: 'key', type: 'String' },
              { name: 'code', type: 'String' }
            ]}
            response={`
{
  views: 2
}
            `}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Delete a Deployment</AnchoredHeading>
          <Endpoint
            endpoint='/api/deployments/delete'
            method='DELETE'
            required={[
              { name: 'key', type: 'String' },
              { name: 'code', type: 'String' }
            ]}
            response={`
{
  finalViews: 2
}
            `}
          />
        </section>
        <section className='container mt-5'>
          <Link href='/docs'>
            <button className='btn btn-primary'>Go back to the docs</button>
          </Link>
        </section>
        <Footer />
      </>
    )
  }

  changePackageManager = (pm) => {
    this.setState({
      yarn: pm === 'yarn'
    })
  }
}