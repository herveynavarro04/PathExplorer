
export async function getProjects() {

    return [
    {
        id: "1",
        name: "Bimbo Webpage",
        client: "Bimbo",
        description: "Página web para la empresa Bimbo que ayude a administrar a los empleados.",
        start_date: "18/09/2025",
        end_date: "18/04/2025",
        stack: ["PostgreSQL", "Next.js", "Node.js"],
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
    }

    ];
}
