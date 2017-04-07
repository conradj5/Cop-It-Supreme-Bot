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