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
      url: 'http://0.0.0.0:5001/api/v1/status/',
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      }
    })
  });
  