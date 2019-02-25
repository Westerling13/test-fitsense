import $ from 'jquery';
import './jquery.mask.min';
import './jquery.validate.min';

window.jQuery = $;

//маска для телефона
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

//коллбэк для установки активного таба
function setActive(evt) {
  var dataType = $(this).data('type');
  evt.preventDefault();
  checkoutTabs.removeClass('checkout__tab--active');
  $(this).addClass('checkout__tab--active');
  checkoutSections.removeClass('checkout__section--active');
  $(dataType).addClass('checkout__section--active');
}

//коллбэк для установки активного таба на мобильных
function setActiveMobile(evt) {
  var dataType = $(this).data('type');
  evt.preventDefault();
  $(this).toggleClass('checkout__tab-mobile--active');
  reg.slideToggle();
}

//коллбэк для вызова модалки с авторизацией на мобильных
function showAuthModal(evt) {
  evt.preventDefault();
  authModal.addClass('auth-modal--active');
  layout.addClass('page__layout--active');
  layout.click(function() {
    $(this).removeClass('page__layout--active');
    authModal.removeClass('auth-modal--active');
  });
}

//коллбэк для вызова меню навигации на мобильных
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
  if ($(window).width() < 800) {
    auth.css('display', 'none');
  } else {
    authModal.removeClass('auth-modal--active');
    auth.removeAttr('style');
    reg.removeAttr('style');
    layout.removeClass('page__layout--active');
    checkoutNav.removeClass('checkout__nav--active');
  }
});

//валидация формы регистрации
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

//валидация формы авторизации
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

//валидация формы авторизации на мобильных
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
