import { NextPage } from 'next';
import Layout from '../components/layout';
import Head from 'next/head';
import { Counter } from '../components/useStateAndEffect';
import Link from 'next/link';
import { UserInfo } from '../components/useReducer';

const Info1: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Info Page</title>
      </Head>
      <Counter />
      <hr />
      <UserInfo userName="Waluyo" />
      <Link href="/info2">
        <a style={{ color: 'blueviolet' }}>Continue to More Hook Sample..</a>
      </Link>
    </Layout>
  );
};

export default Info1;
