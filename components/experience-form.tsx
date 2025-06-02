"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2 } from "lucide-react"
import type { ResumeData } from "@/app/page"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ExperienceFormProps {
  data: ResumeData["experience"]
  updateData: (data: ResumeData["experience"]) => void
}

export function ExperienceForm({ data, updateData }: ExperienceFormProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

  const addExperience = () => {
    const newExperience = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      location: "",
    }

    const newData = [...data, newExperience]
    updateData(newData)
    setExpanded(newExperience.id)
  }

  const removeExperience = (id: string) => {
    const newData = data.filter((exp) => exp.id !== id)
    updateData(newData)
    if (expanded === id) {
      setExpanded(null)
    }
  }

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    const newData = data.map((exp) => {
      if (exp.id === id) {
        return { ...exp, [field]: value }
      }
      return exp
    })
    updateData(newData)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Work Experience</h3>
        <Button onClick={addExperience} size="sm" variant="outline" className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Experience
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No work experience added yet. Click the button above to add your first position.
        </div>
      ) : (
        <Accordion
          type="single"
          collapsible
          value={expanded || undefined}
          onValueChange={(value) => setExpanded(value)}
        >
          {data.map((experience, index) => (
            <AccordionItem key={experience.id} value={experience.id} className="border rounded-lg mb-4 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">
                    {experience.position ? experience.position : `Experience ${index + 1}`}
                    {experience.company ? ` at ${experience.company}` : ""}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => removeExperience(experience.id)}
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
                    <Label htmlFor={`company-${experience.id}`}>Company</Label>
                    <Input
                      id={`company-${experience.id}`}
                      value={experience.company}
                      onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                      placeholder="Company Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`position-${experience.id}`}>Position</Label>
                    <Input
                      id={`position-${experience.id}`}
                      value={experience.position}
                      onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                      placeholder="Job Title"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                    <Input
                      id={`startDate-${experience.id}`}
                      value={experience.startDate}
                      onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                      placeholder="MM/YYYY"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                    <div className="flex flex-col gap-2">
                      <Input
                        id={`endDate-${experience.id}`}
                        value={experience.endDate}
                        onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                        placeholder="MM/YYYY"
                        disabled={experience.current}
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`current-${experience.id}`}
                          checked={experience.current}
                          onCheckedChange={(checked) => {
                            updateExperience(experience.id, "current", checked === true)
                          }}
                        />
                        <label
                          htmlFor={`current-${experience.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I currently work here
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor={`location-${experience.id}`}>Location (Optional)</Label>
                  <Input
                    id={`location-${experience.id}`}
                    value={experience.location || ""}
                    onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                    placeholder="City, State"
                  />
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor={`description-${experience.id}`}>Description</Label>
                  <Textarea
                    id={`description-${experience.id}`}
                    value={experience.description}
                    onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Tip: Use bullet points by starting lines with • or - for better readability
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}
