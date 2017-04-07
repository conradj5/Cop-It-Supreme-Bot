const 
	_startTheBot = retry => _ => {
		// this function check is a startTime is defined and start the bot
		var startTime = JSON.parse(localStorage["params"])["startTime"] != undefined ? JSON.parse(localStorage["params"])["startTime"] : '0'
		startTime = parseInt(startTime.replace(/:/g, ""))

		var waitTime = setInterval(_ => {

			var currentDate = new Date()
			var minutes = currentDate.getMinutes().toString().length < 2 ? "0" + "" + currentDate.getMinutes() : currentDate.getMinutes()
			var seconds = currentDate.getSeconds().toString().length < 2 ? "0" + "" + currentDate.getSeconds() : currentDate.getSeconds()
			var nowTime = parseInt(currentDate.getHours() + "" + minutes + "" + seconds)

			chrome.tabs.query({currentWindow: true, active: true}, tabs => {

	    		if(tabs[0].url.indexOf("supremenewyork.com") > -1) {
					if (startTime < nowTime) {
						//stop la boucle
						clearInterval(waitTime)
						//start the bot
						keywordData = JSON.parse(localStorage["keyword"])
						_initKeyword()
						return copById(0)
					}
				}
				else {
					clearInterval(waitTime)
					if(!retry) {
						if (startTime < nowTime)
							alert(gM("notOnSupreme"))
						else
							alert(gM("quitSupreme"))
					}
				}
				
			})
		}, 500)
	},
	updateTab = (url, callback) => {
		//update url of current tab
	    chrome.tabs.update({ url: url }, () => {
			chrome.tabs.onUpdated.addListener(function listenTab(tabId, info, tab) {
				if (tab.url.indexOf(url) > -1 && info.status == "complete") {
					chrome.tabs.onUpdated.removeListener(listenTab)
					callback()
				}
			})
		})
	},
	copById = id => {
		//cop by item id
		if (keywordData[id] != undefined) {
			var url = "http://www.supremenewyork.com/shop/all/" + keywordData[id]['category']
			updateTab(url, () => {
				//inject keyword.js to found item
				chrome.tabs.executeScript(null, { file: '/dist/js/keyword.js' }, function(){
					chrome.tabs.executeScript(null, {
					    code: 'find('+id+')'
					})
				})
			})
		}
	}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	switch(request.msg) {
		case 'isEnabled':
			sendResponse({enabled: JSON.parse(localStorage['enabled'])})
			break
		case 'params':
			sendResponse(JSON.parse(localStorage["params"]))
			break
		case 'privateData':
			sendResponse(localStorage['data'])
			break
		case 'startBot':
			_startTheBot()()
			break
		case 'cop': //handle when trying to cop item, if request.rep is here, copping is success
			var nextID = parseInt(request.id)+1

			if (keywordID[nextID] != undefined) //check if there are other item to cop
				copById(keywordID[nextID])
			else { //go checkout

				//get cookie to see how many items in cart
				chrome.cookies.get({url: "http://www.supremenewyork.com", name: "cart"}, cookie => {

					for (var index in keywordID) {

						index = parseInt(index)
					    var nbItemInCart = cookie ? parseInt(cookie.value[0]) : 0

						if (nbItemInCart > 0 || request.rep) {

							var url;

							if (JSON.parse(localStorage["params"])['checkCart'])
								url = "http://www.supremenewyork.com/shop/cart"
							else
								url = "https://www.supremenewyork.com/checkout"

							chrome.tabs.update({ url: url })

							break
						} else if (index === keywordID.length - 1) {
							//if no items found, try again
							if (JSON.parse(localStorage["params"])["retrykeyword"] > 0) 
								setTimeout(_startTheBot(true), parseInt(JSON.parse(localStorage["params"])["retrykeyword"]))
							else
								alert(gM("noItemFound"))
							break
						}
					}
				})
			}
			break
		case 'keywordsData': // @params: id => return array of keywords data from id
			sendResponse(JSON.parse(localStorage['keyword'])[request.id])
			break
	}
})
