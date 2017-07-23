(function() {
  var btnMenu = document.querySelector('.btn-menu');
  var sidebar = document.getElementById('sidebar');

  sidebar.addEventListener('click', function(event) {
    event.stopPropagation();
  });

  btnMenu.addEventListener('click', function() {
    toggleMenu(this);
  });

  document.body.addEventListener('click', function() {
    var buttons = document.querySelectorAll('.btn-menu.active');

    Array.prototype.slice.call(buttons, 0).forEach(toggleMenu);
  });

  function toggleMenu(btn) {
    var target = document.querySelector(btn.getAttribute('data-target'));

    if (btn.classList.contains('active')) {
      btn.classList.remove('active');
      target.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      btn.classList.add('active');
      target.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
})();
