
chrome.extension.sendRequest({ url: location.href }, function (response) {
  response && response.forEach(function (oaakey) {
    if (~oaakey.script.indexOf('.css')) {
      $('head').append('<link href="'+oaakey.script+'" rel="stylesheet" type="text/css" media="all"> ');
    }
    else if (~oaakey.script.indexOf('.js')) {
      $.get(oaakey.script, null, null, "text")
      .done(function (remoteCode) {
        chrome.extension.sendRequest({ code: remoteCode });
      })
    }
  });
});
