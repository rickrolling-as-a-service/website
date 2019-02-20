import App, { Container } from 'next/app'
import NextSeo, { LogoJsonLd } from 'next-seo'
import seo from '../lib/seo'

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <NextSeo config={seo} />
        <LogoJsonLd logo='https://raas.now.sh/static/images/logo-dark.png' url='https://raas.now.sh/' />
        <Component {...pageProps} />
      </Container>
    )
  }

  componentDidMount() {
    window.$crisp = []
    window.CRISP_WEBSITE_ID = '23e91fe1-84af-45d4-84b6-5a0248448d03'

    const d = document
    const s = d.createElement('script')

    s.src = 'https://client.crisp.chat/l.js'
    s.async = 1
    d.getElementsByTagName('head')[0].appendChild(s)
  }
}