document.addEventListener('DOMContentLoaded', () => {
    const startSelect = document.getElementById('start-point');
    const endSelect = document.getElementById('end-point');
    const startMarker = document.getElementById('start-marker');
    const endMarker = document.getElementById('end-marker');
    const canvas = document.getElementById('map-canvas');
    const ctx = canvas.getContext('2d');
    const mapImage = document.getElementById('school-map');
    const mapContainer = document.querySelector('.map-container');

    const originalWidth = 1405;
    const originalHeight = 1122;

    const locations = {
        '창의디자인실': { x: 147, y: 73 },
        '교장실': { x: 1272, y: 323 }
    };

    let scaleFactor = 1;

    function resizeMap() {
        const containerWidth = mapContainer.offsetWidth;
        scaleFactor = containerWidth / originalWidth;

        mapImage.style.width = '100%';
        mapImage.style.height = 'auto';

        canvas.width = containerWidth;
        canvas.height = originalHeight * scaleFactor;

        mapContainer.style.height = `${canvas.height}px`;

        updateMap();
    }

    function scaleCoords(coords) {
        return {
            x: coords.x * scaleFactor,
            y: coords.y * scaleFactor
        };
    }

    function markPoint(coords, marker) {
        const scaledCoords = scaleCoords(coords);
        marker.style.left = `${scaledCoords.x}px`;
        marker.style.top = `${scaledCoords.y}px`;
        marker.style.display = 'block';
    }

    function drawPath(start, end) {
        const scaledStart = scaleCoords(start);
        const scaledEnd = scaleCoords(end);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(scaledStart.x, scaledStart.y);
        ctx.lineTo(scaledEnd.x, scaledStart.y);
        ctx.lineTo(scaledEnd.x, scaledEnd.y);

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    function updateMap() {
        if (startCoords) markPoint(startCoords, startMarker);
        if (endCoords) markPoint(endCoords, endMarker);
        if (startCoords && endCoords) drawPath(startCoords, endCoords);
    }

    let startCoords = null;
    let endCoords = null;

    startSelect.addEventListener('change', function () {
        startCoords = locations[this.value] || null;
        updateMap();
    });

    endSelect.addEventListener('change', function () {
        endCoords = locations[this.value] || null;
        updateMap();
    });

    window.addEventListener('resize', resizeMap);
    mapImage.onload = resizeMap;
    resizeMap(); // Call this immediately to set initial size
});