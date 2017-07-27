(function() {
  var btnMenu = document.querySelector('.btn-menu');
  var sidebar = document.getElementById('sidebar-wrapper');
  var sidebarContainer = document.getElementById('sidebar');

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

  function calculateSidebarSize() {
    const size = sidebarContainer.getBoundingClientRect()

    sidebarSize = { top: size.top + (window.pageYOffset || document.documentElement.scrollTop) }
  }

  var isPassiveListenersSupported = false;

  try {
    var options = Object.defineProperty({}, "passive", {
      get: function() {
        isPassiveListenersSupported = true;
      }
    });

    window.addEventListener("test", null, options);
  } catch(err) {}

  var sidebarSize;
  calculateSidebarSize();
  window.addEventListener('scroll', function() {
    if (btnMenu.offsetWidth) {
      return;
    }


    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var isFixed = sidebar.classList.contains('fixed');

    if (sidebarSize.top <= scrollTop) {
      if (!isFixed) {
        sidebar.style.left = sidebar.getBoundingClientRect().left + 'px';
        sidebar.classList.add('fixed');
      }
    } else if (isFixed) {
      sidebar.classList.remove('fixed');
      sidebar.style.left = '';
    }
  }, isPassiveListenersSupported ? { passive: true } : false);

  window.addEventListener('resize', calculateSidebarSize, isPassiveListenersSupported ? { passive: true } : false);
  window.addEventListener('orientationchange', calculateSidebarSize);
})();
