import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserUrls } from "../apis/shortUrl.api";

const ListUrl = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null); // Track which URL was copied
  const auth = useSelector((state) => state.auth);
  const user = auth.user;

  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      try {
        const userId = user?.id || user?._id;
        if (!userId) {
          setLoading(false);
          return;
        }
        const data = await getUserUrls(userId);
        setUrls(data.reverse()); // Reverse the array so newest URLs appear first
      } catch (error) {
        console.error("Failed to fetch URLs:", error);
      }
      setLoading(false);
    };

    if (user && (user.id || user._id)) {
      fetchUrls();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleVisit = (urlId) => {
    setUrls((prev) =>
      prev.map((url) =>
        url._id === urlId ? { ...url, views: (url.views ?? 0) + 1 } : url
      )
    );
  };

  const handleCopy = (urlId, shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(urlId);
    setTimeout(() => setCopiedId(null), 1500); // Hide after 1.5s
  };

  if (!user) {
    return (
      <div className="text-center mt-8 text-gray-600">
        Please login to view your URLs.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-center text-white">
        Your Shortened URLs
      </h2>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : urls.length === 0 ? (
        <div className="text-center text-gray-500">No URLs found.</div>
      ) : (
        <ul
          className={`bg-gray-700 shadow rounded p-2 ${
            urls.length > 2 ? "max-h-48 overflow-y-auto" : ""
          }`}
          style={
            urls.length > 2
              ? { scrollbarWidth: "thin", scrollbarColor: "#ec4899 #374151" }
              : {}
          }
        >
          {urls.map((url) => {
            const shortUrl =
              import.meta.env.VITE_BACKEND_URL + "/" + url.shortUrl;
            return (
              <li
                key={url._id}
                className="flex justify-between items-center py-2 px-2 mb-2 bg-gray-800 rounded hover:bg-pink-600 transition-colors"
              >
                <div className="flex flex-col flex-1">
                  <span className="text-white break-all text-base">
                    {url.originalUrl}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 px-2 py-1 rounded bg-gray-900 hover:bg-pink-700 hover:text-white transition w-fit"
                      onClick={() => handleVisit(url._id)}
                    >
                      {shortUrl}
                    </a>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0 text-right flex flex-col items-end">
                  <div>
                    <span className="text-gray-300 text-sm">Views:</span>
                    <span className="text-pink-400 font-bold ml-2">
                      {url.views ?? 0}
                    </span>
                  </div>
                  <button
                    className={`mt-2 bg-pink-500 hover:bg-pink-700 text-white px-2 py-1 rounded text-xs font-semibold transition ${
                      copiedId === url._id ? "bg-green-600" : ""
                    }`}
                    onClick={() => handleCopy(url._id, shortUrl)}
                  >
                    {copiedId === url._id ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ListUrl;