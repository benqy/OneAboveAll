﻿

var validate = {
  regex: function (validateContent, targetUrl) {
    var reg = new RegExp(validateContent, 'ig');
    return reg.test(targetUrl);
  },
  indexof: function (validateContent, targetUrl) {
    return !!~targetUrl.indexOf(validateContent)
  },
  full: function (validateContent, targetUrl) {
    return validateContent == targetUrl;
  }
};

var checkMatch = function (url) {
  var oaakeys = localStorage.getItem('oaakeys'), matchs = [];
  if (oaakeys) {
    oaakeys = JSON.parse(oaakeys);
    oaakeys.forEach(function (oaakey) {
      if (oaakey.status == 'on' && validate[oaakey.type](oaakey.content, url)) {
        matchs.push(oaakey);
      }
    });
  }
  return matchs;
};

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
  if (request.url) {
    var matchs = checkMatch(request.url);
    //matchs.length && chrome.browserAction.setIcon({ path: 'img/icon-url.png' });
    sendResponse(matchs);
  }
  else if (request.code) {
    chrome.tabs.executeScript(null, { code: request.code });
  }
});