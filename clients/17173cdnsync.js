(function () {
  'use strict';
  

  var his = {
    init: function () {
      this.render();
      this.bindAction();
    },
    render: function () {
      var html = [], datas = this.get();
      html.push('<div style="position: absolute; top: 40px; right: 80px; height: calc(100% - 40px);">');
      html.push('    <table id="keys" class="table">');
      html.push('        <thead>');
      html.push('            <tr>');
      html.push('                <th>历史记录</th>');
      html.push('                <th>选中</th>');
      html.push('            </tr>');
      html.push('        </thead>');
      html.push('        <tbody>');
      datas.length && datas.forEach(function (data) {
        html.push('            <tr>');
        html.push('                <td>');
        html.push(data);
        html.push('                </td>');
        html.push('                <td>');
        html.push('                    <input data-file="' + data + '" type="checkbox" name="" id="">');
        html.push('                </td>');
        html.push('            </tr>');
      });
      html.push('        </tbody>');
      html.push('    </table>');
      html.push('    <div>');
      //html.push('        <button class="oaa-save"></button>');
      html.push('    </div>');
      html.push('</div>');
      this.wrap = $(html.join(''));
      $(document.body).append(this.wrap);
    },
    get: function () {
      var datas = localStorage.getItem('oaa-files');
      datas = datas ? JSON.parse(datas) : [];
      return datas;
    },
    remove:function(){
    },
    save: function (files) {
      var datas = this.get();
      files.forEach(function (file) {
        file && datas.push(file);
      });
      localStorage.setItem('oaa-files', JSON.stringify(datas));
    },
    bindAction: function () {
      $('#J_SearchForm [type=submit]').on('click', function () {
        //检查输入
        var $this = $(this);
        var content = $.trim($("#fileContent").val()).replace(/\s+/g, "\r\n");
        if (!content) {
          alert("请选择需要同步的文件！");
          return false;
        }
        var tem = content.split("\r\n");
        for (var i = 0; i < tem.length; i++) {
          if (!/^(\/[^\/]+)+$/.test(tem[i])) {
            alert("请检查输入的文件地址格式，必须为/**/**的格式！");
            return false;
          }
        }
        his.save(tem);
      });

      this.wrap.find('input[type="checkbox"]').on('click', function () {
        var data,content = '';
        if (this.checked) {
          data = $(this).attr('data-file');
          content = $("#fileContent").val();
          if (content.charAt(content.length - 1)) {
            content +='\r\n'
          }
          content += data;
          $("#fileContent").val(content);
        }
      });
    }
  };

  his.init();
})()