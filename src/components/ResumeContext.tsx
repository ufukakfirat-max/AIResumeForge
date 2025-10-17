import { createContext, useContext, useState, ReactNode } from 'react';

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    jobTitle: string;
    email: string;
    phone: string;
    photo?: string; // Base64 or URL
    location?: string;
    website?: string;
    linkedin?: string;
  };
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  template: 'classic' | 'modern' | 'creative' | 'professional';
}

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateWorkExperience: (experience: WorkExperience[]) => void;
  updateEducation: (education: Education[]) => void;
  updateSkills: (skills: string[]) => void;
  updateTemplate: (template: ResumeData['template']) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const initialResumeData: ResumeData = {
  personalInfo: {
    name: '',
    jobTitle: '',
    email: '',
    phone: '',
  },
  workExperience: [],
  education: [],
  skills: [],
  template: 'classic',
};

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const updateWorkExperience = (experience: WorkExperience[]) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: experience,
    }));
  };

  const updateEducation = (education: Education[]) => {
    setResumeData(prev => ({
      ...prev,
      education: education,
    }));
  };

  const updateSkills = (skills: string[]) => {
    setResumeData(prev => ({
      ...prev,
      skills: skills,
    }));
  };

  const updateTemplate = (template: ResumeData['template']) => {
    setResumeData(prev => ({
      ...prev,
      template: template,
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        updatePersonalInfo,
        updateWorkExperience,
        updateEducation,
        updateSkills,
        updateTemplate,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}