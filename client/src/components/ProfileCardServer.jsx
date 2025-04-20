import ProfileCardClient from './ProfileCardClient';

const ProfileCardServer = async () => {
  const profile = {
    name: 'Sergio Tomás Vargas Villarreal',
    role: 'Desarrollador de React',
    email: 'sergio.vargas@accenture.mx',
    image: '/profile.png',
  };

  return <ProfileCardClient profile={profile} />;
};

export default ProfileCardServer;
