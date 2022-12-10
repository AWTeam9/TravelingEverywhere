const markers = [
    {
        "title": "Motu Tane Island, French Polynesia",
        "lat": -16.44895414474925,
        "lng": -151.7630515758896,
        "location": "Motu Tane"
    },
    {
        "title": "Oahu Island, Hawaii",
        "lat": 21.457066662702985,
        "lng": -157.99807703858326,
        "location": "Oahu"
    },
    {
        "title": "Kuramathi, Maldives",
        "lat": 4.260552560041683,
        "lng": 72.98236763853434,
        "location": "Kuramathi"
    },
    {
        "title": "Onok, Philipines Palawan",
        "lat": 8.016610690646663,
        "lng": 117.21072349953835,
        "location": "Onok"
    },
    {
        "title": "Woljeongri, Korea Jeju",
        "lat": 33.556032,
        "lng": 126.796175,
        "location": "Woljeongri"
    },
    {
        "title": "Snoqualmie Region, USA Washington State",
        "lat": 47.54688280767065,
        "lng": -121.83739808417083,
        "location": "Snoqualmie Region"
    },
    {
        "title": "Issaquah Squak Mountain, USA Washington State",
        "lat": 47.520254242664855,
        "lng": -122.04816503922737,
        "location": "Issaquah Squak Mountain"
    },
    {
        "title": "British Columbia, Canada",
        "lat": 54.62610548773211,
        "lng": -125.0533187586821,
        "location": "British Columbia"
    },
    {
        "title": "Belgrad Forest, Turkey Istanbul",
        "lat": 41.18535855864242,
        "lng": 28.99248954654801,
        "location": "Belgrad Forest"
    },
    {
        "title": "Rome, Italy",
        "lat": 41.90553802934069,
        "lng": 12.496494888693647,
        "location": "Rome"
    },
    {
        "title": "Amsterdam, Netherlands",
        "lat": 52.35557598387669,
        "lng": 4.805712106370267,
        "location": "Amsterdam"
    },
    {
        "title": "Vienna, Austria",
        "lat": 48.213442789081085,
        "lng": 16.373243216501855,
        "location": "Vienna"
    },
    {
        "title": "Budapest, Hungary",
        "lat": 47.512674594505654,
        "lng": 19.040344935547477,
        "location": "Budapest"
    },
    {
        "title": "Tuscany, Italy",
        "lat": 43.47104042995049,
        "lng": 11.264436579814985,
        "location": "Tuscany"
    },
    {
        "title": "Jeonju Hanok, Korea",
        "lat": 35.814804,
        "lng": 127.152637,
        "location": "Jeonju Hanok"
    },
    {
        "title": "Moureze, France",
        "lat": 43.6164309039406,
        "lng": 3.3491017663082085,
        "location": "Moureze"
    },
    {
        "title": "Kyoto, Japan",
        "lat": 35.29314344553371,
        "lng": 135.49086630854435,
        "location": "Kyoto"
    },
    {
        "title": "Gimmelwald, Switzerland",
        "lat": 46.54592304498779,
        "lng": 7.891544697767862,
        "location": "Gimmelwald"
    },
    {
        "title": "Lauterbrunnen, Switzerland",
        "lat": 46.596257037023065,
        "lng": 7.908742618874603,
        "location": "Lauterbrunnen"
    },
    {
        "title": "Positano, Italy",
        "lat": 40.628104059173026,
        "lng": 14.484815957341032,
        "location": "Positano"
    },
];

// Initialize and add the map
function initMap() {
    const mapOptions = {
        center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
        zoom: 0,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const latlngbounds = new google.maps.LatLngBounds();
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    for (var i = 0; i < markers.length; i++) {
        const data = markers[i];
        const myLatlng = new google.maps.LatLng(data.lat, data.lng);
        const marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: data.title
        });
        google.maps.event.addListener(marker, 'click', () => {
            window.location.href = `/main?location=${data.location}`;
            //window.location.href = "../html/main.html";
        });
        latlngbounds.extend(marker.position);
    }
    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);
}

window.initMap = initMap;
