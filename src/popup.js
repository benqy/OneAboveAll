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
    html.push('    <button class="add">添加</button>');
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
        
        me.validate(data) &&  datas.push(data);
      });
      localStorage.setItem('oaakeys', JSON.stringify(datas));
    });
   
    $('#keys').on('click', '.add', function () {
      me.renderRow();
    });
    $('#keys').on('click', '.remove', function () {
      $(this).parents('tr').remove();
    });
  }
};

pop.init();