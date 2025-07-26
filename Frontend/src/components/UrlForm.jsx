import React, { useState } from "react";
import axios from "axios";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copy, setCopy] = useState("Copy!");

  const copyLink = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopy("Copied!");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShortUrl("");
    setCopy("Copy!"); // Reset copy button state on new shorten
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/create`,
        { url }
      );
      setShortUrl(data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="url"
          className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Paste your long URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded transition"
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>
      {shortUrl && (
        <div className="mt-6 text-center">
          <span className="text-gray-300">Short URL:</span>
          <div className="mt-2">
            <span className="bg-gray-700 text-pink-400 px-3 py-1 rounded break-all">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>
            </span>
            &nbsp; &nbsp;
            <button
              onClick={copyLink}
              className={`font-semibold py-1 rounded w-20 transition-colors
                ${copy === "Copied!" 
                  ? "bg-green-600 text-white" 
                  : "bg-blue-600 hover:bg-pink-700 text-white"
                }`}
            >
              {copy}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
