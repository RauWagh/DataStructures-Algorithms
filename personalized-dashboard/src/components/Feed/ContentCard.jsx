import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../slices/favoritesSlice';

export default function ContentCard({ item }) {
  const dispatch = useDispatch();
  const favorites = useSelector((s) => s.favorites.items);
  const isFavorite = favorites.some((i) => i.id === item.id && i.type === item.type);

  function toggleFavorite() {
    if (isFavorite) dispatch(removeFavorite({ id: item.id, type: item.type }));
    else dispatch(addFavorite(item));
  }

  return (
    <motion.div layout className="card content-card" whileHover={{ scale: 1.01 }}>
      {item.image && <img className="card-image" src={item.image} alt={item.title} />}
      <div className="card-body">
        <div className="card-meta">{item.type.toUpperCase()}</div>
        <h3 className="card-title">{item.title}</h3>
        {item.description && <p className="card-desc">{item.description}</p>}
        <div className="card-actions">
          {item.url && (
            <a className="btn" href={item.url} target="_blank" rel="noreferrer">
              {item.type === 'movie' ? 'View' : item.type === 'news' ? 'Read More' : 'Open'}
            </a>
          )}
          <button className="btn secondary" onClick={toggleFavorite}>
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
