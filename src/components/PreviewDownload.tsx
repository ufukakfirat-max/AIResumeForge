import { useNavigate } from 'react-router-dom';
import { useResume } from './ResumeContext';
import { Button } from './ui/button';
import { AdPlaceholder } from './AdPlaceholder';
import { Sparkles, Edit, Download } from 'lucide-react';
import { useRef } from 'react';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';

export function PreviewDownload() {
  const navigate = useNavigate();
  const { resumeData } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');

    if (resumeRef.current) {
      const clone = resumeRef.current.cloneNode(true) as HTMLElement;
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      document.body.appendChild(clone);

      const replaceColors = (element: HTMLElement) => {
        // Color mappings
        const colorMap: { [key: string]: string } = {
          'text-blue-600': '#2563EB',
          'text-blue-700': '#1D4ED8',
          'text-gray-600': '#4B5563',
          'text-gray-500': '#6B7280',
          'text-gray-700': '#374151',
          'bg-blue-50': '#EFF6FF',
          'bg-white': '#FFFFFF',
          'border-blue-600': '#2563EB',
        };
        
        Object.entries(colorMap).forEach(([className, color]) => {
          if (className.startsWith('text-') && element.classList.contains(className)) {
            element.style.color = color;
          }
          if (className.startsWith('bg-') && element.classList.contains(className)) {
            element.style.backgroundColor = color;
          }
          if (className.startsWith('border-') && element.classList.contains(className)) {
            element.style.borderColor = color;
          }
        });

        Array.from(element.children).forEach(child => {
          replaceColors(child as HTMLElement);
        });
      };

      replaceColors(clone);

      try {
        const canvas = await html2canvas(clone, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${resumeData.personalInfo.name || 'Resume'}.pdf`);
        
        navigate('/thank-you');
      } finally {
        document.body.removeChild(clone);
      }
    }
  };

  const renderTemplate = () => {
    switch (resumeData.template) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />;
      case 'classic':
      default:
        return <ClassicTemplate data={resumeData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Sparkles className="size-6 text-blue-600" />
            <span className="text-xl">AI Resume Forge</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/builder')}>
              <Edit className="size-4 mr-2" />
              Edit Info
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleDownloadPDF}
            >
              <Download className="size-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 max-w-7xl mx-auto">
          {/* Resume Preview */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-[210mm] mx-auto">
              <div ref={resumeRef}>
                {renderTemplate()}
              </div>
            </div>

            {/* Tip */}
            <p className="text-center text-sm text-gray-600 mt-6 italic">
              💡 Tip: Check the AI suggestions before downloading!
            </p>

            {/* Bottom Ad */}
            <div className="flex justify-center mt-8">
              <AdPlaceholder width={728} height={90} />
            </div>
          </div>

          {/* Right Sidebar Ad */}
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24">
              <AdPlaceholder width={300} height={600} label="Advertisement" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
