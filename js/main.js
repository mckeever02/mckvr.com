(function() {

  var about1 = document.querySelector('#about1'),
      show1 = document.querySelector('#show1'),
      about2 = document.querySelector('#about2'),
      show2 = document.querySelector('#show2');


  show1.addEventListener("click", function(){
    about1.style.display = "block";
    show1.style.display = "none";
  });

  show2.addEventListener("click", function(song){
    about2.style.display = "block";
    show2.style.display = "none";

  });

  var throttle = function(type, name, obj) {
      var obj = obj || window;
      var running = false;
      var func = function() {
          if (running) { return; }
          running = true;
          requestAnimationFrame(function() {
              obj.dispatchEvent(new CustomEvent(name));
              running = false;
          });
      };
      obj.addEventListener(type, func);
  };
  throttle ("scroll", "optimizedScroll");

  var cross = document.getElementById("bigAssCross");

  window.addEventListener("optimizedScroll", function() {
    cross.style.transform = "rotate("+window.pageYOffset/25+"deg)";
  });

})();
