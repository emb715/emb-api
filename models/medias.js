const FirestoreDB = require('../firestore');

const _collection = 'radiomitre_medias';

class Medias extends FirestoreDB{
  constructor() {
    super(_collection);
  }

  async getMedias(ids) {
    const collection = super.getCollection(_collection);
    if (ids.length > 0) {
      const reads = ids.map(id => collection.doc(id).get());
      const results = await Promise.all(reads);
      return results.map(result => result.data());
    }
    let query = collection.where('status', '==', 'published');
    return super.rowsExtractor(query.get());
  }

  async getMediaById(id) {
    return super.getByID(id);
  }

  async addMedia(payload) {
    try {
      const doc = await super.getCollection().doc(`${payload.id}`).set(payload);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  // Batch
  async addMedias(medias) {
    try {
      const response = super.addBatch(medias, _collection);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Medias;
