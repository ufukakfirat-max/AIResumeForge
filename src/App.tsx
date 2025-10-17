import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { ResumeBuilder } from './components/ResumeBuilder';
import { PreviewDownload } from './components/PreviewDownload';
import { ThankYou } from './components/ThankYou';
import { ResumeProvider } from './components/ResumeContext';
import { BlogList } from './components/blog/BlogList';
import { BlogPost } from './components/blog/BlogPost';
import { NotFound } from './components/NotFound';

export default function App() {
  return (
    <ResumeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/builder" element={<ResumeBuilder />} />
          <Route path="/preview" element={<PreviewDownload />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/category/:category" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* Redirect preview_page.html to /preview */}
          <Route path="/preview_page.html" element={<Navigate to="/preview" replace />} />
          {/* Catch all unmatched routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ResumeProvider>
  );
}