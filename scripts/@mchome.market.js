let productHTML = '';

channels.forEach((channel) => {
    productHTML += `
    <a href="user.html?id=${channel.channelId}" class="no-underline normal-color">
    <div class="product-container" data-channel-id="${channel.channelId}">
      <div class="product-image-container">
        <img class="product-image" src="${channel.channelImage}" alt="${channel.channelImage}">
      </div>
      <div class="product-information">
        <img class="profile-picture" src="${channel.channelPicture}" alt="${channel.channelPicture}">
      <div class="products-details">
      <div class="product-name limit-text-to-2-line">${channel.channelName}</div>
      <div class="product-description">${channel.description}</div>
      <div class="product-contry">Country: ${channel.country}</div>
      <div class="product-city">City: ${channel.city}</div>
      <div class="product-place">Place: ${channel.place}</div>
    </div>
    </div>
    </div>
    </a>
    `;
});

document.querySelector('.js-products-grid').innerHTML = productHTML;
