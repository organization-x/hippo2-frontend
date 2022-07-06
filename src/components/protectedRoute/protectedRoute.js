import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/authentication';

// A wrapper for <Route> that redirects if 
// login, details, invite, or passwordset conditions are not met.
function ProtectedRoute({ children, detailsReq=true, inviteReq=true }) {
	const { user } = useAuth();
	const location = useLocation();
	if (!user.isLoggedIn) {
		return <Navigate to={'/signup'} replace state={
			{ from: { pathname: location.pathname + location.search } }
		} />;
	} else if (detailsReq && !user.filledDetails) {
		return <Navigate to={'/user/details'} replace state={
			{ from: { pathname: location.pathname + location.search } }
		} />;
	} else if (inviteReq && !user.filledInvite) {
		return <Navigate to={'/invite'} replace state={
			{ from: { pathname: location.pathname + location.search } }
		} />;
	}
	return children;
}

export default ProtectedRoute;
