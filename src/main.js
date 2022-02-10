define(['about', 'modal', 'card', 'basket', 'carousel'], function(AboutUs, Modal,  { Card, cardFlowersItem }, Basket, Carousel){
  const aboutWrapper = document.querySelector('.about-wrapper');
  const wrapperBasket = document.querySelector('.basket-wrapper');
  const modalWrapper = document.querySelector('.modal-wrapper');
  const cardWrapper = document.querySelector('.card-wrapper');
  const bouquetsBtn = document.querySelector('.bouquets-btn');
  const flowersBtn = document.querySelector('.flowers-btn');
  const basketWrapper = document.querySelector('.main-basket-wrapper');
  const carouselContainer = document.querySelector('.slider-container'); 
  let countUser = 0;
  let countBasket = 0;

  const about = new AboutUs(aboutWrapper, wrapperBasket);
  const modal = new Modal(modalWrapper);
  const card = new Card(cardWrapper);
  const basket = new Basket(basketWrapper);
  const slider = new Carousel(carouselContainer);

  about.renderCallbackList('aboutClick',modal.render);
  about.renderCallbackList('aboutBasketClick', () => {
    if (!document.querySelector('.modal').classList.contains('indicator')) {
      document.querySelector('.modal').classList.add('show-modal');
      return;
    }

    document.querySelector('.modal').classList.add('show-modal');
    document.querySelector('.modal').classList.add('indicator');
  });

  bouquetsBtn.addEventListener('click', event => {
    event.preventDefault();
    flowersBtn.classList.remove('active-flowers');
    bouquetsBtn.classList.add('active-flowers');
    card.renderBouquetsCards();
  });

  flowersBtn.addEventListener('click', event => {
    event.preventDefault();
    flowersBtn.classList.add('active-flowers');
    bouquetsBtn.classList.remove('active-flowers');
    card.renderBouquetsCards(cardFlowersItem);
  });


  card.renderCallbackList('onClick', config => {
    if (!document.querySelector('.modal').classList.contains('indicator')) {
      document.querySelector('.modal').classList.add('indicator');
      document.querySelector('.window-body').innerHTML = '';
    }

    basket.renderBasket(config);
  });
});