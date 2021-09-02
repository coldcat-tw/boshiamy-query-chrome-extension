const INPUT_MAX_LENGTH = 10;

function doQuery(input) {
    const trimmedInput = processInput(input);
    let newUrl = "https://boshiamy.com/liuquery.php?f=1&q=" + trimmedInput;
    chrome.tabs.create({ url: newUrl });
}

function processInput(input) {
    // 1. only allow chinese characters and full width punctuations
    // 2. limit query string length to 10
    let replaced = input ? input.trim().replace(/[^\u4E00-\u9FA5\uFF01-\uFF5E]/g, '') : '';
    return replaced.length > INPUT_MAX_LENGTH ? replaced.substring(0, INPUT_MAX_LENGTH): replaced;
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: `查詢嘸蝦米編碼「%s」`,
        id: 'boshiamyQuery',
        contexts: ["selection"],
    })
});

chrome.contextMenus.onClicked.addListener(info => {
    if (info.menuItemId === 'boshiamyQuery' && info.selectionText) {
        doQuery(info.selectionText);
    }
});