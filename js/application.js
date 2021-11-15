
var calcSubTotal = function (element) {
  var itemPrice = $(element).find('.price').text().substring(1);
  var itemQuantity = parseFloat($(element).find('.quantity input').val());
  var subTotal = itemPrice * itemQuantity;
  return subTotal;
};

var updateSubTotal = function (element) {
  $('tbody tr').each(function (index, element) {
    var subTotal = calcSubTotal(element).toFixed(2);
    $(element).children('.subTotal').html(subTotal);
  });
};

$(document).ready(function () {
  updateSubTotal();

  var timeout;
  $(document).on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateSubTotal();
    }, 800);
  });

});