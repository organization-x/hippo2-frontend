import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../services/authentication';
import { useContext } from 'react';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children }) {
	const auth = useContext(AuthContext);
	const location = useLocation();
	if (!auth.user.isLoggedIn) {
		return <Navigate to={'/signup'} replace state={{ from: location }} />
	}
	return children;
}

export default PrivateRoute;
