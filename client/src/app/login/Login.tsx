// "use client";
// import React from "react";
// import { FaUserAlt } from "react-icons/fa";
// import { RiLockPasswordFill } from "react-icons/ri";

// interface LoginProps {
//   email: string;
//   setEmail: (email: string) => void;
//   password: string;
//   setPassword: (password: string) => void;
//   setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
// }
// const Login = ({
//   email,
//   setEmail,
//   password,
//   setPassword,
//   setTrigger,
// }: LoginProps) => {
//   return (
//     <form
//       className="w-full h-auto flex flex-col items-center justify-center gap-[1.5rem]"
//       onSubmit={(e) => {
//         e.preventDefault();
//         if (email && password) setTrigger((prev) => !prev);
//       }}
//     >
//       <div className=" relative w-full max-w-[20rem] flex items-center justify-center transition duration-300 ease-in-out hover:scale-105  ">
//         <FaUserAlt className="absolute top-6 left-3 transform -translate-y-1/2 text-white" />

//         <input
//           className="w-full  bg-[#9573a8] rounded-2xl py-[0.8rem] pl-[2.5rem] pr-4 focus:outline-none"
//           type="text"
//           placeholder="Introduce tu correo"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           onInvalid={(e) =>
//             (e.target as HTMLInputElement).setCustomValidity(
//               "Por favor, introduce tu correo"
//             )
//           }
//           onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
//         />
//       </div>
//       <div className="relative w-full max-w-[20rem] transition duration-300 ease-in-out hover:scale-105 ">
//         <RiLockPasswordFill className="absolute top-6 left-3 transform -translate-y-1/2 text-white" />

//         <input
//           className="w-full bg-[#9573a8] rounded-2xl max-w-[20rem] py-[0.8rem] pl-[2.2rem] focus:outline-none"
//           type="password"
//           placeholder="Introduce tu contraseña"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           onInvalid={(e) =>
//             (e.target as HTMLInputElement).setCustomValidity(
//               "Por favor, introduce tu contraseña"
//             )
//           }
//           onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
//         />
//       </div>

//       <input
//         className="w-full text-[#c8b7d1] bg-[#9573a8] rounded-2xl max-w-[10rem] py-[0.8rem]  cursor-pointer transition duration-300 ease-in-out   hover:scale-110 focus:outline-none  "
//         type="submit"
//         value="Iniciar Sesión"
//         required
//       />
//     </form>
//   );
// };

// export default Login;
"use client";
import React from "react";

interface LoginProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  setTrigger,
}: LoginProps) => {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (email && password) setTrigger((prev) => !prev);
      }}
    >
      <input
        type="email"
        placeholder="Correo electrónico"
        className="px-5 py-3 bg-white text-gray-800 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onInvalid={(e) =>
          (e.target as HTMLInputElement).setCustomValidity("Por favor, introduce tu correo")
        }
        onInput={(e) =>
          (e.target as HTMLInputElement).setCustomValidity("")
        }
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="px-5 py-3 bg-white text-gray-800 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onInvalid={(e) =>
          (e.target as HTMLInputElement).setCustomValidity("Por favor, introduce tu contraseña")
        }
        onInput={(e) =>
          (e.target as HTMLInputElement).setCustomValidity("")
        }
        required
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition mt-2"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default Login;
