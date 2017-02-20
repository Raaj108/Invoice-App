//Services/Factories
angular.module('invoiceApp')
  .factory('calculateGrandTotal', function () {
    var grandTotal
    var calculateGrandTotal = function (products) {
      grandTotal = 0;
      angular.forEach(products, function (value, key) {
        grandTotal = grandTotal + products[key].totalPrice;
      });
    }
    return {
      getGrandTotal: function (products) {
        calculateGrandTotal(products);
        return grandTotal;
      }
    }
  })
  .factory('generateInvoiceJson', function () {
    var invoiceJson;

    var generateJson = function (invoiceForm, event) {

      invoiceJson = {
        invoiceFormCustomerInfo: invoiceForm.customer,
        invoiceFormProductInfo: invoiceForm.products,
        invoiceFormGrandTotal: invoiceForm.grandTotalPrice
      }
    }
    return {
      getInvoiceJson: function (invoiceForm, event) {
        generateJson(invoiceForm, event);
        return invoiceJson;
      }
    }
  });