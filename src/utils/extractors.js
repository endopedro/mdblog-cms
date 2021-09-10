const extractPost = (post) => ({
  _id: post._id,
  title: post.title,
  slug: post.slug,
  tags: post.tags,
  content: post.content,
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
  cover: post.cover,
  excerpt: post.excerpt,
  category: post.category,
  author: {
    _id: post.author._id,
    name: post.author.name,
    email: post.author.email,
    bio: post.author.bio,
    picture: post.author.picture,
  },
})

const extractPosts = (posts) => posts.map((post) => extractPost(post))

export { extractPosts, extractPost }
