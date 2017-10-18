/*
 * The reFreshes object, manages making pages live & storing the live setting.
 */
function reFreshes() {
    // The object of pages we have marked as live.
    this.reFreshes = {};
    this.i18n = new i18nHelper();
    this.refresh();
};

// Refreshes reFreshes from database.
reFreshes.prototype.refresh = function () {
    this.reFreshes = settings.get('reFreshes');
    if (settings.get('reFreshes') == null) {
        this.reFreshes = {};
    }
};

// Wipes the database of all live pages.
reFreshes.prototype.removeAll = function () {
    settings.set('reFreshes', {});
};

/*
 * Transforms the URLS into the type the users have configured.
 */
reFreshes.prototype.cleanURL = function (url) {
    settings.refresh();
    var a = document.createElement('a');
    a.href = url;

    // If they only want entire hosts, just return the host name
    if (settings.options.entire_hosts == true) {
        if (a.hostname != '') {
            return a.hostname;
        }
        // Fallback for file:// protocol if there isn't one.
        return 'Local Files (file://)';
    }

    /*
     * Strips the hash from the URL. 
     * See https://developer.mozilla.org/en-US/docs/DOM/window.location#Properties for more info about the properties
     */
    if (settings.options.ignore_anchors == true) {
        if (a.port === "" || a.port === 80 || a.port === 443) {
            return a.protocol + '//' + a.hostname + a.pathname + a.search;
        } else {
            return a.protocol + '//' + a.hostname + ":" + a.port + a.pathname + a.search;
        }
    }

    return url;
}

// Deletes a url from reFreshes list.
reFreshes.prototype.remove = function (tab) {
    this.refresh();
    tab.url = this.cleanURL(tab.url);

    delete this.reFreshes[tab.url];
    settings.set('reFreshes', this.reFreshes);
    this.stop(tab);
};

// Add page to ReFreshes.
reFreshes.prototype.add = function (tab) {
    this.refresh();
    tab.url = this.cleanURL(tab.url);

    this.reFreshes[tab.url] = true;
    settings.set('reFreshes', this.reFreshes);
    this.start(tab);
};

// Check if the url is on the reFreshes list.
reFreshes.prototype.isLive = function (url) {
    this.refresh();
    url = this.cleanURL(url);

    if (typeof this.reFreshes[url] != "undefined") {
        return true;
    }
    return false;
};

// Turns on the R3Fresh on the tab.
reFreshes.prototype.start = function (tab) {
    settings.refresh();

    // Update the Icon
    chrome.browserAction.setBadgeText({
        text: chrome.i18n.getMessage('@live'),
        tabId: tab.id
    });
    chrome.browserAction.setTitle({
        title: this.i18n.disable_on(),
        tabId: tab.id
    });

    // Make the page Live
    executeScriptsInSerial(tab.id, [
        {
            code: 'window.$reFreshConfig = ' + JSON.stringify(settings.options) + '; window.$reFresh = false;'
        },
        {
            file: 'js/injected/live_resource.js'
        },
        {
            file: 'js/injected/live_css_resource.js'
        },
        {
            file: 'js/injected/live_img_resource.js'
        },
        {
            file: 'js/injected/refresh.js'
        }
  ]);
}

// Turns off live page on the tab.
reFreshes.prototype.stop = function (tab) {
    // Stop live page running if it's there.
    chrome.tabs.executeScript(tab.id, {
        code: 'if(typeof window.$reFresh != "undefined"){ window.$reFresh.options.enabled = false; }'
    });

    this.setEnableOnText(tab);
}

reFreshes.prototype.setEnableOnText = function (tab) {
    chrome.browserAction.setBadgeText({
        text: '',
        tabId: tab.id
    });
    chrome.browserAction.setTitle({
        title: this.i18n.enable_on(),
        tabId: tab.id
    });
}


var refreshes = new reFreshes();
