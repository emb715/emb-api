
const typeDefs = `
type Media {
  id: ID!
  originalID: Int
  url: String
  slug: String
  altText: String
  mediaType: String
  mimeType: String
  mediaDetails: JSON
  postId: Int
  audit: Audit
}

type MediaDetails {
  width: Int
  height: Int
  sizes: [MediaSizes]
}

type MediaSizes {
  file: String,
  width: Int
  height: Int
  mimeType: String
  url: String
}

`;

const query = `
  getMedia(id: ID!): Media
`;

const mutations = ``;

module.exports = {
typeDefs,
query,
mutations,
};
