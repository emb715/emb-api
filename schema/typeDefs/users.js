
const typeDefs = `
type User {
  _id: ID
  name: String
  age: Int
}
`;

const query = `
  getUsers: [User]
`;

const mutations = ``;

module.exports = {
typeDefs,
query,
mutations,
};
