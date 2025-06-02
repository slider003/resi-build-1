"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Plus, Trash2 } from "lucide-react"
import type { ResumeData } from "@/app/page"

interface SkillsFormProps {
  data: ResumeData["skills"]
  updateData: (data: ResumeData["skills"]) => void
}

export function SkillsForm({ data, updateData }: SkillsFormProps) {
  const addSkill = () => {
    const newSkill = {
      id: `skill-${Date.now()}`,
      name: "",
      level: 3,
    }

    const newData = [...data, newSkill]
    updateData(newData)
  }

  const removeSkill = (id: string) => {
    const newData = data.filter((skill) => skill.id !== id)
    updateData(newData)
  }

  const updateSkill = (id: string, field: string, value: string | number) => {
    const newData = data.map((skill) => {
      if (skill.id === id) {
        return { ...skill, [field]: value }
      }
      return skill
    })
    updateData(newData)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Skills</h3>
        <Button onClick={addSkill} size="sm" variant="outline" className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Skill
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No skills added yet. Click the button above to add your skills.
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((skill) => (
            <div key={skill.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="flex-1">
                <div className="space-y-2">
                  <Label htmlFor={`skill-${skill.id}`}>Skill Name</Label>
                  <Input
                    id={`skill-${skill.id}`}
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                    placeholder="e.g., JavaScript, Project Management, Photoshop"
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor={`level-${skill.id}`}>Proficiency Level</Label>
                    <span className="text-sm text-muted-foreground">
                      {skill.level === 1 && "Beginner"}
                      {skill.level === 2 && "Elementary"}
                      {skill.level === 3 && "Intermediate"}
                      {skill.level === 4 && "Advanced"}
                      {skill.level === 5 && "Expert"}
                    </span>
                  </div>
                  <Slider
                    id={`level-${skill.id}`}
                    min={1}
                    max={5}
                    step={1}
                    value={[skill.level]}
                    onValueChange={(value) => updateSkill(skill.id, "level", value[0])}
                  />
                </div>
              </div>

              <Button
                onClick={() => removeSkill(skill.id)}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 flex-shrink-0"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
