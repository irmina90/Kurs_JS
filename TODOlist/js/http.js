UAM.Http = {
	request: function (url, method, requestData, callback) {
		var httpRequest = new XMLHttpRequest();

		function onProgress(e) {
			var percentComplete = ( e.loaded / e.total )*100;
			console.log(percentComplete + '%');
		}
		function onError(e) {
			alert("Podczas pobierania dokumentu wystąpił błąd " + e.target.status + ".");
		}

		function onLoad(e) {
			console.log('Proszę czekać...');
		}

		if (method === 'GET') {
			httpRequest.open(method,url,true);
			httpRequest.onreadystatechange = function () {
				if (httpRequest.readyState !== 4) return;
				if (httpRequest.status == 200) {
					var data = JSON.parse(httpRequest.responseText);
					requestData && requestData(data);
				} else {
					callback && callback(status);
					console.log(callback);
				}
			};
			httpRequest.onprogress = onProgress;
			httpRequest.onload = onLoad;
			httpRequest.onerror = onError;
			httpRequest.send(null);
		}

		if (method === 'POST') {
			httpRequest.open(method,url,true);
			httpRequest.onreadystatechange = function () {
				if (httpRequest.readyState !== 4) return;
				if (httpRequest.status !== 200) {
					callback && callback(status);
					console.log(callback);
				}
			};
			httpRequest.onprogress = onProgress;
			httpRequest.onload = onLoad;
			httpRequest.onerror = onError;
			httpRequest.responseType="json";
			httpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			console.log(requestData);
			httpRequest.send(requestData);
		}

	}
};