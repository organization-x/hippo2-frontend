// ==============================
// Exports func sendReq
// @desc - fetch api wrapper
// @param {string} url - url
// @param {string} method - 'GET' || 'POST'
// @param {object} body - req body if applicable
// @param {func({error, result})} callback - executes func and passes results
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

function sendReq(url, method='GET', body=null, callback) {
	const csrftoken = getCookie('csrftoken');
	const options = {
		method: method,
		credentials: 'include',
		headers: {
			'X-CSRFToken': csrftoken
		}
	}
	if (body) {
		options.body = JSON.stringify(body);
		options.headers['Content-Type'] = 'application/json';
	}

	fetch(url, options).then((res) => {
		if (!res.ok) {
			return res.text().then(text => { throw new Error(text) });
		}
		return res.json();
	}).then((data) => {
		callback({
			error: false,
			result: data
		});
	}).catch((err) => {
		callback({
			error: err,
			result: null
		});
	});
};

export default sendReq;
