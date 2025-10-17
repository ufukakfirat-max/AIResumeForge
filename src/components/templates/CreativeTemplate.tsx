import { ResumeData } from '../ResumeContext';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function CreativeTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white min-h-[297mm]" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header with gradient */}
      <div className="p-12 pb-8" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="flex items-center gap-8">
          {/* Photo */}
          {data.personalInfo.photo && (
            <div className="flex-shrink-0">
              <img
                src={data.personalInfo.photo}
                alt="Profile"
                className="rounded-lg object-cover"
                style={{ width: '140px', height: '140px', border: '4px solid white', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
              />
            </div>
          )}
          
          {/* Name and Title */}
          <div className="flex-1" style={{ color: 'white' }}>
            <h1 className="text-5xl mb-3" style={{ fontWeight: '700' }}>
              {data.personalInfo.name || 'Your Name'}
            </h1>
            <p className="text-2xl mb-4 opacity-90">
              {data.personalInfo.jobTitle || 'Job Title'}
            </p>
            
            {/* Contact - Horizontal */}
            <div className="flex flex-wrap gap-4 text-sm opacity-90">
              {data.personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="size-4" />
                  {data.personalInfo.email}
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="size-4" />
                  {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="size-4" />
                  {data.personalInfo.location}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-sm opacity-90 mt-2">
              {data.personalInfo.website && (
                <div className="flex items-center gap-1">
                  <Globe className="size-4" />
                  {data.personalInfo.website}
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="size-4" />
                  {data.personalInfo.linkedin}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-12 py-8">
        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl mb-6 relative inline-block" style={{ color: '#667eea', fontWeight: '600' }}>
              Work Experience
              <div className="absolute bottom-0 left-0 w-full h-1 rounded" style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}></div>
            </h2>
            {data.workExperience.map((exp, index) => (
              <div key={exp.id} className={`${index > 0 ? 'mt-6' : ''} relative pl-6`}>
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: '#667eea' }}></div>
                <div className="absolute left-1.5 top-5 bottom-0 w-0.5" style={{ backgroundColor: '#e0e7ff' }}></div>
                
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl" style={{ color: '#1e293b', fontWeight: '600' }}>{exp.position}</h3>
                    <p className="text-lg" style={{ color: '#667eea' }}>{exp.company}</p>
                  </div>
                  <div className="px-4 py-1 rounded-full text-sm" style={{ backgroundColor: '#f3f4f6', color: '#4b5563' }}>
                    {exp.duration}
                  </div>
                </div>
                <div className="text-sm whitespace-pre-line" style={{ color: '#475569' }}>
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education & Skills Row */}
        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-3xl mb-6 relative inline-block" style={{ color: '#667eea', fontWeight: '600' }}>
                Education
                <div className="absolute bottom-0 left-0 w-full h-1 rounded" style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}></div>
              </h2>
              {data.education.map((edu, index) => (
                <div key={edu.id} className={index > 0 ? 'mt-4' : ''}>
                  <h3 className="text-lg" style={{ color: '#1e293b', fontWeight: '600' }}>{edu.degree}</h3>
                  <p style={{ color: '#667eea' }}>{edu.school}</p>
                  <p className="text-sm" style={{ color: '#64748b' }}>{edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-3xl mb-6 relative inline-block" style={{ color: '#667eea', fontWeight: '600' }}>
                Skills
                <div className="absolute bottom-0 left-0 w-full h-1 rounded" style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}></div>
              </h2>
              <div className="flex flex-wrap gap-3">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-lg text-sm"
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontWeight: '500'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
