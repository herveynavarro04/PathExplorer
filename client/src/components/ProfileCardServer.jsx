import ProfileCardClient from './ProfileCardClient';

const ProfileCardServer = async () => {
  const response = await fetch('http://localhost:3000/empleado.json');
  const data = await response.json();

  const empleado = data.empleados.find((emp) => emp.id_empleado === 1);
  const puesto = data.empleado_proyecto.find(
    (ep) => ep.id_empleado === 1
  )?.puesto;

   const profile = {
    nombre: empleado?.nombre || 'N/A',
    url_foto: empleado?.url_foto || 'N/A',
    correo: empleado?.correo || 'N/A',
    puesto: puesto || 'N/A', 
  };

  return <ProfileCardClient profile={profile} />;
};

export default ProfileCardServer;
