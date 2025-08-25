import Header from './components/Layout/Header.jsx'
import Sidebar from './components/Layout/Sidebar.jsx'
import Feed from './components/Feed/Feed.jsx'
import Trending from './components/Trending/Trending.jsx'
import Favorites from './components/Favorites/Favorites.jsx'
import './styles.css'

function App() {
  return (
    <div>
      <Header />
      <div className="app-shell">
        <Sidebar />
        <main className="main">
          <Feed />
          <Trending />
          <Favorites />
        </main>
      </div>
    </div>
  )
}

export default App
