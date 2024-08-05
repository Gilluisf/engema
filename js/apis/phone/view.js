class PhoneView extends Survey.Model {
	constructor(){
		var json = {
			elements:[
			{
				type: "number",
                name: "phoneNumber",
                title: "Telefone de pagamentos:",
                isRequired: true
			}
			]
		}
		super(json)

		$("#payment-phone-number").Survey({
            model: this
        });
	}
}