console.log("hi");

chrome.runtime.onMessage.addListener(
    function(arg, send, sendResponse) {
        console.log(arg.imgs[0].src);
        var args = arg.imgs;
        for (var i = 0; i < args.length; i ++) {
            console.log(args[i].src)
            chrome.downloads.download({
                url: args[i],
                filename: "/potential_images/" + args[i].replace(/[^a-zA-Z0-9]/g,'-')
            });

        }
    }
);
