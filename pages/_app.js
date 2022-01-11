import '../styles/globals.css';
import Layout from '../components/layout/Layout';


function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp;

//_app.js is a special file provided by next. This is the root component automatically rendered by nextjs no matter what URL we're on. It receives a props destructured to get two properties: component(the actual component which is presently being rendered by the file-based routing of nextjs) and pageProps (props of the rendered component)
//so when the url is domain/ then index.js in the pages folder is matched and that is gonna be the <Component/> here which is rendered by nextjs
//when the url is domain/new-meetup then the injex.js in pages/new-meetup is matched and that is gonna be the <Component/> here which is rendered by nextjs
//when the url is domain/concrete-value then the injex.js in pages/[meetupId] is matched and that is gonna be the <Component/> here which is rendered by nextjs
//in all of this file routing processes, Layout component is always rendered regardless of the current url and Component varies