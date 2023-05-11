import React, { useState, useEffect } from "react";
import { Input } from "semantic-ui-react";

function SearchField({ data, onSearch }) {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.name?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  }, [query, data]);

  useEffect(() => {
    onSearch(filteredData);
  }, [filteredData, onSearch]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  return (
    <Input
      icon="search"
      type="text"
      placeholder="Buscar"
      value={query}
      onChange={handleSearch}
    />
  );
}

export default SearchField;
