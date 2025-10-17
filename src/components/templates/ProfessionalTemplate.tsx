import { ResumeData } from '../ResumeContext';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function ProfessionalTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white min-h-[297mm]" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Top Header Bar */}
      <div className="h-3" style={{ backgroundColor: '#0f172a' }}></div>
      
      <div className="p-12">
        {/* Header Section */}
        <div className="flex gap-8 mb-8">
          {/* Photo */}
          {data.personalInfo.photo && (
            <div className="flex-shrink-0">
              <img
                src={data.personalInfo.photo}
                alt="Profile"
                className="object-cover"
                style={{ width: '130px', height: '130px', border: '3px solid #0f172a' }}
              />
            </div>
          )}
          
          {/* Name and Contact */}
          <div className="flex-1">
            <h1 className="text-4xl mb-2" style={{ color: '#0f172a', fontWeight: '700', letterSpacing: '1px' }}>
              {data.personalInfo.name || 'YOUR NAME'}
            </h1>
            <p className="text-xl mb-4" style={{ color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px' }}>
              {data.personalInfo.jobTitle || 'Job Title'}
            </p>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm" style={{ color: '#475569' }}>
              {data.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="size-4" style={{ color: '#0f172a' }} />
                  {data.personalInfo.email}
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="size-4" style={{ color: '#0f172a' }} />
                  {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="size-4" style={{ color: '#0f172a' }} />
                  {data.personalInfo.location}
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="size-4" style={{ color: '#0f172a' }} />
                  {data.personalInfo.website}
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center gap-2 col-span-2">
                  <Linkedin className="size-4" style={{ color: '#0f172a' }} />
                  {data.personalInfo.linkedin}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ backgroundColor: '#cbd5e1' }}></div>

        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl mb-4 pb-2 uppercase tracking-widest" style={{ 
              color: '#0f172a', 
              fontWeight: '700',
              borderBottom: '2px solid #0f172a',
              letterSpacing: '3px'
            }}>
              Professional Experience
            </h2>
            {data.workExperience.map((exp, index) => (
              <div key={exp.id} className={index > 0 ? 'mt-5' : ''}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg" style={{ color: '#0f172a', fontWeight: '700' }}>{exp.position}</h3>
                    <p style={{ color: '#475569', fontWeight: '600' }}>{exp.company}</p>
                  </div>
                  <div className="text-sm px-3 py-1" style={{ backgroundColor: '#f1f5f9', color: '#475569', borderLeft: '3px solid #0f172a' }}>
                    {exp.duration}
                  </div>
                </div>
                <div className="text-sm whitespace-pre-line leading-relaxed" style={{ color: '#64748b' }}>
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl mb-4 pb-2 uppercase tracking-widest" style={{ 
              color: '#0f172a', 
              fontWeight: '700',
              borderBottom: '2px solid #0f172a',
              letterSpacing: '3px'
            }}>
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={edu.id} className={index > 0 ? 'mt-4' : ''}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg" style={{ color: '#0f172a', fontWeight: '700' }}>{edu.degree}</h3>
                    <p style={{ color: '#475569' }}>{edu.school}</p>
                  </div>
                  <p className="text-sm" style={{ color: '#64748b' }}>{edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl mb-4 pb-2 uppercase tracking-widest" style={{ 
              color: '#0f172a', 
              fontWeight: '700',
              borderBottom: '2px solid #0f172a',
              letterSpacing: '3px'
            }}>
              Core Competencies
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {data.skills.map((skill, index) => (
                <div
                  key={index}
                  className="px-3 py-2 text-sm text-center"
                  style={{ 
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                    border: '1px solid #cbd5e1',
                    fontWeight: '500'
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
