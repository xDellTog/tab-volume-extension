(async () => {
  const volumeInput = document.querySelector("input[name='volume']");
  const noAudioSourcesMessage = document.querySelector("#no-audio-sources");

  volumeInput.onchange = (ev) => {
    setVolume(ev.target.value);
  };

  const volume = await getVolume();
  volumeInput.value = volume;

  if (await hasAudioSources()) {
    volumeInput.disabled = false;
    noAudioSourcesMessage.style.display = "none";
  } else {
    noAudioSourcesMessage.style.display = "block";
    volumeInput.disabled = true;
  }
})();

async function setVolume(volume) {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  return await chrome.tabs.sendMessage(tab.id, {
    message: "setVolume",
    volume,
  });
}

async function getVolume() {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, {
    message: "getVolume",
  });
  return response.volume;
}

async function hasAudioSources() {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, {
    message: "hasAudioSources",
  });
  return response;
}
