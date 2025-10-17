import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sparkles, FileCheck, Download } from "lucide-react";
import { AdPlaceholder } from "./AdPlaceholder";

export function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sparkles className="size-12 text-blue-600" />,
      title: "AI Generated Content",
      description:
        "Let AI craft professional descriptions and optimize your content",
    },
    {
      icon: <FileCheck className="size-12 text-blue-600" />,
      title: "ATS-Optimized Design",
      description:
        "Stand out with resume formats that pass applicant tracking systems",
    },
    {
      icon: <Download className="size-12 text-blue-600" />,
      title: "Instant PDF Download",
      description:
        "Download your professional resume as PDF instantly - no signup needed",
    },
  ];

  const testimonials = [
    {
      text: "This tool helped me land my dream job! The AI suggestions were spot on.",
      author: "Sarah Johnson",
      role: "Software Engineer",
    },
    {
      text: "Clean, professional, and incredibly easy to use. Highly recommended!",
      author: "Michael Chen",
      role: "Marketing Manager",
    },
    {
      text: "Finally, a resume builder that doesn't require creating an account!",
      author: "Emily Rodriguez",
      role: "Product Designer",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-6 text-blue-600" />
            <span className="text-xl">AI Resume Forge</span>
          </div>
          <nav className="flex gap-6">
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Testimonials
            </a>
            <button
              onClick={() => navigate("/blog")}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Blog
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center max-w-4xl">
        <h1 className="text-5xl mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Build Your Professional Resume with AI — No Signup
          Required
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Instantly create, preview, and download your resume.
          100% free.
        </p>
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          onClick={() => navigate("/builder")}
        >
          Start Building
        </Button>
      </section>

      {/* Ad Banner */}
      <div className="flex justify-center mb-16">
        <AdPlaceholder width={728} height={90} />
      </div>

      {/* Features Section */}
      <section
        id="features"
        className="container mx-auto px-4 py-16 max-w-6xl"
      >
        <h2 className="text-3xl text-center mb-12">
          Why Choose AI Resume Forge?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="pt-8 pb-8 text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="mb-3">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="bg-blue-50 py-16 mt-16"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-none shadow-md"
              >
                <CardContent className="pt-6 pb-6">
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p>{testimonial.author}</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Ad */}
      <div className="flex justify-center py-12">
        <AdPlaceholder width={728} height={90} />
      </div>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9097049169398507"
          crossorigin="anonymous"
        ></script>
      </head>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">
            © 2025 AI Resume Forge. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a
              href="#"
              className="hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-blue-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}