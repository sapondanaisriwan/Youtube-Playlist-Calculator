// ==UserScript==
// @name         Playlist
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  try to take over the world!
// @author       Adashimaa
// @match        https://www.youtube.com/playlist
// @include      *://youtube.com/playlist*
// @include      *://*.youtube.com/playlist*
// @connect      youtube.com
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @run-at      document-idle
// ==/UserScript==
(function () {
  "use strict";

  function waitForElement(selector) {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }
      const observer = new MutationObserver((_) => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }

  function ytInfo() {
    var getData = window.ytInitialData;
    var playlistInfo =
      getData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer
        .content.sectionListRenderer.contents[0].itemSectionRenderer
        .contents[0];
    var contents = playlistInfo.playlistVideoListRenderer.contents;

    const secondsArray = [];
    for (let index in contents) {
      // check getSeconds[index].playlistVideoRenderer is not undefined
      if (contents[index].playlistVideoRenderer) {
        secondsArray.push(contents[index].playlistVideoRenderer.lengthSeconds); // push = add a new item to an array
      }
    }
    return secondsArray;
  }

  function calculateDuration(secondsArray) {
    const initialValue = 0;
    var totalSeconds = secondsArray.reduce(function (x, y) {
      return x + +y; // +y = convert to int
    }, initialValue);

    console.log(totalSeconds);

    var minutes = Math.round(totalSeconds / 60);
    // if there is at least 1 hour, display hours and minutes, otherwise display minutes and seconds.
    var durationString =
      // (condition) ? (if true run this) : (if false run this)
      minutes >= 60 // if minutes is 60 or more
        ? Math.floor(minutes / 60) + "h " + (minutes % 60) + "m" // calculate hours and minutes
        : Math.floor(totalSeconds / 60) + "m " + (totalSeconds % 60) + "s"; // calculate minutes and seconds
    return durationString;
  }

  function createSpan(selectElement, durationString) {
    console.log(selectElement)
    let spanElement = document.createElement("span");
    let text = document.createTextNode(" • " + durationString);

    spanElement.id = "fuckyout"
    spanElement.setAttribute("dir", "auto");
    spanElement.className = "style-scope yt-formatted-string";
    spanElement.appendChild(text);
    selectElement.after(spanElement);
  }

  waitForElement(
    "div.metadata-stats.ytd-playlist-byline-renderer yt-formatted-string"
  ).then((selectElement) => {
    if (selectElement) {
      var secondsArray = ytInfo();
      var durationString = calculateDuration(secondsArray);
      createSpan(selectElement, durationString)
      console.log(selectElement, durationString);
    }
  });
})();
