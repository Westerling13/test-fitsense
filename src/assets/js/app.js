import $ from 'jquery';
import './jquery.mask.min';
import './jquery.validate.min';

window.jQuery = $;

$('#phone').mask('+7 (000) 000-00-00');

var checkoutTabs = $('.checkout__tab');
var checkoutSections = $('.checkout__section');
var layout = $('.page__layout');
var authModalButton = $('#auth-modal-button');
var authModal = $('#auth-modal');
var reg = $('.checkout__section--reg');
var auth = $('.checkout__section--auth');
var authButton = $('#auth-button');
var regButton = $('#reg-button');
var regButtonMobile = $('#reg-button-mobile');

var checkoutNavButton = $('.checkout__nav-button');
var checkoutNav = $('.checkout__nav');

function setActive(evt) {
  var dataType = $(this).data('type');
  evt.preventDefault();
  checkoutTabs.removeClass('checkout__tab--active');
  $(this).addClass('checkout__tab--active');
  checkoutSections.removeClass('checkout__section--active');
  $(dataType).addClass('checkout__section--active');
}

function setActiveMobile(evt) {
  var dataType = $(this).data('type');
  evt.preventDefault();
  $(this).toggleClass('checkout__tab-mobile--active');
  reg.slideToggle();
}

function showAuthModal(evt) {
  evt.preventDefault();
  authModal.addClass('auth-modal--active');
  layout.addClass('page__layout--active');
  regButtonMobile.addClass('checkout__customer-button--active');
  reg.slideUp();
  layout.click(function() {
    $(this).removeClass('page__layout--active');
    authModal.removeClass('auth-modal--active');
    regButtonMobile.removeClass('checkout__customer-button--active');
    reg.slideDown();
  });
}

function showMobileNav(evt) {
  evt.preventDefault();
  checkoutNav.toggleClass('checkout__nav--active');
  layout.addClass('page__layout--active');
  layout.click(function() {
    layout.removeClass('page__layout--active');
    checkoutNav.removeClass('checkout__nav--active');
  });
}

authButton.click(setActive);
regButton.click(setActive);
regButtonMobile.click(setActiveMobile);
authModalButton.click(showAuthModal);
checkoutNavButton.click(showMobileNav);

$(window).resize(function() {
  authModal.removeClass('auth-modal--active');
  layout.removeClass('page__layout--active');

  if ($(window).width() < 800) {
    reg.addClass('checkout__section--active');
    auth.removeClass('checkout__section--active');
  } else {
    reg.slideDown();
    regButton.addClass('checkout__tab--active');
    authButton.click(setActive);
    regButton.click(setActive);
    checkoutNav.removeClass('checkout__nav--active');
  }
});

$('#reg').validate({
  rules: {
    name: {
      required: true,
      minlength: 2
    },
    surname: {
      required: true,
      minlength: 2
    },
    phone: {
      required: true
    },
    email: {
      required: true
    }
  },
  messages: {
    name: {
      required: 'Это поле обязательно для заполнения',
      minlength: 'Введите не менее 2-х символов'
    },
    surname: {
      required: 'Это поле обязательно для заполнения',
      minlength: 'Введите не менее 2-х символов'
    },
    phone: {
      required: 'Это поле обязательно для заполнения'
    },
    email: {
      required: 'Это поле обязательно для заполнения',
      email: 'Введите корректный электронный адрес'
    }
  }
});

$('#auth').validate({
  rules: {
    login: {
      required: true,
      minlength: 2
    },
    password: {
      required: true,
      minlength: 8
    }
  },
  messages: {
    login: {
      required: 'Это поле обязательно для заполнения',
      minlength: 'Введите не менее 2-х символов'
    },
    password: {
      required: 'Это поле обязательно для заполнения',
      minlength: 'Введите не менее 8-х символов'
    }
  }
});

$('#auth-mobile').validate({
  rules: {
    login: {
      required: true,
      minlength: 2
    },
    password: {
      required: true,
      minlength: 8
    }
  },
  messages: {
    login: {
      required: 'Это поле обязательно для заполнения',
      minlength: 'Введите не менее 2-х символов'
    },
    password: {
      required: 'Это поле обязательно для заполнения',
      minlength: 'Введите не менее 8-х символов'
    }
  }
});
