import React from "react";
import UrlForm from "../components/UrlForm";
import ListUrl from "../components/ListUrl";

const DashBoardPage = () => {
  return (
        <div>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-xl">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            URL Shortener
          </h1>
          <UrlForm />
        <ListUrl />
        </div>
        <footer className="mt-8 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} SamUrl
        </footer>
      </div>
    </div>
  );
};

export default DashBoardPage;
