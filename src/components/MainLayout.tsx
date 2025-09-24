import Dashboard from './Dashboard';
import Sidebar from './Sidebar';

export default function MainLayout() {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Dashboard />
      </main>
    </div>
  );
}
