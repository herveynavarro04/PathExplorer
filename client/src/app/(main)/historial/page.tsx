"use client";
import React, { useDebugValue, useEffect, useState } from "react";
import HistoryCard from "./HistoryCard";
import { CiCirclePlus } from "react-icons/ci";
import HistoryForm from "./HistoryForm";
import DeleteCard from "./DeleteCard";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";
import { useRouter } from "next/navigation";
import { authFetch } from "@utils/authFetch";
import { validation } from "@utils/validation";
import LoadingPage from "components/LoadingPage";

interface GetHistoryResponseDto {
  historyId: string;
  information: string;
  position: string;
  startDate: string;
  endDate: string;
  company: string;
}

interface GetHistoriesResponseDto {
  histories: GetHistoryResponseDto[];
}

const Historial: React.FC = () => {
  const [openAddHistory, setOpenAddHistory] = useState<boolean>(false);
  const [openDeleteCard, setOpenDeleteCard] = useState<boolean>(false);
  const [historyId, setHistoryId] = useState<string | null>(null);
  const [position, setPosition] = useState<string>("");
  const [information, setInformation] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [isPatch, setIsPatch] = useState<boolean>(false);
  const [isPost, setIsPost] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [fadeIn, setFadeIn] = useState(false);
  const router = useRouter();
  const url = "http://localhost:8080/api";
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingHistories, setLoadingHistories] = useState<boolean>(true);
  const [histories, setHistories] = useState<GetHistoryResponseDto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = histories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(histories.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const LoadHistories = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await authFetch<GetHistoriesResponseDto>(
          `${url}/history`
        );
        if (!response) {
          router.push("/login");
          return;
        }

        setHistories(response.histories);
        setLoadingHistories(false);
        setTimeout(() => setFadeIn(true), 25);
      } catch (error) {
        console.error("Error while fetching", error);
      }
    };
    LoadHistories();
  }, [refresh]);

  useEffect(() => {
    if (!loadingHistories) setLoading(false);
  }, [loadingHistories]);

  return (
    <div>
      <>
        {openDeleteCard && (
          <DeleteCard
            setOpenDeleteCard={setOpenDeleteCard}
            historyId={historyId}
            setRefresh={setRefresh}
          />
        )}
        {openAddHistory && (
          <HistoryForm
            historyId={historyId}
            setHistoryId={setHistoryId}
            information={information}
            setInformation={setInformation}
            position={position}
            setPosition={setPosition}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            company={company}
            setCompany={setCompany}
            setOpenAddHistory={setOpenAddHistory}
            isPost={isPost}
            isPatch={isPatch}
            setRefresh={setRefresh}
          />
        )}
        <div
          className={`mx-auto w-full relative text-white px-5 max-w-[970px] transition-opacity duration-500 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative flex justify-between items-center px-10 py-4">
            <Breadcrumb pageName="Historial" />
            <div
              onClick={() => {
                setOpenAddHistory(true);
                setIsPost(true);
              }}
              className="ml-4 px-4 py-2 bg-[#65417f] self-center text-white rounded-md hover:bg-opacity-90 transition"
            >
              <div className="absolute pointer-events-none" />

              <p className="text-[1rem] transition duration-300 ease-out hover:scale-100 active:scale-95 hover:cursor-pointer">
                Agregar empleo pasado
              </p>
            </div>
          </div>

          <div className="relative w-full px-[3rem] pb-10">
            <div className="min-h-[36rem] flex flex-col justify-between">
              <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3 mb-6 flex-grow">
                {currentItems.length === 0 ? (
                  <div className="w-full col-span-full flex justify-center items-center min-h-[20rem]">
                    <p className="text-center text-lg text-gray-700 dark:text-gray-300">
                      Aún no tienes historial laboral agregado.
                    </p>
                  </div>
                ) : (
                  currentItems.map((history) => (
                    <HistoryCard
                      key={history.historyId}
                      historyId={history.historyId}
                      information={history.information}
                      position={history.position}
                      startDate={history.startDate}
                      endDate={history.endDate}
                      company={history.company}
                      setHistoryId={setHistoryId}
                      setInformation={setInformation}
                      setPosition={setPosition}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                      setCompany={setCompany}
                      setOpenAddHistory={setOpenAddHistory}
                      setOpendDeleteCard={setOpenDeleteCard}
                      setIsPatch={setIsPatch}
                    />
                  ))
                )}
              </div>
              {histories.length > 0 && (
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
          </div>
        </div>
      </>
    </div>
  );
};

export default Historial;
