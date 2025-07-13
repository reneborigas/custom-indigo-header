function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import React, { useState } from 'react';
import { getConfig } from '@edx/frontend-platform';
import Cookies from 'universal-cookie';
import { Icon } from '@openedx/paragon';
import { WbSunny, Nightlight } from '@openedx/paragon/icons';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import messages from './Header.messages';
var themeCookie = 'indigo-toggle-dark';
var themeCookieExpiry = 90; // days

var ThemeToggleButton = function ThemeToggleButton(_ref) {
  var intl = _ref.intl;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isDarkThemeEnabled = _useState2[0],
    setIsDarkThemeEnabled = _useState2[1];
  var cookies = new Cookies();
  var isThemeToggleEnabled = getConfig().INDIGO_ENABLE_DARK_TOGGLE;
  var getCookieExpiry = function getCookieExpiry() {
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + themeCookieExpiry);
  };
  var getCookieOptions = function getCookieOptions(serverURL) {
    return {
      domain: serverURL.hostname,
      path: '/',
      expires: getCookieExpiry()
    };
  };
  var addDarkThemeToIframes = function addDarkThemeToIframes() {
    var iframes = document.getElementsByTagName('iframe');
    var iframesLength = iframes.length;
    if (iframesLength > 0) {
      Array.from({
        length: iframesLength
      }).forEach(function (_, ind) {
        var style = document.createElement('style');
        style.textContent = "\n          body{\n            background-color: #0D0D0E;\n            color: #ccc;\n          }\n          a {color: #ccc;}\n          a:hover{color: #d3d3d3;}\n          ";
        if (iframes[ind].contentDocument) {
          iframes[ind].contentDocument.head.appendChild(style);
        }
      });
    }
  };
  var removeDarkThemeFromiframes = function removeDarkThemeFromiframes() {
    var iframes = document.getElementsByTagName('iframe');
    var iframesLength = iframes.length;
    Array.from({
      length: iframesLength
    }).forEach(function (_, ind) {
      if (iframes[ind].contentDocument) {
        var iframeHead = iframes[ind].contentDocument.head;
        var styleTag = Array.from(iframeHead.querySelectorAll('style')).find(function (style) {
          return style.textContent.includes('background-color: #0D0D0E;') && style.textContent.includes('color: #ccc;');
        });
        if (styleTag) {
          styleTag.remove();
        }
      }
    });
  };
  var onToggleTheme = function onToggleTheme() {
    var serverURL = new URL(getConfig().LMS_BASE_URL);
    var theme = '';
    if (cookies.get(themeCookie) === 'dark') {
      document.body.classList.remove('indigo-dark-theme');
      removeDarkThemeFromiframes();
      setIsDarkThemeEnabled(false);
      theme = 'light';
    } else {
      document.body.classList.add('indigo-dark-theme');
      addDarkThemeToIframes();
      setIsDarkThemeEnabled(true);
      theme = 'dark';
    }
    cookies.set(themeCookie, theme, getCookieOptions(serverURL));
    var learningMFEUnitIframe = document.getElementById('unit-iframe');
    if (learningMFEUnitIframe) {
      learningMFEUnitIframe.contentWindow.postMessage({
        'indigo-toggle-dark': theme
      }, serverURL.origin);
    }
  };
  var hanldeKeyUp = function hanldeKeyUp(event) {
    if (event.key === 'Enter') {
      onToggleTheme();
    }
  };
  if (!isThemeToggleEnabled) {
    return /*#__PURE__*/React.createElement("div", null);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "theme-toggle-button"
  }, /*#__PURE__*/React.createElement("div", {
    className: "light-theme-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    src: WbSunny
  })), /*#__PURE__*/React.createElement("div", {
    className: "toggle-switch"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "theme-toggle-checkbox",
    className: "switch"
  }, /*#__PURE__*/React.createElement("input", {
    id: "theme-toggle-checkbox",
    defaultChecked: cookies.get(themeCookie) === 'dark',
    onChange: onToggleTheme,
    onKeyUp: hanldeKeyUp,
    type: "checkbox",
    title: intl.formatMessage(messages['header.user.theme'])
  }), /*#__PURE__*/React.createElement("span", {
    className: "slider round"
  }), /*#__PURE__*/React.createElement("span", {
    id: "theme-label",
    className: "sr-only"
  }, "Switch to ".concat(isDarkThemeEnabled ? 'Light' : 'Dark', " Mode")))), /*#__PURE__*/React.createElement("div", {
    className: "dark-theme-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    src: Nightlight
  })));
};
ThemeToggleButton.propTypes = {
  // i18n
  intl: intlShape.isRequired
};
export default injectIntl(ThemeToggleButton);
//# sourceMappingURL=ThemeToggleButton.js.map