class AppController {
    constructor() {
        this.booksController = new BooksController();
        this.pricesController = new PricesController();
        this.usersController = new UsersController();
        this.profileController = new ProfileController;
        this.subscriptionsController = new SubscriptionsController(); // Assuming this is defined somewhere
        this.chatController = new ChatController();
    }

    async initialize() {
        return new Promise((resolve, reject) => {
            LoadingModal.show()
            firebase.auth().onAuthStateChanged(async (user) => {
                if (user) {


                    await this.handleUser(user);
                    LoadingModal.hide()
                    resolve()
                } else {
                    reject()
                    location.href = 'index.html'
                }


            });
        })

    }
    get personalData() {
        return this.profileController.model.personalData.get()
    }
    async handleUser(user) {
        const personalData = await this.profileController.model.personalData.get();
        console.log(personalData);

        const {
            email,
            uid
        } = user;
        const data = {
            email,
            ...personalData
        };

        /*const pageTitle = {
            admin: 'Painel de Gestão',
            student: 'Estudante',
            tutor: 'Tutor'
        };*/

        switch (personalData.type) {
            case 'admin':
                await this.handleAdmin();
                break;
            case 'student':
                await this.handleStudent(uid, data);
                break;
            case 'tutor':
                await this.handleTutor(uid, personalData);
                break;
        }

        if (/admin|student/.test(personalData.type)) {
            await this.listenForModelChanges();
        }

        this.setupTabs(personalData.type);

        /*var titleElement = document.querySelector(" a.brand-logo.center")
        titleElement.innerText = pageTitle[personalData.type]*/



    }

    async handleAdmin() {

        addSubscriptionButton.style.display = 'none';
        this.subscriptionsController.view.hidePrintButton = true;

        this.pricesController.init();
        this.usersController.view.subjects.choices = await this.pricesController.model.getSubjectsOnly()

        this.usersController.model.listenChange();
        let {
            rootElement
        } = this.usersController.view;
        let usersContainer = document.querySelector('#users');
        usersContainer.append(rootElement);


        this.messagesDeleter = new MessagesDeleter
    }

    async handleStudent(uid, data) {
        this.subscriptionsController.view.hideApproveButton = true;
        this.subscriptionsController.model.filterData = {
            uid
        };

        this.subscriptionsController.view.user = data;
        await this.profileController.init();

        var lastSubscription = await this.subscriptionsController.model.getLastApprovedSubscription();

        if (lastSubscription && lastSubscription.remainingDays < 5) this.subscriptionsController.view.notifySubscriptionExpiry()


        this.booksController.model.grade = lastSubscription ? lastSubscription.grade : null

        this.booksController.view.addBookButton.style.display = 'none';
        this.booksController.view.showDeleteBookButton = false;



        var prices = await this.pricesController.model.getAll();
        addSubscription.view.prices = prices;
        PricingCalculator.prices = prices;

        if (await this.canInitChat()) {
            if (data.type == 'student') {
                this.chatController.model.tutorSubjects = Object.values(lastSubscription.subjects)
            }
            await this.initChat(uid, data)



        }

    }
    async _canStudentInitChat() {
        var lastSubscription = await this.subscriptionsController.model.getLastApprovedSubscription();
        let currentTime = Date.now()


        if (lastSubscription && lastSubscription.state == 'approved' && lastSubscription.expirationDate > currentTime && lastSubscription.teachingModel == 'online') {

            return true
        } else {
            return false
        }
    }
    async _canStudentSeeBooks() {
        var lastSubscription = await this.subscriptionsController.model.getLastApprovedSubscription();

        if (!lastSubscription) return false

        let subscriptionIsApproved = lastSubscription.state == 'approved'
        let subscriptionHasNotExpired = Date.now() < lastSubscription.expirationDate
        let teachingModelIsOnline = lastSubscription.teachingModel == 'online'

        if (subscriptionIsApproved && subscriptionHasNotExpired && teachingModelIsOnline) {
            return true
        } else {
            false
        }
    }
    async canSeeBooks() {
        var personalData = await this.profileController.model.personalData.get()
        if (personalData.type == 'admin') return true
        if (personalData.type == 'tutor') return false

        return this._canStudentSeeBooks()

    }
    async canInitChat() {
        var personalData = await this.profileController.model.personalData.get()

        if (personalData.type == 'tutor' && typeof personalData.subjects == 'object') {
            return true
        } else {
            let canInit = this._canStudentInitChat()
            return canInit
        }
    }
    async initChat(uid, personalData) {

        this.chatController.uid = uid;
        this.chatController.model.type = personalData.type;
        await this.chatController.init()

        this.chatController.model.listenForNewMessages();
        let tutorsElement = document.querySelector("#tutors");
        tutorsElement.append(this.chatController.view.contactsListElement);
    }

    async handleTutor(uid, personalData) {
        await this.profileController.init();

        let subjects = await this.pricesController.model.getSubjectsOnly();
        this.profileController.view.subjects.choices = subjects;

        let subjectsArray = Object.values(personalData.subjects || []);
        let distinctSubjects = [...new Set(subjectsArray)]
        this.profileController.view.subjects.value = distinctSubjects
        await this.initChat(uid, personalData)
    }

    async listenForModelChanges() {
        this.pricesController.model.listenChange();
        var personalData = await this.personalData
        if (personalData.type == 'admin') {
            this.booksController.model.listenChange();
        } else if (personalData.type == 'student' && await this._canStudentSeeBooks()) {
            this.booksController.model.listenChange();
        }

        var subscriptionsInitialized = false
        this.profileController.model.onChange(data => {
            if (data && !subscriptionsInitialized) {
                subscriptionsInitialized = true
                this.subscriptionsController.model.listenChange();
            }
        })

    }


    async setupTabs(userType) {
        const tabs = new MaterializeTabs('.tabs');
        if (userType === 'admin') {
            tabs.deleteTab('#tutors')
            tabs.deleteTab('#profile');
        } else if (userType === 'tutor') {
            tabs.deleteTab('#library');
            tabs.deleteTab('#subscriptions');
        }


        if (userType == 'student' || userType == 'tutor') {
            tabs.deleteTab('#prices');
            tabs.deleteTab('#users')
            if (!await this._canStudentSeeBooks()) tabs.deleteTab('#library')
            if (!await this._canStudentInitChat()) tabs.deleteTab('#tutors')
        }
    }
}