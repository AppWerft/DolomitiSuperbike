$(document).ready(function() {
	var markers = [];
	var shadow = new google.maps.MarkerImage("./shadow.png",
        new google.maps.Size(44.0, 41.0),
        new google.maps.Point(0, 0),
        new google.maps.Point(11.0, 20.0)
    );
	function updateMarkers() {
		$.ajax({
			dataType : "json",
			url : './api/',
			data : null,
			timeout : 10000,
			error : function() {
				$('#counter').html('kein Netz');
				for (var key in markers) {
					markers[key].setMap(null);
					delete(markers[key]);
				}
				setTimeout(updateMarkers,1000);
			},
			success : function(_res) {
				var positions = _res.positions, simulation = _res.simulation;
				var found = false;
				for (var i=0;i<positions.length; i++) {
					var r = positions[i];
					if (!markers[r.nr]) {  // create new
						markers[r.nr] = new MarkerWithLabel({
       						position: new google.maps.LatLng(r.ll.split(',')[0],r.ll.split(',')[1]),
       						map: map,
      						shadow: shadow,
							labelContent: r.nr,
							//animation: google.maps.Animation.DROP,
       						labelAnchor: new google.maps.Point(12, 2),
       						labelClass: "labels", 
       						labelStyle: {opacity: 0.65},
       						icon: {url:'./rad.png'}
     					});
					} else {  // update of existing marker
						var lat = r.ll.split(',')[0], lon=r.ll.split(',')[1];
						if (simulation){
							var STEP = 0.001;
							var lat = markers[r.nr].getPosition().lat()  + Math.random()*STEP-STEP/2;
							var lon = markers[r.nr].getPosition().lng() + Math.random()*STEP-STEP/2;
											
						} 
						markers[r.nr].setPosition(new google.maps.LatLng(lat,lon));
					}
				}
				setTimeout(updateMarkers,2500);
				// kill old markers:
				$('#counter').html(positions.length+' Fahrer');
				for (var key in markers) {
					// looking for key in positions
					found = false;
					for (var i=0; i<positions.length; i++) {
						if (key == positions[i].nr) found = true;
					}
					if (found == false) {
						markers[key].setMap(null);
						delete(markers[key]);
					}
				}
				
			}
		});	
	}
    var map = new google.maps.Map(document.getElementById("map_canvas"), {
          center: new google.maps.LatLng(46.4138, 11.8398),
          zoom: 11, disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    $('#map_canvas').animate({opacity:1},5000);
    updateMarkers();
});