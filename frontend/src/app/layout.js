import '../styles/Index.css';
import '../styles/App.css';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Topbar />
        <div className="layout-container">
          <Sidebar />
          <main className="content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
