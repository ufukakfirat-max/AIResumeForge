import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Sparkles, Home, FileText } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Sparkles className="size-6 text-blue-600" />
            <span className="text-xl">AI Resume Forge</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <h1 className="text-9xl mb-4 text-blue-600">404</h1>
            <h2 className="text-4xl mb-4">Page Not Found</h2>
            <p className="text-xl text-gray-600 mb-8">
              Oops! The page you're looking for doesn't exist. Let's get you back on track.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate('/')}
            >
              <Home className="size-5 mr-2" />
              Go to Home
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/builder')}
            >
              <FileText className="size-5 mr-2" />
              Build Resume
            </Button>
          </div>

          <div className="mt-12">
            <p className="text-sm text-gray-500 mb-4">Popular pages:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => navigate('/blog')}
                className="text-blue-600 hover:underline text-sm"
              >
                Blog
              </button>
              <span className="text-gray-300">•</span>
              <button
                onClick={() => navigate('/builder')}
                className="text-blue-600 hover:underline text-sm"
              >
                Resume Builder
              </button>
              <span className="text-gray-300">•</span>
              <button
                onClick={() => navigate('/')}
                className="text-blue-600 hover:underline text-sm"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2025 AI Resume Forge. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
