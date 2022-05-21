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
	}
	if (iOptions.body && !iOptions.customHeader) {
		options.body = JSON.stringify(iOptions.body);
		options.headers['Content-Type'] = 'application/json';
	} else {
		options.body = iOptions.body;
		options.headers = {...options.headers, ...iOptions.headers};
	}
	if (iOptions.credentials === false) {
		delete options.credentials;
	}
	const res = await fetch(url, options);
	const error = res.ok ? false : true;
	const json = await res.json();
	return {
		status: res.status,
		error: error,
		data: json
	}
};

export default sendReq;
