import { NextPage } from 'next';
import Layout from '../components/layout';
import Head from 'next/head';
import { GlobalProvider } from '../components/state-like-redux/provider';
import {
  ChildComp1,
  ChildComp2,
  CurrentUser,
} from '../components/state-like-redux/child-comp';

const Info3: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Info Page</title>
      </Head>
      <p style={{ color: '#d31777' }}>
        This is sample of using react hook useContext and useReducer. <br />
        to set and get state like redux way
      </p>

      <GlobalProvider>
        <ChildComp1 />
        <ChildComp2 />
        <hr />
        <CurrentUser />
      </GlobalProvider>
    </Layout>
  );
};

export default Info3;
