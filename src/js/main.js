$(document).ready(function() {



  /*-------- [FANCYBOX] --------*/

  $.fancybox.defaults.padding = 0;
  $.fancybox.defaults.tpl.next = '<a title="вперед" class="fancybox-nav fancybox-next" href="javascript:;"><span class="paging-btn paging-btn_next"></span></a>';
  $.fancybox.defaults.tpl.prev = '<a title="назад" class="fancybox-nav fancybox-prev" href="javascript:;"><span class="paging-btn paging-btn_prev"></span></a>';
  $.fancybox.defaults.tpl.closeBtn = '<span title="закрыть" class="fancybox-item fancybox-close"></span>';
  $.fancybox.defaults.tpl.error = '<p class="fancybox-error">Не удалось загрузить информацию.</p>';
  $.fancybox.defaults.autoResize = false;
  $.fancybox.defaults.autoHeight = true;
  $.fancybox.defaults.autoSize = false;
  $.fancybox.defaults.minHeight = 0;
  $.fancybox.defaults.minWidth = 200;
  $.fancybox.defaults.fitToView = false;
  $.fancybox.helpers.title.defaults.type = 'inside';
  $.fancybox.helpers.title.defaults.position = 'top';

  /*-------- /[FANCYBOX] --------*/






  if ($('.js-file-input').length) {
    $('.js-file-input').each(function() {
      fileInput.init($(this));
    });
  }


  if ($('.js-validator').length) {
    $('.js-validator').each(function() {
      validator.init($(this));
    });
  }


  if ($('.js-projects').length) {
    newProject.init($('.js-projects'));
  }



});