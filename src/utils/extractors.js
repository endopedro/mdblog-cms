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
  author: extractUser(post.author),
})

const extractPosts = (posts) => posts.map((post) => extractPost(post))

const extractPage = (page) => ({
  _id: page._id,
  title: page.title,
  slug: page.slug,
  content: page.content,
  createdAt: page.createdAt,
  updatedAt: page.updatedAt,
  cover: page.cover,
})

const extractPages = (pages) => pages.map((page) => extractPage(page))

const extractSettings = (settings) => ({
  name: settings.name,
  title: settings.title,
  description: settings.description,
  cover: settings.cover,
  logo: settings.logo,
})

const extractUser = (user) => ({
  _id: user._id,
  username: user.username,
  name: user.name,
  email: user.email,
  bio: user.bio,
  picture: user.picture,
})

const extractUsers = (users) => users.map((user) => extractUser(user))

export {
  extractPosts,
  extractPost,
  extractSettings,
  extractPage,
  extractPages,
  extractUser,
  extractUsers,
}
