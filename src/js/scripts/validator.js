var validator = (function() {

  var $moduleEl;


  function init($elem) {
    $moduleEl = $elem;

    // отключаем браузерную валидацию
    $moduleEl.attr('novalidate', true);

    attachEvents();
  }

  function attachEvents() {
    $moduleEl.on('submit', onFormSubmit);
    $moduleEl.on('reset', onFormReset);
    $moduleEl.on('keyup change', '.is-error', onFieldChange);
  }

  function onFormSubmit(e) {
    var $form = $(this);

    var $required = $form.find('[required]'),
        isValid = true;

    $required.each(function() {
      var $field = $(this);

      if (!$.trim($field.val()).length) {
        createError($field);
        isValid = false;
      }

    });


    if (!isValid) e.preventDefault();
  }

  function onFormReset() {
    $moduleEl.find('.is-error').each(function() {
      removeError($(this));
    });
  }

  function onFieldChange() {
    var $field = $(this);

    if ($.trim($field.val()).length) removeError($field);
  }

  function createError($field) {
    $field.addClass('is-error');
    tooltip.show($field, {
      position: $field.data('tooltip-position'),
      autoClose: false,
      trigger: false
    });
  }

  function removeError($field) {
    $field.removeClass('is-error');
    tooltip.hide($field);    
  }


  return {
    init: init
  }

})();