(function () {
  "use strict";
  // https://stackoverflow.com/questions/18989345/how-do-i-reload-a-greasemonkey-script-when-ajax-changes-the-url-without-reloadin
  // var fireOnHashChangesToo = true;
  // var pageURLCheckTimer = setInterval(function () {
  //   if (
  //     this.lastPathStr !== location.pathname ||
  //     this.lastQueryStr !== location.search ||
  //     (fireOnHashChangesToo && this.lastHashStr !== location.hash)
  //   ) {
  //     this.lastPathStr = location.pathname;
  //     this.lastQueryStr = location.search;
  //     this.lastHashStr = location.hash;
  //     gmMain();
  //   }
  // }, 111);

  // function gmMain() {

  //   if (content) {
  //   }
  //   console.log("[0]", contents[0]);
  //   console.log("[0]children]", contents[0].children);
  //   return contents[0].children;
  // };

  // var run = function () {
  //   var videos = getVideos();
  //   var spanElement = document.createElement("span");
  //   var text = document.createTextNode(" • " + durationString);
  //   spanElement.appendChild(text);
  //   videos[1].appendChild(spanElement);
  // };
  // setTimeout(run, 1000)
  // }

  waitForKeyElements(
    'div[class="metadata-stats style-scope ytd-playlist-byline-renderer"]',
    actionFunction
  );

  function actionFunction() {
    console.log("Loaded", new Date());

    var getData = window.ytInitialData;
    var playlistInfo =
      getData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer
        .content.sectionListRenderer.contents[0].itemSectionRenderer
        .contents[0]; //.playlistVideoListRenderer.contents[0] //.playlistVideoRenderer.lengthText.simpleText;
    var getSeconds = playlistInfo.playlistVideoListRenderer.contents;

    console.log(Object.keys(getSeconds).length);
    const secondsArray = [];
    for (let index in getSeconds) {
      // check getSeconds[index].playlistVideoRenderer is not undefined
      if (getSeconds[index].playlistVideoRenderer) {
        secondsArray.push(
          getSeconds[index].playlistVideoRenderer.lengthSeconds
        ); // push = add a new item to an array
      }
    }
    console.log(secondsArray);

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
    console.log(durationString);

    // var getVideos = function () {
    var contents = document.querySelectorAll(
      'yt-formatted-string[class="byline-item style-scope ytd-playlist-byline-renderer"]'
    );
    console.log(contents[0]);
    // var videos = contents[0].children;

    let spanElement = document.createElement("span");
    spanElement.setAttribute('dir', 'auto')
    spanElement.className = "style-scope yt-formatted-string"
    let text = document.createTextNode(" • " + durationString);
    spanElement.appendChild(text);
    contents[0].after(spanElement) // add an element to the last child
    // contents[0]
    // let x = videos[1].children[2]
    // console.log(x);
    // videos[1].append(spanElement);
  }
})();
