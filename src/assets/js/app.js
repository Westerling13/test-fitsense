import $ from 'jquery';
//import './jquery-ui.min';
import './jquery.mask.min';
import './jquery.validate.min';

window.jQuery = $;

//$('#tabs').tabs();

$('#phone').mask('+7 (000) 000-00-00');

var customerButtons = $('.checkout__customer-button');
var checkoutSections = $('.checkout__section');
var layout = $('.page__layout');
var authModalButton = $('#auth-mobile-button');
var authModal = $('#authMobile');
var reg = $('.checkout__section--reg');
var auth = $('.checkout__section--auth');
var authButton = $('#auth-button');
var regButton = $('#reg-button');
var regButtonMobile = $('#reg-button-mobile');

var checkoutButton = $('.checkout__nav-button');
var checkoutNav = $('.checkout__nav');

function setActive(evt) {
  var dataType = $(this).data('type');
  evt.preventDefault();
  customerButtons.removeClass('checkout__customer-button--active');
  $(this).addClass('checkout__customer-button--active');
  checkoutSections.removeClass('checkout__section--active');
  $(dataType).addClass('checkout__section--active');
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
  checkoutNav.toggleClass('checkout__nav--active');
  layout.addClass('page__layout--active');
  layout.click(function() {
    layout.removeClass('page__layout--active');
    checkoutNav.removeClass('checkout__nav--active');
  });
}

authButton.click(setActive);
regButton.click(setActive);
authModalButton.click(showAuthModal);

if ($(window).width() < 800) {
  checkoutButton.click(showMobileNav);
  regButtonMobile.click(function() {
    regButtonMobile.toggleClass('checkout__customer-button--active');
    reg.slideToggle();
  });
}

$(window).resize(function() {
  authModal.removeClass('auth-modal--active');
  layout.removeClass('page__layout--active');

  if ($(window).width() < 800) {
    reg.addClass('checkout__section--active');
    auth.removeClass('checkout__section--active');
  } else {
    customerButtons.click(setActive);
    reg.addClass('checkout__section--active');
    customerButtons.removeClass('checkout__customer-button--active');
    regButton.addClass('checkout__customer-button--active');
    authButton.click(setActive);
    regButton.click(setActive);
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
