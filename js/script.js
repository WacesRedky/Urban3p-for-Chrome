function badgeFormat(val) {
	val = parseInt(val, 10);
	if (val > 9999) val = Math.round(val/1000)+'k';
	else if (val == 0) val = '';
	else if (val < -999) val = Math.round(val/1000)+'k';
	else val = val.toString();
	return val;
}

var xhrSuccess = function(response) {
	var data = JSON.parse(response);
	if (!data.error) {
		chrome.browserAction.setIcon({path:'img/icon_19.png'});
		localStorage.isLogin = 1;
		
		localStorage.mailCount = parseInt(data.mailCount);
		
		chrome.browserAction.setBadgeText({
			text: badgeFormat(localStorage.mailCount)
		});
		chrome.browserAction.setBadgeBackgroundColor({
			color: [44, 36, 27, 255]
		});
	} else {
		localStorage.isLogin = 0;
		chrome.browserAction.setIcon({path:'img/icon_19_ds.png'});
	}
}

var xhrProcess = function() {
	try {
		if (this.readyState == 4) {
			if (this.status == 200) {
				xhrSuccess(this.responseText);
			} else {
				console.log("Не удалось получить данные:\n" + req.statusText);
			}
		}
	} catch(e) {

	}
}

var updateChecker = function() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://urban3p.ru/api/user/?format=json', true);
	xhr.onreadystatechange = xhrProcess;
	xhr.send(null);
}