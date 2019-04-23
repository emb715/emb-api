const users = [
  {
    name: 'Ezequiel Benitez',
    age: 29,
  }
];

const Query = {
  getUsers: (parent, args, context, info) => {
    return users;
  },
};

module.exports = {
  Query,
};
