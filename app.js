require('dotenv').config();
const RadioMitre = require('./services/radioMitre');
const { Posts, Medias } = require('./models');

const getFeatureMedia = async (id) => {
  return RadioMitre.getMedia(id);
};

const app = async () => {
  console.log('init app');
  const posts = await RadioMitre.getPosts(page=1, perPage=30, offset=0);
  const postModel = new Posts();
  await postModel.addPosts(posts);
  const medias = posts.map(({ featuredMedia }) => (featuredMedia));
	console.log(': app -> medias', medias);
  const mediasModel = new Medias();
  medias.forEach(async (media) => {
    const response = await getFeatureMedia(media);
		console.log(': app -> response', response);
    const newMedia = await mediasModel.addMedia(response);
    console.log(': app -> newMedia', newMedia);
  })
}
app();