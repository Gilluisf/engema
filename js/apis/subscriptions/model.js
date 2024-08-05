class SubscriptionsModel extends FirebaseDatabaseFolderModel {
    folder = 'subscriptions'
    constructor() {
        super()
    }

    async getLastApprovedSubscription() {
        function calculateDateDifferenceAsDays(expirationDate) {
            // Get the current date
            const currentDate = moment();

            // Get the expiration date from the parameter
            const expDate = moment(expirationDate);

            // Calculate the difference
            const difference = expDate.diff(currentDate);

            // Convert the difference to a human-readable format (e.g., days)
            const duration = moment.duration(difference);
            const days = duration.asDays();

            return days;
        }

        const subscriptions = await this.getAll()
        for (let key in subscriptions) {
            let subscription = subscriptions[key]
            subscription.subjects = Object.values(subscription.subjects)
            subscription.remainingDays = calculateDateDifferenceAsDays(subscription.expirationDate)
            if (subscription.state == 'approved') {
                return subscription
            }
        }

    }

    async approve(data) {


        function addMonthsToDate(months) {
            // Get the current date using moment
            let currentDate = moment();

            // Add the specified number of months
            let newDate = currentDate.add(months, 'months');

            // Return the new date as a timestamp
            return newDate.valueOf();
        }

        // Example usage:



        let {
            key,
            price
        } = data

        let state = 'approved'
        let expirationDate = addMonthsToDate(data.duration)


        let updates = {}
        updates[`/price`] = price
        updates[`/state`] = state
        updates[`/expirationDate`] = expirationDate

        return this.folderRef.child(key).update(updates);

    }

}