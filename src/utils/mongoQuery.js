const basePostQuery = [
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

const basePageQuery = [
  {
    $lookup: {
      from: 'images',
      localField: 'coverId',
      foreignField: '_id',
      as: 'cover',
    },
  },
  { $unwind: { path: '$cover', preserveNullAndEmptyArrays: true } },
]

const postsQuery = (page = 1) => [
  { $skip: 10 * (page - 1) },
  { $limit: 10 },
  ...basePostQuery,
]

const postQuery = (slug) => [{ $match: { slug: slug } }, ...postsQuery()]

const relatedQuery = (post) => [
  { $match: { tags: { $in: post.tags }, _id: { $ne: post._id } } },
  { $limit: 4 },
  ...basePostQuery,
]

const pagesQuery = (page = 1) => [
  { $skip: 10 * (page - 1) },
  { $limit: 10 },
  ...basePageQuery,
]

const pageQuery = (slug) => [{ $match: { slug: slug } }, ...pagesQuery()]

const categoriesQuery = (page = 1) => [
  { $skip: 10 * (page - 1) },
  { $limit: 10 },
]

const imagesQuery = (page = 1) => [
  { $sort: { _id: -1 } },
  { $skip: 10 * (page - 1) },
  { $limit: 10 },
]

const settingsQuery = [
  {
    $lookup: {
      from: 'images',
      localField: 'coverId',
      foreignField: '_id',
      as: 'cover',
    },
  },
  { $unwind: { path: '$cover', preserveNullAndEmptyArrays: true } },
]

const usersQuery = (page = 1) => [{ $skip: 10 * (page - 1) }, { $limit: 10 }]

export {
  postsQuery,
  postQuery,
  relatedQuery,
  settingsQuery,
  pagesQuery,
  pageQuery,
  usersQuery,
  categoriesQuery,
  imagesQuery,
}
