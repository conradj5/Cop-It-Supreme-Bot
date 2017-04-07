const
	createQuickBuyButton = () => {
		var btn = document.createElement("input")
		btn.id = "quickbuy"
	    btn.type = "button"
	    btn.value = gM("instantBuy")
	    btn.className = "button"
	    btn.style = "background-color: #000000; border-color: #000000; margin-top: 30px;"
	    btn.onclick = clickOnBuy
	    return btn
	},
	clickOnBuy = () => {
		var article = {
			name: document.title.split("Supreme: ")[1],
			price: (() => {
				for (var span in document.body.getElementsByTagName("span")) {
					span = document.body.getElementsByTagName("span")[span]
					if (span.getAttribute("itemprop")) {
						if (span.getAttribute("itemprop") == "price")
							return span.innerText
					}
				}
			})(),
			size: (() => {
				var s = document.getElementById("size")
				if (s.type != "hidden")
					return s.options[s.selectedIndex].text
				else
					return 0
			})()
		}

		if (confirm(gM("confirmDialog", [article.name, article.size, article.price])) == true) {

			$.ajax({
				type: 'POST',
				url: $('#cart-addf').attr('action'),
				dataType: 'json',
				data: $('#cart-addf').serialize(),
				success: function(rep) {
					if (rep && rep.length) {
						location.href = "https://www.supremenewyork.com/checkout"
					}
				}
			})
			
		}
	}
const fillCheckout = () => {
	chrome.runtime.sendMessage({msg: "privateData"}, function(data) {
		const r = JSON.parse(data)
		
		chrome.runtime.sendMessage({msg: "params"}, function(settings) {

			//this remove captcha but not stable, payment failed sometimes
			if (settings.removeCaptcha)
				$(".g-recaptcha").remove()

			$('#order_billing_name').val(r.name)
			$('#order_billing_country').val(r.country)
			$('#order_tel').val(r.phone)
			$('#order_email').val(r.email)
			$('#bo').val(r.address)
			$('#order_billing_city').val(r.city)
			$('#order_billing_zip').val(r.zip)
			$('#credit_card_type').val(r.card_type)
			$('#cnb').val(r.card_number)
			$('#vval').val(r.cvv)
			$('#credit_card_month').val(r.card_month)
			$('#credit_card_year').val(r.card_year)
			$(".icheckbox_minimal").click()
			$('[name=commit]').click()
		})
	})
}
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