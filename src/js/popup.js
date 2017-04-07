const
	keywordData = JSON.parse(localStorage["keyword"]),
	settings = JSON.parse(localStorage["params"]),
	enabledExtension = settings["enabled"],
	start = document.getElementById("start"),
	//check if keywords are configured
	isKwInstalled = () => keywordData[0]['keyword'] != '' ? true : false,
	startBot = () => {
		if (localStorage['data'].length > 4) {

			chrome.runtime.sendMessage({msg: 'startBot'})

			var currentDate = new Date()
			var minutes = currentDate.getMinutes().toString().length < 2 ? "0" + "" + currentDate.getMinutes() : currentDate.getMinutes()
			var seconds = currentDate.getSeconds().toString().length < 2 ? "0" + "" + currentDate.getSeconds() : currentDate.getSeconds()
			var nowTime = parseInt(currentDate.getHours() + "" + minutes + "" + seconds)

			if (!isNaN(parseInt(settings["startTime"].replace(/:/g, ""))) && nowTime < parseInt(settings["startTime"].replace(/:/g, "")))
				$("#loader").html(gM("startAt", settings["startTime"]))


			$("#loader").html("<u>" + gM("loader") + "</u>")
			$("#loader").fadeIn("fast")

			start.className = 'button disabled'
			start.disabled = true
			start.onclick = null
			
		} else {
			alert(gM('fillDatas'))
		}
	}

if (isKwInstalled() && enabledExtension) {
	start.className = 'button start'
	start.disabled = false
	start.onclick = startBot
}

document.getElementById("nbkws").innerHTML = (() => {
	let nb = keywordData[0]['keyword'] != '' ? Object.keys(keywordData).length : 0

	return '<b>' + gM('nbKeywords', nb) +'</b>'
})()

document.getElementById('settings').onclick = () => chrome.tabs.create({ url: location.href.replace("popup", "settings") })
document.getElementById('docu').onclick = () => chrome.tabs.create({ url: "https://copit.fr/doc"})

start.value = gM("startVal")
document.getElementById('settings').value = gM("settings")
document.getElementById('docu').value = gM('documentation')