import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { AdPlaceholder } from '../AdPlaceholder';
import { Sparkles, Clock, Search, ArrowRight } from 'lucide-react';
import { getAllBlogPosts, getBlogPostsByCategory, categories } from './blogData';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function BlogList() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

  const allPosts = category ? getBlogPostsByCategory(category) : getAllBlogPosts();
  
  const filteredPosts = searchQuery
    ? allPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allPosts;

  const currentCategory = categories.find(cat => cat.slug === category);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Sparkles className="size-6 text-blue-600" />
            <span className="text-xl">AI Resume Forge</span>
          </div>
          <nav className="flex gap-6">
            <button onClick={() => navigate('/blog')} className="text-gray-600 hover:text-blue-600 transition-colors">
              Blog
            </button>
            <button onClick={() => navigate('/builder')} className="text-gray-600 hover:text-blue-600 transition-colors">
              Resume Builder
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-5xl mb-4">
            {currentCategory ? currentCategory.name : 'Career Resources & Resume Tips'}
          </h1>
          <p className="text-xl opacity-90 mb-8">
            {currentCategory
              ? `Expert advice and guides for ${currentCategory.name.toLowerCase()}`
              : 'Expert advice to help you land your dream job with AI-powered insights'}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-3 overflow-x-auto">
            <Button
              variant={!category ? 'default' : 'outline'}
              onClick={() => navigate('/blog')}
              className={!category ? 'bg-blue-600' : ''}
            >
              All Articles
            </Button>
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={category === cat.slug ? 'default' : 'outline'}
                onClick={() => navigate(`/blog/category/${cat.slug}`)}
                className={category === cat.slug ? 'bg-blue-600' : ''}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="flex-1">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No articles found matching your search.</p>
                <Button onClick={() => setSearchQuery('')} className="mt-4">
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Featured Post (First Post) */}
                {filteredPosts.length > 0 && !searchQuery && (
                  <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow cursor-pointer border-none mb-12" onClick={() => navigate(`/blog/${filteredPosts[0].slug}`)}>
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <ImageWithFallback
                          src={filteredPosts[0].featuredImage}
                          alt={filteredPosts[0].imageAlt}
                          className="w-full h-full object-cover"
                          style={{ minHeight: '300px' }}
                        />
                      </div>
                      <div className="md:w-1/2 p-8">
                        <Badge className="mb-3 bg-blue-600">Featured</Badge>
                        <h2 className="text-3xl mb-4">{filteredPosts[0].title}</h2>
                        <p className="text-gray-600 mb-4">{filteredPosts[0].excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <span>{filteredPosts[0].author}</span>
                          <span>•</span>
                          <span>{filteredPosts[0].date}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="size-4" />
                            {filteredPosts[0].readTime}
                          </div>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Read More
                          <ArrowRight className="size-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Ad Banner */}
                <div className="flex justify-center py-12">
        <AdPlaceholder width={728} height={90} />
      </div>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9097049169398507"
     crossorigin="anonymous">
        </script>
        </head>

                {/* Other Posts */}
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.slice(searchQuery ? 0 : 1).map(post => (
                    <Card
                      key={post.slug}
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-none"
                      onClick={() => navigate(`/blog/${post.slug}`)}
                    >
                      <ImageWithFallback
                        src={post.featuredImage}
                        alt={post.imageAlt}
                        className="w-full h-48 object-cover"
                      />
                      <CardContent className="p-6">
                        <div className="mb-3">
                          <Badge variant="secondary">
                            {categories.find(cat => cat.slug === post.category)?.name || post.category}
                          </Badge>
                        </div>
                        <h3 className="text-xl mb-3 line-clamp-2">{post.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{post.author}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {post.readTime}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Ad */}
            <div className="flex justify-center mt-12">
              <AdPlaceholder width={728} height={90} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-80 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* CTA Card */}
              <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-none">
                <CardContent className="p-6">
                  <h3 className="text-xl mb-3">Build Your Resume Now</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Create a professional, ATS-optimized resume in minutes with AI assistance.
                  </p>
                  <Button
                    className="w-full bg-white text-blue-600 hover:bg-gray-100"
                    onClick={() => navigate('/builder')}
                  >
                    Start Building
                  </Button>
                </CardContent>
              </Card>

              {/* Ad Space */}
              <AdPlaceholder width={300} height={250} />

              {/* Popular Categories */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg mb-4">Browse by Category</h3>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => navigate(`/blog/category/${cat.slug}`)}
                        className="block w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Ad Space */}
              <AdPlaceholder width={300} height={600} label="Advertisement" />
            </div>
          </aside>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl mb-4">Get Career Tips in Your Inbox</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to receive weekly resume tips, job search strategies, and AI tools updates.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
          </div>
          <p className="text-xs text-gray-500 mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="size-5" />
                <span className="font-semibold">AI Resume Forge</span>
              </div>
              <p className="text-sm text-gray-400">
                Build professional resumes with AI assistance. No signup required.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Resources</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Resume Builder</a>
                <a href="#" className="block hover:text-white transition-colors">Resume Templates</a>
                <a href="#" className="block hover:text-white transition-colors">Cover Letter Builder</a>
                <a href="#" className="block hover:text-white transition-colors">Blog</a>
              </div>
            </div>
            <div>
              <h4 className="mb-4">Categories</h4>
              <div className="space-y-2 text-sm text-gray-400">
                {categories.slice(0, 4).map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => navigate(`/blog/category/${cat.slug}`)}
                    className="block hover:text-white transition-colors"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">About Us</a>
                <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="block hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 AI Resume Forge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
