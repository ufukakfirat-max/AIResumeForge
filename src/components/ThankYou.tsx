import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { AdPlaceholder } from './AdPlaceholder';
import { CheckCircle, FileText, Linkedin } from 'lucide-react';

export function ThankYou() {
  const navigate = useNavigate();

  const handleCreateAnother = () => {
    navigate('/builder');
  };

  const handleShareLinkedIn = () => {
    const linkedInUrl = 'https://www.linkedin.com/feed/?shareActive=true&text=I%20just%20created%20my%20professional%20resume%20with%20AI%20Resume%20Forge!%20Try%20it%20out%20-%20it%27s%20free%20and%20requires%20no%20signup!';
    window.open(linkedInUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 rounded-full"></div>
            <CheckCircle className="size-32 text-green-500 relative" strokeWidth={1.5} />
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-5xl mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Your Resume is Ready!
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Your professional resume has been downloaded successfully. Good luck with your job search!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6"
            onClick={handleCreateAnother}
          >
            <FileText className="size-5 mr-2" />
            Create Another Resume
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6"
            onClick={handleShareLinkedIn}
          >
            <Linkedin className="size-5 mr-2" />
            Share on LinkedIn
          </Button>
        </div>

        {/* Ad Banner */}
        <div className="flex justify-center mb-12">
          <AdPlaceholder width={728} height={90} />
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-left">
          <h2 className="text-2xl mb-4 text-center">Next Steps</h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                1
              </div>
              <div>
                <p className="mb-1">Review your resume for any final adjustments</p>
                <p className="text-sm text-gray-500">Make sure all information is accurate and up-to-date</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                2
              </div>
              <div>
                <p className="mb-1">Tailor it for each job application</p>
                <p className="text-sm text-gray-500">Customize your resume to match specific job requirements</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                3
              </div>
              <div>
                <p className="mb-1">Start applying with confidence!</p>
                <p className="text-sm text-gray-500">Your ATS-optimized resume is ready to make an impact</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-sm text-gray-500">
          <p>
            Built with{' '}
            <span className="text-red-500">❤️</span>
            {' '}by AI Resume Forge
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">
              Home
            </button>
            <span>•</span>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
}
