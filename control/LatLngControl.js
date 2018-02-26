import template from './latlngcontrol.tpl.html';

class LatLngControl {

  onAdd(map) {

    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group mapboxgl-ctrl-custom';
    this._container.innerHTML = template;
    this._latSpan = this.getLatLngElementsById('lat');
    this._lngSpan = this.getLatLngElementsById('lng');
    this.bindEventListeners();

    return this._container;
  }

  onRemove() {

    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }

  getLatLngElementsById(id) {

    return Array.from(this._container.getElementsByTagName('span'))
    .filter((span) => span.id === `mapboxgl-${id}`)[0];
  }

  setCenter() {

    const center = this._map.getCenter();
    this._latSpan.innerHTML = center.lat.toFixed(7);
    this._lngSpan.innerHTML = center.lng.toFixed(7);
  }

  bindEventListeners() {

    this._map.on('styledata', this.setCenter.bind(this));

    this._map.off('styledata', this.setCenter);

    this._map.on('mousemove', (e) => {

      this._latSpan.innerHTML = e.lngLat.lat.toFixed(7);
      this._lngSpan.innerHTML = e.lngLat.lng.toFixed(7);
    });
  }
}

export default LatLngControl;
