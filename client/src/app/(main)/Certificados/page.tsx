"use client";

import { useState, useEffect } from "react";
import CertCard from "./CertCard";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";
import CertForm from "./CertForm";
import { authFetch } from "@utils/authFetch";
import CertModal from "./CertModal";
import DeleteModal from "./DeleteModal";
import { FaInfoCircle, FaClock, FaCheck } from "react-icons/fa";
import { FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";
import LoadingPage from "components/LoadingPage";

type Certificate = {
  certificateId: string;
  title: string;
  status: string;
  createdAt: string;
  information: string;
  obtainedAt: Date;
};

const Page = () => {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const url = process.env.NEXT_PUBLIC_API_URL!;
  const certsPerPage = 6;
  const indexOfLast = currentPage * certsPerPage;
  const indexOfFirst = indexOfLast - certsPerPage;
  const currentCertificates = certs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(certs.length / certsPerPage);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [certToDelete, setCertToDelete] = useState<string | null>(null);

  const handleDeleteClick = (certificateId: string) => {
    setCertToDelete(certificateId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!certToDelete) return;
    const res = await authFetch(`${url}/certificates/${certToDelete}`, {
      method: "DELETE",
    });
    if (res !== false) {
      setCerts((prev) => prev.filter((c) => c.certificateId !== certToDelete));
    }
    setShowDeleteModal(false);
    setCertToDelete(null);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCertClick = async (certificate: Certificate) => {
    console.log("Certificate clicked:", certificate);
    const fullData = await authFetch<Certificate>(
      `${url}/certificates/cert/${certificate.certificateId}`,
      { method: "GET" }
    );

    if (fullData) {
      
      setSelectedCert({ ...certificate, obtainedAt: fullData.obtainedAt });
          console.log("Full certificate data:", fullData);


    } else {
      setSelectedCert(certificate);
    }
  };

  const fetchCertificates = async () => {
    setLoading(true);
    const res = await authFetch<{ certificates: Certificate[] }>(
      `${url}/certificates`,
      { method: "GET" }
    );
    console.log("Fetched certificates:", res);
    if (res) {
      const sorted = res.certificates.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setCerts(sorted);
    }
    setLoading(false);
    setTimeout(() => setFadeIn(true), 25);
  };

  const handleAddCert = () => {
    fetchCertificates();
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  if (loading || !certs) {
    return <div className="min-h-screen bg-[#d0bfdb]" />;
  }

  return (
    <div>
      <div
        className={`mx-auto w-full max-w-[970px] transition-opacity duration-500 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex justify-between">
          <div className="flex">
            <div className="pt-5">
              <Breadcrumb pageName="Mis Certificados" />
            </div>
            <div className="relative bg-transparent p-4 flex">
              <div className="relative group flex items-center space-x-2">
                <FaInfoCircle className="text-xl cursor-pointer" />
                <div className="absolute left-0 top-full mt-2 w-80 p-5 bg-[#e4e0e8] dark:bg-[#a285be] text-gray-300 rounded-2xl shadow-lg text-base z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ">
                  <h3 className="text-md font-semibold mb-4 text-black dark:text-white">
                    Simbología
                  </h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-2xl text-green-500 dark:text-white">
                      <FiCheckCircle className="transform scale-[0.8]" />
                    </div>
                    <span className="text-sm text-black dark:text-white">
                      Certificado aprobado
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-2xl text-yellow-500 dark:text-white">
                      <FiClock className="transform scale-[0.8]" />
                    </div>
                    <span className="text-sm text-black dark:text-white">
                      Certificado pendiente de revisión
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl text-red-700 dark:text-white">
                      <FiXCircle className="transform scale-[0.8]" />
                    </div>
                    <span className="text-sm text-black dark:text-white">
                      Certificado rechazado
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="w-fit h-fit px-4 self-center py-2 bg-[#65417f] text-white rounded-md hover:bg-opacity-90 transition"
          >
            Agregar certificado
          </button>
        </div>

        <div className="flex flex-col min-h-[34rem]">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 2xl:gap-7.5">
            {loading ? (
              <p className="text-center col-span-full mt-10">
                Cargando certificados...
              </p>
            ) : currentCertificates.length === 0 ? (
              <div className="col-span-full flex justify-center items-end min-h-[20rem]">
                <p className="text-gray-600 dark:text-gray-300 text-lg text-center">
                  Aún no has agregado certificados.
                </p>
              </div>
            ) : (
              currentCertificates.map((certificate) => (
                <CertCard
                  key={certificate.certificateId}
                  certificateId={certificate.certificateId}
                  title={certificate.title}
                  status={certificate.status}
                  createdAt={certificate.createdAt}
                  information={certificate.information}
                  obtainedAt={certificate.obtainedAt}
                  onClick={() => handleCertClick(certificate)}
                  onDelete={handleDeleteClick}
                />
              ))
            )}
          </div>
        </div>

        {selectedCert && (
          <CertModal
            certificate={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}

        {showDeleteModal && (
          <DeleteModal
            onConfirm={handleConfirmDelete}
            onCancel={() => {
              setCertToDelete(null);
              setShowDeleteModal(false);
            }}
          />
        )}

        <div className="w-full bg-transparent mt-8">
          {currentCertificates.length > 0 && (
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="self-center text-lg">
                {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>

        {showAddModal && (
          <CertForm
            onClose={() => setShowAddModal(false)}
            onSave={handleAddCert}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
