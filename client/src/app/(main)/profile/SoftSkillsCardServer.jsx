import SoftSkillsCardClient from './SoftSkillsCardClient';

export default async function SoftSkillsCardServer() {
  const response = await fetch('http://localhost:3000/empleado.json');
  const data = await response.json();

  const EMPLEADO_ID = 1;

  const habilidadesBlandas = data.habilidades.filter(h => h.tipo === 'Blanda');
  const habilidadesEmpleado = data.empleado_habilidades
    .filter(eh => eh.id_empleado === EMPLEADO_ID)
    .map(eh => eh.id_habilidad);

  const selectedSoftSkills = habilidadesBlandas
    .filter(h => habilidadesEmpleado.includes(h.id_habilidad))
    .map(h => h.nombre);

  const allSoftSkills = habilidadesBlandas.map(h => h.nombre);

  return (
    <SoftSkillsCardClient
      allSkills={allSoftSkills}
      initialSelected={selectedSoftSkills}
    />
  );
}
