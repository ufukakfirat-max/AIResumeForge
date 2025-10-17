import { ResumeData } from '../ResumeContext';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-white flex min-h-[297mm]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Left Sidebar */}
      <div className="w-1/3 p-8" style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
        {/* Photo */}
        {data.personalInfo.photo && (
          <div className="mb-6 flex justify-center">
            <img
              src={data.personalInfo.photo}
              alt="Profile"
              className="rounded-full object-cover"
              style={{ width: '150px', height: '150px', border: '4px solid #3b82f6' }}
            />
          </div>
        )}

        {/* Contact Info */}
        <div className="mb-6">
          <h3 className="text-lg mb-3 uppercase tracking-wider" style={{ color: '#3b82f6' }}>Contact</h3>
          <div className="space-y-2 text-sm">
            {data.personalInfo.email && (
              <div className="flex items-start gap-2">
                <Mail className="size-4 mt-0.5 flex-shrink-0" style={{ color: '#3b82f6' }} />
                <span className="break-all">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="size-4 flex-shrink-0" style={{ color: '#3b82f6' }} />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-start gap-2">
                <MapPin className="size-4 mt-0.5 flex-shrink-0" style={{ color: '#3b82f6' }} />
                <span>{data.personalInfo.location}</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-start gap-2">
                <Globe className="size-4 mt-0.5 flex-shrink-0" style={{ color: '#3b82f6' }} />
                <span className="break-all">{data.personalInfo.website}</span>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-start gap-2">
                <Linkedin className="size-4 mt-0.5 flex-shrink-0" style={{ color: '#3b82f6' }} />
                <span className="break-all">{data.personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h3 className="text-lg mb-3 uppercase tracking-wider" style={{ color: '#3b82f6' }}>Skills</h3>
            <div className="space-y-2">
              {data.skills.map((skill, index) => (
                <div key={index} className="text-sm">
                  <div className="mb-1">{skill}</div>
                  <div className="h-1 rounded-full" style={{ backgroundColor: '#334155' }}>
                    <div className="h-full rounded-full" style={{ backgroundColor: '#3b82f6', width: '85%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl mb-2" style={{ color: '#1e293b' }}>
            {data.personalInfo.name || 'Your Name'}
          </h1>
          <p className="text-2xl" style={{ color: '#3b82f6' }}>
            {data.personalInfo.jobTitle || 'Job Title'}
          </p>
        </div>

        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl mb-4 uppercase tracking-wide flex items-center gap-3" style={{ color: '#1e293b' }}>
              <div className="w-2 h-8 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
              Work Experience
            </h2>
            {data.workExperience.map((exp, index) => (
              <div key={exp.id} className={index > 0 ? 'mt-6' : ''}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl" style={{ color: '#1e293b' }}>{exp.position}</h3>
                    <p className="text-lg" style={{ color: '#3b82f6' }}>{exp.company}</p>
                  </div>
                  <p className="text-sm px-3 py-1 rounded" style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
                    {exp.duration}
                  </p>
                </div>
                <div className="text-sm whitespace-pre-line" style={{ color: '#475569' }}>
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-2xl mb-4 uppercase tracking-wide flex items-center gap-3" style={{ color: '#1e293b' }}>
              <div className="w-2 h-8 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={edu.id} className={index > 0 ? 'mt-4' : ''}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg" style={{ color: '#1e293b' }}>{edu.degree}</h3>
                    <p style={{ color: '#3b82f6' }}>{edu.school}</p>
                  </div>
                  <p className="text-sm" style={{ color: '#64748b' }}>{edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
