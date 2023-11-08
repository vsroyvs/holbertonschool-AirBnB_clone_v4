$(() => {
  $('input').css({'margin-right': '10px'});
  let amenitiesChecked = {};

  $("input:checkbox").on('change', function () {
    if ($( this ).prop('checked')){
      amenitiesChecked[$( this ).data('id')] = $( this ).data('name');
    } else {
      delete amenitiesChecked[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenitiesChecked).join(', '));
  });
});
