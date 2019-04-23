const DataLoader = require('dataloader');
const RadioMitre = require('../services/radioMitre');

const mediaLoader = new DataLoader(async mediaIds => {
  const radioMitre = new RadioMitre();
  return radioMitre.getMedia(mediaIds);
});

module.exports = {
  mediaLoader,
};

