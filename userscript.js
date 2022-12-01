// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/playlist?list=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var getData  = window.ytInitialData
    var playlistInfo = getData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0] //.playlistVideoListRenderer.contents[0] //.playlistVideoRenderer.lengthText.simpleText;
    //var seconds =  parseInt(vids)
    console.log(playlistInfo);
    // Your code here...
})();