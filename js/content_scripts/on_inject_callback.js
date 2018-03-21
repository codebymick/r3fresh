// When a page has loaded (This script is injected), we tell R3Fresh to start its job!
chrome.runtime.sendMessage( { action: "injected" } );
