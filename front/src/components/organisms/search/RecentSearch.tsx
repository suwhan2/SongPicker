import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchText from '../../atoms/commons/SearchText';

const RecentSearch = () => {
  const [searchTerms, setSearchTerms] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSearchTerms = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setSearchTerms(storedSearchTerms);
  }, []);

  const handleDelete = (term: string) => {
    const updatedSearchTerms = searchTerms.filter(item => item !== term);
    setSearchTerms(updatedSearchTerms);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearchTerms));
  };

  const handleSearch = (term: string) => {
    navigate(`/search?keyword=${term}`);
  };

  return (
    <div className="w-full flex flex-wrap">
      {searchTerms.map((term, index) => (
        <SearchText
          key={index}
          term={term}
          onDelete={() => handleDelete(term)}
          onClick={() => handleSearch(term)}
        />
      ))}
    </div>
  );
};

export default RecentSearch;
