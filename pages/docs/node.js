import '../../styles/main.scss'

import { Component } from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import YarnOrNPM from '../../components/YarnOrNPM'
import Code from '../../components/Code'
import Link from 'next/link'
import AnchoredHeading from '../../components/AnchoredHeading'
import RunkitEmbed from 'react-runkit'
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
          title: 'Node.js Client',
          canonical: 'https://raas.now.sh/docs/node',
          openGraph: {
            title: 'Node.js Client',
            url: 'https://raas.now.sh/docs/node'
          }
        }} />
        <Navbar />
        <section className='container mt-5'>
          <h1 className='display-4'>Node.js Client</h1>
          <p className='lead mt-3'>
            Documentation on our Node.js client, for easy API usage. Perfect for automating deployments.
          </p>
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Install the Client</AnchoredHeading>
          <div className='alert alert-info'>
            <strong>Note!</strong> If you just want to follow along with the documentation you can skip this step.
          </div>
          <p>
            Make sure you have a computer running Windows, macOS, or Linux with <a href='https://nodejs.org/en/download/' target='_blank'>Node.js</a> installed before proceeding.
          </p>
          <p>
            First, you'll have to download our client. This is a Node.js package we made that'll let you easily interact with our API.
          </p>
          <YarnOrNPM onChange={this.changePackageManager} />
          <Code className='mt-3' code={yarn ? '$ yarn add raas-api' : '$ npm install raas-api'} />
          <p>
            Now, require the package in your Node.js code.
          </p>
          <Code code={'const raas = require(\'raas-api\')'} />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Supported Memes</AnchoredHeading>
          <p>
            See the related <Link href='/docs/api#supported-memes'>
              <a>section in the API docs</a>
            </Link>.
          </p>
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Get API Key</AnchoredHeading>
          <RunkitEmbed
            source = {`
const raas = require('raas-api')

const username = 'test'
const password = 'test'
raas.key.get(username, password)
            `.trim()}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Revoke &amp; Regenerate API Key</AnchoredHeading>
          <div className='alert alert-warning'>
            <strong>Warning!</strong> This will cause all programs still using your old API key to stop working.
          </div>
          <RunkitEmbed
            source = {`
const raas = require('raas-api')

const username = 'test'
const password = 'test'
raas.key.regenerate(username, password)
            `.trim()}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Set API Key</AnchoredHeading>
          <p>
            You must run this to be able to use any API functions. Note that it isn't recommended to get the key programmatically, instead you should store it in an environment variable.
          </p>
          <RunkitEmbed
            source = {`
const raas = require('raas-api')

const username = 'test'
const password = 'test'
const key = await raas.key.get(username, password)
raas.key.set(key)
            `.trim()}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Create a Deployment</AnchoredHeading>
          <RunkitEmbed
            source = {`
const raas = require('raas-api')
raas.key.set(await raas.key.get('test', 'test'))

// Hint: try specifying a memeIndex as the first argument
console.log(await raas.deployments.create())
            `.trim()}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>List Deployments</AnchoredHeading>
          <RunkitEmbed
            source = {`
const raas = require('raas-api')
raas.key.set(await raas.key.get('test', 'test'))

// Hint: try specifying a memeIndex as the first argument to filter results
console.log(await raas.deployments.list())
            `.trim()}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Get Deployment Info</AnchoredHeading>
          <RunkitEmbed
            source = {`
const raas = require('raas-api')
raas.key.set(await raas.key.get('test', 'test'))

const deployments = await raas.deployments.list()
const code = deployments[0].code

console.log(code)
console.log(await raas.deployments.getInfo(code))
            `.trim()}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>View a Deployment</AnchoredHeading>
          <div className='alert alert-warning'>
            <strong>Warning!</strong> Note that a deployment's view count is automatically incremented every time it's visited.
          </div>
          <RunkitEmbed
            source = {`
const raas = require('raas-api')
raas.key.set(await raas.key.get('test', 'test'))

const deployments = await raas.deployments.list()
const code = deployments[0].code

const viewsInitial = deployments[0].views
console.log('before', viewsInitial)

const viewsNow = await raas.deployments.view(code)
console.log('after', viewsNow)
            `.trim()}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Delete a Deployment</AnchoredHeading>
          <RunkitEmbed
            source = {`
const raas = require('raas-api')
raas.key.set(await raas.key.get('test', 'test'))

const deployments = await raas.deployments.list()
const code = deployments[0].code

// Returns final view count
console.log(await raas.deployments.delete(code))
            `.trim()}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Create/Update an Alias</AnchoredHeading>
          <p>
            If the alias doesn't exist, it'll be created, but if it does it'll be updated with the new code.
          </p>
          <RunkitEmbed
            source = {`
const raas = require('raas-api')
raas.key.set(await raas.key.get('test', 'test'))

const deployments = await raas.deployments.list()
const code = deployments[0].code

// This alias may be taken, if you want try another one
console.log(await raas.aliases.alias(code, 'test'))
            `.trim()}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>List Aliases</AnchoredHeading>
          <RunkitEmbed
            source = {`
const raas = require('raas-api')
raas.key.set(await raas.key.get('test', 'test'))

// Hint: try specifying a deployment code as the first argument to filter results
console.log(await raas.aliases.list())
            `.trim()}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Get Alias Info</AnchoredHeading>
          <RunkitEmbed
            source = {`
const raas = require('raas-api')
raas.key.set(await raas.key.get('test', 'test'))

const aliases = await raas.aliases.list()
const alias = aliases[0].alias

console.log(alias)
console.log(await raas.aliases.getInfo(alias))
            `.trim()}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Delete an Alias</AnchoredHeading>
          <RunkitEmbed
            source = {`
const raas = require('raas-api')
raas.key.set(await raas.key.get('test', 'test'))

const aliases = await raas.aliases.list()
const alias = aliases[0].alias

console.log(await raas.aliases.delete(alias))
            `.trim()}
          />
        </section>
        <section className='container mt-5'>
          <AnchoredHeading>Errors</AnchoredHeading>
          <p>
            See the related <Link href='/docs/api#errors'>
              <a>section in the API docs</a>
            </Link>.
          </p>
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