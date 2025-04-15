"use client";
import React, { useState } from "react";
import CertCard from "@/components/CertCard";
import AgregarCertCard from "@/components/AgregarCertCard";

export default function Page() {
  const [certs, setCerts] = useState([
    {
      id: 1,
      title: "Introducción a Python",
      description: "Principios básicos del lenguaje de programación, Python.",
      fecha: "05/03/2022",
      url: "https://www.coursera.org/learn/python"
    }
  ]);

  const handleAgregarCerts = (nuevoCerts) => {
    setCerts([...certs, { ...nuevoCerts, id: Date.now() }]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block w-64 p-4">
          {/* ... */}
        </div>

        {/* Contenido principal */}
        <div className="flex-1">
          {/* Header */}
          <div className="h-16 border-b border-purple-700 flex items-center px-4">
            {/* ... */}
          </div>

          {/* Contenido de la página */}
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Certificados</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {certs.map((certs) => (
                <CertCard
                  key={certs.id}
                  title={certs.title}
                  description={certs.description}
                  fecha={certs.fecha}
                  url={certs.url}
                />
              ))}

              <AgregarCertCard onAddCerts={handleAgregarCerts} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
