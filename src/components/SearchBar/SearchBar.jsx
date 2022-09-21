import "./Searchbar.css";

const SearchBar = ({ setFilterUser }) => {
  return (
    <div className="searchBox">
    <input
      type="text"
      id="search"
      className="searchInput"
      onChange={(ev) => setFilterUser(ev.target.value)}
      placeholder="Search"
    />
    <button className="searchButton" href="#">
    <i className="material-icons">
      <img src="/assets/zoom-lens.png" alt="" />
    </i>
    </button>
    </div>
  );
};

export default SearchBar;
