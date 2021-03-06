import '../../styles/main.scss'

import { Component } from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import Link from 'next/link'
import NextSeo from 'next-seo'

export default class extends Component {
  render() {
    return (
      <>
        <NextSeo config={{
          title: 'Docs',
          canonical: 'https://raas.now.sh/docs/',
          openGraph: {
            title: 'Docs',
            url: 'https://raas.now.sh/docs/'
          }
        }} />
        <Navbar />
        <section className='container mt-5'>
          <h1 className='display-4'>Documentation Center</h1>
          <div className='jumbotron mt-5'>
            <h1>Are you new?</h1>
            <p className='lead'>
              We recommend checking out our quick start guide, to get up and running ASAP.
            </p>
            <Link href='/docs/start'>
              <button className='btn btn-primary'>
                Do that!
              </button>
            </Link>
          </div>
        </section>
        <section className='container mt-5'>
          <div className='row mt-5 card-row'>
            <div className='col-sm-6 col-md-4'>
              <Card name='Quick Start' href='/docs/start'>
                A short guide to getting started with RaaS as fast as possible. Read through this first if you're new.
              </Card>
            </div>
            <div className='col-sm-6 col-md-4'>
              <Card name='API Reference' href='/docs/api'>
                A full reference of how to interact with our API correctly. If you're new, we recommend reading the quick start guide first.
              </Card>
            </div>
            <div className='col-sm-6 col-md-4'>
              <Card name='Debugging'>
                Have a problem? Look at this section for solutions to some common problems and bugs.
              </Card>
            </div>
            <div className='col-sm-6 col-md-4'>
              <Card name='Node.js Client' href='/docs/node'>
                Documentation on our Node.js client, for easy API usage. Perfect for automating deployments.
              </Card>
            </div>
            <div className='col-sm-6 col-md-4'>
              <Card name='CLI Usage'>
                A full reference on how to download, install, and use our simple but robust command line interface.
              </Card>
            </div>
            <div className='col-sm-6 col-md-4'>
              <Card name='Help Desk'>
                Can't find what you're looking for? You can try contacting us. We will usually respond within 12 hours.
              </Card>
            </div>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}