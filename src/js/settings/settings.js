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
