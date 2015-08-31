var fileInput = (function() {

  var $moduleEl,
      $original,
      $dummy;


  function init($elem) {
    $moduleEl = $elem;

    $original = $moduleEl.find('.file-input__orig-field'),
    $dummy = $moduleEl.find('.file-input__dummy-field');
    setVal($original.val());

    attachEvents();
  }

  function attachEvents() {
    $(document).on('change.file-input', '.file-input__orig-field', function() {
      var $t = $(this),
          filePath = $t.val(),
          reWin = /.*\\(.*)/,
          reUnix = /.*\/(.*)/;

      var fileName = filePath.replace(reWin, '$1');
          fileName = fileName.replace(reUnix, '$1');

      $dummy.text(fileName);
    });

    $moduleEl.closest('form').on('reset', onFormReset);
  }

  function onFormReset() {
    setTimeout(function() {
      $original.trigger('change');
      setVal($original.val());
    }, 0);
    
  }

  function setVal(val) {
    if (val.length) {
      $dummy.text($original.val());
    } else {
      $dummy.text($original.attr('placeholder'));
    }
  }


  return {
    init: init
  }


})();