import '../../styles/main.scss'

import { Component } from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import YarnOrNPM from '../../components/YarnOrNPM'
import Code from '../../components/Code'
import Link from 'next/link'
import AnchoredHeading from '../../components/AnchoredHeading'
import NextSeo from 'next-seo'

export default class extends Component {
  state = {
    yarn: true
  }

  render() {
    const { yarn } = this.state

    return (
      <>
        <NextSeo config={{
          title: 'Quick Start',
          canonical: 'https://raas.now.sh/docs/start',
          openGraph: {
            title: 'Quick Start',
            url: 'https://raas.now.sh/docs/start'
          }
        }} />
        <Navbar />
        <section className='container mt-5'>
          <h1 className='display-4'>Quick Start</h1>
          <p className='lead mt-3'>
            A short guide to getting started with RaaS as fast as possible. Read through this first if you're new.
          </p>
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Install the CLI</AnchoredHeading>
          <p>
            Make sure you have a computer running Windows, macOS, or Linux with <a href='https://nodejs.org/en/download/' target='_blank'>Node.js</a> installed before proceeding.
          </p>
          <p>
            First, you'll have to download our command line interface. This is what you'll use to quickly create deployments.
          </p>
          <YarnOrNPM onChange={this.changePackageManager} />
          <Code className='mt-3' code={yarn ? '$ yarn global add raas-cli' : '$ npm install -g raas-cli'} />
          <p>
            Now you're going to have to log in. Don't worry about creating an account, this will be done automatically if you don't have one.
          </p>
          <Code code='$ raas login' />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Create a Deployment</AnchoredHeading>
          <p>
            Now you're going to create your first deployment. It's going to be a simple rickroll.
          </p>
          <Code code={`
$ raas
RaaS CLI v1.0.0
> Meme index is 0
> Code is IOcH3vyLL
SUCCESS Deployment available at https://raas.now.sh/d/IOcH3vyLL
          `} />
          <p>
            Click on the link and you should be rickrolled! Of course, your code will be different.
          </p>
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Alias Your Deployment</AnchoredHeading>
          <p>
            An alias is used to create a custom readable name for your rickroll. They can also be used for custom domains later on.
          </p>
          <p>
            Make sure to choose an alias that nobody else has taken!
          </p>
          <Code code={`
$ raas alias <ALIAS>
RaaS CLI v1.0.0
> Code is IOcH3vyLL
> Alias is <ALIAS>
SUCCESS Alias available at https://raas.now.sh/a/<ALIAS>
          `} />
          <p>
            By default, RaaS will alias your latest deployment. If you want to alias a specific deployment, just specify the code like in the example below.
          </p>
          <Code code={`
$ raas alias <CODE> <ALIAS>
RaaS CLI v1.0.0
> Code is <CODE>
> Alias is <ALIAS>
SUCCESS Alias available at https://raas.now.sh/a/<ALIAS>
          `} />
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