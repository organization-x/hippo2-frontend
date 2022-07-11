// ==============================
// Exports asyncfunc sendReq
// @desc - fetch api wrapper
// @param {string} url - url
// @param {object} options - provide method, body, etc.
// ==============================

function getCookie(name) {
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

async function sendReq(url, iOptions) {
	const csrftoken = getCookie('csrftoken');
	const options = {
		method: iOptions.method,
		credentials: 'include',
		headers: {
			'X-CSRFToken': csrftoken
		}
	};
	if (iOptions.body) {
		options.body = JSON.stringify(iOptions.body);
		options.headers['Content-Type'] = 'application/json';
	}
	const res = await fetch(url, options);
	const error = res.ok ? false : true;
	const json = await res.json();
	
	const result = {
		status: res.status,
		data: json
	};
	// if error, handle with .catch
	if (error) throw result;
	return result;
}

export default sendReq;
