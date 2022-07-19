function removeMenu(){
    chrome.contextMenus.removeAll()
}

function createMenu(str) {
    removeMenu();
    chrome.contextMenus.create({
        title:"【 "+ str + " 】を論文検索する",
        id: "search",
        contexts: ["all"]
    })
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    console.log("TYPE   ",request.type);
    console.log("CONTENTS   ",request.contents);

    if (request.type === "none"){
        console.log("発火しない!：：：",request.type)
        removeMenu()
    }
    else{
        console.log("受信側：："+ request.type,request.contents);
        createMenu(request.contents);
        sendResponse({ message: "OK" });
    }

});

chrome.contextMenus.onClicked.addListener((info) => {
    console.log("クリックされたメニューの名前：：："+info.selectionText);
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
    removeMenu()
    console.log("DONE!");
})