
chrome.extension.sendRequest({ url:location.href }, function (response) {
  response && response.forEach(function (oaakey) {
    $(document.body).append('<script type="text/javascript" src="' + oaakey.script + '?clear='+ new Date()*1 +'"></script>');
  });
});