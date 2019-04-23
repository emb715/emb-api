require('dotenv').config();
const admin = require('firebase-admin');
const { mapResponseFirestore } = require('./utils/helpers');
const { compose } = require('ramda');
const { FIRESTORE_KEY } = process.env;

const projectId = 'emb-api';

let _instance = null;

class FirestoreDB {
  constructor(collection) {
    this._collection = collection;
  }
  getInstance() {
    if (!_instance) {
      try {
        admin.initializeApp({
          credential: admin.credential.cert(FIRESTORE_KEY)
        });
        _instance = admin.firestore();
      } catch (error) {
        console.log('FirestoreDB getIntance Error', error);
        throw error;
      }
    }
    return _instance;
  }

  getCollection(collection=null) {
    if (!collection) {
      collection = this._collection;
    }
    const db = this.getInstance();
    return db.collection(collection);
  }

  getDocRef(id) {
    const collection = this.getCollection();
    if (id) {
      const doc = collection.doc(id);
      if (doc) return;
    }
    return collection.doc();
  }

  async add(doc, collection=null) {
    if (!collection) {
      collection = this._collection;
    }
    const _collection = this.getCollection(collection);
    return _collection.doc().set(doc);
  }

  async addBatch(docs, collection) {
    const _collection = this.getCollection(collection);
    // Firestore limitation
    if (docs.length > 500) {
      return false;
    }
    try {
      const db = this.getInstance();
      let batch = db.batch();
      docs.forEach((doc) => {
        const docRef = _collection.doc(`${doc.id}`);
        batch.set(docRef, doc);
      });
      return batch.commit();
    } catch (error) {
      throw error;
    }
  }

  async getByID(id) {
    const collection = this.getCollection();
    const data = await collection.doc(`${id}`).get();
    return this.rowsExtractor(data);
  }

  get mapResponse() {
    return compose(
      mapResponseFirestore,
      FirestoreDB.rowsExtractor
    );
  }

  async rowsExtractor(request) {
    const snapshot = await request;
    if (snapshot.empty) {
      return null;
    }
    if (snapshot.docs) {
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }
    const data = snapshot.data();
    if (!data) {
      return null;
    }
    return {
      id: snapshot.id,
      ...data
    };
  }
  async rowExtractor(request) {
      const snapshot = await request;
      if (snapshot.empty) {
        return null;
      }
      if (snapshot.docs) {
        // first
        return snapshot.docs[0].data();
      }
  }
}

module.exports = FirestoreDB;
