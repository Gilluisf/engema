class EasyEvents {
    events = []
    on(event, callback) {
        this.events.push({
            'event': event,
            'callback': callback
        });
    }
    off(event, callback) {

        this.events = this.events.filter(currentEvent => {

            if (callback) {
                if (currentEvent.callback == callback && event == currentEvent.event) return false
            } else {
                return currentEvent.event != event
            }
        })
    }
    /**
     * Triggers an event and passes all arguments to the registered callbacks.
     * 
     * @param {string} event - The name of the event to trigger.
     * @param {...any} args - The arguments to pass to the event callbacks.
     */
    triggerEvent(event, ...args) {
        // Filter the events to find all callbacks registered for the specified event.
        const eventCallbacks = this.events.filter(evt => evt.event === event);

        // If no callbacks are found for the event, log a warning message with the event name and arguments.
        if (eventCallbacks.length == 0) {
            console.warn(`Event ${event} not found`, ...args);
        }

        // Iterate over the registered callbacks and invoke each with the provided arguments.
        eventCallbacks.forEach(evt => evt.callback(...args));
    }

}