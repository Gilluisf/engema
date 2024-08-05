

$('.tabs').tabs();
$('.sidenav').sidenav();
$('select').formSelect();


var user = new UserModel
user.email = 'gilpremise@gmailc.om'
user.password = 'Teste123'

const signOutButton = document.querySelector('#sign-out');
signOutButton.addEventListener('click',async  () => {
	
	var text = 'Tens a certeza que desejas terminar esta sessao?'
	var canSignOut = confirm(text)
	if (canSignOut) {
		LoadingModal.show()

		try {
			await firebase.auth().signOut()
			location.href = 'index.html'
		} catch (error) {
			console.error(error)
			M.toast({
				html: 'Erro ao terminar sessao' + error
			})
		}
	}

	LoadingModal.hide()
})


var options = {
	title: 'Fazer inscrição',
	fullscreen: false,
	openFullscreen: false
}

var addSubscriptionModal = new IziModal(options)
addSubscriptionModal.destroyOnClose = false

var addSubscription = new AddSubscriptionController()
addSubscription.view.selectAllSubjects()
addSubscriptionModal.setContent('<div class="subscription-form"></div>')

$(".subscription-form").Survey({
	model: addSubscription.view.survey

})
//Listen click on add subscription button and opens the modal
var addSubscriptionButton = document.querySelector("#make-subscription-btn");
addSubscriptionButton.addEventListener('click', () => addSubscriptionModal.open())


// Instantiate and initialize the AppController
const appController = new AppController();

addEventListener('load', async function () {
	await appController.initialize();
	console.log('Can see books '+ await appController.canSeeBooks())
})
