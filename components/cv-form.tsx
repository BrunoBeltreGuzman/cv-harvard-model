"use client"

import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CVData, cvSchema } from "../types/cv"

export function CVForm({ onSubmit, initialData }: { onSubmit: (data: CVData) => void; initialData?: CVData }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CVData>({
    resolver: zodResolver(cvSchema),
    defaultValues: initialData || {
      personalInfo: {
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
      },
      profile: "",
      education: [{ institution: "", degree: "", startDate: "", endDate: "" }],
      experience: [{ company: "", position: "", startDate: "", endDate: "", isCurrent: false, description: "" }],
      skills: [{ category: "", items: [""] }],
      languages: [{ language: "", level: "" }],
    },
  });

  const { fields: educationFields, append: appendEducation } = useFieldArray({
    control,
    name: "education",
  })

  const { fields: experienceFields, append: appendExperience } = useFieldArray({
    control,
    name: "experience",
  })

  const { fields: skillFields, append: appendSkill } = useFieldArray({
    control,
    name: "skills",
  })

  const { fields: languageFields, append: appendLanguage } = useFieldArray({
    control,
    name: "languages",
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Controller
            name="personalInfo.name"
            control={control}
            render={({ field }) => (
              <div>
                <Input placeholder="Nombre completo" {...field} />
                {errors.personalInfo?.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.personalInfo.name.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="personalInfo.title"
            control={control}
            render={({ field }) => (
              <div>
                <Input placeholder="Título profesional" {...field} />
                {errors.personalInfo?.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.personalInfo.title.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="personalInfo.email"
            control={control}
            render={({ field }) => (
              <div>
                <Input placeholder="Email" type="email" {...field} />
                {errors.personalInfo?.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.personalInfo.email.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="personalInfo.phone"
            control={control}
            render={({ field }) => (
              <div>
                <Input placeholder="Teléfono" {...field} />
                {errors.personalInfo?.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.personalInfo.phone.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="personalInfo.location"
            control={control}
            render={({ field }) => (
              <div>
                <Input placeholder="Ubicación" {...field} />
                {errors.personalInfo?.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.personalInfo.location.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="personalInfo.linkedin"
            control={control}
            render={({ field }) => (
              <div>
                <Input placeholder="LinkedIn URL" {...field} />
                {errors.personalInfo?.linkedin && (
                  <p className="text-red-500 text-sm mt-1">{errors.personalInfo.linkedin.message}</p>
                )}
              </div>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Perfil Profesional</CardTitle>
        </CardHeader>
        <CardContent>
          <Controller
            name="profile"
            control={control}
            render={({ field }) => (
              <div>
                <Textarea placeholder="Describe tu perfil profesional" {...field} />
                {errors.profile && <p className="text-red-500 text-sm mt-1">{errors.profile.message}</p>}
              </div>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Educación</CardTitle>
          <Button type="button" onClick={() => appendEducation({ institution: "", degree: "", startDate: "", endDate: "" })} variant="outline">
            Añadir Educación
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {educationFields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <Controller
                name={`education.${index}.institution`}
                control={control}
                render={({ field }) => (
                  <div>
                    <Input placeholder="Institución" {...field} />
                    {errors.education?.[index]?.institution && (
                      <p className="text-red-500 text-sm mt-1">{errors.education[index]?.institution?.message}</p>
                    )}
                  </div>
                )}
              />
              <Controller
                name={`education.${index}.degree`}
                control={control}
                render={({ field }) => (
                  <div>
                    <Input placeholder="Título" {...field} />
                    {errors.education?.[index]?.degree && (
                      <p className="text-red-500 text-sm mt-1">{errors.education[index]?.degree?.message}</p>
                    )}
                  </div>
                )}
              />
              <div className="grid grid-cols-2 gap-2">
                <Controller
                  name={`education.${index}.startDate`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Input placeholder="Fecha inicio" type="date" {...field} />
                      {errors.education?.[index]?.startDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.education[index]?.startDate?.message}</p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name={`education.${index}.endDate`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Input placeholder="Fecha fin" type="date" {...field} />
                      {errors.education?.[index]?.endDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.education[index]?.endDate?.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Experiencia Profesional</CardTitle>
          <Button
            type="button"
            onClick={() => appendExperience({ company: "", position: "", startDate: "", endDate: "", isCurrent: false, description: "" })}
            variant="outline"
          >
            Añadir Experiencia
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {experienceFields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <Controller
                name={`experience.${index}.company`}
                control={control}
                render={({ field }) => (
                  <div>
                    <Input placeholder="Empresa" {...field} />
                    {errors.experience?.[index]?.company && (
                      <p className="text-red-500 text-sm mt-1">{errors.experience[index]?.company?.message}</p>
                    )}
                  </div>
                )}
              />
              <Controller
                name={`experience.${index}.position`}
                control={control}
                render={({ field }) => (
                  <div>
                    <Input placeholder="Cargo" {...field} />
                    {errors.experience?.[index]?.position && (
                      <p className="text-red-500 text-sm mt-1">{errors.experience[index]?.position?.message}</p>
                    )}
                  </div>
                )}
              />
              <div className="grid grid-cols-2 gap-2">
                <Controller
                  name={`experience.${index}.startDate`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Input placeholder="Fecha inicio" type="date" {...field} />
                      {errors.experience?.[index]?.startDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.experience[index]?.startDate?.message}</p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name={`experience.${index}.endDate`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Input
                        placeholder="Fecha fin"
                        type="date"
                        {...field}
                        disabled={watch(`experience.${index}.isCurrent`)}
                      />
                      {errors.experience?.[index]?.endDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.experience[index]?.endDate?.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
              <Controller
                name={`experience.${index}.isCurrent`}
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`isCurrent-${index}`}
                      {...field}
                      checked={field.value}
                      value={control._formValues.experience[index].isCurrent} // Agrega esta línea
                      onChange={(e) => {
                        field.onChange(e.target.checked); // Actualiza el valor del checkbox
                        // Si se marca como trabajo actual, limpiar el campo endDate
                        if (e.target.checked) {
                          setValue(`experience.${index}.endDate`, ""); // Limpia el campo endDate
                        }
                      }}
                    />
                    <label htmlFor={`isCurrent-${index}`} className="text-sm">
                      Trabajo actual
                    </label>
                  </div>
                )}
              />
              <Controller
                name={`experience.${index}.description`}
                control={control}
                render={({ field }) => (
                  <div>
                    <Textarea placeholder="Descripción de responsabilidades" {...field} />
                    {errors.experience?.[index]?.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.experience[index]?.description?.message}</p>
                    )}
                  </div>
                )}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Habilidades</CardTitle>
          <Button type="button" onClick={() => appendSkill({ category: "", items: [""] })} variant="outline">
            Añadir Categoría
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {skillFields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <Controller
                name={`skills.${index}.category`}
                control={control}
                render={({ field }) => (
                  <div>
                    <Input placeholder="Categoría de habilidad" {...field} />
                    {errors.skills?.[index]?.category && (
                      <p className="text-red-500 text-sm mt-1">{errors.skills[index]?.category?.message}</p>
                    )}
                  </div>
                )}
              />
              <Controller
                name={`skills.${index}.items`}
                control={control}
                render={({ field }) => (
                  <div>
                    <Input placeholder="Habilidades (separadas por comas)" {...field} onChange={(e) => field.onChange(e.target.value.split(','))} />
                    {errors.skills?.[index]?.items && (
                      <p className="text-red-500 text-sm mt-1">{errors.skills[index]?.items?.message}</p>
                    )}
                  </div>
                )}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Idiomas</CardTitle>
          <Button type="button" onClick={() => appendLanguage({ language: "", level: "" })} variant="outline">
            Añadir Idioma
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {languageFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-2">
              <Controller
                name={`languages.${index}.language`}
                control={control}
                render={({ field }) => (
                  <div>
                    <Input placeholder="Idioma" {...field} />
                    {errors.languages?.[index]?.language && (
                      <p className="text-red-500 text-sm mt-1">{errors.languages[index]?.language?.message}</p>
                    )}
                  </div>
                )}
              />
              <Controller
                name={`languages.${index}.level`}
                control={control}
                render={({ field }) => (
                  <div>
                    <Input placeholder="Nivel" {...field} />
                    {errors.languages?.[index]?.level && (
                      <p className="text-red-500 text-sm mt-1">{errors.languages[index]?.level?.message}</p>
                    )}
                  </div>
                )}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        Generar CV
      </Button>
    </form>
  )
}

