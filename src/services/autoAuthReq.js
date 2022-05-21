import sendReq from "./sendReq";
import baseUrl from "../baseUrl";

// ==============================
// Exports async func autoAuthReq
// @desc - sendReq wrapper with authentication features
// @param {string} url - url
// @param {object} options - provide method, body, etc.
// ==============================

async function autoAuthReq(url, options, redirect=false) {
	const res = await sendReq(url, options);

	// access token expired
	// attempt refresh
	if (res.status === 401) {
		const rOptions = {
			method: 'POST',
			body: {}
		};
		const rUrl = baseUrl + '/auth/token/refresh/';
		const rRes = await sendReq(rUrl, rOptions);
		if (!rRes.error) {
			return await sendReq(url, options);
		}
		// refresh failed
		// logout user to clear cookies 
		const loUrl = baseUrl + '/auth/logout/';
		await sendReq(loUrl, rOptions);
	}
	return res;
}

export default autoAuthReq;
