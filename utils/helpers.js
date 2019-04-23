
const isJSON = (str) => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
};

const mapResponseFirestore = async results => ({data: await results, metadata: {}});

module.exports = {
  isJSON,
  mapResponseFirestore
};
