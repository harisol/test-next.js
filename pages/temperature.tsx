import { NextPage } from 'next';
import Layout from '../components/layout';
import Head from 'next/head';
import { TemperatureCalculator } from '../components/pass-down-state';

const Temperature: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Temperature Calculator</title>
      </Head>
      <TemperatureCalculator />
    </Layout>
  );
};

export default Temperature;
