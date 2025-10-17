import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { AdPlaceholder } from '../AdPlaceholder';
import { Sparkles, Clock, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { getBlogPostBySlug, getAllBlogPosts, categories } from './blogData';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useEffect } from 'react';

export function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = slug ? getBlogPostBySlug(slug) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Article Not Found</h1>
          <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
        </div>
      </div>
    );
  }

  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const categoryName = categories.find(cat => cat.slug === post.category)?.name || post.category;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Convert markdown-style headers to proper HTML structure
  const formatContent = (content: string) => {
    const lines = content.split('\n');
    let formattedContent: JSX.Element[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('## ')) {
        formattedContent.push(
          <h2 key={key++} className="text-3xl mt-12 mb-6 scroll-mt-24" id={line.substring(3).toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        formattedContent.push(
          <h3 key={key++} className="text-2xl mt-8 mb-4 scroll-mt-24" id={line.substring(4).toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        formattedContent.push(
          <p key={key++} className="my-4">
            <strong>{line.substring(2, line.length - 2)}</strong>
          </p>
        );
      } else if (line.trim() === '') {
        // Skip empty lines
        continue;
      } else if (line.startsWith('- ')) {
        // Collect all consecutive bullet points
        const bullets: string[] = [line.substring(2)];
        while (i + 1 < lines.length && lines[i + 1].startsWith('- ')) {
          i++;
          bullets.push(lines[i].substring(2));
        }
        formattedContent.push(
          <ul key={key++} className="list-disc pl-6 my-4 space-y-2">
            {bullets.map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
        );
      } else {
        // Regular paragraph with inline formatting
        const formattedLine = line
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.+?)\*/g, '<em>$1</em>');
        
        formattedContent.push(
          <p key={key++} className="my-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedLine }} />
        );
      }
    }

    return formattedContent;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Sparkles className="size-6 text-blue-600" />
            <span className="text-xl">AI Resume Forge</span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate('/blog')}>
              <ArrowLeft className="size-4 mr-2" />
              Back to Blog
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/builder')}>
              Build Resume
            </Button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="w-full h-96 overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={post.featuredImage}
          alt={post.imageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-12 max-w-7xl mx-auto">
          {/* Main Content */}
          <article className="flex-1 max-w-4xl">
            {/* Article Header */}
            <div className="mb-8">
              <Badge className="mb-4 bg-blue-600">{categoryName}</Badge>
              <h1 className="text-5xl mb-6">{post.title}</h1>
              
              <div className="flex items-center gap-4 text-gray-600 mb-6">
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="size-4" />
                  {post.readTime}
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="size-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Table of Contents (generated from H2 headers) */}
            <Card className="mb-8 bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="mb-3">Table of Contents</h3>
                <ul className="space-y-2 text-sm">
                  {post.content.split('\n').filter(line => line.startsWith('## ')).map((header, index) => {
                    const text = header.substring(3);
                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    return (
                      <li key={index}>
                        <a href={`#${id}`} className="text-blue-600 hover:underline">
                          {text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {formatContent(post.content)}
            </div>

            {/* Ad Banner */}
            <div className="flex justify-center my-12">
              <AdPlaceholder width={728} height={90} />
            </div>

            {/* CTA Section */}
            <Card className="my-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white border-none">
              <CardContent className="p-8 text-center">
                <h3 className="text-3xl mb-4">Ready to Build Your Professional Resume?</h3>
                <p className="text-lg opacity-90 mb-6">
                  Use our free AI-powered resume builder to create an ATS-optimized resume in minutes.
                </p>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => navigate('/builder')}
                >
                  Start Building Now
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Tags/Keywords */}
            <div className="my-8">
              <h3 className="text-lg mb-3">Related Topics:</h3>
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <Card
                      key={relatedPost.slug}
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-none"
                      onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                    >
                      <ImageWithFallback
                        src={relatedPost.featuredImage}
                        alt={relatedPost.imageAlt}
                        className="w-full h-40 object-cover"
                      />
                      <CardContent className="p-4">
                        <h4 className="mb-2 line-clamp-2">{relatedPost.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{relatedPost.excerpt}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="w-80 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Author Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3">About the Author</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Written by {post.author}, career expert and resume specialist with years of experience helping job seekers land their dream positions.
                  </p>
                </CardContent>
              </Card>

              {/* Ad Space */}
              <AdPlaceholder width={300} height={250} />

              {/* Quick Links */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg mb-4">Popular Resources</h3>
                  <div className="space-y-3 text-sm">
                    <a
                      href="/builder"
                      className="block text-blue-600 hover:underline cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/builder');
                      }}
                    >
                      → AI Resume Builder
                    </a>
                    <a href="#" className="block text-blue-600 hover:underline">
                      → Resume Templates
                    </a>
                    <a href="#" className="block text-blue-600 hover:underline">
                      → ATS Optimization Guide
                    </a>
                    <a href="#" className="block text-blue-600 hover:underline">
                      → Cover Letter Examples
                    </a>
                    <a
                      href="/blog"
                      className="block text-blue-600 hover:underline cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/blog');
                      }}
                    >
                      → All Blog Articles
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Ad Space */}
              <AdPlaceholder width={300} height={600} label="Advertisement" />
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
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
              <h4 className="mb-4">Tools</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <button onClick={() => navigate('/builder')} className="block hover:text-white transition-colors">
                  Resume Builder
                </button>
                <a href="#" className="block hover:text-white transition-colors">Resume Templates</a>
                <a href="#" className="block hover:text-white transition-colors">Cover Letter Builder</a>
              </div>
            </div>
            <div>
              <h4 className="mb-4">Resources</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <button onClick={() => navigate('/blog')} className="block hover:text-white transition-colors">
                  Blog
                </button>
                <a href="#" className="block hover:text-white transition-colors">Career Guides</a>
                <a href="#" className="block hover:text-white transition-colors">Resume Examples</a>
              </div>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <div className="space-y-2 text-sm text-gray-400">
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
