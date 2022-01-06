import { NextPage } from 'next';
import Layout from '../components/layout';
import Head from 'next/head';
import { Theme, Toolbar } from '../components/useContext';
import Link from 'next/link';

const Info2: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Info Page</title>
      </Head>
      <h1>Hello</h1>
      <p style={{ color: '#d31777' }}>
        This is sample of using react hook useContext. <br />
        See console to see the effect when you click button
      </p>
      <Toolbar toolbarId="toolbar-1" />
      <hr />
      <Theme val="dark">
        <Toolbar toolbarId="toolbar-2" />
      </Theme>
      <Link href="/info3">
        <a style={{ color: 'blueviolet' }}>Continue to More Hook Sample..</a>
      </Link>
    </Layout>
  );
};

export default Info2;
