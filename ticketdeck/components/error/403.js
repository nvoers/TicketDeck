import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../../components/navigation.js'
import styles from '../../styles/Error.module.css'

export default function Page403() {
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
                <h1 className={styles.title}>Error</h1>
                <p>403: Permission denied</p>
            </div>
        </div>
        </div>
    );
}