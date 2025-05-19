
"use client";

import { EmailIcon, UploadIcon, UserIcon, PasswordIcon } from "assets/icons";
import InputGroup from "components/FormElements/InputGroup";
import { ShowcaseSection } from "components/Layouts/showcase-section";
import Image from "next/image";
import { useState, FormEvent } from "react";
import Loading from "components/Loading";

type PersonalInfoFormProps = {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    url_pic: string;
    password: string;
  };
};

export function PersonalInfoForm({ userData }: PersonalInfoFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(userData.url_pic);
  const [password, setPassword] = useState("");

  if (!userData) {
    return <Loading />;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("La imagen no puede superar los 10MB.");
      return;
    }

    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (selectedImage) {
      formData.append("profilePhoto", selectedImage);
    }

    try {
      const response = await fetch("/api/update-profile", { //cambiar 
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      alert("Perfil actualizado correctamente.");
      setIsEditing(false);
      setPassword("");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el perfil.");
    }
  };

  return (
    <ShowcaseSection title="Información Personal" className="!p-7">
      <form onSubmit={handleSubmit}>
        <div className="mb-5.5 flex items-center gap-3">
          <Image
            src={previewUrl}
            width={66}
            height={66}
            alt="User"
            className="size-14 rounded-full object-cover"
            quality={90}
          />
          <div>
            <span className="mb-1.5 font-medium text-dark dark:text-white">
              {userData.firstName} {userData.lastName}
            </span>
          </div>
        </div>
  
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isEditing ? "max-h-[50rem] opacity-100 mb-2.5" : "max-h-0 opacity-0 mb-0"
          }`}
        >
          <div className="relative mb-2.5 block w-full rounded-xl border border-dashed border-gray-4 bg-gray-2 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary">
            <input
              type="file"
              name="profilePhoto"
              id="profilePhoto"
              accept="image/png, image/jpg, image/jpeg"
              hidden
              onChange={handleImageChange}
            />
            <label
              htmlFor="profilePhoto"
              className="flex cursor-pointer flex-col items-center justify-center p-4 sm:py-7.5"
            >
              <div className="flex size-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                <UploadIcon />
              </div>
              <p className="mt-2.5 text-body-sm font-medium">
                <span className="text-primary">Sube el archivo</span> o arrástra el archivo
              </p>
              <p className="mt-1 text-body-xs">
                PNG, JPG o JPEG (máx. 10MB, 800x800px)
              </p>
            </label>
          </div>
  
          <InputGroup
            className="mb-5.5"
            type="password"
            name="password"
            label="Contraseña"
            placeholder="Nueva contraseña..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<PasswordIcon />}
            iconPosition="left"
            height="sm"
          />
        </div>
  
        <InputGroup
          className="mb-5.5"
          type="email"
          name="email"
          label="Correo electrónico"
          placeholder="Cargando email..."
          value={userData.email}
          icon={<EmailIcon />}
          iconPosition="left"
          height="sm"
        />
  
        <InputGroup
          className="mb-5.5"
          type="text"
          name="position"
          label="Puesto"
          placeholder="Cargando puesto..."
          value={userData.position}
          icon={<UserIcon />}
          iconPosition="left"
          height="sm"
        />
  
        <div className="flex justify-end gap-3 mt-5">
          {!isEditing ? (
            <button
              className="flex items-center justify-center rounded-lg bg-[#65417f] px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-80 dark:hover:bg-opacity-75"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
          ) : (
            <>
              <button
                className="flex justify-center rounded-lg border border-stroke px-6 py-[7px] font-medium dark:bg-gray-600 dark:hover:bg-opacity-75 text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setPassword("");
                  setSelectedImage(null);
                  setPreviewUrl(userData.url_pic);
                }}
              >
                Cancelar
              </button>
              <button
                className="flex items-center justify-center rounded-lg bg-[#65417f] px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-80 dark:hover:bg-opacity-75"
                type="submit"
              >
                Guardar
              </button>
            </>
          )}
        </div>
      </form>
    </ShowcaseSection>
  );
  
}
