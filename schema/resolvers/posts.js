const { Posts, Medias } = require('../../models');
const RadioMitreApi = require('../../services/radioMitre');

const Query = {
  getPosts: async (parent, args, context, info) => {
    const { page, perPage, offset } = args;
    const postsModel = new Posts();
    return postsModel.getPosts(page, perPage, offset);
  },
  getPost: async (parent, args, context, info) => {
    const { id } = args;
    const postsModel = new Posts();
    return postsModel.getPostById(id);
  },
  getPostBySlug: async (parent, args, context, info) => {
    const { slug } = args;
    const postsModel = new Posts();
    let doc = await postsModel.getPostBySlug(slug);
		console.log(': slug', slug);
		console.log(': doc', doc);
    if (!doc) {
      // not found, get and save
      const post = await RadioMitreApi.getPostIdBySlug(slug);
			console.log(': post', post);
      doc = await postsModel.getPostById(post.id);
			console.log(': doc', doc);
    }
    return doc;
  },
};

const Types = {
  Post: {
    async featuredMedia({ featuredMedia }) {
      const mediasModel = new Medias();
      let doc = await mediasModel.getMediaById(featuredMedia);
      if (!doc) {
        // not found, get and save
        const media = await RadioMitreApi.getMedia(featuredMedia);
        doc = await mediasModel.addMedia(media);
      }
			console.log(': featuredMedia -> doc', doc);
      
      return doc;
    },
  },
};

module.exports = {
  Query,
  Types,
};