define('about', ['base'], function(BaseClass) {
  class AboutUs extends BaseClass {
    #aboutUs;
    #basketEvent;
    constructor(node, secondeNode) {
      super(node);
      this.secondeNode = secondeNode;
      this.#render();
      this.#handler();
    }

    #render() {
      this.node.innerHTML = `
        <a class='about-us' href='#'>Связаться с нами</a>
      `;

      this.secondeNode.innerHTML = `
        <a class='basket-event' href="#">
          <img class='basket' src="./assets/img/card.png" alt="">
        </a>
      `;

      this.#aboutUs = document.querySelector('.about-us');
      this.#basketEvent = document.querySelector('.basket-event');
    }

    #handler = () => {
      this.#aboutUs.addEventListener('click', event => {
        event.preventDefault();
        this.callbackCall('aboutClick', event);
      });

      this.#basketEvent.addEventListener('click', event => {
        event.preventDefault();
        this.callbackCall('aboutBasketClick', event);
      });
    }
  }

  return AboutUs;
});