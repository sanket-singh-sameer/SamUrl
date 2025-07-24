import React, { useState } from "react";

const App = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShortUrl("");
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.text();
      setShortUrl(data);
    } catch (err) {
      setShortUrl("Error creating short URL.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          URL Shortener
        </h1>
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
                {shortUrl}
              </span>
            </div>
          </div>
        )}
      </div>
      <footer className="mt-8 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} SamUrl
      </footer>
    </div>
  );
};

export default App;
