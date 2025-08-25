import { useSelector } from 'react-redux';
import ContentCard from '../Feed/ContentCard';

export default function Trending() {
  const { items } = useSelector((s) => s.feed);
  const trending = items.slice(0, 6);
  return (
    <section id="trending" className="trending">
      <h2>Trending</h2>
      <div className="grid">
        {trending.map((item) => (
          <ContentCard key={`trending-${item.id}`} item={item} />
        ))}
      </div>
    </section>
  );
}
