"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, User, Briefcase, GraduationCap, Code } from "lucide-react"
import { PersonalInfoForm } from "@/components/personal-info-form"
import { ExperienceForm } from "@/components/experience-form"
import { EducationForm } from "@/components/education-form"
import { SkillsForm } from "@/components/skills-form"
import { ResumePreview } from "@/components/resume-preview"
import { useToast } from "@/hooks/use-toast"

export type ResumeData = {
  personalInfo: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    summary: string
    website?: string
    linkedin?: string
    github?: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    current: boolean
    description: string
    location?: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    current: boolean
    location?: string
    gpa?: string
  }>
  skills: Array<{
    id: string
    name: string
    level: number
  }>
}

export default function ResumePage() {
  const { toast } = useToast()
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    // Try to load data from localStorage
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('resumeData')
      if (savedData) {
        try {
          return JSON.parse(savedData)
        } catch (e) {
          console.error('Failed to parse saved resume data:', e)
        }
      }
    }
    // Default data if nothing in localStorage
    return {
      personalInfo: {
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
      },
      experience: [],
      education: [],
      skills: [],
    }
  })

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData))
  }, [resumeData])
  
  const updatePersonalInfo = (data: ResumeData["personalInfo"]) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: data,
    }))
  }

  const updateExperience = (data: ResumeData["experience"]) => {
    setResumeData((prev) => ({
      ...prev,
      experience: data,
    }))
  }

  const updateEducation = (data: ResumeData["education"]) => {
    setResumeData((prev) => ({
      ...prev,
      education: data,
    }))
  }

  const updateSkills = (data: ResumeData["skills"]) => {
    setResumeData((prev) => ({
      ...prev,
      skills: data,
    }))
  }

  const handlePrint = () => {
    window.print()
    toast({
      title: "Print dialog opened",
      description: "Use your browser's print function to save as PDF.",
    })
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 print:hidden">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">Resume Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground mr-4">
              Changes are saved locally in your browser. Export as PDF to keep permanently.
            </p>
            <Button size="sm" onClick={handlePrint} className="whitespace-nowrap">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8 print:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:hidden">
          <div>
            <h2 className="text-2xl font-bold mb-4">Build Your Resume</h2>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="personal" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Personal</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline">Education</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-1">
                  <Code className="h-4 w-4" />
                  <span className="hidden sm:inline">Skills</span>
                </TabsTrigger>
              </TabsList>
              <Card className="p-4">
                <TabsContent value="personal">
                  <PersonalInfoForm data={resumeData.personalInfo} updateData={updatePersonalInfo} />
                </TabsContent>
                <TabsContent value="experience">
                  <ExperienceForm data={resumeData.experience} updateData={updateExperience} />
                </TabsContent>
                <TabsContent value="education">
                  <EducationForm data={resumeData.education} updateData={updateEducation} />
                </TabsContent>
                <TabsContent value="skills">
                  <SkillsForm data={resumeData.skills} updateData={updateSkills} />
                </TabsContent>
              </Card>
            </Tabs>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Preview</h2>
            <div className="border rounded-lg p-8 bg-white shadow-sm">
              <ResumePreview data={resumeData} />
            </div>
          </div>
        </div>

        {/* Print-only view */}
        <div className="hidden print:block">
          <ResumePreview data={resumeData} />
        </div>
      </main>

      <footer className="w-full border-t py-4 print:hidden">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Resume Builder. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Create professional resumes in minutes</p>
        </div>
      </footer>
    </div>
  )
}
