import React from "react";

const LoadingPage = ({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`transition-opacity duration-400 ${loading ? "opacity-0" : "opacity-100"}`}
    >
      {!loading && children}
    </div>
  );
};

export default LoadingPage;
