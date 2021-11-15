
var calcSubTotal = function (element) {
  var itemPrice = $(element).find('.price').text().substring(1);
  var itemQuantity = parseFloat($(element).find('.quantity input').val());
  var subTotal = itemPrice * itemQuantity;
  return subTotal;
};

var updateSubTotal = function (element) {
  $('tbody tr').each(function (index, element) {
    var subTotal = calcSubTotal(element).toFixed(2);
    $(element).children('.subTotal').html('£' + subTotal);
  });
};

var sum = function (total, num) {
  return total + num;
};

var updateCartTotal = function () {
  updateSubTotal();
  var prices = [];
  
  $('tbody tr').each(function (index, element) {
    var price = calcSubTotal(element);
    prices.push(price);
  });

  var cartTotal = prices.reduce(sum).toFixed(2);
  $('#cartTotal').html(cartTotal);
};

$(document).ready(function () {
  updateCartTotal();

  var timeout;
  $(document).on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateCartTotal();
    }, 800);
  });

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    updateCartTotal();
  });

  $('#addItem').on('submit', function(event) {
    event.preventDefault();
    var item = $(this).children('[name=itemName]').val();
    var price = parseFloat($(this).children('[name=price]').val()).toFixed(2);

    $('tbody').append('<tr>' +
      '<td class="item">' + item + '</td>' +
      '<td class="price">£' + price + '</td>' +
      '<td class="quantity"><input type="number" value="0" min="0"></td>' +
      '<td class="subTotal"></td>' +
      '<td><button class="btn btn-sm remove">Remove</button></td>' +
      '</tr>'
    );

    updateCartTotal();

  });

});