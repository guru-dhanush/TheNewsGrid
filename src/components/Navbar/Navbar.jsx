import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Theme from "@/components/Theme/ThemeToggle";
import { Searchbar } from "../UI/SearchBar/Searchbar";

const Navbar = ({ ...props }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialKeyword = searchParams.get("keyword");

  const handleSearch = (searchQuery) => {
    if (!searchQuery) {
      navigate("/");
    } else {
      navigate(`/search?keyword=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-inherit dark:bg-bg_grid text-gray-800 dark:text-gray-100 dark:border-dark_border_grid bg-white border border-light_border_grid">
      <img
        src={logo}
        style={{ width: "40px", borderRadius: "50%" }}
        onClick={() => navigate("/")}
        alt="Logo"
      />
      <Searchbar onSearch={handleSearch} initialKeyword={initialKeyword} />
      <div>
        <Theme {...props} />
      </div>
    </nav>
  );
};

export default Navbar;
