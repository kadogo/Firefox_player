const {components, Cc, Ci} = require("chrome");
var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');

var button = buttons.ActionButton({
    id: "mpv",
    label: "Launch mpv",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onClick: function() {
        launchMpvUrl(tabs.activeTab.url);
    }
});


function launchMpvUrl(url) {
    var mpv = components.classes["@mozilla.org/file/local;1"].createInstance(components.interfaces.nsIFile);
    mpv.initWithPath("/bin/mpv");

    // create an nsIProcess
    var mpv_process = components.classes["@mozilla.org/process/util;1"].createInstance(components.interfaces.nsIProcess);
    mpv_process.init(mpv);

    console.log("Playing URL: "+url);
    var mpvargs = ["--ytdl", url];
    mpv_process.run(false, mpvargs, mpvargs.length);
}

