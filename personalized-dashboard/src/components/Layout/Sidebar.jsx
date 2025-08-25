import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../slices/preferencesSlice';

const ALL_CATEGORIES = ['technology', 'sports', 'finance', 'entertainment', 'health', 'science'];

export default function Sidebar() {
  const dispatch = useDispatch();
  const { categories } = useSelector((s) => s.preferences);

  function toggleCategory(cat) {
    const selected = categories.includes(cat)
      ? categories.filter((c) => c !== cat)
      : [...categories, cat];
    dispatch(setCategories(selected));
  }

  return (
    <aside className="app-sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">Preferences</div>
        {ALL_CATEGORIES.map((cat) => (
          <label key={cat} className="checkbox-row">
            <input type="checkbox" checked={categories.includes(cat)} onChange={() => toggleCategory(cat)} />
            <span>{cat}</span>
          </label>
        ))}
      </div>
      <div className="sidebar-section">
        <div className="sidebar-title">Sections</div>
        <ul className="nav-links">
          <li><a href="#feed">Feed</a></li>
          <li><a href="#trending">Trending</a></li>
          <li><a href="#favorites">Favorites</a></li>
        </ul>
      </div>
    </aside>
  );
}
