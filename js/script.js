function badgeFormat(val) {
	val = parseInt(val);
	if (val > 9999) val = Math.round(val/1000)+'k';
	else if (val == 0) val = '';
	else if (val < -999) val = Math.round(val/1000)+'k';
	else val = val.toString();
	return val;
}

var updateChecker = function() {
	$.get('http://urban3p.ru/api/user/', function(response){
		var xml = $(response);
		if (xml.find('error').length == 0) {
			chrome.browserAction.setIcon({path:'img/icon_19.png'});
			localStorage.isLogin = 1;
			
			localStorage.mailCount = parseInt(xml.find('mailCount').text());
			
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
	});
}