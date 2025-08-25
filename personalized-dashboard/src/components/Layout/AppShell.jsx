import Header from './Header';
import Sidebar from './Sidebar';

export default function AppShell({ children }) {
  return (
    <div>
      <Header />
      <div className="app-shell">
        <Sidebar />
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
