/**
 * This is dynamic page which possible routes is defined before at build time.
 * (for routes which is not defined before, see pages/fruits/[name].tsx)
 * it must consist:
 * - react component to render the page
 * - GetStaticPaths which returns an array of possible values for id
 * - GetStaticProps which fetches necessary data for the post with id
 */

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Layout from '../../components/layout';
import { getPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import { isEmpty } from '../../helper/my-helper';

type PostProps = {
  postData: any;
};

const anAsyncFunction = async () => {
  return 'rendering page';
};

const Post: NextPage<PostProps> = ({ postData }) => {
  anAsyncFunction().then((v) => console.log(v));
  console.log('postdata', postData);
  if (isEmpty(postData)) {
    return <h1>NOT FOUND</h1>;
  }

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      id: {postData.id}
      <br />
      title: {postData.title}
      <br />
      date: {postData.date}
    </Layout>
  );
};

export default Post;

/**
 * getStaticPaths is used for getting possible path for dynamic routes.
 * in production, it runs at build time.
 * in development, it runs on every request.
 * it must be exported and it can only be exported from a page.
 */
export const getStaticPaths: GetStaticPaths = () => {
  console.log('building static path');
  // data can also be fetched from external API
  const paths = getPostIds();

  // if fallback is false, then any paths not returned by getStaticPaths
  // will result in a 404 page.
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = (context) => {
  console.log('building props');

  const { params } = context;
  const postData = getPostData(params?.id as string);

  return {
    props: {
      postData,
    },
  };
};
