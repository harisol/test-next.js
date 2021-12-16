import { NextPage } from 'next';
import Layout from '../components/layout';
import Head from 'next/head';

const Info: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Info Page</title>
      </Head>
      <h1>Hello</h1>
    </Layout>
  );
};

export default Info;
