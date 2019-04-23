const sanitizeHtml = require('sanitize-html');
const moment = require('moment');

const { isJSON } = require('./helpers');

const removeStyles = (string) => {
  const regex = /<style>.*?<\/style>/g;
  return string.replace(regex, '');
};

const cleanResponse = (response, cleaners=[]) => {
  // let _cleaners = defaultCleaners;
  // if (cleanears) _cleaners = _cleaners;
  let res = response;
  if (!isJSON(response)) {
    res = removeStyles(response);
  }
  return JSON.parse(res);
};

const postResponse = async ({ id, date_gmt, guid, modified_gmt, slug, status, type, link, title, content, excerpt, featured_media, format, categories, tags }) => ({
  id,
  originalID: id, 
  guid: guid.rendered,
  slug,
  status,
  type,
  link,
  title: title.rendered,
  titleSanitized: sanitizeHtml(title.rendered),
  content: content.rendered,
  contentSanitized: sanitizeHtml(content.rendered),
  excerpt: excerpt.rendered,
  excerptSanitized: sanitizeHtml(excerpt.rendered),
  featuredMedia: featured_media,
  format,
  categories,
  tags,
  audit: {
    createdAt: moment(date_gmt).toISOString(),
    updatedAt: moment(modified_gmt).toISOString(),
  }
});

const postMapResponse = async response => response.map((async post => postResponse(post)));

const mediaResponse = async ({ id, date_gmt, source_url, modified_gmt, slug, alt_text, media_type, mime_type, media_details, post }) => ({
  id,
  originalID: id,
  url: source_url,
  slug,
  altText: alt_text,
  mediaType: media_type,
  mimeType: mime_type,
  // mediaDetails: media_details,
  postId: post,
  audit: {
    createdAt: moment(date_gmt).toISOString(),
    updatedAt: moment(modified_gmt).toISOString(),
  }
});

module.exports = {
  cleanResponse,
  postResponse,
  mediaResponse,
  postMapResponse,
};
