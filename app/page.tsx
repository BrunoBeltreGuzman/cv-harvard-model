"use client"

import { useState } from "react"
import { CVForm } from "@/components/cv-form"
import { CVPreview } from "@/components/cv-preview"
import type { CVData } from "@/types/cv"
import { Button } from "@/components/ui/button"

export default function Page() {
  const [cvData, setCvData] = useState<CVData | null>(null)
  const [view, setView] = useState<"form" | "preview">("form")

  const handleSubmit = (data: CVData) => {
    setCvData(data)
    setView("preview")
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Generador de CV Harvard</h1>
        
        {view === "form" ? (
          <CVForm onSubmit={handleSubmit} initialData={cvData || undefined} />
        ) : cvData ? (
          <div className="space-y-4">
            <div className="flex justify-end gap-4 print:hidden">
              <Button variant="outline" onClick={() => setView("form")}>
                Editar
              </Button>
              <Button onClick={handlePrint}>
                Imprimir / Guardar PDF
              </Button>
            </div>
            <CVPreview data={cvData} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

