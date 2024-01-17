import React, { ChangeEvent, KeyboardEvent } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./inputSearch.scss";

interface InputSearchProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function InputSearch({ value, setValue }: InputSearchProps) {
  const navigate = useNavigate();
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && value.length != 0) {
      navigate("/search?searchText=" + value);
    }
  };

  const handleSearch = () => {
    navigate("/search?searchText=" + value);
  };

  return (
    <div className='searchInput'>
      <input
        type='text'
        className='searchInput-input'
        value={value}
        onChange={handleValueChange}
        onKeyDown={handleKeyPress}
        placeholder='Search posts and questions...'
      />
      <button
        className='searchInput-btn'
        onClick={handleSearch}
        disabled={value.length == 0}
      >
        <IoSearchSharp />
      </button>
    </div>
  );
}

export default InputSearch;
