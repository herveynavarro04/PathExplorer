import { TopProjects } from "components/RecommendedProjects/top-projects";
import { OverviewCardsGroup } from "./_components/overview-cards";


export default function Home() {

  return (
    <>
        <OverviewCardsGroup />


      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-20 md:gap-6 2xl:mt-20 2xl:gap-7.5">
        <div className="col-span-12 grid ">
            <TopProjects />
        </div>

      
      </div>
    </>
  );
}
