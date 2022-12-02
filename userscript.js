// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/playlist
// @include      https://www.youtube.com/playlist?list*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @run-at       document-end
// @require      file://C:\Users\sapon\OneDrive\เอกสาร\My Project\Youtube Playlist Calculator\userscript.js
// @require      https://greasyfork.org/scripts/12228/code/setMutationHandler.js

// ==/UserScript==

(function () {
  "use strict";

  //   console.log(durationString);
  //   // ปัดเศษทิศนิยมขึ้นหรือลง
  //   // 2.49 => 2
  //   // 2.5 => 3
  //   //   var minutes = Math.round(totalSec / 60);
  //   //   var calculated = calculateDuration(totalSec);

  //   var minutes = Math.round(totalSec / 60);
  //   // if there is at least 1 hour, display hours and minutes, otherwise display minutes and seconds.
  //   var durationString =
  //     // (condition) ? (if true run this) : (if false run this)
  //     minutes >= 60 // if minutes is 60 or more
  //       ? Math.floor(minutes / 60) + "h " + (minutes % 60) + "m" // calculate hours and minutes
  //       : Math.floor(totalSec / 60) + "m " + (totalSec % 60) + "s"; // calculate minutes and seconds

  var fireOnHashChangesToo = true;
  var pageURLCheckTimer = setInterval(function () {
    if (
      this.lastPathStr !== location.pathname ||
      this.lastQueryStr !== location.search ||
      (fireOnHashChangesToo && this.lastHashStr !== location.hash)
    ) {
      this.lastPathStr = location.pathname;
      this.lastQueryStr = location.search;
      this.lastHashStr = location.hash;
      gmMain();
    }
  }, 111);

  function gmMain() {
    console.log('A "New" page has loaded.');
    setTimeout(run, 1000);
    // setTimeout(run, 1000);
    // run();
    // DO WHATEVER YOU WANT HERE.
  }

  var getPlaylistData = function () {
    var getData = window.ytInitialData;
    var playlistInfo =
      getData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer
        .content.sectionListRenderer.contents[0].itemSectionRenderer
        .contents[0]; //.playlistVideoListRenderer.contents[0] //.playlistVideoRenderer.lengthText.simpleText;
    var getSeconds = playlistInfo.playlistVideoListRenderer.contents;

    const secondsArray = [];
    for (let index in getSeconds) {
      secondsArray.push(getSeconds[index].playlistVideoRenderer.lengthSeconds); // add a new item to an array
    }
    return secondsArray;
  };

  var sumDuration = function () {
    var lengthSeconds = getPlaylistData();
    const initialValue = 0;
    var totalSeconds = lengthSeconds.reduce(function (x, y) {
      return x + +y; // +y = convert to int
      // return x + parseInt(y.playlistVideoRenderer.lengthSeconds);
    }, initialValue);
    return totalSeconds;
  };

  var calculateDuration = function () {
    totalSec = sumDuration();
    var minutes = Math.round(totalSec / 60);
    // if there is at least 1 hour, display hours and minutes, otherwise display minutes and seconds.
    var durationString =
      // (condition) ? (if true run this) : (if false run this)
      minutes >= 60 // if minutes is 60 or more
        ? Math.floor(minutes / 60) + "h " + (minutes % 60) + "m" // calculate hours and minutes
        : Math.floor(totalSec / 60) + "m " + (totalSec % 60) + "s"; // calculate minutes and seconds
    return durationString;
  };

  //   setTimeout(run, 1000);

  //   var run = function () {
  //     var videos = getVideos();
  //     for (var i = 0; i < videos.length; i++) {
  //       var video = videos[i];
  //       console.log(video)[1];
  //     }
  //   };
  //   console.log(getVideos);
  //   setTimeout(run, 1000); // wait for the page load
  //   console.log(content);
  //   content[0].innerText += durationString;

  console.log(typeof durationString, durationString);

  //   waitForElement()

  var getVideos = function () {
    var contents = document.querySelectorAll(
      'div[class="metadata-stats style-scope ytd-playlist-byline-renderer"]'
    );
    if (content) {
    }
    console.log("[0]", contents[0]);
    console.log("[0]children]", contents[0].children);
    return contents[0].children;
  };

  var run = function () {
    var videos = getVideos();
    var durationString = calculateDuration();
    // for (var i = 0; i < videos.length; i++) {
    //   var video = videos[i];
    //   console.log("for", video);
    // }
    var spanElement = document.createElement("span");
    var text = document.createTextNode(" • " + durationString);
    spanElement.appendChild(text);
    // spanElement.style.display = "inline-block";
    // spanElement.innerText = " • " + durationString
    // spanElement.id = 'fuckyou'
    // spanElement.className = "style-scope yt-formatted-string"
    // console.log('yes')
    videos[1].appendChild(spanElement);

    // return video
  };
})();
