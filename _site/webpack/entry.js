// const Turbolinks = require("turbolinks")
// Turbolinks.start()

import './scss_files/main.scss';

const scrollButton = document.querySelector('.scroll-top');
scrollButton.addEventListener('click', function(){
    window.scrollTo(0, 0);
})

let scrollpos = window.scrollY
  const screenHeight = screen.height;
  const add_class_on_scroll = () => scrollButton.classList.add("scale-90")
  const remove_class_on_scroll = () => scrollButton.classList.remove("scale-90")

  window.addEventListener('scroll', function() {
    scrollpos = window.scrollY;

    if (scrollpos >= screenHeight) { add_class_on_scroll() }
    else { remove_class_on_scroll() }

  })

var lazyLoadInstance = new LazyLoad({
  // Your custom settings go here
});