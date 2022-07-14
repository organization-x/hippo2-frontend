import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GA4React from "ga-4-react";

const ga4react = new GA4React(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);

const usePageTracking = () => {
	const location = useLocation();
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		ga4react.initialize().then(() => {
			setInitialized(true);
		}).catch(err => {
			// do nothing
		});
	}, []);

	useEffect(() => {
		if (initialized) {
			ga4react.pageview(location.pathname + location.search);
		}
	}, [initialized, location]);
};

export default usePageTracking;
