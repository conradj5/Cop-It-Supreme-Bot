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