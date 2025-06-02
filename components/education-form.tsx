"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2 } from "lucide-react"
import type { ResumeData } from "@/app/page"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface EducationFormProps {
  data: ResumeData["education"]
  updateData: (data: ResumeData["education"]) => void
}

export function EducationForm({ data, updateData }: EducationFormProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

  const addEducation = () => {
    const newEducation = {
      id: `edu-${Date.now()}`,
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      location: "",
      gpa: "",
    }

    const newData = [...data, newEducation]
    updateData(newData)
    setExpanded(newEducation.id)
  }

  const removeEducation = (id: string) => {
    const newData = data.filter((edu) => edu.id !== id)
    updateData(newData)
    if (expanded === id) {
      setExpanded(null)
    }
  }

  const updateEducation = (id: string, field: string, value: string | boolean) => {
    const newData = data.map((edu) => {
      if (edu.id === id) {
        return { ...edu, [field]: value }
      }
      return edu
    })
    updateData(newData)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Education</h3>
        <Button onClick={addEducation} size="sm" variant="outline" className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Education
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No education added yet. Click the button above to add your educational background.
        </div>
      ) : (
        <Accordion
          type="single"
          collapsible
          value={expanded || undefined}
          onValueChange={(value) => setExpanded(value)}
        >
          {data.map((education, index) => (
            <AccordionItem key={education.id} value={education.id} className="border rounded-lg mb-4 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">
                    {education.institution ? education.institution : `Education ${index + 1}`}
                    {education.degree ? ` - ${education.degree}` : ""}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => removeEducation(education.id)}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                  <AccordionTrigger className="h-8 w-8 p-0" />
                </div>
              </div>

              <AccordionContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${education.id}`}>Institution</Label>
                    <Input
                      id={`institution-${education.id}`}
                      value={education.institution}
                      onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                      placeholder="University or School Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`location-${education.id}`}>Location (Optional)</Label>
                    <Input
                      id={`location-${education.id}`}
                      value={education.location || ""}
                      onChange={(e) => updateEducation(education.id, "location", e.target.value)}
                      placeholder="City, State"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                    <Input
                      id={`degree-${education.id}`}
                      value={education.degree}
                      onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                      placeholder="Bachelor of Science"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`field-${education.id}`}>Field of Study</Label>
                    <Input
                      id={`field-${education.id}`}
                      value={education.field}
                      onChange={(e) => updateEducation(education.id, "field", e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${education.id}`}>Start Date</Label>
                    <Input
                      id={`startDate-${education.id}`}
                      value={education.startDate}
                      onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
                      placeholder="MM/YYYY"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${education.id}`}>End Date</Label>
                    <div className="flex flex-col gap-2">
                      <Input
                        id={`endDate-${education.id}`}
                        value={education.endDate}
                        onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
                        placeholder="MM/YYYY"
                        disabled={education.current}
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`current-${education.id}`}
                          checked={education.current}
                          onCheckedChange={(checked) => {
                            updateEducation(education.id, "current", checked === true)
                          }}
                        />
                        <label
                          htmlFor={`current-${education.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I am currently studying here
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor={`gpa-${education.id}`}>GPA (Optional)</Label>
                  <Input
                    id={`gpa-${education.id}`}
                    value={education.gpa || ""}
                    onChange={(e) => updateEducation(education.id, "gpa", e.target.value)}
                    placeholder="3.8/4.0"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}
