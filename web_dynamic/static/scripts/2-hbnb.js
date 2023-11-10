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

  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/status/',
    type: 'GET',
    dataType: 'json'
  }).done((data) => {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
