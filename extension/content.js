var allImages = document.getElementsByTagName("img");
for (int i = 0; i < allImages.length; i ++) {
    chrome.downloads.download({
        "url": allImages[i].src
    });
}
