var pop = {
  init: function () {
    this.render();
    this.bindAction();
  },
  getOaaKeys: function () {
    var oaakeys = localStorage.getItem('oaakeys');
    return oaakeys ? JSON.parse(oaakeys) : [];
  },
  renderRow: function (oaakey) {
    var html = [];
    html.push('<tr class="row">');
    html.push('    <td>');
    html.push('        <select class="cell" data-key="type">');
    html.push('            <option value="regex">正则</option>');
    html.push('            <option value="full">完全匹配</option>');
    html.push('            <option value="indexof">部分匹配</option>');
    html.push('        </select>');
    html.push('    </td>');
    html.push('    <td><input class="cell"  data-key="content" type="text" value=""></td>');
    html.push('    <td><input class="cell"  data-key="script" type="text" name="" id="" value=""></td>');
    html.push('    <td><select name=""  data-key="status" class="cell" id="">');
    html.push('        <option value="on">启用</option>');
    html.push('        <option value="off">禁用</option>');
    html.push('    </select></td>');
    html.push('<td>');
    html.push('    <button class="remove">删除</button>');
    html.push('</td>');
    html.push('</tr>');
    html = $(html.join(''));
    oaakey && Object.keys(oaakey).forEach(function (pro) {
      html.find('[data-key="' + pro + '"]').val(oaakey[pro]);
    });
    $('#keys tbody').append(html);
  },
  render: function () {
    var oaakeys = this.getOaaKeys();
    var me = this;
    oaakeys.forEach(function (oaakey) {
      me.renderRow(oaakey);
    });
    me.renderRow();
  },
  validate: function (data) {
    if (data.content && data.script) {
      return true;
    }
    return false;
  },
  bindAction: function () {
    var me = this;
    $('#save').click(function () {
      var datas = [];
      $('#keys').find('.row').each(function (i, row) {
        var data = {}
        $(row).find('.cell').each(function (i, cell) {
          data[$(cell).attr('data-key')] = $(cell).val()
        });

        me.validate(data) && datas.push(data);
      });
      localStorage.setItem('oaakeys', JSON.stringify(datas));
    });

    $('.add').on('click', function () {
      me.renderRow();
    });
    $('#keys').on('click', '.remove', function () {
      $(this).parents('tr').remove();
    });
  }
};

pop.init();

var uploadFile = {
  init: function (fn) {
    $('#fileName').val(this.guid());
    this.bindAction(fn);
  },
  bindAction: function (fn) {
    //'http://oneaboveall.qiniudn.com/qi6eakya1r1kyej90o3dudpap2.js'
    $('#fileName').val(this.guid());
    var Qiniu_UploadUrl = "http://up.qiniu.com";
    $("#upload").click(function () {
      //普通上传
      var Qiniu_upload = function (f, token, key) {
        if (~f.name.indexOf('css')) {
          key += key + '.css';
        }
        else {
          key += key + '.js';
        }
        var xhr = new XMLHttpRequest();
        xhr.open('POST', Qiniu_UploadUrl, true);
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

          }
        };
        startDate = new Date().getTime();
        xhr.send(formData);
      };
      var token = $("#token").val();
      if ($("#file")[0].files.length > 0 && token != "") {
        Qiniu_upload($("#file")[0].files[0], token, $("#fileName").val());
      } else {
        $('#log').text('未选择文件');
      }
    })
  },
  guid: function () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
};

uploadFile.init(function (blkRet) {
  var file = 'http://oneaboveall.qiniudn.com/' + blkRet.key;
  $('#log').text('上传成功:' + file);
  $('#keys tbody tr:last td:eq(2) input').val(file).css('border-color','red');
  pop.renderRow();
});
