
const typeDefs = `
  type Categories {
    id: ID!,
    originalID: Int
    count: Int,
    link: String,
    name: String,
    slug: String,
    parent: Int
  }

  type Tags {
    id: ID!,
    originalID: Int
    count: Int,
    link: String,
    name: String,
    slug: String,
  }

  type Post {
    id: ID!
    originalID: Int, 
    title: String
    titleSanitized: String,
    guid: String,
    slug: String,
    status: String,
    type: String,
    link: String,
    content: String,
    excerpt: String,
    excerptSanitized: String,
    featuredMedia: Media,
    format: String,
    # categories: Categories,
    # tags: Tags,
    audit: Audit
  }
`;

const query = `
  getPosts: [Post]
  getPost(id: ID!): Post
  getPostBySlug(slug: String!): Post
`;

const mutations = ``;

module.exports = {
  typeDefs,
  query,
  mutations,
};
