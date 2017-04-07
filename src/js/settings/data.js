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
