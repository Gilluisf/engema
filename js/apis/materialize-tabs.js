class MaterializeTabs {
    /**
     * Initializes the MaterializeTabs instance.
     * @param {string} tabsSelector - The CSS selector for the tabs container.
     */
    constructor(tabsSelector) {
        // Select the tabs element from the DOM
        this.tabs = document.querySelector(tabsSelector);

        // Initialize the Materialize tabs instance
        this.tabsInstance = M.Tabs.init(this.tabs);
    }

    /**
     * Disables a specific tab by its selector.
     * @param {string} tabSelector - The selector for the tab to disable (e.g., '#tab1').
     */
    disableTab(tabSelector) {
        // Find the tab element by its href attribute
        const {
            parentElement
        } = this.tabs.querySelector(`a[href="${tabSelector}"]`)

        // Add the 'disabled' class to it
        parentElement.classList.add('disabled');

    }
    enableTab() {
        // Find the tab element by its href attribute
        const tabElement = this.tabs.querySelector(`a[href="${tabSelector}"]`)

        tabElement.removeAttribute('disabled');

    }

    /**
     * Selects a specific tab by its selector.
     * @param {string} tabSelector - The selector for the tab to select (e.g., '#tab2').
     */
    selectTab(tabId) {
        this.tabsInstance.select(tabId);

    }

    /**
     * Disables all tabs.
     */
    disableAllTabs() {
        // Select all tab elements within the tabs container
        const tabElements = this.tabs.querySelectorAll('li.tab');

        // Add the 'disabled' class to each tab element
        tabElements.forEach(tab => tab.classList.add('disabled'));
    }
    /**
     * Removes a specific tab by its selector.
     * @param {string} tabSelector - The selector for the tab to remove (e.g., '#tab1').
     */
    deleteTab(tabSelector) {
        // Find the tab element by its href attribute
        const tabElement = this.tabs.querySelector(`a[href="${tabSelector}"]`);
        if (tabElement && tabElement.parentElement) {
            // Remove the parent <li> element
            tabElement.parentElement.remove();
        }

        // Find the corresponding tab content element
        const tabContentElement = document.querySelector(tabSelector);
        if (tabContentElement) {
            // Remove the tab content element
            tabContentElement.remove();
        }

        // Re-initialize the tabs instance to reflect the changes
        this.tabsInstance = M.Tabs.init(this.tabs);
    }
}
/*
// Usage example
document.addEventListener('DOMContentLoaded', function() {
    // Create a new instance of MaterializeTabs with the selector for the tabs container
    const tabs = new MaterializeTabs('.tabs');

    // Disable the tab with selector '#tab1'
    tabs.disableTab('#tab1');

    // Select the tab with selector '#tab2'
    tabs.selectTab('#tab2');

    // Disable all tabs
    tabs.disableAllTabs();
});*/