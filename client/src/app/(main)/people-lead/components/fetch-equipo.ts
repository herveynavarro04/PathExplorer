export async function getEquipo() {
    return [
      {
        name: "Luis Pérez",
        role: "Diseñador UI",
        cargability: "95%",
        level: "10",
        courses: [
          { name: "Diseño de Interfaces", date: "2023-02-10", duration: "30 semanas", description: "Curso de diseño de interfaces modernas", institution: "Platzi", url: "https://platzi.com/ui-design" },
          { name: "UX Avanzado", date: "2022-11-20", duration: "25 semanas", description: "Curso de experiencia de usuario", institution: "Domestika", url: "https://domestika.org/ux" },
          { name: "Photoshop Creativo", date: "2023-05-01", duration: "20 semanas", description: "Edición avanzada en Photoshop", institution: "Crehana", url: "https://crehana.com/photoshop" }
        ],
        certificates: [
          { name: "Scrum Fundamentals", date: "2023-01-15", description: "Certificación de metodologías ágiles"},
          { name: "Diseño Accesible", date: "2022-09-05", description: "Certificado en accesibilidad digital"},
          { name: "Figma Pro", date: "2023-03-22", description: "Dominio de Figma para prototipado"}
        ],
        goals: [
          { description: "Dominar Figma colaborativo" },
          { description: "Crear una librería de componentes" },
          { description: "Capacitar a 2 compañeros en UX" }
        ]
      },
      {
        name: "Paula Ortíz",
        role: "Diseñadora UX",
        cargability: "92%",
        level: "9",
        courses: [
          { name: "Research para UX", date: "2023-01-15", duration: "8 semanas", description: "Investigación cualitativa y cuantitativa", institution: "Coursera", url: "https://www.coursera.org/research-ux" },
          { name: "Design Thinking", date: "2023-04-10", duration: "12 semanas", description: "Solución de problemas creativos", institution: "IDEO", url: "https://www.ideo.com" },
          { name: "Mapa de Empatía", date: "2022-12-01", duration: "6 semanas", description: "Profundización en herramientas de empatía", institution: "Domestika", url: "https://domestika.org/empathy" }
        ],
        certificates: [
          { name: "Google UX Design", date: "2022-08-20", description: "Certificado por Google"},
          { name: "UX Writing", date: "2023-02-14", duration: "10 semanas", description: "Escritura enfocada al usuario"},
          { name: "Investigación UX", date: "2023-01-10", duration: "14 semanas", description: "Investigación en campo"}
        ],
        goals: [
          { description: "Rediseñar el flujo de onboarding" },
          { description: "Implementar pruebas de usabilidad mensuales" },
          { description: "Aumentar satisfacción del usuario a 90%" }
        ]
      },
      {
        name: "Carlos Méndez",
        role: "Full Stack Developer",
        cargability: "88%",
        level: "8",
        courses: [
          { name: "Node.js Avanzado", date: "2023-02-15", duration: "10 semanas", description: "Desarrollo de APIs con Express", institution: "Udemy", url: "https://udemy.com/node-avanzado" },
          { name: "React y TypeScript", date: "2023-01-25", duration: "12 semanas", description: "Apps modernas con tipado fuerte", institution: "Platzi", url: "https://platzi.com/react-ts" },
          { name: "Arquitectura Limpia", date: "2023-03-01", duration: "8 semanas", description: "Patrones de arquitectura para escalar", institution: "Alura", url: "https://alura.com/arquitectura" }
        ],
        certificates: [
          { name: "AWS Cloud Practitioner", date: "2023-02-01", description: "Fundamentos de servicios en la nube"},
          { name: "Clean Code", date: "2023-04-11", description: "Buenas prácticas de programación"},
          { name: "MongoDB Developer", date: "2023-03-15", description: "Gestión avanzada de bases de datos"}
        ],
        goals: [
          { description: "Automatizar pruebas unitarias en backend" },
          { description: "Migrar sistema legacy a microservicios" },
          { description: "Conseguir certificación avanzada en AWS" }
        ]
      }
    ];
  }
  