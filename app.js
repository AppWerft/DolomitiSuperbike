$(document).ready(function() {
	$('head').html('<style>html, body{ margin: 0; padding: 0;height: 100%;position:relative}#logo {position:absolute;top:10px;left:10px;width:240px;z-index:9999}  #counter {z-index:1000;height:50px;position:absolute;top:5px;right:10px;font-size:36px;font-family:"Helvetica";font-weight:bold;color:white} #countercontainer{-webkit-border-radius: 0px 0px 0px 10px;border-radius: 0px 0px 0px 10px; position:absolute;top:0;right:0;width:210px;height:50px;background-color:black;opacity:0.5;z-index:999} #map_canvas {opacity:0.1;padding: 0;position: absolute;bottom: 0px;top: 0px;left: 0px;right: 0px;}</style>');
	var markers = [];var shadow = new google.maps.MarkerImage("./shadow.png",
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
				setTimeout(updateMarkers,25000);
			},
			success : function(_res) {
				var positions = _res.positions, simulation = _res.simulation;
				var found = false;
				for (var i=0;i<positions.length; i++) {
					var r = positions[i];
					if (!markers[r.nr]) {  // create new
						markers[r.nr] = new google.maps.Marker({
							position: new google.maps.LatLng(r.ll.split(',')[0],r.ll.split(',')[1]),
							map: map,
							//animation: google.maps.Animation.DROP,
							shadow: shadow,
							icon : new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_spin&chld=0.65|0|FFaa00|11|_|' + r.nr,
								new google.maps.Size(26.0, 45.0),
								new google.maps.Point(0, 0),
								new google.maps.Point(11.0, 20.0)
							)
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
    setTimeout(updateMarkers,3000);
});