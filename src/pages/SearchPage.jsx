import React, { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Loader from "../utils/Loader";
import { searchNasaImages } from "../api/nasa-api";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useState({
    q: "",
    year_start: "",
    year_end: "",
    media_type: "image",
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [initialSearchDone, setInitialSearchDone] = useState(false);

  // Get search params from URL on initial load
  useEffect(() => {
    if (initialSearchDone) return;
    const queryParams = new URLSearchParams(window.location.search);
    const q = queryParams.get("q");
    const yearStart = queryParams.get("year_start");
    const yearEnd = queryParams.get("year_end");

    if (q) {
      const newParams = {
        q,
        year_start: yearStart || "",
        year_end: yearEnd || "",
        media_type: "image",
      };
      // Set initial search done to prevent re-fetching on every render
      setInitialSearchDone(true);
      setSearchParams(newParams);
      handleSearch(newParams);
    }
  }, []);

  const handleSearch = async (params) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // Update URL with search parameters
      const queryParams = new URLSearchParams();
      if (params.q) queryParams.set("q", params.q);
      if (params.year_start) queryParams.set("year_start", params.year_start);
      if (params.year_end) queryParams.set("year_end", params.year_end);
      window.history.pushState(null, "", `/search?${queryParams.toString()}`);

      const data = await searchNasaImages(params);
      setResults(data.collection.items || []);
    } catch (err) {
      setError("Failed to fetch results. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleParamsChange = (newParams) => {
    setSearchParams(newParams);
  };

  return (
    <div className="space-y-8">
      <SearchForm
        params={searchParams}
        onParamsChange={handleParamsChange}
        onSearch={() => handleSearch(searchParams)}
      />

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : hasSearched && results.length === 0 ? (
        <div className="text-center p-4">
          No results found. Try adjusting your search criteria.
        </div>
      ) : (
        <SearchResults results={results} />
      )}
    </div>
  );
};

export default SearchPage;
