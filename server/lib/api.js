const axios = require('axios');

const client = axios.create({
  baseURL: process.env.GRAPHQL_API,
});

const getPostBySlug = async (slug) => {
  const query = `
    query getPostByTitle {
      post(id: "${slug}", idType: SLUG) {
        title
        author {
          node {
            name
            avatar {
              foundAvatar
              url
            }
          }
        }
      }
    }
  `;

  try {
    const info = await client({
      method: 'POST',
      data: {
        query,
      },
    });
    return info;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getPostBySlug };
