var tooltip = (function() {

  $.fn.tooltipster('setDefaults', {
    delay: 150,
    speed: 200,
    position: 'left'
  });


  function show($elem, options) {
    $elem
      .tooltipster($.extend({}, options, {
        content: $elem.data('tooltip-content')
      }))
      .tooltipster('show');
  }

  function hide($elem) {
    $elem.tooltipster('hide');
  }


  return {
    show: show,
    hide: hide
  }

})();