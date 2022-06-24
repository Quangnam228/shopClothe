import { useState } from "react";
import { createContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const value = { keyword, setKeyword, category, setCategory };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export { SearchProvider, SearchContext };
