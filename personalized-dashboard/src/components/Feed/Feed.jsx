import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeed, resetFeed, reorderItems } from '../../slices/feedSlice';
import ContentCard from './ContentCard';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ITEM_TYPE = 'CARD';

function DraggableCard({ item, index, moveCard }) {
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

export default function Feed() {
  const dispatch = useDispatch();
  const { items, page, hasMore, status, error } = useSelector((s) => s.feed);
  const { categories, searchQuery } = useSelector((s) => s.preferences);
  const loaderRef = useRef(null);

  useEffect(() => {
    dispatch(resetFeed());
    dispatch(fetchFeed({ categories, page: 1, query: searchQuery }));
  }, [dispatch, categories, searchQuery]);

  const onIntersect = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && status !== 'loading') {
        dispatch(fetchFeed({ categories, page: page + 1, query: searchQuery }));
      }
    },
    [dispatch, hasMore, status, page, categories, searchQuery]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, { root: null, rootMargin: '0px', threshold: 1.0 });
    const current = loaderRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [onIntersect]);

  const moveCard = (from, to) => {
    const updated = [...items];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    dispatch(reorderItems(updated));
  };

  return (
    <section id="feed" className="feed">
      <h2>Personalized Feed</h2>
      <DndProvider backend={HTML5Backend}>
        <div className="grid">
          {items.map((item, idx) => (
            <DraggableCard key={item.id} item={item} index={idx} moveCard={moveCard} />
          ))}
        </div>
      </DndProvider>
      {status === 'loading' && <div className="loader">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div ref={loaderRef} style={{ height: 1 }} />
    </section>
  );
}
