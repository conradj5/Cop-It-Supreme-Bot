const 
	generateExpireDate = () => {
		const expireMonth = document.getElementById("card_month")
		for (var m = 1; m <= 12; m++) {
			m = m.toString()
			m = m.length < 2 ? "0" + m : m
			var option = document.createElement("option")
			option.text = m, option.value = m
			expireMonth.add(option)
		}

		const expireYear = document.getElementById("card_year"), currentYear = new Date().getFullYear()
		for (var y = currentYear; y <= currentYear + 10; y++) {
			var option = document.createElement("option")
			option.text = y, option.value = y
			expireYear.add(option)
		}
	},
	Data = {
		fields: ["name",
				"card_type",
				"email",
				"card_number",
				"phone",
				"card_month",
				"card_year",
				"address",
				"cvv",
				"city",
				"zip",
				"country"],
		fill: () => {
			document.getElementById("cgu").checked = JSON.parse(localStorage['cgu'])
			Data.fields.forEach(data => {
				if (typeof JSON.parse(localStorage["data"])[data] !== "undefined")
					document.getElementById(data).value = JSON.parse(localStorage["data"])[data]
			})
		},
		checkIfFilled: cb => {
			if (document.getElementById("cgu").checked === false)
				cb(gM("dataErrorTos"))
			else {
				let error = ''
				Data.fields.forEach((data, index, array) => {
					if (document.getElementById(data).value == '') error += gM("emptyField", data)
					if (index === array.length - 1) cb(error)
				})
			}
		}
	},
	editData = () => {
		Data.checkIfFilled(r => {
			if (r.length == 0) {
				dsp(gM("dataSuccess"), "success")
				var dataObj = {}
				Data.fields.forEach((data, index, array) => {
					dataObj[data] = document.getElementById(data).value
					if (index === array.length - 1) 
						localStorage["data"] = JSON.stringify(dataObj)
				})
			} else dsp(r, "error")		
		})
	}

document.getElementById("cgu").onclick = _ => {
	localStorage['cgu'] = document.getElementById("cgu").checked
}
document.getElementById("edit").onclick = editData

const 
	keywordfields = ['category', 'keyword', 'color', 'size'],
	differentSize = {"pants":
							"<option value=\"30\">30</option>" + 
							"<option value=\"32\">32</option>" +
							"<option value=\"34\">34</option>" +
							"<option value=\"36\">36</option>" +
							"<option value=\"0\">" + gM("noMatter") + "</option>",
				    "shoes":
							"<option value=\"6\">6</option>" + 
							"<option value=\"7\">7</option>" +
							"<option value=\"8\">8</option>" +
							"<option value=\"8.5\">8.5</option>" +
							"<option value=\"9.5\">9.5</option>" +
							"<option value=\"10\">10</option>" +
							"<option value=\"11\">11</option>" +
							"<option value=\"11.5\">11.5</option>" +
							"<option value=\"0\">" + gM("noMatter") + "</option>",
					"default":
							"<option value=\"Small\">Small</option>" +
	                        "<option value=\"Medium\">Medium</option>" +
	                        "<option value=\"Large\">Large</option>" +
	                        "<option value=\"XLarge\">XLarge</option>" +
	                        "<option value=\"0\">" + gM("noMatter") + "</option>"},
	checkIsOnJSON = (json, value) => {
	    for (key in json) {
	        if (key === value)
	            return true
	    }
	    return false
	},
	editKeyword = () => {
		var keywordData = {}, error = ""
		Array.prototype.forEach.call(document.getElementsByClassName("kwf"), (element, divIndex, divArray) => {
			var ID = parseInt(element.id.split("[")[1])
			keywordData[ID] = {}
			//check if fields are filled
			keywordfields.forEach((data, fieldIndex, fieldArray) => {
				var fieldName = data + "[" + ID + "]"
				if (document.getElementById(fieldName).value == '') {
					error += gM("emptyField", fieldName)
				} else {
					keywordData[ID][data] = document.getElementById(fieldName).value
				}
				if (divIndex === divArray.length - 1 && fieldIndex === fieldArray.length - 1) {
					if (error.length == 0) {
						localStorage["keyword"] = JSON.stringify(keywordData)
						dsp(gM("keywordsUpdated"), "success")
					} else dsp(error, "error")
				}
			})
		})
	},
	getNextFormId = () => {
		if (document.getElementById("addKeywordForm").previousSibling.data !== undefined)
			return parseInt(document.getElementById("addKeywordForm").previousSibling.previousSibling.id.split("[")[1]) + 1
		else
			return parseInt(document.getElementById("addKeywordForm").previousSibling.id.split("[")[1]) + 1
	}

function addKeywordForm(id) {
	var formId = Number.isInteger(parseInt(id)) ? id : getNextFormId(),
		newForm = document.createElement('div'),
		deleteLine = formId != 0 ? '<tr><td colspan="2""><center><button class="btn btn-sm btn-danger" id="removeForm['+formId+']">X</button></center></td</tr>' : ''
	newForm.className = "col-lg-6 kwf"
	newForm.id = "keywordForm["+formId+"]"
	newForm.innerHTML = '<table class="table table-bordered table-sm table-striped" style="margin-top: 20px;">' +
                            '<tbody>' +
                                '<tr><td>' + gM("category") + '</td><td>' +
                                    '<select class="form-control" id="category['+formId+']">' +
                                        '<option value="jackets">jackets</option>' +
                                        '<option value="shirts">shirts</option>' +
                                        '<option value="tops_sweaters">tops/sweaters</option>' +
                                        '<option value="sweatshirts">sweatshirts</option>' +
                                        '<option value="pants">pants</option>' +
                                        '<option value="t-shirts">t-shirts</option>' +
                                        '<option value="hats">hats</option>' +
                                        '<option value="bags">bags</option>' +
                                        '<option value="shoes">shoes</option>' +
                                        '<option value="accessories">accessories</option>' +
                                        '<option value="skate">skate</option>' +
                                    '</select>' +
                                '</td></tr>' +
                                '<tr><td>' + gM("keywordsField") + '</td><td><input class="form-control" id="keyword['+formId+']" type="text"/></td></tr>' +
                                '<tr><td>' + gM("color") + '</td><td><input class="form-control" id="color['+formId+']" type="text"/></td></tr>' +
                                '<tr><td>' + gM("size") + '</td><td>' +
                                    '<select class="form-control" id="size['+formId+']">' +
                                        '<option value="Small">Small</option>' +
                                        '<option value="Medium">Medium</option>' +
                                        '<option value="Large">Large</option>' +
                                        '<option value="XLarge">XLarge</option>' +
                                        '<option value=\"0\">' + gM("noMatter") + '</option>' +
                                    '</select>' +
                                '</td></tr>' +
                                deleteLine +
                            '</tbody>' +
                        '</table>'

    //add the form
	document.getElementById("keywordsForm").insertBefore(newForm, document.getElementById("addKeywordForm"))

	//fill form
	if (Number.isInteger(parseInt(id))) {
		var data = JSON.parse(localStorage["keyword"])[id]
		keywordfields.forEach(name => {
			var field = name + "[" + id + "]"
			if (name == "size") {
				let category = JSON.parse(localStorage["keyword"])[formId]["category"]
				if (checkIsOnJSON(differentSize, category))
					document.getElementById(field).innerHTML = differentSize[category]
				else
					document.getElementById(field).innerHTML = differentSize["default"]
			}
			document.getElementById(field).value = data[name]
		})
	}

	//change size list
	document.getElementById("category["+formId+"]").onchange = () => {
		let category = document.getElementById("category["+formId+"]").value
		if (checkIsOnJSON(differentSize, category))
			document.getElementById("size["+formId+"]").innerHTML = differentSize[category]
		else
			document.getElementById("size["+formId+"]").innerHTML = differentSize["default"]
	}
	//delete event, we can't delete keyword with id 0
	if (formId != 0)
		document.getElementById('removeForm['+formId+']').onclick = () => 
			document.getElementById("keywordsForm").removeChild(document.getElementById("keywordForm["+formId+"]"))
}


//for each keywords set, we show forms
for(var key in JSON.parse(localStorage["keyword"]))
	addKeywordForm(key)

document.getElementById('addKeywordButton').onclick = addKeywordForm
document.getElementById('editKeyword').onclick = editKeyword
const 
	paramsFields = ["startTime", "retrykeyword"],
	checkBox = ["enabled", "checkCart", "autoFill", "retryOnFail", "nextSize", "removeCaptcha"],
	//format time to hh:mm:ss. ex: 22:14:45 
	formatTime = (time, callback) => {
		time = time.toString()
		    if (isNaN(parseInt(time)))
				callback("00:00:00")
			else {
				if (time.length < 6) {
					while(time.length != 6)
							time += "0"
				}
				let hours = parseInt(time.substr(0,2)) > 23 ? "00" : time.substr(0,2)
				let minutes = parseInt(time.substr(2,2)) > 59 ? "00" : time.substr(2,2)
				let seconds = parseInt(time.substr(4,2)) > 59 ? "00" : time.substr(4,2)
				time = hours + ":" + minutes + ":" + seconds
				callback(time)
			}
	},
	updateParams = () => {

		var dataObj = {}
		Array.prototype.push.apply(paramsFields, checkBox)

		paramsFields.forEach((data, index, array) => {

			var value = document.getElementById(data).type == "checkbox" ? document.getElementById(data).checked : document.getElementById(data).value
			
			if(value != "")
					dataObj[data] = value

			if (index === array.length - 1) {
				//on formate le startTime a la fin

				var rawTime = dataObj["startTime"].replace(/:/g, "")

				formatTime(rawTime, time => {

					dataObj["startTime"] = time
					localStorage["params"] = JSON.stringify(dataObj)

				})
			}
		})
		dsp(gM("paramsSuccess"), "success")
	}

//fill inputs with localStorage
Array.prototype.push.apply(paramsFields, checkBox)
paramsFields.forEach(data => {
	if (typeof JSON.parse(localStorage["params"])[data] !== "undefined") {
		if (document.getElementById(data).type != "checkbox")
			document.getElementById(data).value = JSON.parse(localStorage["params"])[data]
		else
			document.getElementById(data).checked = JSON.parse(localStorage["params"])[data]
	}
})

document.getElementById('editParams').onclick = updateParams
const
	//display modal with success/error message
	dsp = (msg, type) => {
		if(type != "success") type = "danger"
		document.getElementById("modal-text").innerHTML = msg
		document.getElementById("close-modal").className = "btn btn-"+type
		$('#important-msg').modal()  
	},
	//change active tab with content
	setActiveTab = tab => {
		const navlink = document.getElementsByClassName('nav-link')
		Array.prototype.forEach.call(navlink, element => {
			element.className = "nav-link"
		})
		tab = tab.indexOf("#") == -1 ? tab : tab.split("#")[1]
		if (document.getElementsByClassName("visible")[0] !== undefined)
			document.getElementsByClassName("visible")[0].className = "invisible"
		document.getElementById(tab).className = "visible"
		document.querySelectorAll('[href="#'+tab+'"]')[0].className = "nav-link active"
		translate[tab]()
	},
	//init all settings page
	 _init = () => {
		generateExpireDate()
		Data.fill()
		location.hash == "" ? setActiveTab("main") : setActiveTab(location.hash)
	}

window.onhashchange = () => setActiveTab(location.hash)

$('.version').html('v' + chrome.runtime.getManifest().version)

document.body.onload = _init

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