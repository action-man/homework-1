function Placeholder(elm) {
  var self = this;

  if (elm.data('placeholder')) return elm.data('placeholder');

  elm.data('placeholder', self);

  var $spanHelper;

  init();


  function init() {
    if (elm.attr('placeholder') === undefined || elm.val() !== '') return;

    create();
    attachEvents();
  }

  function create() {
    var $wrapper = $('<div />').addClass('ie-ph-wrap');
    $spanHelper = $('<span />').addClass('ie-ph').text(elm.attr('placeholder'));

    elm.wrap($wrapper).after($spanHelper);
  }

  function attachEvents() {
    $spanHelper.on('click', onPlaceholderClick);
    elm.on('blur', onInputBlur);
    elm.on('focus', onInputFocus);
    elm.closest('form').on('reset', onReset);
  }

  function onPlaceholderClick() {
    $spanHelper.hide()
    elm.focus();
  }

  function onInputBlur() {
    if (elm.val() === '') {
      $spanHelper.show();
    }
  }

  function onInputFocus() {
    $spanHelper.hide();
  }

  function onReset() {
    setTimeout(onInputBlur, 0);
  }

};


$(document).ready(function() {
  $('input[placeholder], textarea[placeholder]').each(function() {
    new Placeholder($(this));
  });
});