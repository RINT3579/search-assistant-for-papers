function removeMenu(){
    chrome.contextMenus.removeAll()
}

function createMenu(str) {
    chrome.contextMenus.create({
        title:"【 "+ str + " 】を論文検索する",
        id: "search",
        contexts: ["all"]
    })
}
chrome.runtime.onMessage.addListener(function(request) {

    if (request.type === "str"){
        createMenu(request.contents);
    }
    else{
        removeMenu()
    }
});

chrome.contextMenus.onClicked.addListener((info) => {
    removeMenu();

    chrome.tabs.create({
        url: 'https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText='+info.selectionText,
        active:true
    });
    chrome.tabs.create({
        url: 'https://dl.acm.org/action/doSearch?AllField='+info.selectionText,
        active:false
    });
    chrome.tabs.create({
        url: 'https://scholar.google.co.jp/scholar?lr=&q='+info.selectionText,
        active:false
    });
})