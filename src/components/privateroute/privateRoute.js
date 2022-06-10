import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/authentication';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children }) {
	const auth = useAuth();
	const location = useLocation();
	if (!auth.user.isLoggedIn) {
		return <Navigate to={'/signup'} replace state={
			{ from: { pathname: location.pathname + location.search } }
		} />;
	}
	return children;
}

export default PrivateRoute;
