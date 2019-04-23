require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const models = require('./models');
// const loaders = require('./loaders');
const DataLoader = require('dataloader');
// const RadioMitre = require('./services/radioMitre');

const batchPosts = async (keys, models) => {
  const postsModel =  new models.Posts();
  const posts = await postsModel.Posts.getPosts(keys);
  return keys.map(key => posts.find(item => item.id === key));
};

const batchMedia = async (keys, models) => {
  const mediasModel =  new models.Medias();
  const medias = await mediasModel.getMedias(keys);
	console.log(': batchMedia -> media', medias);
  return keys.map(key => medias.find(item => item.id === key));
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({ req }) => {
    // req.auth
    return {
      models,
      // loaders: {
      //   media: new DataLoader(keys => batchMedia(keys, models)),
      //   posts: new DataLoader(keys => batchPosts(keys, models)),
      // }
    };
  }
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
