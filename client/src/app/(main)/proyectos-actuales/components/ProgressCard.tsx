import { ShowcaseSectionSkill } from "components/Layouts/showcase-skill";

export default function ProgressCard({ progress }: { progress: number }) {
  return (
    <ShowcaseSectionSkill title="Progreso del proyecto">
      <div>
        <div className="w-60 h-60 mx-auto mt-4 relative">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#c6b0dc" strokeWidth="10" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#65417f"
              strokeWidth="10"
              fill="none"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-black dark:text-white">
            {progress}%
          </div>
        </div>
      </div>
    </ShowcaseSectionSkill>
  );
}
