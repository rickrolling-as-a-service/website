import '../styles/main.scss'

import { Component } from 'react'
import Feature from '../components/Feature'
import Code from '../components/Code'
import Cover from '../components/Cover'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import NextSeo from 'next-seo'

export default class extends Component {
  render() {
    return (
      <>
        <NextSeo config={{
          title: 'Home',
          canonical: 'https://raas.now.sh/',
          openGraph: {
            title: 'Home',
            url: 'https://raas.now.sh/'
          }
        }} />
        <Navbar absolute dark />
        <Cover
          heading='RaaS'
          lead='Rickrolling as a service.'
          action='Learn more'
          onClick={this.learnMore}
        />
        <section className='container mt-5'>
          <div className='row'>
            <div className='col-sm'>
              <Feature title='Deploy instantly'>
                With <strong>RaaS</strong> you don't have to spend time setting up deployments and redirects. Deploy a rickroll in the click of a button.
              </Feature>
            </div>
            <div className='col-sm'>
              <Feature title='Speedy and stable'>
                We built <strong>RaaS</strong> with goals of high stability and near-zero downtime, so you can rely on us.
              </Feature>
            </div>
            <div className='col-sm'>
              <Feature title='Custom domains'>
                Need your own domain? Set it up it up to point to your rickroll in seconds with <strong>RaaS</strong>.
              </Feature>
            </div>
            <div className='col-sm'>
              <Feature title='Multiple memes'>
                Want a different meme such as <a href='https://www.youtube.com/watch?v=0tdyU_gW6WE' target='_blank'>Bustin</a>? <strong>RaaS</strong> lets you specify a meme index for ultimate customization.
              </Feature>
            </div>
          </div>
        </section>
        <section className='container mt-lg text-center'>
          <h1>Say Goodbye to Redirects</h1>
          <p className='max-norm mt-4'>
            Managing redirects and server deployments is tedious. By the time you finish, your target can be long gone. With <strong>RaaS</strong>, you don't have to worry about any of that.
          </p>
          <div className='row mt-4'>
            <div className='col-md-6 offset-md-3'>
            <Code jsxCode={(
              <div>
                $ yarn global add raas-cli<br />
                $ raas<br />
                <b>RaaS CLI v1.0.0</b><br />
                <span className='text-muted'>></span> Meme index is 0<br />
                <span className='text-muted'>></span> Code is IOcH3vyLL<br />
                <span className='text-success'>SUCCESS</span> <span className='text-muted'>
                  Deployment available at <a href='https://raas.now.sh/d/IOcH3vyLL' className='text-muted' target='_blank'>
                    https://raas.now.sh/d/IOcH3vyLL
                  </a>
                </span>
              </div>
            )} />
            </div>
          </div>
        </section>
        <section className='container mt-lg text-center'>
          <h1>A Flexible API</h1>
          <p className='max-norm mt-4'>
            We have a simple and flexible API so you can integrate <strong>RaaS</strong> into any of your own projects. Focus on building your product, not debugging our API.
          </p>
          <div className='row mt-4'>
            <div className='col-lg-4 offset-lg-2 col-md-6'>
              <Code code={`
fetch('https://raas.now.sh/api/deploy', {
  method: 'POST',
  body: JSON.stringify({
    key: 'xxx',
    action: 'create',
    memeIndex: 1
  })
})
              `} />
            </div>
            <div className='col-lg-4 col-md-6'>
              <Code code={`
{
  code: 'I9htyZS8N',
  uri: 'https://raas.now.sh/d/I9htyZS8N'
}
              `} />
            </div>
          </div>
          <div className='btn-group'>
          <Link href='/docs/api'>
              <a className='btn btn-secondary'>Use our Node.js client</a>
            </Link>
            <Link href='/docs/api'>
              <a className='btn btn-outline-primary'>Use our Node.js client</a>
            </Link>
          </div>
        </section>
        <section className='container mt-lg text-center'>
          <h1>Always Working, Always Online</h1>
          <p className='max-norm mt-4'>
            Your deployment will always point to a working and up-to-date video. We will notify you before making any service changes.
          </p>
          <p className='max-norm mt-4'>
            <strong>RaaS</strong> was built with a goal of never going down, and you can trust us for your vital meming.
          </p>
        </section>
        <section className='container mt-lg'>
          <hr />
          <div className='row text-center level py-3'>
            <div className='col-lg-5 offset-lg-1 col-sm'>
              <h1>Ready to roll?</h1>
            </div>
            <div className='col-lg-5 col-sm'>
              <Link href='/docs/start'>
                <button className='btn btn-primary'>Get started</button>
              </Link>
            </div>
          </div>
          <hr />
        </section>
        <Footer />
      </>
    )
  }

  learnMore = () => {
    window.scrollTo(0, window.innerHeight)
  }
}