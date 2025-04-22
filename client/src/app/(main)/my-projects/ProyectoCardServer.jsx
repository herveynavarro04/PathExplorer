import ProyectoCardClient from "./ProyectoCardClient";

export default async function ProyectoCardServer({ idEmpleado }) {
  const res = await fetch('http://localhost:3000/empleado.json');
  const data = await res.json();

  const proyectosEmpleado = data.empleado_proyecto
    .filter((ep) => ep.id_empleado === idEmpleado)
    .map((ep) => {
      const proyecto = data.proyectos.find(
        (p) => p.id_proyecto === ep.id_proyecto
      );

      if (!proyecto) return null;

      const tecnologias = data.proyecto_tecnologias
        .filter((pt) => pt.id_proyecto === proyecto.id_proyecto)
        .map((pt) => {
          const tecnologia = data.tecnologias.find(
            (t) => t.id_tecnología === pt.id_tecnología
          );
          return tecnologia?.nombre;
        })
        .filter(Boolean);

      const puesto = ep.puesto || 'Sin puesto';

      
      const pm = data.project_managers?.find(
        (pm) => pm.id_project_manager === proyecto.id_project_manager
      );
      

      return {
        id: proyecto.id_proyecto,
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        fecha_inicio: proyecto.fecha_inicio,
        fecha_fin: proyecto.fecha_fin,
        vigente: proyecto.vigente,
        duracion: proyecto.duración,
        tipo: proyecto.tipo,
        tecnologias,
        administrador:pm,
        puesto,
      };
    })
    .filter(Boolean);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {proyectosEmpleado.map((proyecto) => (
        <ProyectoCardClient key={proyecto.id} proyecto={proyecto} />
      ))}
    </div>
  );
}
