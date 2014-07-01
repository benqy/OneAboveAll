$(function () {
  
  var guid = function () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  setTimeout(function () {
    console.log(3);
    $('.editor-content').off('paste');
  }, 3000);
  document.body.onpaste = pasteHandle;
  function pasteHandle(ev) {
    var clipboardData, items, item;
    if (ev && (clipboardData = ev.clipboardData) && (items = clipboardData.items) && (item = items[0]) && item.kind == 'file' && item.type.match(/^image\//i)) {
      var blob = item.getAsFile();
      var fileName = guid() + '.' +  blob.type.split('/')[1];
      upLoad(blob, 'rrGYBTgg782dxQDxccsDpc9Q33FB26iA33zj9D-x:F7vmerL_qBVmMjO0tJ8mfi_ipKM=:eyJzY29wZSI6Im9uZWFib3ZlYWxsIiwiZGVhZGxpbmUiOjE0NTc2NzQyNDF9', fileName, function (blkRet) {
        var img = 'http://oneaboveall.qiniudn.com/' + blkRet.key;
        if (ev.target.value !== undefined && ev.target.value !== null) {
          ev.target.value = img;
        }
        else {
          $(ev.target).append('![写点什么]('+img+')');
          //$(ev.target).append('<img src="'+img+'"/>');
        }
      });
      return false;
    }
  };

  var upLoad = function (f, token, key,fn) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://up.qiniu.com', true);
    var formData, startDate;
    formData = new FormData();
    if (key !== null && key !== undefined) formData.append('key', key);
    formData.append('token', token);
    formData.append('file', f);
    var taking;

    xhr.onreadystatechange = function (response) {
      if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
        var blkRet = JSON.parse(xhr.responseText);
        fn(blkRet);
      } else if (xhr.status != 200 && xhr.responseText) {
        console.log('error');
      }
    };
    startDate = new Date().getTime();
    xhr.send(formData);
  };
});