import type { ResumeData } from "@/app/page"
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Star } from "lucide-react"

interface ResumePreviewProps {
  data: ResumeData
}

export function ResumePreview({ data }: ResumePreviewProps) {
  const { personalInfo, experience, education, skills } = data

  // Check if resume has any data
  const hasData =
    personalInfo.name ||
    personalInfo.title ||
    personalInfo.email ||
    personalInfo.phone ||
    experience.length > 0 ||
    education.length > 0 ||
    skills.length > 0

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center p-8">
        <h3 className="text-xl font-medium mb-2">Your Resume Preview</h3>
        <p className="text-muted-foreground mb-4">Fill out the form sections to see your resume take shape here.</p>
        <div className="border-2 border-dashed rounded-lg p-8 w-full max-w-md">
          <p className="text-muted-foreground">
            Start by adding your personal information, work experience, education, and skills.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[800px] mx-auto font-sans">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-1">{personalInfo.name || "Your Name"}</h1>
        {personalInfo.title && <p className="text-lg text-muted-foreground">{personalInfo.title}</p>}

        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}

          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}

          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}

          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>{personalInfo.website}</span>
            </div>
          )}

          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}

          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              <span>{personalInfo.github}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Professional Summary</h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Work Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{exp.position}</h3>
                    <p className="text-sm">{exp.company}</p>
                  </div>
                  <div className="text-sm text-right">
                    <p>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </p>
                    {exp.location && <p>{exp.location}</p>}
                  </div>
                </div>
                {exp.description && <div className="mt-2 text-sm whitespace-pre-line">{exp.description}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{edu.institution}</h3>
                    <p className="text-sm">
                      {edu.degree}
                      {edu.field ? `, ${edu.field}` : ""}
                      {edu.gpa ? ` - GPA: ${edu.gpa}` : ""}
                    </p>
                  </div>
                  <div className="text-sm text-right">
                    <p>
                      {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                    </p>
                    {edu.location && <p>{edu.location}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Skills</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-2">
                <span className="text-sm">{skill.name}</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < skill.level ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
