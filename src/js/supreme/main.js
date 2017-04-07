// pages functions
const
	validUrl = {
		item: url => {
			if (url.indexOf("http://www.supremenewyork.com/shop/") != -1) {
				let forbidden = ['cart', 'all', 'sizing', 'shipping', 'terms', 'faq']
				var path = location.href.split('/')[4]
				if (forbidden.includes(path))
					return false
				else 
					return true
			} else {
				return false
			}
		},
		keyword: url => url.split("#")[1] != undefined ? true : false,
		quickCheckout: url => url.indexOf("/checkout") != -1 ? true : false
	},
	pageAction = {

		createBuyButton: () => {
			const buttons = {
				addCart: document.getElementById('add-remove-buttons') ? document.getElementById('add-remove-buttons') : false,
				quickBuy: createQuickBuyButton()
			}
			if (buttons.addCart) {
				var className = buttons.addCart.childNodes[0].className
				if(className.indexOf("sold-out") == -1 && className != "button remove")
					buttons.addCart.insertBefore(buttons.quickBuy, buttons.addCart.childNodes[2])
			}
		},
		autoCheckout: () => {
			chrome.runtime.sendMessage({msg: "params"}, res => {
				if (res["autoFill"])
					fillCheckout()
			})
		}

	},
	_submitForm = () => {
		$.ajax({
			type: 'POST',
			url: $('#cart-addf').attr('action'),
			dataType: 'json',
			data: $('#cart-addf').serialize(),
			success: function(rep) {
				if (rep && rep.length) {
					chrome.runtime.sendMessage({msg: "cop", id: location.href.split("#")[1], rep: "ok"})
				}
			},
			error: function() {
				_submitForm()
			}
		})
	}

//main functions
function runKeyword() {
	
	var key = location.href.split("#")[1]
	
	chrome.runtime.sendMessage({msg: "keywordsData", id: key}, rep => {

		var sizeWanted = rep["size"]
		var sizeForm = document.getElementById("size")
		
		for(var index in sizeForm) {
			index = parseInt(index)
			var html = sizeForm[index] != undefined ? sizeForm[index].innerHTML : sizeWanted
			if(html == sizeWanted || sizeWanted == "0") {

				//check if size input exist
				if(sizeForm[index])
					sizeForm.value = sizeForm[index].value

				_submitForm()
				break
			 	
			} else if (index === sizeForm.length - 1) {
				chrome.runtime.sendMessage({msg: "params"}, res => {
					if (res["nextSize"])
						_submitForm()
					else 
						chrome.runtime.sendMessage({msg: "cop", id: key})
				})
				break
			}
		}
	})
}

function _init() {
	if (validUrl.item(location.href) && validUrl.keyword(location.href)) {
		runKeyword()
	}
	else if (validUrl.quickCheckout(location.href)) {

		chrome.runtime.sendMessage({msg: "params"}, res => {
			if (document.getElementById('order_billing_name') && res["autoFill"] && res["retryOnFail"])
				pageAction.autoCheckout()
			else if (document.getElementById('order_billing_name').value.length == 0 && res["autoFill"])
				pageAction.autoCheckout()
		})

	} else {
		//create buy button if is not here
		setInterval(_ => {
			if (!document.getElementById("quickbuy") && validUrl.item(location.href)) {
				pageAction.createBuyButton()
			}
		}, 100)

	}
}

chrome.runtime.sendMessage({msg: "params"}, res => {
   if (res["enabled"]) _init()
})