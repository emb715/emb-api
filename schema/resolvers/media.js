const { Medias } = require('../../models/');

const Query = {
  getMedia: (parent, args, context, info) => {
    const { id } = args;
    const mediasModel = new Medias();
    return mediasModel.getMedia(id);
  },
};

module.exports = {
  Query,
};
