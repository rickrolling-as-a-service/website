import '../../styles/main.scss'

import { Component } from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import YarnOrNPM from '../../components/YarnOrNPM'
import Code from '../../components/Code'
import Link from 'next/link'
import AnchoredHeading from '../../components/AnchoredHeading'

export default class extends Component {
  state = {
    yarn: true
  }

  render() {
    const { yarn } = this.state

    return (
      <>
        <Navbar />
        <section className='container mt-5'>
          <h1 className='display-4'>Quick Start Guide</h1>
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
          <Code className='mt-4' code={yarn ? '$ yarn global add @raas/cli' : '$ npm install -g @raas/cli'} />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Create a Deployment</AnchoredHeading>
          <p>
            Now you're going to create your first deployment. It's going to be a simple rickroll.
          </p>
          <Code code={`
$ raas
RaaS Version 1.0.0
> Meme index is 0: rickroll
> Assigning code I9htyZS8N
> Creating deployment...
> Done!
Your deployment is at https://raas.pw/r/I9htyZS8N
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
RaaS Version 1.0.0
> Deployment code is: I9htyZS8N
> Aliasing to <ALIAS>...
> Done!
Your deployment is now aliased to https://raas.pw/a/<ALIAS>
          `} />
          <p>
            By default, RaaS will alias your latest deployment. If you want to alias a specific deployment, just specify the code like the example below.
          </p>
          <Code code={`
$ raas alias <CODE> <ALIAS>
RaaS Version 1.0.0
> Deployment code is: <CODE>
> Aliasing to <ALIAS>...
> Done!
Your deployment is now aliased to https://raas.pw/a/<ALIAS>
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