import '../../styles/main.scss'

import { Component } from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Endpoint from '../../components/Endpoint'
import AnchoredHeading from '../../components/AnchoredHeading'
import Error from '../../components/Error'
import Link from 'next/link'
import { memes } from '../../api/constants'
import NextSeo from 'next-seo'

export default class extends Component {
  state = {
    yarn: true
  }

  render() {
    return (
      <>
        <NextSeo config={{
          title: 'API Reference',
          canonical: 'https://raas.now.sh/docs/api',
          openGraph: {
            title: 'API Reference',
            url: 'https://raas.now.sh/docs/api'
          }
        }} />
        <Navbar />
        <section className='container mt-5'>
          <h1 className='display-4'>API Reference</h1>
          <p className='lead mt-3'>
            A full reference of how to interact with our API correctly. If you're new, we recommend reading the quick start guide first.
          </p>
          <p>
            If you're interacting with our API using Node.js, we recommend our <Link href='/docs/node'>Node.js client</Link>.
          </p>
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Supported Memes</AnchoredHeading>
          <p>
            Below is a list of all the memes we currently support. You can select one with <code>memeIndex</code>, see <a href='#create-a-deployment'>Create a Deployment</a>.
          </p>
          <ol start='0'>
            {memes.map((meme, index) => (
              <li key={meme.uri}>
                <a href={meme.uri} target='_blank'>{meme.name}</a>
              </li>
            ))}
          </ol>
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
          <div className='alert alert-warning'>
            <strong>Warning!</strong> This will cause all programs still using your old API key to stop working.
          </div>
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
  uri: 'https://raas.now.sh/d/I9htyZS8N'
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
            optional={[
              { name: 'memeIndex', type: 'Number' }
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
  memeName: 'Rickroll',
  views: 1,
  uri: 'https://raas.now.sh/d/I9htyZS8N'
}
            `}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>View a Deployment</AnchoredHeading>
          <div className='alert alert-warning'>
            <strong>Warning!</strong> Note that a deployment's view count is automatically incremented every time it's visited.
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
          <AnchoredHeading>Create/Update an Alias</AnchoredHeading>
          <Endpoint
            endpoint='/api/aliases/alias'
            required={[
              { name: 'key', type: 'String' },
              { name: 'code', type: 'String' },
              { name: 'alias', type: 'String' }
            ]}
            response={`
{
  uri: 'https://raas.now.sh/a/xxx'
}
            `}
          />
          <p>
            If the alias doesn't exist, it'll be created, but if it does it'll be updated with the new code.
          </p>
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>List Aliases</AnchoredHeading>
          <Endpoint
            endpoint='/api/aliases/list'
            required={[
              { name: 'key', type: 'String' }
            ]}
            optional={[
              { name: 'code', type: 'String' }
            ]}
            response={`
{
  [
    {
      alias: 'xxx',
      code: 'I9htyZS8N'
    }
  ],
  count: 1
}
            `}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Get Alias Info</AnchoredHeading>
          <Endpoint
            endpoint='/api/aliases/info'
            required={[
              { name: 'key', type: 'String' },
              { name: 'alias', type: 'String' }
            ]}
            response={`
{
  code: 'I9htyZS8N',
  uri: 'https://raas.now.sh/a/xxx'
}
            `}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Delete an Alias</AnchoredHeading>
          <Endpoint
            endpoint='/api/aliases/delete'
            method='DELETE'
            required={[
              { name: 'key', type: 'String' },
              { name: 'alias', type: 'String' }
            ]}
            response={`
{
  code: 'I9htyZS8N'
}
            `}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Errors</AnchoredHeading>
          <p>
            This section documents all the possible error responses you can get.
          </p>
          <Error message='Username or password not specified' code='401' />
          <Error message='Incorrect password' code='401' />
          <Error message='User does not exist' code='401' />
          <Error message='API key not specified' code='401' />
          <Error message='Meme not found' code='404' />
          <Error message='Invalid API key' code='401' />
          <Error message='Code not specified' code='400' />
          <Error message='Deployment not found' code='404' />
          <Error message='You are not the owner of that deployment' code='403' />
          <Error message='Alias or code not specified' code='400' />
          <Error message='Invalid alias, must match regex /.../' code='400' />
          <Error message='You are not the owner of that alias' code='403' />
          <Error message='Alias not specified' code='400' />
          <Error message='We messed up' code='500' />
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
}