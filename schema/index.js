const path = require('path');
const glob = require('glob');
const { gql } = require('apollo-server-express');
const { mergeAll } = require('ramda');
const commonResolvers = require('./commonResolvers');
const commonTypes = require('./commonTypes');

const types = glob.sync('./schema/typeDefs/**/*.js').map(file => require(path.resolve(file)));
let typesAll = commonTypes;
let mutationsAll = '';
let queryAll = '';
types.forEach(({ typeDefs, query, mutations }) => {
  typesAll = typesAll.concat(typeDefs);
  queryAll = queryAll.concat(query);
  mutationsAll = mutationsAll.concat(mutations);
})

const typeDefs = gql`
  ${typesAll}

  type Query {
    ${queryAll}
  }

  # type Mutations {
  #   ${mutationsAll}
  # }
`;

const resolversAll = glob.sync('./schema/resolvers/**/*.js').map(file => require(path.resolve(file)));
let resolversQuery = [];
let resolversTypes = [];
resolversAll.forEach(({ Query, Types }) => {
  if (Query !== undefined) resolversQuery.push(Query);
  if (Types !== undefined) resolversTypes.push(Types);
})

const resolvers = {
  Query: mergeAll(resolversQuery),
  ...mergeAll(resolversTypes),
  ...commonResolvers,
};

module.exports = {
  typeDefs,
  resolvers,
};
