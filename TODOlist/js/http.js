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

		httpRequest.open(method,url,true);
		// httpRequest.setRequestHeader("Content-Type","application/json"); nie działa :(
		//httpRequest.setRequestHeader("Content-Length", json.length);
		httpRequest.onprogress = onProgress;
		httpRequest.onload = onLoad;
		httpRequest.onerror = onError;
		httpRequest.onreadystatechange = function () {

			if (httpRequest.readyState !== 4) return;
			if (httpRequest.status === 200) {
				if (method === 'GET') {
					var data = JSON.parse(httpRequest.responseText);
					requestData && requestData(data);
				}
				if (method === 'POST') {
					console.log(requestData);
					var json = JSON.stringify(requestData);
					console.log(json);
				}
			} else {
				callback && callback(status);
				console.log(callback);
			}
		};

		httpRequest.send();

	}
};