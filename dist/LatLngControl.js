'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _latlngcontrolTpl = require('./latlngcontrol.tpl.html');

var _latlngcontrolTpl2 = _interopRequireDefault(_latlngcontrolTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LatLngControl = function () {
  function LatLngControl() {
    _classCallCheck(this, LatLngControl);
  }

  _createClass(LatLngControl, [{
    key: 'onAdd',
    value: function onAdd(map) {

      this._map = map;
      this._container = document.createElement('div');
      this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group mapboxgl-ctrl-custom';
      this._container.innerHTML = _latlngcontrolTpl2.default;
      this._latSpan = this.getLatLngElementsById('lat');
      this._lngSpan = this.getLatLngElementsById('lng');
      this.bindEventListeners();

      return this._container;
    }
  }, {
    key: 'onRemove',
    value: function onRemove() {

      this._container.parentNode.removeChild(this._container);
      this._map = undefined;
    }
  }, {
    key: 'getLatLngElementsById',
    value: function getLatLngElementsById(id) {

      return Array.from(this._container.getElementsByTagName('span')).filter(function (span) {
        return span.id === 'mapboxgl-' + id;
      })[0];
    }
  }, {
    key: 'setCenter',
    value: function setCenter() {

      var center = this._map.getCenter();
      this._latSpan.innerHTML = center.lat.toFixed(7);
      this._lngSpan.innerHTML = center.lng.toFixed(7);
    }
  }, {
    key: 'bindEventListeners',
    value: function bindEventListeners() {
      var _this = this;

      this._map.on('styledata', this.setCenter.bind(this));

      this._map.off('styledata', this.setCenter);

      this._map.on('mousemove', function (e) {

        _this._latSpan.innerHTML = e.lngLat.lat.toFixed(7);
        _this._lngSpan.innerHTML = e.lngLat.lng.toFixed(7);
      });
    }
  }]);

  return LatLngControl;
}();

exports.default = LatLngControl;