define('modal', ['base'], function(BaseClass) {
  class Modal extends BaseClass {
    #modal;
    constructor(node) {
      super(node);
    }

    render = () => {
      this.node.innerHTML = `
      <div class='popup-design data-modal'>
        <div class='popup-dialog'>
          <div class='popup-content'>
            <button class='popup-close'>&times;</button>
            <h4>Мы свяжемся с вами</h4>
            <img class='image-modal' src='./assets/img/43242.png'>
            <form action=# enctype=multipart/form-data>
              <div class=main-form>
                <div class=form>
                  <input type=text name=phone placeholder="Ваш телефон" required>
                  <button class="button-bt button-order">Отправить</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      `
      this.#modal = document.querySelector('.data-modal');
      this.#modal.style.display = 'flex';
      this.#closeModalWindow();
    }


    #closeModalWindow = () => {
      this.#modal.addEventListener('click', event => {
        if (!(event.target.classList.contains('popup-design') || event.target.classList.contains('popup-close'))) {
          return;
        }

        this.#modal.style.display = 'none';
      });
    }
  }

  return Modal;
});