"use client"

import { useState } from "react"
import { CVForm } from "@/components/cv-form"
import { CVPreview } from "@/components/cv-preview"
import type { CVData } from "@/types/cv"
import { Button } from "@/components/ui/button"
import { pdf } from '@react-pdf/renderer'
import { CVDocument } from "@/components/cv-document"

export default function Page() {
  const [cvData, setCvData] = useState<CVData | null>(null)
  const [view, setView] = useState<"form" | "preview">("form")

  const handleSubmit = (data: CVData) => {
    setCvData(data)
    setView("preview")
  }

  const handleExportPDF = async () => {
    if (!cvData) return;
    const blob = await pdf(<CVDocument data={cvData} />).toBlob()
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }

  async function importJson() {
    try {
      // Mostrar el diálogo para elegir un archivo JSON
      const [fileHandle] = await (window as any).showOpenFilePicker({
        types: [
          {
            description: "Archivos JSON",
            accept: { "application/json": [".json"] },
          },
        ],
        multiple: false,
      });

      // Obtener el archivo
      const file = await fileHandle.getFile();
      // Leer el contenido como texto
      const text = await file.text();
      // Convertir a objeto CVData
      const data: CVData = JSON.parse(text);

      // Guardar en tu estado
      setCvData(data);
      setView("preview");

      alert("✅ CV importado correctamente");
    } catch (err) {
      console.error("Error al importar JSON:", err);
      alert("❌ No se pudo importar el archivo");
    }
  }

  async function exportJson() {
    const filename = "data.json";
    try {
      // Convertir el objeto a JSON
      const jsonString = JSON.stringify(cvData, null, 2); // null, 2 para que sea legible

      // Crear un blob con el contenido JSON
      const blob = new Blob([jsonString], { type: "application/json" });

      // Crear un enlace temporal para descargar el archivo
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;

      // Disparar la descarga
      document.body.appendChild(link);
      link.click();

      // Limpiar
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      console.log("Archivo JSON exportado con éxito");
    } catch (error) {
      console.error("Error exportando JSON:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Generador de CV Harvard</h1>
        
        {view === "form" ? (
          <div>
            <div className="flex justify-center gap-4 print:hidden">
              <Button onClick={importJson}>Importar Json</Button>
            </div>
            <CVForm onSubmit={handleSubmit} initialData={cvData || undefined} />
          </div>
        ) : cvData ? (
          <div className="space-y-4">
            <div className="flex justify-end gap-4 print:hidden">
              <Button variant="outline" onClick={exportJson}>
                Exportar Json
              </Button>
              <Button variant="outline" onClick={() => setView("form")}>
                Editar
              </Button>
              <Button onClick={handleExportPDF}>
                Exportar PDF
              </Button>
            </div>
            <CVPreview data={cvData} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

