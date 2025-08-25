import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, toggleDarkMode } from '../../slices/preferencesSlice';
import { useEffect, useState } from 'react';

export default function Header() {
  const dispatch = useDispatch();
  const { darkMode, searchQuery } = useSelector((s) => s.preferences);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Debounce input
  useEffect(() => {
    const handle = setTimeout(() => {
      dispatch(setSearchQuery(localQuery));
    }, 400);
    return () => clearTimeout(handle);
  }, [localQuery, dispatch]);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <header className="app-header">
      <div className="brand">Personalized Dashboard</div>
      <input
        className="search-input"
        placeholder="Search news, movies, posts..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      <button className="btn" onClick={() => dispatch(toggleDarkMode())}>
        {darkMode ? 'Light' : 'Dark'} Mode
      </button>
    </header>
  );
}
