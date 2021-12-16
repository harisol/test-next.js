import { GetStaticProps, NextPage } from 'next';
import Layout from '../../components/layout';
import { getPosts } from '../../lib/posts';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';

const siteTitle = 'List Fruit';

/**
 * add generic on type NextPage if page has props.
 * props are generated by "getStaticProps" function below
 */
const ListFruit: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        <li className={utilStyles.listItem} key={0}>
          <Link href="/fruits/orange?type=florida">
            <a>Florida Orange</a>
          </Link>
        </li>
        <li className={utilStyles.listItem} key={0}>
          <Link href="/fruits/orange?type=jeju">
            <a>Jeju Orange</a>
          </Link>
        </li>
        <li className={utilStyles.listItem} key={0}>
          <Link href="/fruits/melon?type=jumbo">
            <a>Jumbo Melon</a>
          </Link>
        </li>
      </ul>
    </Layout>
  );
};

export default ListFruit;
