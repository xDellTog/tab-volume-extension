(() => {
  chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
    switch (req.message) {
      case "setVolumeBadge":
        setVolumeBadge();
        break;
      case "setTheme":
        setTheme(req.theme);
      default:
        break;
    }
  });
})();

async function setVolumeBadge() {
  chrome.action.setBadgeBackgroundColor({ color: "#0000AA" });

  const volume = await getVolume();
  if (volume != null) {
    const options = {
      text: `${volume}`,
    };
    chrome.action.setBadgeText(options);
  } else {
    chrome.action.setBadgeText({});
  }
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

async function setTheme(theme) {
  const path =
    theme == "light"
      ? {
          16: "/main.png",
        }
      : {
          16: "/main-dark.png",
        };

  console.log(path);

  await chrome.action.setIcon({ path });
}
