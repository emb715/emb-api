const GraphQLJSON = require('graphql-type-json');
const {GraphQLDate, GraphQLTime, GraphQLDateTime} = require('graphql-iso-date');

module.exports = {
    JSON: GraphQLJSON,
    Date: GraphQLDate,
    Time: GraphQLTime,
    DateTime: GraphQLDateTime
};
