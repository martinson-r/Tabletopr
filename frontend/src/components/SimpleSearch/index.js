import React, { useState, useEffect } from "react";
// import './Search.css';
import {searchTables} from "../../store/tables";
import { useSelector, useDispatch } from "react-redux";
import {  useHistory } from "react-router-dom";
import "./SimpleSearch.css"
// import search from "../../media/search.svg";

const SimpleSearch = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [query, setQuery] = useState("");
  const updateQuery = (e) => setQuery(e.target.value);

  const submitForm = async (e) => {
    e.preventDefault();
    const payload = {
        query
      };
    dispatch(searchTables(payload));
    console.log('search tables dispatched', payload);
    history.push('/results')
  };

  return (
    <div className="search-modal">
      <form onSubmit={submitForm}>
        <div className="search-bar-container">
        <input type="text" value={query} onChange={updateQuery} required></input>
          <button className="search-button">Search</button>
        </div>
      </form>
    </div>
  );
};

export default SimpleSearch;
