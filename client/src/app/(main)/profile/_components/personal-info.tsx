"use client";

import {
  EmailIcon,
  UploadIcon,
  UserIcon,
  PasswordIcon,
  GlobeIcon,
  TrashIcon,
} from "assets/icons";
import InputGroup from "components/FormElements/InputGroup";
import { ShowcaseSection } from "components/Layouts/showcase-section";
import Image from "next/image";
import { useState, FormEvent, useEffect } from "react";
import Loading from "components/Loading";

type PersonalInfoFormProps = {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    url_pic: string;
    mime_type: string;
    password: string;
  };
  triggerReload: (fade?: boolean) => void;
  updateProfileState: (
    newData: Partial<PersonalInfoFormProps["userData"]>
  ) => void;
  setGlobalLoading: (val: boolean) => void;
};

export function PersonalInfoForm({
  userData,
  triggerReload,
  updateProfileState,
  setGlobalLoading,
}: PersonalInfoFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [password, setPassword] = useState("");

  const [showPasswordField, setShowPasswordField] = useState(false);

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

const resolvedImageSrc = (() => {
  if (previewUrl && previewUrl.trim() !== "") {
    return previewUrl;
  } else if (
    userData.url_pic &&
    userData.mime_type &&
    userData.url_pic.trim() !== ""
  ) {
    return `data:${userData.mime_type};base64,${userData.url_pic}`;
  } else {
    return "/profile.png";
  }
})();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setGlobalLoading(true);

    const formData = new FormData();
    if (selectedImage) {
      formData.append("pictureFile", selectedImage);
    }
    if (password) {
      formData.append("password", password);
    }

    await fetch("http://localhost:8080/api/employee", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    await new Promise((resolve) => setTimeout(resolve, 200));

    const updated = await fetch("http://localhost:8080/api/employee", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await updated.json();
    setPreviewUrl(
      data.profilePicture && data.mimeType
        ? `data:${data.mimeType};base64,${data.profilePicture}?${Date.now()}`
        : `/profile.png?${Date.now()}`
    );

    updateProfileState({
      url_pic: data.profilePicture,
      mime_type: data.mimeType,
    });
    setIsEditing(false);
    setSelectedImage(null);
    setPassword("");

    triggerReload(true);
    setGlobalLoading(false);
  };
  const getDefaultProfilePictureFile = async (): Promise<File> => {
    const response = await fetch("/profile.png");
    const blob = await response.blob();
    return new File([blob], "profile.png", { type: "image/png" });
  };

  useEffect(() => {
    if (isEditing) {
      const timer = setTimeout(() => setShowPasswordField(true), 200);
      return () => clearTimeout(timer);
    } else {
      setShowPasswordField(false);
    }
  }, [isEditing]);

  if (!userData) {
    return <Loading />;
  }

  return (
    <ShowcaseSection
      title="Información Personal"
      className="!p-7 !pt-2 !pb-0"
      action={
        !isEditing ? (
          <button
            className="flex items-center justify-center rounded-lg bg-[#65417f] px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-80 dark:hover:bg-opacity-75"
            type="button"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              className="flex items-center justify-center rounded-lg bg-[#65417f] px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-80 dark:hover:bg-opacity-75"
              type="submit"
              form="personal-info-form"
            >
              Guardar
            </button>
            <button
              className="rounded-lg border border-gray-400 bg-transparent px-6 py-[7px] font-medium text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3 transition-colors"
              type="button"
              onClick={() => {
                setIsEditing(false);
                setPassword("");
                setSelectedImage(null);
                setPreviewUrl(
                userData.url_pic && userData.mime_type && userData.url_pic.trim() !== ""
                  ? `data:${userData.mime_type};base64,${userData.url_pic}`
                  : "/profile.png"
              );
              }}
            >
              Cancelar
            </button>
          </div>
        )
      }
    >
      <form id="personal-info-form" onSubmit={handleSubmit}>
        <div
          className={`mb-0 ${isEditing ? "flex flex-row items-center gap-9" : "flex justify-center"}`}
        >
          <div className="flex flex-col items-center justify-center ">
            <div className="rounded-full p-1 bg-transparent dark:bg-gray-800">
              <Image
                src={resolvedImageSrc}
                width={isEditing ? 66 : 180}
                height={isEditing ? 66 : 180}
                alt="User"
                onError={(e) => {
                  e.currentTarget.src = "/profile.png";
                }}
                className={`rounded-full object-cover transition-all duration-300 ease-in-out ${
                  isEditing ? "size-33" : "size-56"
                }`}
                quality={90}
              />
            </div>

            {isEditing && (userData.url_pic || selectedImage) && (
              <button
              type="button"
              onClick={async () => {
                await fetch("http://localhost:8080/api/employee/delete/picture", {
                  method: "PATCH",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                });
             
                setSelectedImage(null);
                setPreviewUrl("");
                triggerReload();
              }}
              className="text-sm text-red-500 underline pt-1"
            >
              <TrashIcon />
            </button>
            )}
          </div>

          {isEditing && (
            <div className="flex flex-col gap-2 w-60 transition-all duration-500 ease-in-out items-start">
              <div className="relative block w-full rounded-xl border border-dashed border-gray-4 bg-gray-2 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary">
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
                  className="flex cursor-pointer flex-col items-center justify-center p-4 sm:py-2"
                >
                  <div className="flex size-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                    <UploadIcon />
                  </div>
                  <p className="mt-2.5 text-body-sm font-medium">
                    <span className="text-primary">Sube</span> o arrastra el
                    archivo
                  </p>
                  <p className="mt-1 text-xs">PNG, JPG o JPEG (máx. 10MB)</p>
                </label>
              </div>
            </div>
          )}
        </div>

        <InputGroup
          className="mb-3.5 text-sm"
          type="name"
          name="name"
          label="Nombre"
          placeholder="Cargando nombre..."
          value={userData.firstName + " " + userData.lastName}
          icon={<UserIcon />}
          iconPosition="left"
          height="sm"
        />

        <InputGroup
          className="mb-3.5 text-sm"
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
          className="mb-3.5 text-sm"
          type="text"
          name="position"
          label="Puesto"
          placeholder="Cargando puesto..."
          value={userData.position}
          icon={<GlobeIcon />}
          iconPosition="left"
          height="sm"
        />

        {isEditing && (
          <div
            className={`transition-opacity duration-700 ${
              showPasswordField ? "opacity-100" : "opacity-0"
            }`}
          >
            <InputGroup
              className=" text-sm"
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
        )}
      </form>
    </ShowcaseSection>
  );
}
