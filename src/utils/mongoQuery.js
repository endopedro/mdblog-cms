const postsQuery = (page = 1) => [
  { $skip: 10 * (page - 1) },
  { $limit: 10 },
  {
    $lookup: {
      from: 'users',
      localField: 'authorId',
      foreignField: '_id',
      as: 'author',
    },
  },
  {
    $lookup: {
      from: 'images',
      localField: 'coverId',
      foreignField: '_id',
      as: 'cover',
    },
  },
  {
    $lookup: {
      from: 'categories',
      localField: 'categoryId',
      foreignField: '_id',
      as: 'category',
    },
  },
  { $unwind: { path: '$author', preserveNullAndEmptyArrays: true } },
  { $unwind: { path: '$cover', preserveNullAndEmptyArrays: true } },
  { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
]

const postQuery = (slug) => [{ $match: { slug: slug } }, ...postsQuery()]

export { postsQuery, postQuery }
