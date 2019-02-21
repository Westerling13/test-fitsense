import $ from 'jquery';
import './jquery.mask.min';
import './jquery.validate.min';

window.jQuery = $;

$('#phone').mask('+7 (000) 000-00-00');

var customerButtons = $('.checkout__customer-button');
var signIn = $('.checkout__customer-button--sign-in');
var signUp = $('.checkout__customer-button--sign-up');
var layout = $('.page__layout');
var checkoutSections = $('.checkout__section');
var checkoutButton = $('.checkout__nav-button');
var checkoutNav = $('.checkout__nav');
var registration = $('.registration');


function setActive(evt) {
  var dataType = $(this).data('type');
  evt.preventDefault();
  customerButtons.removeClass('checkout__customer-button--active');
  $(this).addClass('checkout__customer-button--active');
  checkoutSections.removeClass('checkout__section--active');
  $('#' + dataType).addClass('checkout__section--active');
}

if ($(window).width() >= 800) {
  customerButtons.click(setActive);
} else {
  checkoutButton.click(function() {
    checkoutNav.toggleClass('checkout__nav--active');
    layout.addClass('page__layout--active');
    layout.click(function() {
      layout.removeClass('page__layout--active');
      checkoutNav.removeClass('checkout__nav--active');
    });
  });
  signIn.click(function(evt) {
    var authorizationSection = $('#' + $(this).data('type'));
    evt.preventDefault();
    authorizationSection.addClass('checkout__section--active');
    layout.addClass('page__layout--active');
    layout.click(function() {
      layout.removeClass('page__layout--active');
      authorizationSection.removeClass('checkout__section--active');
    })
  });
  signUp.click(function(evt) {
    var registrationSection = $('#' + $(this).data('type'));
    evt.preventDefault();
    $(this).toggleClass('checkout__customer-button--active');
    registrationSection.slideToggle();
  });
}

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
