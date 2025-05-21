
export async function getProjects() {

    return [
    {
        id: "1",
        name: "Bimbo Webpage",
        client: "Bimbo",
        description: "Página web para la empresa Bimbo que ayude a administrar a los empleados.",
        start_date: "18/09/2025",
        end_date: "18/04/2025",
        stack: ["PostgreSQL", "Next.js", "Node.js","PostgreSQL", "Next.js"],
        progress: 25,
        team: [
            {name: "Luis Pérez", role: "Diseñdor UI", cargability: "100%"},
            {name: "Ana Garza", role: "Diseñdor UX", cargability: "93%"},
            {name: "Diego García", role: "Front-end", cargability: "96%"},
            {name: "Paula Ortíz", role: "Back-end", cargability: "94%"},
            {name: "Paula Ortíz", role: "Back-end", cargability: "94%"},
            {name: "Paula Ortíz", role: "Back-end", cargability: "94%"},
            {name: "Paula Ortíz", role: "Back-end", cargability: "94%"},
            {name: "Paula Ortíz", role: "Back-end", cargability: "94%"},
            {name: "Paula Ortíz", role: "Back-end", cargability: "94%"},
            {name: "Paula Ortíz", role: "Back-end", cargability: "94%"},
            {name: "Paula Ortíz", role: "Back-end", cargability: "94%"},
            {name: "Paula Ortíz", role: "Back-end", cargability: "94%"},
            {name: "Paula Ortíz", role: "Back-end", cargability: "94%"},
        ]
    },
    {
        id: "2",
        name: "PathExplorer",
        client: "Accenture",
        description: "Página web para gestión y administración de empleados.",
        start_date: "10/02/2025",
        end_date: "13/06/2025",
        stack: ["PostgreSQL", "Next.js", "Node.js"],
        progress: 80,
        team: [
            {name: "Sofia Schneider Jiménez", role: "Front-end", cargability: "100%"},
            {name: "Sergio Tomás Vargas Villarreal", role: "Full-stack", cargability: "100%"},
            {name: "Hervey Navarro Olazarán", role: "Back-end", cargability: "100%"},
            {name: "Mauricio Lozano Zárate", role: "Front-end", cargability: "100%"},
            {name: "Katia Martín del Campo Valdés", role: "Front-end", cargability: "100%"},
        ]
    },
    {
        id: "3",
        name: "EcoTrack Dashboard",
        client: "CEMEX",
        description: "Dashboard para monitorear en tiempo real el consumo energético y emisiones de CO₂ en plantas.",
        start_date: "05/01/2025",
        end_date: "20/06/2025",
        stack: ["React", "Flask", "MongoDB"],
        progress: 60,
        team: [
          { name: "Laura Ramírez", role: "Data Scientist", cargability: "85%" },
          { name: "Marco Sánchez", role: "Back-end", cargability: "100%" },
          { name: "Daniela Torres", role: "Front-end", cargability: "90%" }
        ]
      },
      {
        id: "4",
        name: "TalentConnect",
        client: "Heineken",
        description: "Plataforma para conectar talento interno con oportunidades de crecimiento profesional.",
        start_date: "01/03/2025",
        end_date: "30/09/2025",
        stack: ["Next.js", "NestJS", "PostgreSQL"],
        progress: 35,
        team: [
          { name: "Alonso Rivera", role: "Back-end", cargability: "100%" },
          { name: "Camila Rodríguez", role: "Front-end", cargability: "95%" },
          { name: "Juan Pablo Ruiz", role: "Diseñador UX", cargability: "88%" }
        ]
      },
      {
        id: "5",
        name: "SmartLogix",
        client: "Logitech",
        description: "Sistema para rastreo inteligente de pedidos y optimización de entregas globales.",
        start_date: "15/02/2025",
        end_date: "15/08/2025",
        stack: ["Vue.js", "Spring Boot", "MySQL"],
        progress: 72,
        team: [
          { name: "Valeria Mendoza", role: "Full-stack", cargability: "100%" },
          { name: "Esteban Herrera", role: "Back-end", cargability: "100%" },
          { name: "Mariana Ríos", role: "Diseñadora UI", cargability: "90%" }
        ]
      },
      {
        id: "6",
        name: "HealthBridge App",
        client: "TecSalud",
        description: "Aplicación móvil para seguimiento remoto de pacientes y consultas en línea.",
        start_date: "20/04/2025",
        end_date: "20/10/2025",
        stack: ["React Native", "Django", "PostgreSQL"],
        progress: 50,
        team: [
          { name: "Iván Soto", role: "Mobile Developer", cargability: "100%" },
          { name: "Natalia Gómez", role: "Back-end", cargability: "95%" },
          { name: "Fernanda Leal", role: "UX Researcher", cargability: "85%" }
        ]
      }
    ];
}
