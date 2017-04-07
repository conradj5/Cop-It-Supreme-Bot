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