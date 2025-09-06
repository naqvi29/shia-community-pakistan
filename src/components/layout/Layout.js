import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-64 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;