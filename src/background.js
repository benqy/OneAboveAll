

var validate = {
  regex: function (validateContent, targetUrl) {
    console.log('1');
  },
  indexof: function (validateContent, targetUrl) {
    if(~targetUrl.indexOf(validateContent)){
      return true;
    }
    return false;
  },
  full: function (validateContent, targetUrl) {
    console.log('3');
  }
}

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
  sendResponse(checkMatch(request.url));
});