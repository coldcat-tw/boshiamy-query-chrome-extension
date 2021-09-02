const INPUT_MAX_LENGTH = 10;

function doQuery(input) {
    const trimmedInput = trimInput(input);
    let newUrl = "https://boshiamy.com/liuquery.php?f=1&q=" + trimmedInput;
    chrome.tabs.create({ url: newUrl });
}

function trimInput(input) {
    return (input && input.length > INPUT_MAX_LENGTH) ? input.substring(0, INPUT_MAX_LENGTH).trim() : input.trim();
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