import TechSkillsCardClient from './TechSkillsCardClient';

export default async function TechSkillsCardServer() {
  const response = await fetch('http://localhost:3000/empleado.json');
  const data = await response.json();

  const EMPLEADO_ID = 1;

  const habilidadesTecnicas = data.habilidades.filter(h => h.tipo === 'Técnica');
  const habilidadesEmpleado = data.empleado_habilidades
    .filter(eh => eh.id_empleado === EMPLEADO_ID)
    .map(eh => eh.id_habilidad);

  const selectedTechSkills = habilidadesTecnicas
    .filter(h => habilidadesEmpleado.includes(h.id_habilidad))
    .map(h => h.nombre);

  const allTechSkills = habilidadesTecnicas.map(h => h.nombre);

  return (
    <TechSkillsCardClient
      allSkills={allTechSkills}
      initialSelected={selectedTechSkills}
    />
  );
}
