(() => {
  chrome.runtime.sendMessage({ message: "setVolumeBadge" });

  chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
    switch (req.message) {
      case "setVolume":
        setVolume(req.volume);
        chrome.runtime.sendMessage({ message: "setVolumeBadge" });
        break;
      case "getVolume":
        sendResponse({ volume: getVolume() });
        break;
      case "hasAudioSources":
        sendResponse(hasAudioSources());
        break;
      default:
        break;
    }
  });

  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  chrome.runtime.sendMessage({ message: "setTheme", theme });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (matchMediaDark) => {
      const theme = matchMediaDark.matches ? "dark" : "light";
      chrome.runtime.sendMessage({ message: "setTheme", theme });
    });
})();

function setVolume(volume) {
  const audios = document.querySelectorAll("audio");
  const videos = document.querySelectorAll("video");
  [...audios, ...videos].forEach((a) => (a.volume = volume / 100));
}

function getVolume() {
  const audioSources = getAudioSources();
  if (audioSources && audioSources.length > 0) {
    return audioSources[0].volume * 100;
  }
  return null;
}

function hasAudioSources() {
  const audioSources = getAudioSources();
  return audioSources && audioSources.length > 0;
}

function getAudioSources() {
  const audios = document.querySelectorAll("audio");
  const videos = document.querySelectorAll("video");
  return [...audios, ...videos];
}
