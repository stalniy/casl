(function() {
  var btnMenu = document.querySelector('.btn-menu');

  btnMenu.addEventListener('click', function() {
    var target = document.querySelector(this.getAttribute('data-target'));

    if (this.classList.contains('active')) {
      this.classList.remove('active');
      target.classList.remove('active');
    } else {
      this.classList.add('active');
      target.classList.add('active');
    }
  });
})();
