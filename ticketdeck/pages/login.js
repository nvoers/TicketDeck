import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/navigation.js'
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import formstyles from '../styles/Forms.module.css';
import { useForm } from 'react-hook-form';

export default function Login(){
    const { register, handleSubmit, errors } = useForm();

    async function onSubmit(data, e){
        signIn('credentials', {
            email: data.username,
            password: data.password,
            callbackUrl: '/',
        });
    }

    const { data: session, status } = useSession();
    let router = new useRouter();

    if(session){
      router.push("/");
    }
    else{
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
              <div className={styles.col}>
                <form className={formstyles.form} onSubmit={handleSubmit(onSubmit)}>
                  <label>Username</label>
                  <input type="text" name="username" {...register("username")} />
                  <label>Password</label>
                  <input type="password" name="password" {...register("password")} />
                  <input type="submit" value="Login" className={formstyles.submit}/>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
    }
}