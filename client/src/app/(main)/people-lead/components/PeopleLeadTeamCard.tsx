"use client";

import { motion } from "framer-motion";
import TeamMemberCard from "./TeamMemberCard";

interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  position: string;
  chargeability: number;
}

interface Props {
  employees: Employee[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function PeopleTeamCard({ employees }: Props) {
  return (
    <div className="mt-6 min-h-[27rem] bg-[#f8f6fa] dark:bg-[#311a42] p-6 rounded-xl shadow-md w-full mx-auto">
      <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Mi Equipo
      </h3>

        <motion.div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        >
        {employees.map((emp) => (
          <motion.div key={emp.employeeId} variants={itemVariants}>
            <TeamMemberCard
              firstName={emp.firstName}
              lastName={emp.lastName}
              position={emp.position}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

