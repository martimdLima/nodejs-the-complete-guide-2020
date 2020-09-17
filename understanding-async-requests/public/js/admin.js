const deleteProduct = (btn) => {
  const prodId = btn.parentNode.querySelector("[name = productId]").value;
  const csrf = btn.parentNode.querySelector("[name = _csrf]").value;

  const productElement = btn.closest("article");

  fetch("/admin/product/" + prodId, {
    method: "DELETE",
    headers: {
      "csrf-token": csrf,
    },
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data);
      // compatible with all browsers, including older browsers
      // productElement.parentNode.removeChild(productElement);

      // compatible with all modern browsers
      productElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};
