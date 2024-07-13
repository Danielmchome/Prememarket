// Function to get the query parameter value by name
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

window.onload = function() {
  const productId = getQueryParam('id');
  displayProductDetails(productId);
};

function displayProductDetails(productId) {
  let cart = JSON.parse(localStorage.getItem(productId)) || [];

  let productHTML = '';

  channels.forEach(channel => {
    if (channel.channelId === productId) {

      cart.forEach((product) => {
        const productId = product.productId;
        
        let matchingProduct = channel.products.find(products => products.id === productId);

        if (!matchingProduct) {
          console.error(`Matching product not found for productId: ${productId} in channel: ${channel.channelId}`);
          return;
        }

        productHTML += `
        
        <div class="order-summary js-cart-item-container-${matchingProduct.id}">
            <div class="cart-item-container">
                <div class="shopping-cart">Shopping Item</div>
                    <div class="cart-item-details-grid">
                        <img class="product-image" src="${matchingProduct.image}">
                        <div class="cart-item-details">
                            <div class="product-name">
                                ${matchingProduct.name}
                            </div>
                            <div class="product-quantity">
                                <span>
                                    Quantity: <span class="quantity-label">${product.quantity}</span>
                                </span>
                                <span class="update-quantity-link link-primary">Update</span>
                                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                                  Delete
                                </span>
                            </div>
                        </div>
                        <div class="price-container">
                            <div class="price">Price</div>
                            <div class="product-price">$${(matchingProduct.priceCents)/100}</div>
                        </div>
                    </div>
                </div>
            </div>
    
        `;
    });
    };
  });

  document.querySelector('.js-order-summary')
  .innerHTML = productHTML;

  document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
    });
  });

  function removeFromCart(productId) {
    const newCart = cart.filter(cartItem => cartItem.productId !== productId);
    console.log(newCart);
  
    cart = newCart;
  
    localStorage.setItem(productId, JSON.stringify(cart));
  }

};