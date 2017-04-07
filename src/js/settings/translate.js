/*
* Translation using chrome.i18n, languages are stored in _locales
* I know this is hard to understand lol just don't try to change anything here
*/

document.title = gM('settingsTitle')
document.getElementsByClassName("nav-link")[0].innerText = gM("navMain")
document.getElementsByClassName("nav-link")[1].innerText = gM("navData")
document.getElementsByClassName("nav-link")[2].innerText = gM("navKeywords")
document.getElementById("close-modal").innerText = gM("closeModal")

const translate = {
	main: () => {
		document.getElementById("main").childNodes[0].innerText = gM("mainTitle")
		document.getElementById("main").childNodes[1].innerHTML = gM("mainDesc")
		document.getElementById("main").childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerText = gM("params0")
		document.getElementById("main").childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerText = gM("params1")
		document.getElementById("main").childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].innerText = gM("params2")
		document.getElementById("main").childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[3].childNodes[0].innerText = gM("params3")
		document.getElementById("main").childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[4].childNodes[0].innerText = gM("params4")
		document.getElementById("main").childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[5].childNodes[0].innerText = gM("params5")
		document.getElementById("main").childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[6].childNodes[0].innerText = gM("params6")
		document.getElementById("main").childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[7].childNodes[0].innerText = gM("params7")
		document.getElementById("main").childNodes[2].childNodes[0].childNodes[1].childNodes[0].innerText = gM("submit")
	},
	data: () => {
		//Shipping
		document.getElementById("edit").innerText = gM("dataEdit")
		document.getElementById("data").childNodes[0].innerText = gM("dataTitle")
		document.getElementById("data").childNodes[1].childNodes[0].childNodes[0].innerText = gM("dataShipping")
		document.getElementById("data").childNodes[1].childNodes[1].childNodes[0].innerText = gM("dataBilling")
		document.getElementById("data").childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText = gM("data0")
		document.getElementById("data").childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].innerText = gM("data1")
		document.getElementById("data").childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[2].childNodes[0].innerText = gM("data2")
		document.getElementById("data").childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[3].childNodes[0].innerText = gM("data3")
		document.getElementById("data").childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[4].childNodes[0].innerText = gM("data4")
		document.getElementById("data").childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[5].childNodes[0].innerText = gM("data5")
		document.getElementById("data").childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[6].childNodes[0].innerText = gM("data6")
		//Billing
		document.getElementById("data").childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText = gM("data7")
		document.getElementById("data").childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[0].innerText = gM("data8")
		document.getElementById("data").childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[2].childNodes[0].innerText = gM("data9")
		document.getElementById("data").childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[3].childNodes[0].innerText = gM("data10")
		document.getElementById("data").childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[4].childNodes[1].innerHTML = gM("data11")
	},
	keywords: () => {
		document.getElementById("editKeyword").innerText = gM("keywordsEdit")
		document.getElementById("keywords").childNodes[0].innerText = gM("navKeywords")
		document.getElementById("keywords").childNodes[1].innerHTML = gM("keywordsDesc")

	}
}