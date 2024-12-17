/* Search Form Component */

interface SearchFormProps {
  searchInput: string | null;
  setSearchInput: (value: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ setSearchInput }) => {
  return (
    <div className="search">
      <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search" className="heading heading--primary">
          Search
        </label>
        <input
          className="form__input-field"
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Find your next adventure..."
        />
      </form>
    </div>
  );
};

export default SearchForm;
