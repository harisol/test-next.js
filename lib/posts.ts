export const getPosts = () => {
  const date1 = new Date();
  const date2 = new Date();
  const date3 = new Date();

  date1.setDate(1);
  date2.setDate(2);
  date3.setDate(3);

  return [
    {
      id: 1,
      title: 'post 1',
      slug: 'post-1',
      date: date1.toDateString(),
    },
    {
      id: 2,
      title: 'post 2',
      slug: 'post-2',
      date: date2.toDateString(),
    },
    {
      id: 3,
      title: 'post 3',
      slug: 'post-3',
      date: date3.toDateString(),
    },
  ];
};

export const getPostIds = () => {
  return getPosts().map(({ slug }) => {
    return {
      params: { id: slug }
    };
  });
};

export const getPostData = (slug: string) => {
  const data = getPosts().find((post) => {
    return post.slug == slug;
  });

  return { ...data };
};

