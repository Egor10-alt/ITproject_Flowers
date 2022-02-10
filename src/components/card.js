define('card', ['base'], function(BaseClass) {
  const cardBouquetsItem = {
    1: { image: './assets/img/bouquets/1.jpeg', price: 300, name: 'Букет №1' },
    2: { image: './assets/img/bouquets/2.jpeg', price: 300, name: 'Букет №2' },
    3: { image: './assets/img/bouquets/3.png', price: 400, name: 'Букет №3' },
    4: { image: './assets/img/bouquets/4.jpeg', price: 400, name: 'Букет №4' },
    5: { image: './assets/img/bouquets/5.jpeg', price: 500, name: 'Букет №5' },
    6: { image: './assets/img/bouquets/6.jpeg', price: 500, name: 'Букет №6' },
    7: { image: './assets/img/bouquets/7.jpeg', price: 600, name: 'Букет №7' },
    8: { image: './assets/img/bouquets/8.jpeg', price: 600, name: 'Букет №8' },
    9: { image: './assets/img/bouquets/9.jpeg', price: 700, name: 'Букет №9' },
    10: { image: './assets/img/bouquets/10.jpeg', price: 700, name: 'Букет №10' },
    11: { image: './assets/img/bouquets/11.jpeg', price: 800, name: 'Букет №11' },
    12: { image: './assets/img/bouquets/12.png', price: 900, name: 'Букет №12' }
  };
  const cardFlowersItem = {
    1: { image: './assets/img/flowers/1.jpg', price: 20, name: 'Роза Красная-Желтая' },
    2: { image: './assets/img/flowers/2.jpg', price: 25, name: 'Роза Белая' },
    3: { image: './assets/img/flowers/3.jpg', price: 20, name: 'Роза Желтая' },
    4: { image: './assets/img/flowers/4.png', price: 25, name: 'Лилия' },
    5: { image: './assets/img/flowers/5.jpg', price: 30, name: 'Роза Маленькая' },
    6: { image: './assets/img/flowers/9.jpg', price: 15, name: 'Альстромерия Белая' },
    7: { image: './assets/img/flowers/10.jpg', price: 30, name: 'Роза Светло-Фиолетовая' },
    8: { image: './assets/img/flowers/11.jpg', price: 25, name: 'Альстромерия Красная' },
    9: { image: './assets/img/flowers/12.jpg', price: 25, name: 'Альстромерия' },
    10: { image: './assets/img/flowers/13.jpeg', price: 30, name: 'Альстромерия Розовая' },
    11: { image: './assets/img/flowers/14.jpg', price: 30, name: 'Альстромерия Корал' },
    12: { image: './assets/img/flowers/16.jpg', price: 35, name: 'Роза Красная' }
  };

  class Card extends BaseClass {
    #basketButton;
    constructor(node) {
      super(node);
      this.renderBouquetsCards(cardBouquetsItem);
      // this.#handlerClick();
    }

    #render = ({ image, price, name }) => {
      this.node.textContent = '';
      const elemWrapper = document.createElement('div');
      elemWrapper.className = "col-lg-4 col-md-4 col-sm-4 gallery";
      elemWrapper.innerHTML = `
        <img src=${image} class="img-responsive">
        <h3>${name}</h3>
        <div class="price">${price} UA.</div>
        <button class="inBasket">В корзину</button>
      `;
      return elemWrapper;
    }

    renderBouquetsCards = (config = cardBouquetsItem) => {
      const fragment = document.createDocumentFragment();
      Object.values(config).forEach(item => fragment.append(this.#render(item)));
      this.node.append(fragment);

      this.#basketButton = document.querySelectorAll('.inBasket');
      this.#basketButton.forEach((button, index) => this.#handlerClick(button, config[index + 1]));
    }

    #handlerClick = (button, config) => {
      button.addEventListener('click', event => {
        event.preventDefault();
        this.callbackCall('onClick', config);
      })
    }
  }

  return  { Card, cardFlowersItem };
});