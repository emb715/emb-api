module.exports = `
  scalar JSON
  scalar Date
  scalar Time
  scalar DateTime

  type Audit {
    createdBy: String,
    createdAt: DateTime,
    updatedBy: String,
    updatedAt: DateTime,
    deletedBy: String,
    deletedAt: DateTime,
  }
`;
