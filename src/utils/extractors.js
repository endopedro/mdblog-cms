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

export { extractPosts, extractPost, extractSettings, extractPage, extractPages }
