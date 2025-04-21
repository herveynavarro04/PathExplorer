
import ProfileCardServer from '@components/ProfileCardServer';
import TechSkillsCardServer from './TechSkillsCardServer';
import SoftSkillsCardServer from './SoftSkillsCardServer';
import ChargeabilityCard from '@components/ChargeabilityCard';

export default function ProfilePage() {
  return (
    <div className="flex flex-col w-full h-full gap-10 px-4 md:px-9 ">
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6">
        <ProfileCardServer/>
        <ChargeabilityCard/>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        <TechSkillsCardServer/>

        <div className="w-full">
          <SoftSkillsCardServer/>
        </div>
      </section>
    </div>
  );
}

