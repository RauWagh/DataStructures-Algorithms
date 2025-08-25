import { useSelector, useDispatch } from 'react-redux';
import ContentCard from '../Feed/ContentCard';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { reorderFavorites } from '../../slices/favoritesSlice';
import { useRef } from 'react';

const ITEM_TYPE = 'FAV_CARD';

function DraggableFav({ item, index, moveCard }) {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(dragItem) {
      if (!ref.current || dragItem.index === index) return;
      moveCard(dragItem.index, index);
      dragItem.index = index;
    },
  });
  const [, drag] = useDrag({ type: ITEM_TYPE, item: { index } });
  drag(drop(ref));
  return (
    <div ref={ref}>
      <ContentCard item={item} />
    </div>
  );
}

export default function Favorites() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.favorites);

  const moveCard = (from, to) => {
    const updated = [...items];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    dispatch(reorderFavorites(updated));
  };

  return (
    <section id="favorites" className="favorites">
      <h2>Favorites</h2>
      <DndProvider backend={HTML5Backend}>
        <div className="grid">
          {items.map((item, idx) => (
            <DraggableFav key={`fav-${item.id}`} item={item} index={idx} moveCard={moveCard} />
          ))}
        </div>
      </DndProvider>
    </section>
  );
}
