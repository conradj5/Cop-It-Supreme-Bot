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