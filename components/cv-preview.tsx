import type { CVData } from "../types/cv"

export function CVPreview({ data }: { data: CVData }) {
  return (
    <div className="max-w-[21cm] mx-auto bg-white p-8 shadow-lg">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">{data.personalInfo.name}</h1>
        <p className="text-lg text-gray-600 mb-4">{data.personalInfo.title}</p>
        <div className="flex justify-center gap-4 text-sm text-gray-600">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
          {data.personalInfo.linkedin && (
            <>
              <span>•</span>
              <a href={data.personalInfo.linkedin} className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            </>
          )}
        </div>
      </div>

      {/* Profile Section */}
      {data.profile && (
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-4">PERFIL PROFESIONAL</h2>
          <p className="text-gray-700">{data.profile}</p>
        </section>
      )}

      {/* Experience Section */}
      <section className="mb-8">
        <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-4">EXPERIENCIA PROFESIONAL</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{exp.company}</h3>
                <p className="text-gray-600">{exp.position}</p>
              </div>
              <p className="text-gray-600 text-sm">
                {new Date(exp.startDate).toLocaleDateString("es-ES", { year: "numeric", month: "long" })} -{" "}
                {exp.isCurrent ? "Actualidad" : new Date(exp.endDate!).toLocaleDateString("es-ES", { year: "numeric", month: "long" })}
              </p>
            </div>
            <p className="text-gray-700 mt-2">{exp.description}</p>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section className="mb-8">
        <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-4">EDUCACIÓN</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{edu.institution}</h3>
                <p className="text-gray-600">{edu.degree}</p>
              </div>
              <p className="text-gray-600 text-sm">
                {new Date(edu.startDate).toLocaleDateString("es-ES", { year: "numeric", month: "long" })} -{" "}
                {new Date(edu.endDate).toLocaleDateString("es-ES", { year: "numeric", month: "long" })}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-4">HABILIDADES</h2>
          {data.skills.map((skillGroup, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold">{skillGroup.category}</h3>
              <p className="text-gray-700">{skillGroup.items.join(", ")}</p>
            </div>
          ))}
        </section>
      )}

      {/* Languages Section */}
      {data.languages.length > 0 && (
        <section>
          <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-4">IDIOMAS</h2>
          {data.languages.map((lang, index) => (
            <div key={index} className="mb-2">
              <span className="font-bold">{lang.language}:</span> {lang.level}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

