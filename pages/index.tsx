import type { NextPage } from 'next';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

import Link from 'next/link';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
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

        <button
          style={{
            backgroundColor: 'olivedrab',
            border: 'solid 3px black',
            borderRadius: '5px',
            color: 'white',
          }}
          onClick={() => router.push('/info')}
        >
          Client Transition without anchor
        </button>
      </section>
    </Layout>
  );
};

export default Home;
