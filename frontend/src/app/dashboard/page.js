import Dashboard from '../../components/Dashboard';
import PrivateRoute from '../../components/PrivateRoute';

export default function DashboardPage() {
  return <PrivateRoute element={<Dashboard />} />;
}
