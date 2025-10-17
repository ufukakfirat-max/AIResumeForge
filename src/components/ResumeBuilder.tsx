import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { AdPlaceholder } from './AdPlaceholder';
import { useResume, WorkExperience, Education } from './ResumeContext';
import { Sparkles, ArrowLeft, ArrowRight, Plus, Trash2, Upload, X } from 'lucide-react';
import { Badge } from './ui/badge';

export function ResumeBuilder() {
  const navigate = useNavigate();
  const { resumeData, updatePersonalInfo, updateWorkExperience, updateEducation, updateSkills, updateTemplate } = useResume();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedTemplate, setSelectedTemplate] = useState<string>(resumeData.template || 'classic');
  const [localPersonalInfo, setLocalPersonalInfo] = useState(resumeData.personalInfo);
  const [localWorkExperience, setLocalWorkExperience] = useState<WorkExperience[]>(
    resumeData.workExperience.length > 0 ? resumeData.workExperience : [{
      id: '1',
      company: '',
      position: '',
      duration: '',
      description: '',
    }]
  );
  const [localEducation, setLocalEducation] = useState<Education[]>(
    resumeData.education.length > 0 ? resumeData.education : [{
      id: '1',
      school: '',
      degree: '',
      year: '',
    }]
  );
  const [localSkills, setLocalSkills] = useState<string[]>(resumeData.skills);
  const [skillInput, setSkillInput] = useState('');

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const templates = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional and professional',
      preview: 'Simple layout with clear sections',
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary sidebar design',
      preview: 'Two-column layout with dark sidebar',
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Colorful and dynamic',
      preview: 'Gradient header with visual elements',
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Corporate and clean',
      preview: 'Structured layout for executives',
    },
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalPersonalInfo({ ...localPersonalInfo, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setLocalPersonalInfo({ ...localPersonalInfo, photo: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNext = () => {
    if (currentStep === 0) {
      updateTemplate(selectedTemplate as any);
    } else if (currentStep === 1) {
      updatePersonalInfo(localPersonalInfo);
    } else if (currentStep === 2) {
      updateWorkExperience(localWorkExperience);
    } else if (currentStep === 3) {
      updateEducation(localEducation);
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addWorkExperience = () => {
    setLocalWorkExperience([
      ...localWorkExperience,
      {
        id: Date.now().toString(),
        company: '',
        position: '',
        duration: '',
        description: '',
      },
    ]);
  };

  const removeWorkExperience = (id: string) => {
    setLocalWorkExperience(localWorkExperience.filter(exp => exp.id !== id));
  };

  const updateWorkExperienceItem = (id: string, field: keyof WorkExperience, value: string) => {
    setLocalWorkExperience(
      localWorkExperience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const addEducation = () => {
    setLocalEducation([
      ...localEducation,
      {
        id: Date.now().toString(),
        school: '',
        degree: '',
        year: '',
      },
    ]);
  };

  const removeEducation = (id: string) => {
    setLocalEducation(localEducation.filter(edu => edu.id !== id));
  };

  const updateEducationItem = (id: string, field: keyof Education, value: string) => {
    setLocalEducation(
      localEducation.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const addSkill = () => {
    if (skillInput.trim() && !localSkills.includes(skillInput.trim())) {
      setLocalSkills([...localSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setLocalSkills(localSkills.filter(s => s !== skill));
  };

  const handleGenerateWithAI = async () => {
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const enhancedWorkExperience = localWorkExperience.map(exp => {
      if (exp.description.trim()) {
        return exp;
      }
      
      const aiDescriptions: { [key: string]: string } = {
        default: `• Led cross-functional initiatives resulting in measurable improvements\n• Collaborated with team members to achieve project objectives\n• Implemented best practices to optimize workflow efficiency`,
        developer: `• Developed and maintained scalable applications using modern technologies\n• Collaborated with cross-functional teams to deliver high-quality solutions\n• Implemented automated testing resulting in 40% reduction in bugs`,
        manager: `• Managed team of 10+ professionals to exceed quarterly targets\n• Implemented strategic initiatives resulting in 25% productivity increase\n• Facilitated stakeholder communication and project coordination`,
        designer: `• Created user-centered designs improving customer satisfaction by 30%\n• Collaborated with development teams to ensure seamless implementation\n• Conducted user research and usability testing for product optimization`,
      };
      
      const position = exp.position.toLowerCase();
      let description = aiDescriptions.default;
      
      if (position.includes('developer') || position.includes('engineer')) {
        description = aiDescriptions.developer;
      } else if (position.includes('manager') || position.includes('lead')) {
        description = aiDescriptions.manager;
      } else if (position.includes('designer')) {
        description = aiDescriptions.designer;
      }
      
      return { ...exp, description };
    });
    
    setLocalWorkExperience(enhancedWorkExperience);
    
    if (localSkills.length === 0) {
      const jobTitle = localPersonalInfo.jobTitle.toLowerCase();
      let suggestedSkills: string[] = [];
      
      if (jobTitle.includes('developer') || jobTitle.includes('engineer')) {
        suggestedSkills = ['JavaScript', 'React', 'Node.js', 'Git', 'Agile'];
      } else if (jobTitle.includes('designer')) {
        suggestedSkills = ['Figma', 'Adobe Creative Suite', 'UI/UX Design', 'Prototyping', 'User Research'];
      } else if (jobTitle.includes('manager')) {
        suggestedSkills = ['Leadership', 'Project Management', 'Strategic Planning', 'Team Building', 'Communication'];
      } else {
        suggestedSkills = ['Communication', 'Problem Solving', 'Teamwork', 'Time Management', 'Adaptability'];
      }
      
      setLocalSkills(suggestedSkills);
    }
    
    updateSkills(localSkills);
    updateWorkExperience(enhancedWorkExperience);
    updateEducation(localEducation);
    
    setIsGenerating(false);
    navigate('/preview');
  };

  const stepLabels = ['Choose Template', 'Personal Info', 'Work Experience', 'Education', 'Skills'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Sparkles className="size-6 text-blue-600" />
            <span className="text-xl">AI Resume Forge</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="size-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 max-w-7xl mx-auto">
          {/* Progress Sidebar */}
          <div className="w-64 flex-shrink-0">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="mb-6" />
                <div className="space-y-4">
                  {stepLabels.map((step, index) => (
                    <div
                      key={step}
                      className={`flex items-center gap-3 ${
                        currentStep === index
                          ? 'text-blue-600'
                          : currentStep > index
                          ? 'text-green-600'
                          : 'text-gray-400'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                          currentStep === index
                            ? 'border-blue-600 bg-blue-50'
                            : currentStep > index
                            ? 'border-green-600 bg-green-50'
                            : 'border-gray-300'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle>{stepLabels[currentStep]}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Step 0: Template Selection */}
                {currentStep === 0 && (
                  <div>
                    <p className="text-gray-600 mb-6">Choose a template that best fits your style and industry</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {templates.map((template) => (
                        <Card
                          key={template.id}
                          className={`cursor-pointer transition-all ${
                            selectedTemplate === template.id
                              ? 'ring-2 ring-blue-600 shadow-lg'
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-lg">{template.name}</h3>
                              {selectedTemplate === template.id && (
                                <Badge className="bg-blue-600">Selected</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                            <p className="text-xs text-gray-500">{template.preview}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    {/* Photo Upload */}
                    <div>
                      <Label>Profile Photo (Optional)</Label>
                      <div className="mt-2">
                        {localPersonalInfo.photo ? (
                          <div className="relative inline-block">
                            <img
                              src={localPersonalInfo.photo}
                              alt="Profile"
                              className="w-32 h-32 rounded-lg object-cover border-2 border-gray-200"
                            />
                            <button
                              onClick={removePhoto}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="size-4" />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoUpload}
                              className="hidden"
                              id="photo-upload"
                            />
                            <Button
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              type="button"
                            >
                              <Upload className="size-4 mr-2" />
                              Upload Photo
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={localPersonalInfo.name}
                          onChange={(e) => setLocalPersonalInfo({ ...localPersonalInfo, name: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="jobTitle">Job Title *</Label>
                        <Input
                          id="jobTitle"
                          value={localPersonalInfo.jobTitle}
                          onChange={(e) => setLocalPersonalInfo({ ...localPersonalInfo, jobTitle: e.target.value })}
                          placeholder="Software Engineer"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={localPersonalInfo.email}
                          onChange={(e) => setLocalPersonalInfo({ ...localPersonalInfo, email: e.target.value })}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          value={localPersonalInfo.phone}
                          onChange={(e) => setLocalPersonalInfo({ ...localPersonalInfo, phone: e.target.value })}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={localPersonalInfo.location || ''}
                          onChange={(e) => setLocalPersonalInfo({ ...localPersonalInfo, location: e.target.value })}
                          placeholder="New York, NY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={localPersonalInfo.website || ''}
                          onChange={(e) => setLocalPersonalInfo({ ...localPersonalInfo, website: e.target.value })}
                          placeholder="www.yoursite.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={localPersonalInfo.linkedin || ''}
                        onChange={(e) => setLocalPersonalInfo({ ...localPersonalInfo, linkedin: e.target.value })}
                        placeholder="linkedin.com/in/yourprofile"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Work Experience */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    {localWorkExperience.map((exp, index) => (
                      <Card key={exp.id} className="bg-gray-50">
                        <CardContent className="pt-6 space-y-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg">Experience {index + 1}</h3>
                            {localWorkExperience.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeWorkExperience(exp.id)}
                              >
                                <Trash2 className="size-4 text-red-500" />
                              </Button>
                            )}
                          </div>
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateWorkExperienceItem(exp.id, 'company', e.target.value)}
                              placeholder="Tech Corp"
                            />
                          </div>
                          <div>
                            <Label>Position</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) => updateWorkExperienceItem(exp.id, 'position', e.target.value)}
                              placeholder="Senior Developer"
                            />
                          </div>
                          <div>
                            <Label>Duration</Label>
                            <Input
                              value={exp.duration}
                              onChange={(e) => updateWorkExperienceItem(exp.id, 'duration', e.target.value)}
                              placeholder="Jan 2020 - Present"
                            />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea
                              value={exp.description}
                              onChange={(e) => updateWorkExperienceItem(exp.id, 'description', e.target.value)}
                              placeholder="Describe your responsibilities and achievements..."
                              rows={4}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button onClick={addWorkExperience} variant="outline" className="w-full">
                      <Plus className="size-4 mr-2" />
                      Add Another Experience
                    </Button>
                  </div>
                )}

                {/* Step 3: Education */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    {localEducation.map((edu, index) => (
                      <Card key={edu.id} className="bg-gray-50">
                        <CardContent className="pt-6 space-y-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg">Education {index + 1}</h3>
                            {localEducation.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeEducation(edu.id)}
                              >
                                <Trash2 className="size-4 text-red-500" />
                              </Button>
                            )}
                          </div>
                          <div>
                            <Label>School</Label>
                            <Input
                              value={edu.school}
                              onChange={(e) => updateEducationItem(edu.id, 'school', e.target.value)}
                              placeholder="University of Technology"
                            />
                          </div>
                          <div>
                            <Label>Degree</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => updateEducationItem(edu.id, 'degree', e.target.value)}
                              placeholder="Bachelor of Science in Computer Science"
                            />
                          </div>
                          <div>
                            <Label>Year</Label>
                            <Input
                              value={edu.year}
                              onChange={(e) => updateEducationItem(edu.id, 'year', e.target.value)}
                              placeholder="2016 - 2020"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button onClick={addEducation} variant="outline" className="w-full">
                      <Plus className="size-4 mr-2" />
                      Add Another Education
                    </Button>
                  </div>
                )}

                {/* Step 4: Skills */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="skillInput">Add Skills</Label>
                      <div className="flex gap-2">
                        <Input
                          id="skillInput"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                          placeholder="Type a skill and press Enter"
                        />
                        <Button onClick={addSkill} type="button">
                          Add
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {localSkills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-2 px-3">
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-2 hover:text-red-500"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    {localSkills.length === 0 && (
                      <p className="text-sm text-gray-500">No skills added yet. Add skills relevant to your job.</p>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="size-4 mr-2" />
                    Back
                  </Button>
                  
                  {currentStep < totalSteps - 1 ? (
                    <Button onClick={handleNext}>
                      Next
                      <ArrowRight className="size-4 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleGenerateWithAI}
                      disabled={isGenerating}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isGenerating ? (
                        <>Generating...</>
                      ) : (
                        <>
                          <Sparkles className="size-4 mr-2" />
                          Generate with AI
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ad Sidebar */}
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24">
              <AdPlaceholder width={300} height={250} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
