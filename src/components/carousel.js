define('carousel', [], function() {
  class Carousel {
    constructor(node) {
      this.node = node;
      this.#sliders(".feedback-slider-item","",".main-prev-btn",".main-next-btn");
    }

    #sliders = (slidesSelector,dir,prev,next) => {
      let slideIndex = 1;
      let paused = false;
      const items = document.querySelectorAll(slidesSelector);


      const showSlides = (n)=>{
          if (n > items.length){
              slideIndex = 1;
          }
  
          if (n < 1){
              slideIndex = items.length;
          }
  
          items.forEach((item)=>{
              item.classList.add("animated");
              item.style.display = "none";
          });
  
          items[slideIndex - 1].style.display = "block";
      };
  
      showSlides(slideIndex);
  
      const activateAnimation = ()=>{
          if (dir === "vertical"){
              paused = setInterval(()=>{
                  plusSlides(1);
                  items[slideIndex - 1].classList.add("slideInDown");
              },3000);
          }else{
              paused = setInterval(()=>{
                  plusSlides(1);
                  items[slideIndex - 1].classList.remove("slideInRight");
                  items[slideIndex - 1].classList.add("slideInLeft");
              },3000);
          }
      }
      activateAnimation();
  
  
      const plusSlides = (n)=>{
          showSlides(slideIndex = slideIndex + n);
      }
  
      try {
          const prevBtn = document.querySelector(prev);
          const nextBtn = document.querySelector(next);
  
          prevBtn.addEventListener("click",()=> {
            console.log(222222);
              plusSlides(-1);
              items[slideIndex - 1].classList.remove("slideInLeft");
              items[slideIndex - 1].classList.add("slideInRight");
          });
          nextBtn.addEventListener("click",()=> {
            console.log(1111111);
              plusSlides(1);
              items[slideIndex - 1].classList.remove("slideInRight");
              items[slideIndex - 1].classList.add("slideInLeft");
          });
      }catch (error){
          // console.log(error);
      }
  
      items[0].parentNode.addEventListener("mouseenter",()=>{
         clearInterval(paused);
      });
  
      items[0].parentNode.addEventListener("mouseleave",()=>{
          activateAnimation();
      });
    }
  }
  
  return Carousel;
});