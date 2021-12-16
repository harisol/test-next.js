import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import Head from 'next/head';

const Fruit: NextPage = () => {
  const router = useRouter();

  // url query
  const { name, type } = router.query;

  return (
    <Layout>
      <Head>
        <title>Fruit Detail</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <h2>Fruits: {name}</h2>
        <h2>Type: {type}</h2>
      </div>
    </Layout>
  );
};

export default Fruit;
