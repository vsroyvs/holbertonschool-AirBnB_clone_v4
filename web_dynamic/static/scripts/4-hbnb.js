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

  $.ajax({
    method: "POST",
    url: "http://127.0.0.1:5001/api/v1/places_search/",
    data: JSON.stringify({}),
    contentType: 'application/json',
    dataType: 'json',
  }).done( (response) => {
    let html = ``;
    response.forEach(place => {
      html += `
      <article>
        <div class="title_box">
          <h2>${ place.name }</h2>
          <div class="price_by_night">$${ place.price_by_night }</div>
        </div>
        <div class="information">
          <div class="max_guest">${ place.max_guest } Guest</div>
            <div class="number_rooms">${ place.number_rooms } Bedroom</div>
            <div class="number_bathrooms">${ place.number_bathrooms } Bathroom</div>
        </div>
        <div class="description">${ place.description }</div>
      </article>
      `
    });
    $('.places').append(html);
  }).fail((error) => {
    console.log("Error " + error);
  });

  $('button').on('click', () => {
    $.ajax({
      method: "POST",
      url: "http://127.0.0.1:5001/api/v1/places_search/",
      data: JSON.stringify({'amenities': Object.keys(amenitiesChecked)}),
      contentType: 'application/json',
      dataType: 'json',
    }).done( (response) => {
      $('.places').html('<br />');
      response.forEach(place => {
        let html = ``;
        $.ajax({
          method: 'GET',
          url: `http://127.0.0.1:5001/api/v1/places/${place.id}/amenities`
        }).done((data) => {
          let amenitiesId = [];
          data.forEach(function (amen) {
            amenitiesId.push(amen.name);
          });
          const amenity = amenitiesId.join(', ');
          html += `
          <article>
            <div class="title_box">
              <h2>${ place.name }</h2>
              <div class="price_by_night">$${ place.price_by_night }</div>
            </div>
            <div class="information">
              <div class="max_guest">${ place.max_guest } Guest</div>
                <div class="number_rooms">${ place.number_rooms } Bedroom</div>
                <div class="number_bathrooms">${ place.number_bathrooms } Bathroom</div>
            </div>
            <div class="user">
              <b>Amenities:</b> ${ amenity }
            </div>
            <div class="description">${ place.description }</div>
          </article>
          `
          $('.places').append(html);
        });
      });
    }).fail((error) => {
      console.log("Error " + error);
    });
  });
});
