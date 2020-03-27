import React, {useContext, useState, useCallback} from 'react'
import {DebounceInput} from "react-debounce-input";
import AppContext from "../AppContext";

const SearchBar = () => {
    const [queryInput, setQueryInput] = useState("");
    const {dispatch} = useContext(AppContext);

    const searchMapAnnotations = (event) => {
        setQueryInput(event.target.value);

    };

    const handleSearchClick = useCallback(() => {
        dispatch({ type: "SET_QUERY", payload: { query: queryInput }});
    }, [queryInput, dispatch]);

    return (
        <div className="app-search">
            <DebounceInput type="search"
                           list="last-queries"
                           placeholder="Search for annotations..."
                           id="annotation-search"
                           name="q"
                           onFocus={(event) => event.target.placeholder = ""}
                           onBlur={(event) => event.target.placeholder = "Search for annotations..."}
                           value={queryInput}
                           minLength={1}
                           debounceTimeout={300}
                           onChange={(event) => {
                               searchMapAnnotations(event);
                           }}

            />
            <button onClick={() => handleSearchClick()}>Search</button>
        </div>
    )
};

export default SearchBar;
