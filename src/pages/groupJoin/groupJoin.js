import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../services/authentication";
import baseUrl from "../../apiUrls";
import Loading from "../loading/loading";

function GroupJoin() {
	const location = useLocation();
	const navigate = useNavigate();
	const [search] = useSearchParams();
	const token = search.get('token');
	const auth = useAuth();
	const here = location.pathname + location.search;

	useEffect(() => {
		if (token) {
			const url = baseUrl + '/api/v1/groups/join/';
			const options = {
				method: 'POST',
				body: {
					token: token
				}
			};
			auth.autoAuthReq(url, options, here).then(res => {
				navigate('/');
			});
		}
	}, [token, auth, here, navigate]);

	return (
		<Loading />
	);
}

export default GroupJoin;
