import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const SearchBar = ({ dispatch }) => {
  const handleSearch = async (e) => dispatch({ type: 'SEARCH_FILES', searchBy: e.target.value });
  return (
    <div className="bg-secondary d-flex my-3 p-1 rounded w-100 w-md-auto">
      <div className="px-3 py-1">
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        classes={{
          // root:
          input: 'text-white',
        }}
        onChange={handleSearch}
      />
    </div>
  );
};

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default SearchBar;
