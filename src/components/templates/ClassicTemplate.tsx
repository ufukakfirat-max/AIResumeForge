import { ResumeData } from '../ResumeContext';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function ClassicTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white p-12 min-h-[297mm]" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="text-center border-b-2 pb-6 mb-6" style={{ borderColor: '#2563EB' }}>
        <h1 className="text-4xl mb-2" style={{ color: '#1a1a1a' }}>
          {data.personalInfo.name || 'Your Name'}
        </h1>
        <p className="text-xl mb-4" style={{ color: '#4B5563' }}>
          {data.personalInfo.jobTitle || 'Job Title'}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: '#6B7280' }}>
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

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl mb-4 uppercase tracking-wide" style={{ color: '#2563EB', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px' }}>
            Work Experience
          </h2>
          {data.workExperience.map((exp, index) => (
            <div key={exp.id} className={index > 0 ? 'mt-4' : ''}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg" style={{ color: '#1a1a1a' }}>{exp.position}</h3>
                  <p style={{ color: '#4B5563' }}>{exp.company}</p>
                </div>
                <p className="text-sm" style={{ color: '#6B7280' }}>{exp.duration}</p>
              </div>
              <div className="text-sm whitespace-pre-line" style={{ color: '#374151' }}>
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl mb-4 uppercase tracking-wide" style={{ color: '#2563EB', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px' }}>
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={edu.id} className={index > 0 ? 'mt-3' : ''}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg" style={{ color: '#1a1a1a' }}>{edu.degree}</h3>
                  <p style={{ color: '#4B5563' }}>{edu.school}</p>
                </div>
                <p className="text-sm" style={{ color: '#6B7280' }}>{edu.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-2xl mb-4 uppercase tracking-wide" style={{ color: '#2563EB', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px' }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm"
                style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', borderRadius: '4px' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
