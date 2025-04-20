
import ProfileCardServer from '@components/ProfileCardServer';
import TechSkillsCard from '@components/TechSkillsCard';
import SoftSkillsCard from '@components/SoftSkillsCard';
import ChargeabilityCard from '@components/ChargeabilityCard';

export default function ProfilePage() {
  return (
    <div className="flex flex-col w-full h-full gap-10 px-4 md:px-9 ">
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6">
        <ProfileCardServer/>
        <ChargeabilityCard/>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        <TechSkillsCard/>

        <div className="w-full">
          <SoftSkillsCard/>
        </div>
      </section>
    </div>
  );
}

