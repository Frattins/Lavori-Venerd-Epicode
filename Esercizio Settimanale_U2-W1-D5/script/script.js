window.addEventListener('scroll', function() {
    var heroHeight = document.querySelector('.hero').offsetHeight;
    var header = document.querySelector('header');
    var button = header.querySelector('.blkbtn');
  
    if(window.scrollY > heroHeight) {
      header.classList.add('scrolled');
      button.classList.add('scrolled-btn');
    } else {
      header.classList.remove('scrolled');
      button.classList.remove('scrolled-btn');
    }
  });
  