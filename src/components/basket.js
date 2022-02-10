define('basket', ['base'], function(BaseClass) {
  class Basket extends BaseClass {
    #modal;
    #modalBody;
    #totalPay;
    constructor(node) {
      super(node);
      this.render();
    }

    render = () => {
      this.node.innerHTML =  `
      <div class='modal'>
        <div class="modal-window">
          <div class='window-header-wrapper'>
            <span>Корзина</span>
            <button class="window-close">&times;</button>
          </div>
          <div class='window-body'>${this.#renderBasketWhenEmpty()}</div>
          <div class='basket-card-total-pay-wrapper'>
            <span>Total: </span>
            <button class='basket-card-total-pay'>0 UA.</button>
          </div>
        </div>

        <div class="window-overlay"></div>
	    </div>
      `;
      this.#modal = document.querySelector('.modal');
      this.#modalBody = document.querySelector('.window-body');
      this.#totalPay = document.querySelector('.basket-card-total-pay');
      this.#totalPay.addEventListener('click', event => {
        this.render();
        this.#modal.classList.remove('show-modal');
        document.querySelector('.modal').classList.remove('indicator');
      });
      // this.#modal.classList.add('show-modal');
      this.#closeModalWindow();
    }

    #closeModalWindow = () => {
      this.#modal.addEventListener('click', event => {
        if (!(event.target.classList.contains('window-close') || event.target.classList.contains('window-overlay'))) {
          return;
        }

        this.#modal.classList.remove('show-modal');
      });
    }

    renderBasket = config => {
      this.#modal.classList.add('show-modal');
      const elem = this.#createBasketCard(config);
      const count = elem.querySelector('.basket-card-count');
      const total = elem.querySelector('.basket-card-total');

      elem.querySelector('.delete-card').addEventListener('click', event => {
        event.target.parentNode.remove();
        console.log(Number(this.#totalPay.textContent.substring(0, this.#totalPay.textContent.indexOf(' '))));
        console.log(event.target.textContent);
        this.#totalPay.textContent = `${Number(this.#totalPay.textContent.substring(0, this.#totalPay.textContent.indexOf(' '))) - Number(total.textContent.substring(0, this.#totalPay.textContent.indexOf(' ')))} UA.`;
      });

      this.#totalPay.textContent = `${Number(this.#totalPay.textContent.substring(0, this.#totalPay.textContent.indexOf(' '))) + config.price} UA.`;

      elem.addEventListener('click', event => {
        const initPrice = config.price;
        if (event.target.classList.contains('basket-card-more')) {
          count.textContent = Number(count.textContent) + 1;
          total.textContent = `${initPrice * Number(count.textContent)} UA.`;
          this.#totalPay.textContent = `${Number(this.#totalPay.textContent.substring(0, this.#totalPay.textContent.indexOf(' '))) + config.price} UA.`;
        }

        if (event.target.classList.contains('basket-card-down')) {
          count.textContent = Number(count.textContent) !== 0 ? Number(count.textContent) - 1 : 0;
          total.textContent = Number(count.textContent) !== 0 ? `${Number(total.textContent.substring(0, total.textContent.indexOf(' '))) - initPrice} UA.` : '0 UA.';
          this.#totalPay.textContent = Number(count.textContent) !== 0 ? `${Number(this.#totalPay.textContent.substring(0, this.#totalPay.textContent.indexOf(' '))) - config.price} UA.` : 0;
        }
      });
      this.#modalBody.prepend(elem);
    }

    #createBasketCard = ({ image, price, name }) => {
      const basketCardWrapper = document.createElement('div');
      basketCardWrapper.classList.add('basket-card-wrapper');
      basketCardWrapper.innerHTML = `
      <div class='basket-card'>
        <img class='basket-card-image' src="${image}">
          <span class="basket-card-name">${name}</span>
          <div class='basket-card-counter'>
            <button class="basket-card-more">+</button>
            <span class="basket-card-count">1</span>
            <button class="basket-card-down">-</button>
          </div>
        <span class="basket-card-total">${price} UA.</span>
        <button class="delete-card">Удалить</button>
      </div>
      `;

      return basketCardWrapper;
    }

    #renderBasketWhenEmpty = () => {
      return `
      <img src='https://xl-static.rozetka.com.ua/assets/img/design/modal-cart-dummy.svg'>
      <h4>Корзина пуста</h4>
      <p>Но это никогда не поздно исправить :)</p>
      `
    }
  }
  
  return Basket;
});