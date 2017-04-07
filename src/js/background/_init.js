["data", "params"].forEach(val => {
	if (typeof localStorage[val] !== "string") localStorage[val] = "{}"
})
if (typeof localStorage["keyword"] !== "string") localStorage["keyword"] = '{"0": {"category":"jackets", "keyword": "", "color": "", "size": "Small"}}'
if(localStorage['cgu'] === undefined) localStorage['cgu'] = false


var keywordData = JSON.parse(localStorage["keyword"])
var keywordID = []

var _initKeyword = _ => {
	var i = 0
	for (var key in keywordData) {
		keywordID[i] = key
		i++
	}
}

// getMessage for translation
function gM(msg, params=[]){
	params = typeof params != "object" ? params.toString().split() : params
	return chrome.i18n.getMessage(msg, params)
}