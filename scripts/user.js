// Function to get the query parameter value by name
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

window.onload = function() {
    const productId = getQueryParam('id');
    displayProductDetails(productId);
};

// Function to display product details based on the ID
function displayProductDetails(productId) {
    let productsHTML = '';

    channels.forEach(channel => {
        if (channel.channelId === productId) {

        const userHeader = `
        <div class="mchome-header-left-section">
          <a href="Index.html" class="header-link">
            PremeMarket
          </a>
        </div>
  
        <div class="mchome-header-middle-section">
          <input class="search-bar" type="text" placeholder="Search">
  
          <button class="search-button">
            <img class="search-icon" src="Icons/search-icon.png">
          </button>
        </div>
  
        <div class="mchome-header-right-section">
          <a class="orders-link header-link" href="orders.html">
            <span class="returns-text">Order</span>
          </a>
  
          <a class="cart-link header-link" href="cart.html?id=${channel.channelId}">
            <img class="cart-icon" src="Icons/cart-icon.png">
            <div class="cart-quantity js-cart-quantity">0</div>
            <div class="cart-text">Cart</div>
          </a>
        </div>
        `;

        document.querySelector('.mchome-header').innerHTML = userHeader;

        const userTitle = `
        <div class="header-container">
            Welcome To. ${channel.channelName} Shop
        </div>

        <div class="description-container" id="description">
            <div class="description1" id="description">
                ${channel.description}
            </div>
            <span class="more-link" id="more-link">more</span>
        </div>

        <div class="main-container">
            <div class="contact-container">
                Contact Us:
            </div>
            <div class="details-container">
                <div class="email-container">
                    Email: ${channel.gmail}
                </div>
                <div class="phone-container">
                    Tel: ${channel.phone}
                </div>
                <div class="message-container">
                    SMS: ${channel.phone}
                </div>
            </div>
        </div>


        <div class="cta">
            <a href="cart.html?id=${channel.channelId}" class="cta-btn">View cart</a>
        </div>

        <div id="full-description-container" class="full-description-container">
            <div class="card">
            ${channel.description}
                <span class="close-link" id="close-link">close</span>
            </div>
        </div>
        `;

        document.querySelector('.hero').innerHTML = userTitle;

        channel.products.forEach(product => {

            productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image" src="${product.image}">
                </div>
  
                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>
  
                <div class="product-price">
                    $${(product.priceCents / 100).toFixed(2)}
                </div>
  
                <div class="product-quantity-container">
                    <select>
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
  
                <div class="product-spacer"></div>
  
                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>
  
                <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
            `;
        });

        document.querySelector('.js-products-grid').innerHTML = productsHTML;

        const moreLink = document.getElementById('more-link');
        const fullDescriptionContainer = document.getElementById('full-description-container');
        const closeLink = document.getElementById('close-link');
    
        // Show the full description
        moreLink.addEventListener('click', () => {
            fullDescriptionContainer.style.display = 'flex';
        });
    
        // Close the full description
        closeLink.addEventListener('click', () => {
            fullDescriptionContainer.style.display = 'none';
        });

        // Get the cart from local storage, or initialize it if it doesn't exist
        let cart = JSON.parse(localStorage.getItem(productId));

        if (!cart) {
            cart = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1
            }];
        }

        function saveToStorage() {
            localStorage.setItem(productId, JSON.stringify(cart));
        }

        document.querySelectorAll('.js-add-to-cart')
            .forEach((button) => {
                button.addEventListener('click', () => {
                    const productId = button.dataset.productId;
                    const quantityElement = button.closest('.product-container').querySelector('.product-quantity-container select');
                    const selectedQuantity = parseInt(quantityElement.value, 10);


                    let matchingItem;

                    cart.forEach((cartItem) => {
                        if (productId === cartItem.productId) {
                            matchingItem = cartItem;
                        }
                    });

                    if (matchingItem) {
                        matchingItem.quantity += selectedQuantity;
                    } else {
                        cart.push({
                            productId: productId,
                            quantity: selectedQuantity
                        });
                    }

                    // Save the updated cart back to local storage
                    saveToStorage();

                    // Update the cart quantity displayed on the page
                    let cartQuantity = 0;

                    cart.forEach((cartItem) => {
                        cartQuantity += cartItem.quantity;
                    });                       

                    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
                });
            });
        };
    });
};