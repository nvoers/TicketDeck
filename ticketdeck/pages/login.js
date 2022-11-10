import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/navigation.js'

export default function Login(){
    return (
        <div>
          <Head>
            <title>TicketDeck</title>
            <meta name="description" content="Store all of your tickets" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <Navigation />
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <h1>Login</h1>
              </div>
            </div>
          </div>
        </div>
      )
}