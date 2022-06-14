import { useEffect } from "react";
import baseUrl from "../../apiUrls";
import Loading from "../loading/loading";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../services/authentication";
import BatchSelect from "../../components/batch-select/batchSelect";

function BatchPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();

	const auth = useAuth();
	const here = location.pathname + location.search;

	return (
		<BatchSelect batchData = {[1, 2, 3]}/>
	);
}

export default BatchPage;
