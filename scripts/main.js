(async () => {
  const volumeInput = document.querySelector("input[name='volume']");

  volumeInput.onchange = (ev) => {
    setVolume(ev.target.value);
  };

  const volume = await getVolume();
  volumeInput.value = volume;
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
