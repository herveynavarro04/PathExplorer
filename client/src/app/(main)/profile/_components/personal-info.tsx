"use client";

import { EmailIcon, UploadIcon, UserIcon } from "assets/icons";
import InputGroup from "components/FormElements/InputGroup";
import { ShowcaseSection } from "components/Layouts/showcase-section";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@utils/authFetch";
import Loading from "components/Loading";

type PersonalInfoFormProps = {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    url_pic: string;
  };
};

export function PersonalInfoForm({ userData }: PersonalInfoFormProps) {
  if (!userData) {
    return <Loading />;
  }

  return (
    <ShowcaseSection title="Información Personal" className="!p-7">
      <form>
        <div className="mb-5.5 flex items-center gap-3">
          <Image
            src={userData.url_pic}
            width={55}
            height={55}
            alt="User"
            className="size-14 rounded-full object-cover"
            quality={90}
          />
          <div>
            <span className="mb-1.5 font-medium text-dark dark:text-white">
              Edita tu foto
            </span>
            <span className="flex gap-3">
              <button type="button" className="text-body-sm hover:text-red">
                Borrar
              </button>
              <button className="text-body-sm hover:text-primary">
                Actualizar
              </button>
            </span>
          </div>
        </div>

        <div className="relative mb-5.5 block w-full rounded-xl border border-dashed border-gray-4 bg-gray-2 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary">
          <input
            type="file"
            name="profilePhoto"
            id="profilePhoto"
            accept="image/png, image/jpg, image/jpeg"
            hidden
          />
          <label
            htmlFor="profilePhoto"
            className="flex cursor-pointer flex-col items-center justify-center p-4 sm:py-7.5"
          >
            <div className="flex size-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
              <UploadIcon />
            </div>
            <p className="mt-2.5 text-body-sm font-medium">
              <span className="text-primary">Sube el archivo</span> o arrástra
              el archivo
            </p>
            <p className="mt-1 text-body-xs">
              SVG, PNG, JPG or GIF (max, 800 X 800px)
            </p>
          </label>
        </div>

        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full"
            type="text"
            name="fullName"
            label="Nombre"
            placeholder="Cargando nombre..."
            value={`${userData.firstName} ${userData.lastName}`}
            icon={<UserIcon />}
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
          <button
            className="flex justify-center rounded-lg border border-stroke px-6 py-[7px] font-medium dark:bg-gray-600 dark:hover:bg-opacity-75 text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
            type="button"
          >
            Cancelar
          </button>
          <button
            className="flex items-center justify-center rounded-lg bg-[#65417f] px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-80 dark:hover:bg-opacity-75"
            type="submit"
          >
            Guardar
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}
