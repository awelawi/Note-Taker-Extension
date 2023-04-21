//this method obtains the current windows tab name
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tabName = tabs[0].title;
    // Send the tab name to the content script
    chrome.tabs.sendMessage(tabs[0].id, { tabName: tabName });
});
