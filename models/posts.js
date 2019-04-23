const FirestoreDB = require('../firestore');

const _collection = 'radiomitre_posts';

class Posts extends FirestoreDB{
  constructor() {
    super(_collection);
  }

  async getPosts() {
    const collection = super.getCollection(_collection)
    let query = collection.where('status', '==', 'publish');
    // if (status) {
    //   query = query.where('status', '==', status);
    // }
    // console.log()
    return super.rowsExtractor(query.get());
  }

  async getPostById(id) {
    return super.getByID(id);
  }

  async addPost(payload) {
    try {
      // const doc = await super.getCollection().doc(`${payload.id}`).set(payload);
      await super.getCollection().doc(`${payload.id}`).set(payload);
      return this.getPostById(payload.id);
    } catch (error) {
      console.log(': Posts -> staticaddPost -> error', error);
      throw error;
    }
  }

  // Batch
  async addPosts(posts) {
    try {
      const response = await super.addBatch(posts, _collection);
      console.log(': Posts -> addPosts -> response', response);
      return response;
    } catch (error) {
      console.log(': Posts -> addPosts -> error', error);
      throw error;
    }
  }

  async getPostBySlug(slug) {
    const collection = super.getCollection(_collection)
    const query = await collection.where('slug', '==', slug).limit(1).get();
    return super.rowExtractor(query);
  }
}

module.exports = Posts;
