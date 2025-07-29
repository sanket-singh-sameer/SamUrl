import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createShortUrl } from "../apis/shortUrl.api";
import ListUrl from "./ListUrl";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copy, setCopy] = useState("Copy!");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const copyLink = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopy("Copied!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShortUrl("");
    setCopy("Copy!");
    try {
      let data;
      if (isLoggedIn && slug) {
        data = await createShortUrl(url, slug);
      } else {
        data = await createShortUrl(url);
      }
      setShortUrl(data);
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
        {isLoggedIn && (
          <input
            type="text"
            className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Custom slug (optional)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        )}
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
                ${
                  copy === "Copied!"
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
