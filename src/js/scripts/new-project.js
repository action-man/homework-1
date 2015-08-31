var newProject = (function() {

  var $moduleEl;

  function init($elem) {
    $moduleEl = $elem;
    $moduleEl.find('.js-projects__add').fancybox({
      beforeClose: function() {
        $(this.inner).find('form').trigger('reset').trigger('change');
      }
    });
  }


  return {
    init: init
  }

})();