"use client";
import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useRef,
  useEffect,
} from "react";
import ReactDOM from "react-dom";
import { useRouter } from "next/navigation";
import { authFetch } from "@utils/authFetch";

interface GoalsFormProps {
  setOpenForm: (open: boolean) => void;
  setRefreshGoals: (refresh: boolean) => void;
}

const GoalsForm = ({ setOpenForm, setRefreshGoals }: GoalsFormProps) => {
  const [text, setText] = useState<string>("");
  const [term, setTerm] = useState<string>("");
  const [trigger, setTrigger] = useState<boolean>(false);

  const formRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];
  const router = useRouter();
  const url = "http://localhost:8080/api";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setOpenForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenForm]);

  useEffect(() => {
    const PatchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      if (!text || !term) return;

      try {
        const response = await authFetch(`${url}/goals`, {
          method: "POST",
          body: JSON.stringify({
            information: text,
            term,
          }),
        });
        if (!response) {
          router.push("/login");
          return;
        }

        setOpenForm(false);
        setRefreshGoals(true);

        console.log(response);
      } catch (error) {
        console.error("Error patching data", error);
      }
    };

    PatchData();
  }, [trigger]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-6 transition-opacity">
      <form
        ref={formRef}
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setTrigger((prev) => !prev);
        }}
        className="bg-[#f3e8ff] dark:bg-[#2c2234] text-[#2b2b2b] dark:text-white rounded-3xl p-8 w-full max-w-md shadow-xl space-y-6"
      >
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Meta</label>
          <input
            type="text"
            placeholder="Escribe tu meta"
            maxLength={100}
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
            required
            className="bg-white dark:bg-[#1c1c1c] text-[#2b2b2b] dark:text-white border border-[#d7bff1] dark:border-[#444] rounded-xl px-4 py-3 outline-none placeholder:text-[#8b8b8b] dark:placeholder:text-gray-400"
          />
          <span className="text-right text-sm text-[#8b8b8b] dark:text-gray-400 mt-1">
            Max. 100 caracteres
          </span>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Plazo</label>
          <input
            type="date"
            value={term}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTerm(e.target.value)
            }
            min={today}
            required
            className="bg-white dark:bg-[#1c1c1c] text-[#2b2b2b] dark:text-white border border-[#d7bff1] dark:border-[#444] rounded-xl px-4 py-2"
          />
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <button
            type="submit"
            className="bg-[#e0cfe6] hover:bg-[#d1c0db] dark:bg-[#65417f] dark:hover:bg-[#5a366e] transition px-4 py-3 rounded-xl text-[#4B0082] dark:text-white font-medium"
          >
            Guardar meta
          </button>
          <button
            type="button"
            onClick={() => setOpenForm(false)}
            className="bg-white dark:bg-gray-300 text-black px-4 py-2 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default GoalsForm;
