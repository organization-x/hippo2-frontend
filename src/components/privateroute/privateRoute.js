import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/authentication';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
// redirects to welcome screen if they're not initiated
function PrivateRoute({ children, initBlind=false }) {
	const { user } = useAuth();
	const location = useLocation();
	if (!user.isLoggedIn) {
		return <Navigate to={'/signup'} replace state={
			{ from: { pathname: location.pathname + location.search } }
		} />;
	} else if (!initBlind && !user.isInit) {
		return <Navigate to={'/welcome'} replace />;
	}
	return children;
}

export default PrivateRoute;
