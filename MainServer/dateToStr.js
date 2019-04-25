function formatNum(num, separator) {
    var str = num.toLocaleString('en-US');
    str = str.replace(/\//, separator).replace(/\//, separator)
    str = str.replace(/\,/, separator)
    str = str.replace(/\:/, separator).replace(/\:/, separator)
    str = str.replace(" ", separator).replace(" ", separator)
    return str;
  }

  module.exports = {
    getStringDate: function (){
        let date = new Date()
        date_time_string_replaced_separator = formatNum(date, '_')
        return date_time_string_replaced_separator
    }
  }