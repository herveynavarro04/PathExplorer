
export async function getRecommendedProjects() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return [
    {
      project_name: "Pagina web",
      client: "BIMBO",
      id_project_manager: "Gerardo Perez",
    
    },
    {
      project_name: "Sistema de gestion",
      client: "Coca-Cola",
      id_project_manager: "Alberto Garcia",
    },
    {
      project_name: "Plataforma de cursos",
      client: "Pepsi",
      id_project_manager: "Maria Lopez",
    },
    {
      project_name: "Aplicacion movil",
      client: "Nestle",
      id_project_manager: "Juan Perez",
    },
  
  ];
}
