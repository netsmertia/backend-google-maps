var marker = new Array;

function inicializar(x, y, zoom, index, mapDiv, custom)
{
    let latlng = new google.maps.LatLng(x, y);

    let myOptions = {
        zoom: zoom,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    let map = new google.maps.Map(document.getElementById(mapDiv + '-div'), myOptions);

    if (custom) {
        latlng = new google.maps.LatLng(x, y);
    } else {
        latlng = new google.maps.LatLng(0, 0);
    }

    marker[index] = new google.maps.Marker({
        position: latlng,        
        map: map
    });

    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(mapDiv, index, marker, event.latLng);
    });  


    const input = document.getElementById("pac-input");
//   map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
  const autocomplete = new google.maps.places.Autocomplete(input);
  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
//   autocomplete.bindTo("bounds", map);
  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
//   const infowindow = new google.maps.InfoWindow();
//   const infowindowContent = document.getElementById("infowindow-content");
//   infowindow.setContent(infowindowContent);
//   const marker = new google.maps.Marker({
//     map,
//     anchorPoint: new google.maps.Point(0, -29),
//   });
  autocomplete.addListener("place_changed", () => {
    // infowindow.close();
    marker[index].setVisible(false);
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Why 17? Because it looks good.
    }
    placeMarker(mapDiv, index, marker, place.geometry.location);
    marker[index].setVisible(true);
    // let address = "";

    // if (place.address_components) {
    //   address = [
    //     (place.address_components[0] &&
    //       place.address_components[0].short_name) ||
    //       "",
    //     (place.address_components[1] &&
    //       place.address_components[1].short_name) ||
    //       "",
    //     (place.address_components[2] &&
    //       place.address_components[2].short_name) ||
    //       "",
    //   ].join(" ");
    // }
    // infowindowContent.children["place-icon"].src = place.icon;
    // infowindowContent.children["place-name"].textContent = place.name;
    // infowindowContent.children["place-address"].textContent = address;
    // infowindow.open(map, marker[index]);
  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
//   function setupClickListener(id, types) {
//     const radioButton = document.getElementById(id);
//     radioButton.addEventListener("click", () => {
//       autocomplete.setTypes(types);
//     });
//   }
//   setupClickListener("changetype-all", []);
//   setupClickListener("changetype-address", ["address"]);
//   setupClickListener("changetype-establishment", ["establishment"]);
//   setupClickListener("changetype-geocode", ["geocode"]);
//   document
//     .getElementById("use-strict-bounds")
//     .addEventListener("click", function () {
//       console.log("Checkbox clicked! New state=" + this.checked);
//       autocomplete.setOptions({ strictBounds: this.checked });
//     });



}

function placeMarker(mapDiv, index, market, location)
{
    marker[index].setPosition(location);
    var setMapPosition = [marker[index].getPosition().lat(), marker[index].getPosition().lng()];
    $('#' + mapDiv).val(setMapPosition.join(','));
}