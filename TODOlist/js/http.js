UAM.Http = {
	request: function (url, method, requestData, callback) {
		var httpRequest = new XMLHttpRequest();
		if (!httpRequest) return;
		httpRequest.open(method,url,true);
		httpRequest.responseType = 'json';

		httpRequest.onreadystatechange = function () {
			var status;
			var data;
			if (httpRequest.readyState == 4) {
				status = httpRequest.status;
				if (status == 200) {
					data = JSON.parse(httpRequest.responseText);
					requestData && requestData(data);
				} else {
					callback && callback(status);
				}
			}
		};

		httpRequest.onload = function () {
			var status = httpRequest.status;
			if (status == 200) {
				requestData && requestData(httpRequest.response);
			} else {
				callback && callback(status);
			}
		};

		httpRequest.send();
	}
};