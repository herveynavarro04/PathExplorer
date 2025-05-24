import { ShowcaseProject } from "./ShowcaseProject";
import { ShowcaseSectionSkill } from "components/Layouts/showcase-skill";

export default function DescriptionCard({ description }: { description: string }) {
  return (
    <ShowcaseSectionSkill title="Descripción" className="">
      <div className="h-7 flex items-center px-3 justify-center text-xs text-gray-700 dark:text-gray-300">
        <span>{description}</span>
      </div>
    </ShowcaseSectionSkill>
  );
}
