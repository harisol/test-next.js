import { NextPage } from 'next';
import Layout from '../components/layout';
import Head from 'next/head';
import { Counter } from '../components/SampleHook';
import Link from 'next/link';

const Info: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Info Page</title>
      </Head>
      <h1>Hello</h1>
      <Counter />
      <Link href="/info2">
        <a style={{ color: 'blueviolet' }}>Continue to More Hook Sample..</a>
      </Link>
    </Layout>
  );
};

export default Info;
