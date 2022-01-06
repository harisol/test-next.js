import type { NextPage } from 'next';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const anAsyncFunction = async () => {
  return `I'm data`;
};

const Home: NextPage = () => {
  const router = useRouter();

  /**
   * await cannot be used inside react component
   * nor useEffect. to use it, you must wrap it
   * inside another function (abc)
   */
  useEffect(() => {
    const abc = async () => {
      const x = await anAsyncFunction();
      console.log(x);
    };
    abc();
  });

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi there, I&apos;m human NodeJS Developer From Earth</p>
        <Link href="/posts/list-post">List Post</Link>
        <br />
        <Link href="/fruits">List Fruit</Link>
        <br />

        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/server-transition">Server Transition Link</a>
        <br />

        {/* Client Transition without anchor */}
        <button
          style={{
            backgroundColor: 'olivedrab',
            border: 'solid 3px black',
            borderRadius: '5px',
            color: 'white',
          }}
          onClick={() => router.push('/info')}
        >
          React Hook Sample
        </button>
      </section>
    </Layout>
  );
};

export default Home;
