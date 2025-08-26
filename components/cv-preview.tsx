import type { CVData } from "../types/cv"
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export function CVPreview({ data }: { data: CVData }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    // Crear la fecha usando UTC para evitar problemas de zona horaria
    const [year, month] = dateString.split('-');
    const date = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, 1));
    
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long',
      timeZone: 'UTC' // Forzar UTC
    }).replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <>
      <div className="min-h-screen bg-white p-8 font-['Times_New_Roman']">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold uppercase">{data.personalInfo.name}, {data.personalInfo.title}</h1>
            <p className="text-gray-600">
              {data.personalInfo.location}, {data.personalInfo.phone}, {data.personalInfo.email}
            </p>
          </div>

          {/* Links */}
          <section className="mb-8">
            <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-4">LINKS</h2>
            <p className="text-gray-600">
              <a href={data.personalInfo.linkedin} target="_blank" className="text-blue-600 hover:underline">LinkedIn</a>
              {data.personalInfo.github && (
                <>
                  {" • "}
                  <a href={data.personalInfo.github} target="_blank" className="text-blue-600 hover:underline">Github</a>
                </>
              )}
              {data.personalInfo.website && (
                <>
                  {" • "}
                  <a href={data.personalInfo.website} target="_blank" className="text-blue-600 hover:underline">Sitio Web</a>
                </>
              )}
              {data.personalInfo.phone && (
                <>
                  {" • "}
                  <a href={"https://api.whatsapp.com/send?phone=" + data.personalInfo.phone} target="_blank" className="text-blue-600 hover:underline">WhatsApp</a>
                </>
              )}
              {data.personalInfo.email && (
                <>
                  {" • "}
                  <a href={"mailto:" + data.personalInfo.email} target="_blank" className="text-blue-600 hover:underline">Enviar Correo</a>
                </>
              )}
            </p>
          </section>

          {/* Profile */}
          <section className="mb-8">
            <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-4">PERFIL PROFESIONAL</h2>
            <p className="text-gray-700 leading-relaxed">{data.profile}</p>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-4">EXPERIENCIA LABORAL</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6 flex gap-6">
                <div className="w-1/4">
                  <p className="text-gray-600 text-sm">
                    {formatDate(exp.startDate)} — {exp.isCurrent ? "Presente" : formatDate(exp.endDate || "")}
                  </p>
                  <p className="text-gray-600 text-sm">{exp.location ? exp.location : ""}</p>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-2">{exp.position}, {exp.company}</h3>
                  <ul className="list-disc pl-4 space-y-1">
                    {exp.description.split('\n').map((point, i) => (
                      <li key={i} className="text-gray-700">{point.trim()}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          {/* Education */}
          <section className="mb-8">
            <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-4">FORMACIÓN</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4 flex gap-6">
                <div className="w-1/4">
                  <p className="text-gray-600 text-sm">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </p>
                  <p className="text-gray-600 text-sm">{edu.location}</p>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{edu.institution}</h3>
                  <p className="text-gray-700">{edu.degree}</p>
                  {edu.description && (
                    <p className="text-gray-600 text-sm mt-1">{edu.description}</p>
                  )}
                </div>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-4">COMPETENCIAS</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.skills.map((skill, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-bold">{skill.category}</h3>
                  <p className="text-gray-700">{skill.items.join(", ")}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Complementary */}
          <section className="mb-8">
            <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-4">COMPLEMENTARIOS</h2>
            {data.complementary.map((item, index) => (
              <div key={index} className="mb-4 flex gap-6">
                <div className="w-1/4">
                  <p className="text-gray-600 text-sm">
                    {formatDate(item.startDate)}
                    {item.isCurrent
                      ? " - Presente"
                      : item.endDate
                        ? ` - ${formatDate(item.endDate)}`
                        : ""
                    }
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-gray-700">{item.institution}</p>
                  <p className="text-gray-600 italic">{item.type}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Languages */}
          <section>
            <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-4">IDIOMAS</h2>
            {data.languages.map((lang, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span className="font-bold">{lang.language}</span>
                <span className="text-gray-700">{lang.level}</span>
              </div>
            ))}
          </section>
        </div>
      </div>

      <Button
        variant="secondary"
        size="icon"
        className="fixed bottom-20 right-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 print:hidden"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </>
  );
}

