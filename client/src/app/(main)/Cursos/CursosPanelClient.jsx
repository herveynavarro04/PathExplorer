"use client";

import { useState } from 'react';
import CursosCard from './CursosCard';
import AgregarCursoCard from './AgregarCursoCard';

export default function CursosPanelClient({ initialCursos }) {
    const [cursos, setCursos] = useState(initialCursos);

    const handleAgregarCurso = (nuevo) => {
        setCursos(prev => [...prev, { ...nuevo, id: Date.now() }]);
    };

    return (
        <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {cursos.map(c => (
                    <CursosCard key={c.id} {...c} />
                ))}
                <AgregarCursoCard onAddCurso={handleAgregarCurso} />
            </div>
        </div>
    );
}