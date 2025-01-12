import { z } from "zod"

export const cvSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, "El nombre es requerido"),
    title: z.string().min(1, "El título profesional es requerido"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(1, "El teléfono es requerido"),
    location: z.string().optional(),
    linkedin: z.string().url("URL de LinkedIn inválida").optional().or(z.literal("")),
  }),
  profile: z.string().min(1, "El perfil profesional es requerido"),
  education: z.array(z.object({
    institution: z.string().min(1, "La institución es requerida"),
    degree: z.string().min(1, "El título es requerido"),
    startDate: z.string().min(1, "La fecha de inicio es requerida"),
    endDate: z.string().min(1, "La fecha de fin es requerida"),
  })).min(1, "Al menos una entrada de educación es requerida"),
  experience: z.array(z.object({
    company: z.string().min(1, "La empresa es requerida"),
    position: z.string().min(1, "El cargo es requerido"),
    startDate: z.string().min(1, "La fecha de inicio es requerida"),
    endDate: z.string().min(1, "La fecha de fin es requerida").optional(),
    isCurrent: z.boolean().optional(),
    description: z.string().min(1, "La descripción es requerida"),
  })).min(1, "Al menos una experiencia laboral es requerida"),
  skills: z.array(z.object({
    category: z.string().min(1, "La categoría es requerida"),
    items: z.array(z.string().min(1, "La habilidad es requerida")).min(1, "Al menos una habilidad es requerida"),
  })),
  languages: z.array(z.object({
    language: z.string().min(1, "El idioma es requerido"),
    level: z.string().min(1, "El nivel es requerido"),
  })),
})

export type CVData = z.infer<typeof cvSchema>

