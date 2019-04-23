const axios = require('axios');
const { cleanResponse, postResponse, mediaResponse, postMapResponse } = require('../utils/radioMitre');
const { RADIOMITRE_API } = process.env;
const { Posts } = require('../models/');

const PER_PAGE = 15;

class RadioMitre {
  static async getPosts(page=1, perPage=PER_PAGE, offset=0) {
    const url = `${RADIOMITRE_API}posts?page=${page}&per_page=${perPage}&offset=${offset}`;
    try {
      const { data } = await axios(url);
      const response = cleanResponse(data);
      const _postResponse = postMapResponse(response);
      return _postResponse;
    } catch (error) {
      throw error;
    }
  }

  static async getPost(id) {
    const url = `${RADIOMITRE_API}posts/${id}`;
    try {
      const { data } = await axios(url);
      const response = cleanResponse(data);
      return postResponse(response);
    } catch (error) {
      throw error;
    }
  }

  static async getMedia(id) {
    const url = `${RADIOMITRE_API}media/${id}`;
    try {
      const { data } = await axios(url);
      const _mediaResponse = mediaResponse(data);
      return _mediaResponse;
    } catch (error) {
      throw error;
    }
  }

  static async getPostIdBySlug(slug) {
    const url = `http://radiomitre.cienradios.com/${slug}/`
    const regex = /postid-\d*/g;
    try {
      const { data } = await axios(url);
      const [ found ] = data.match(regex);
      const id = found.replace('postid-', '');
      const post = await RadioMitre.getPost(id);
      const postModel = new Posts();
      return postModel.addPost(post);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RadioMitre;
