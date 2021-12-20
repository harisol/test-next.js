import { NextPage } from 'next';
import Layout from '../components/layout';
import Head from 'next/head';
import { Theme } from '../components/SampleHook';

const Info: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Info Page</title>
      </Head>
      <h1>Hello</h1>
      <Theme />
    </Layout>
  );
};

export default Info;
