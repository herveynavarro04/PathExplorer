import { ShowcaseSectionSkill } from "components/Layouts/showcase-skill";

export default function TechStackCard({ stack }: { stack: string[] }) {
  return (
    <ShowcaseSectionSkill title="Stack Tecnológico" className="!p-7 h-[6rem]">
      <div className="flex flex-col flex-grow h-full">
        <div className="flex flex-wrap items-start gap-2.5 overflow-y-auto pr-1 pt-1 h-full">
          {stack.length === 0 ? (
            <div className="w-full flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-300 text-sm text-center">
                Aún no se ha definido el stack tecnológico.
              </p>
            </div>
          ) : (
            stack.map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-full bg-[#e8deef] dark:bg-[#a896b3] dark:border-[#877691] px-4 py-1.5 text-sm text-gray-700 dark:text-gray-800"
              >
                {tech}
              </span>
            ))
          )}
        </div>
      </div>
    </ShowcaseSectionSkill>
  );
}
