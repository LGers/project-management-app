'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

var commonjsGlobal =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
    ? self
    : {};

function unwrapExports(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
  return (module = { exports: {} }), fn(module, module.exports), module.exports;
}

var _this = commonjsGlobal;

var eventMap = new Map();

var subscribe = function subscribe(eventId, callback) {
  if (!eventMap.has(eventId)) {
    eventMap.set(eventId, []);
  }
  eventMap.get(eventId).push(callback);
};

var unsubscribe = function unsubscribe(eventId, callback) {
  if (eventMap.has(eventId)) {
    var handlerArray = eventMap.get(eventId);
    var callbackIndex = handlerArray.indexOf(callback);
    if (callbackIndex >= 0) {
      handlerArray.splice(callbackIndex, 1);
    } else {
      console.warn('Unsubscription unsuccessful - callback not found.');
    }
  } else {
    console.warn('Unsubscription unsuccessful - eventId not found.');
  }
};

var dispatch = function dispatch(eventId) {
  for (
    var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1;
    _key < _len;
    _key++
  ) {
    args[_key - 1] = arguments[_key];
  }

  if (!eventMap.has(eventId)) return;
  eventMap.get(eventId).forEach(function (callback) {
    return callback.call.apply(callback, [_this].concat(args));
  });
};

var EVENT_ID = {
  SCHEDULING_MODAL_MUTATION_SUCCESS: 0,
  WORKFLOW_DRAG_DESTINATION_PLACERHOLDER: 1,
  WORKFLOW_SAVE_DRAG: 2,
  WORKFLOW_MULTISELECT: 3,
  CANVAS_TIMELINE_FORCE_REDRAW: 4,
  SOCKET_NOTIFY: 5,
  DND_REGISTER_DRAG_MOVE: 6,
  DND_RESET_PLACEHOLDER: 7,
};

var event_manager = {
  EVENT_ID: EVENT_ID,
  subscribe: subscribe,
  unsubscribe: unsubscribe,
  dispatch: dispatch,
};
var event_manager_2 = event_manager.subscribe;
var event_manager_3 = event_manager.unsubscribe;
var event_manager_4 = event_manager.dispatch;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
};

var createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _extends =
  Object.assign ||
  function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

var inherits = function (subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof superClass
    );
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
};

var slicedToArray = (function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i['return']) _i['return']();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError('Invalid attempt to destructure non-iterable instance');
    }
  };
})();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Util = (function () {
  function Util() {
    classCallCheck(this, Util);
  }

  createClass(Util, null, [
    {
      key: 'getDragEvents',
      value: function getDragEvents(group) {
        return {
          id: group,
          moveEvent: group + '-MOVE',
          resetEvent: group + '-RESET',
          startEvent: group + '-START',
          endEvent: group + '-END',
          scrollEvent: group + '-SCROLL',
          placeholderEvent: group + '-PLACEHOLDER',
        };
      },
    },
    {
      key: 'getDroppableParentElement',
      value: function getDroppableParentElement(element, dragAndDropGroup) {
        var count = 0;
        var maxTries = 15;
        var droppableParentElem = null;
        while (
          element &&
          element.parentNode &&
          !droppableParentElem &&
          element.tagName !== 'body' &&
          count <= maxTries
        ) {
          var foundDragAndDropGroup = element.getAttribute('droppablegroup');
          if (foundDragAndDropGroup && foundDragAndDropGroup === dragAndDropGroup) {
            droppableParentElem = element;
          }
          element = element.parentNode;
          count++;
        }
        return droppableParentElem;
      },
    },
    {
      key: 'getDraggableParentElement',
      value: function getDraggableParentElement(element) {
        var count = 0;
        var maxTries = 10;
        var draggableParentElem = null;
        while (
          element &&
          element.parentNode &&
          !draggableParentElem &&
          element.tagName !== 'body' &&
          count <= maxTries
        ) {
          if (element.getAttribute('draggableid')) {
            draggableParentElem = element;
            break;
          }
          element = element.parentNode;
          count++;
        }
        return draggableParentElem;
      },
    },
    {
      key: 'logUpdateReason',
      value: function logUpdateReason(props, state, prevProps, prevState) {
        Object.entries(props).forEach(function (_ref) {
          var _ref2 = slicedToArray(_ref, 2),
            key = _ref2[0],
            val = _ref2[1];

          return prevProps[key] !== val && console.log("Prop '" + key + "' changed");
        });
        Object.entries(state).forEach(function (_ref3) {
          var _ref4 = slicedToArray(_ref3, 2),
            key = _ref4[0],
            val = _ref4[1];

          return prevState[key] !== val && console.log("State '" + key + "' changed");
        });
      },
    },
  ]);
  return Util;
})();

var Draggable = (function (_Component) {
  inherits(Draggable, _Component);

  function Draggable(props) {
    classCallCheck(this, Draggable);

    var _this = possibleConstructorReturn(
      this,
      (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this, props)
    );

    _this.state = {
      startX: null,
      startY: null,
      isDragging: false,
      wasClicked: false,
      isTouch: false,
      xClickOffset: 0,
      yClickOffset: 0,
      didMoveMinDistanceDuringDrag: false,
      dragSensitivityX: 15,
      dragSensitivityY: 15,
    };
    _this.handleDragShortcuts = _this.handleDragShortcuts.bind(_this);
    _this.onPointerMove = _this.onPointerMove.bind(_this);
    _this.onPointerUp = _this.onPointerUp.bind(_this);
    _this.dragAndDropGroup = Util.getDragEvents(_this.props.dragAndDropGroup);
    _this.elFromPointCounter = 0;
    _this.latestUpdateX = null;
    _this.latestUpdateY = null;
    // Minimum pixels moved before looking for new cards etc.
    _this.minDragDistanceThreshold = _this.props.minDragDistanceThreshold
      ? _this.props.minDragDistanceThreshold
      : 5;
    _this.draggableHoveringOver = null;
    _this.droppableDraggedOver = null;
    return _this;
  }

  createClass(Draggable, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        document.addEventListener('keydown', this.handleDragShortcuts);
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        document.removeEventListener('keydown', this.handleDragShortcuts);
        cancelAnimationFrame(this.frame);
        this.frame = null;
      },
    },
    {
      key: 'handleDragShortcuts',
      value: function handleDragShortcuts(e) {
        if (e.key === 'Escape') {
          this.onPointerCancel(e);
        }
      },

      /*setPointerCapture(pointerId) {
  	if (!this.state.capturing && pointerId) {
  		this.draggable.setPointerCapture(pointerId);
  		this.setState({capturing: true, pointerId: pointerId});
  	}
  }
  
  releasePointerCapture() {
  	if (this.state.isTouch && this.state.pointerId && this.draggable) {
  		this.draggable.releasePointerCapture(this.state.pointerId);
  	}
  }*/
    },
    {
      key: 'getBoundingClientRect',
      value: function getBoundingClientRect() {
        if (this.draggable) {
          return this.draggable.getBoundingClientRect();
        }
      },
    },
    {
      key: 'removeDragEventListeners',
      value: function removeDragEventListeners() {
        var _this2 = this;

        if (!this.state.isTouch) {
          document.removeEventListener('mousemove', this.onPointerMove);
          document.removeEventListener('mouseup', this.onPointerUp);
          // Remove the click blocker after ended drag (on next available frame)
          requestAnimationFrame(function () {
            return document.removeEventListener('click', _this2.clickBlocker, true);
          });
        }
      },
    },
    {
      key: 'clickBlocker',
      value: function clickBlocker(e) {
        e.stopPropagation();
        e.preventDefault();
      },
    },
    {
      key: 'onPointerDown',
      value: function onPointerDown(e, isTouch) {
        var isMouse = e.buttons === 1;
        if (
          (!isTouch && !isMouse) ||
          (e.target.className &&
            typeof e.target.className === 'string' &&
            e.target.className.includes('no-drag')) ||
          this.props.disabled ||
          this.props.isSectionHeader
        ) {
          return;
        }
        if (e) {
          if (!isTouch && e.target.type !== 'textarea' && e.target.type !== 'text')
            e.preventDefault();
          e.stopPropagation();
        }
        if (!isTouch) {
          document.addEventListener('mousemove', this.onPointerMove);
          document.addEventListener('mouseup', this.onPointerUp);
        }
        var dragObject = {
          draggableId: this.props.draggableId,
          droppableId: this.props.droppableId,
        };
        event_manager_4(this.dragAndDropGroup.moveEvent, dragObject, null, null, null, null);
        if (this.droppableDraggedOver !== null || this.draggableHoveringOver !== null) {
          this.droppableDraggedOver = null;
          this.draggableHoveringOver = null;
        }
        var x = isTouch ? e.changedTouches[e.changedTouches.length - 1].clientX : e.clientX;
        var y = isTouch ? e.changedTouches[e.changedTouches.length - 1].clientY : e.clientY;
        var cardWidth = this.draggable.offsetWidth;
        var cardTop = this.draggable.getBoundingClientRect().top;
        var cardLeft = this.draggable.getBoundingClientRect().left;
        this.setState({
          width: cardWidth,
          didMoveMinDistanceDuringDrag: false,
          minDragDistanceMoved: false,
          startX: x,
          startY: y,
          wasClicked: true,
          isTouch: isTouch,
          isDragging: false,
          // +8 for margin for error
          xClickOffset: Math.abs(x - cardLeft) + 8,
          yClickOffset: Math.abs(y - cardTop) + 8,
        });
      },
    },
    {
      key: 'onPointerUp',
      value: function onPointerUp(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.props.disabled || this.props.isSectionHeader) {
          return;
        }
        if (this.state.isTouch && this.state.pointerId);
        if (this.state.didMoveMinDistanceDuringDrag) {
          event_manager_4(this.dragAndDropGroup.endEvent);
        }
        event_manager_4(this.dragAndDropGroup.resetEvent);
        this.draggableHoveringOver = null;
        this.setState({
          isDragging: false,
          capturing: false,
          didMoveMinDistanceDuringDrag: false,
          minDragDistanceMoved: false,
          cardLeft: 0,
          cardTop: 0,
          top: null,
          left: null,
          wasClicked: false,
        });
        this.removeDragEventListeners();
      },
    },
    {
      key: 'onPointerCancel',
      value: function onPointerCancel() {
        event_manager_4(this.dragAndDropGroup.resetEvent);
        this.draggableHoveringOver = null;
        this.setState({
          isDragging: false,
          capturing: false,
          didMoveMinDistanceDuringDrag: false,
          minDragDistanceMoved: false,
          left: null,
          top: null,
          cardLeft: 0,
          cardTop: 0,
          wasClicked: false,
        });
        this.removeDragEventListeners();
        //this.releasePointerCapture();
      },
      // Don't update what we're dragging over on every single drag
    },
    {
      key: 'shouldRefindDragElems',
      value: function shouldRefindDragElems(x, y) {
        if (!this.latestUpdateX || !this.latestUpdateY) {
          this.latestUpdateX = x;
          this.latestUpdateY = y;
          return true;
        } else {
          // Only update if we've moved some x + y distance that is larger than threshold
          var shouldUpdate =
            Math.abs(this.latestUpdateX - x) + Math.abs(this.latestUpdateY - y) >=
            this.minDragDistanceThreshold;
          if (shouldUpdate) {
            this.latestUpdateX = x;
            this.latestUpdateY = y;
            return true;
          }
          return false;
        }
      },
    },
    {
      key: 'moveElement',
      value: function moveElement(x, y) {
        var hasDispatched = false;
        var shouldRefindDragElems = this.shouldRefindDragElems(x, y);
        var droppableDraggedOver =
          shouldRefindDragElems || this.droppableDraggedOver == null
            ? this.getDroppableElemUnderDrag(x, y)
            : this.droppableDraggedOver;
        var draggableHoveringOver =
          shouldRefindDragElems || this.draggableHoveringOver == null
            ? this.getDraggableElemUnderDrag(x, y)
            : this.draggableHoveringOver;
        var newLeft = x - this.state.xClickOffset;
        var newTop = y - this.state.yClickOffset;
        var minDistanceMoved =
          Math.abs(this.state.startX - x) > this.state.dragSensitivityX ||
          Math.abs(this.state.startY - y) > this.state.dragSensitivityY;
        if (minDistanceMoved && !this.state.didMoveMinDistanceDuringDrag) {
          this.setState({ didMoveMinDistanceDuringDrag: true });
        }
        if (!minDistanceMoved && !this.state.didMoveMinDistanceDuringDrag) {
          var dragObject = {
            draggableId: this.props.draggableId,
            droppableId: this.props.droppableId,
          };
          event_manager_4(this.dragAndDropGroup.moveEvent, dragObject, null, null, null, null);
          hasDispatched = true;
          return;
        }
        if (!droppableDraggedOver) {
          event_manager_4(this.dragAndDropGroup.resetEvent);
          this.droppableDraggedOver = null;
          this.draggableHoveringOver = null;
        }
        var shouldRegisterAsDrag = this.state.didMoveMinDistanceDuringDrag || minDistanceMoved;
        if (shouldRegisterAsDrag && this.state.wasClicked && !this.state.isDragging) {
          var _dragObject = {
            draggableId: this.props.draggableId,
            droppableId: this.props.droppableId,
            height: this.draggable ? this.draggable.clientHeight : null,
          };
          event_manager_4(this.dragAndDropGroup.startEvent, _dragObject, x, y);
          hasDispatched = true;
        }
        // We're hovering over a droppable and a draggable
        if (droppableDraggedOver && draggableHoveringOver && shouldRegisterAsDrag) {
          var draggableHoveredOverId = draggableHoveringOver.getAttribute('draggableid');
          if (!draggableHoveredOverId.includes('placeholder')) {
            if (
              this.droppableDraggedOver !== droppableDraggedOver ||
              this.draggableHoveringOver !== draggableHoveringOver
            ) {
              var _dragObject2 = {
                draggableId: this.props.draggableId,
                droppableId: this.props.droppableId,
              };
              event_manager_4(
                this.dragAndDropGroup.moveEvent,
                _dragObject2,
                droppableDraggedOver,
                draggableHoveredOverId,
                x,
                y
              );
              hasDispatched = true;
              this.droppableDraggedOver = droppableDraggedOver;
              this.draggableHoveringOver = draggableHoveringOver;
            }
          }
        } else if (droppableDraggedOver && shouldRegisterAsDrag) {
          // We're hovering over a droppable, but no draggable
          this.droppableDraggedOver = droppableDraggedOver;
          this.draggableHoveringOver = null;
          var _dragObject3 = {
            draggableId: this.props.draggableId,
            droppableId: this.props.droppableId,
          };
          event_manager_4(
            this.dragAndDropGroup.moveEvent,
            _dragObject3,
            droppableDraggedOver,
            null,
            x,
            y,
            null
          );
          hasDispatched = true;
        }
        if (!hasDispatched) {
          // If nothing changed, we still wanna notify move for scrolling
          event_manager_4(this.dragAndDropGroup.moveEvent, null, null, null, x, y, null);
          hasDispatched = true;
        }
        this.setState({
          isDragging: shouldRegisterAsDrag,
          // We need to move more than the drag sensitivity before we consider it an intended drag
          minDragDistanceMoved: minDistanceMoved,
          left: newLeft,
          top: newTop,
        });
      },
    },
    {
      key: 'onPointerMove',
      value: function onPointerMove(e) {
        var _this3 = this;

        if (this.props.disabled || !this.state.wasClicked || this.props.isSectionHeader) {
          return;
        }
        var x = this.state.isTouch
          ? e.changedTouches[e.changedTouches.length - 1].clientX
          : e.clientX;
        var y = this.state.isTouch
          ? e.changedTouches[e.changedTouches.length - 1].clientY
          : e.clientY;
        if (this.state.isTouch);
        var minDistanceMoved =
          Math.abs(this.state.startX - x) > this.state.dragSensitivityX ||
          Math.abs(this.state.startY - y) > this.state.dragSensitivityY;
        if (!minDistanceMoved && !this.state.didMoveMinDistanceDuringDrag) {
          return;
        }
        document.addEventListener('click', this.clickBlocker, true);
        if (!this.state.isTouch) e.preventDefault();
        else e.nativeEvent.preventDefault();

        e.stopPropagation();
        if (e.buttons === 1 || this.state.isTouch) {
          requestAnimationFrame(function () {
            return _this3.moveElement(x, y);
          });
        } else {
          this.onPointerCancel();
        }
      },
    },
    {
      key: 'getDroppableElemUnderDrag',
      value: function getDroppableElemUnderDrag(x, y) {
        var colUnder = null;
        var draggingElement = this.draggable;
        if (draggingElement) {
          // Disable pointer events to look through element
          draggingElement.style.pointerEvents = 'none';
          // Get element under dragged  (look through)
          var elementUnder = document.elementFromPoint(x, y);
          // Reset dragged element's pointers
          draggingElement.style.pointerEvents = 'all';
          colUnder = Util.getDroppableParentElement(elementUnder, this.props.dragAndDropGroup);
        }
        return colUnder;
      },
    },
    {
      key: 'getDraggableElemUnderDrag',
      value: function getDraggableElemUnderDrag(x, y) {
        if (!this.state.wasClicked || !this.state.didMoveMinDistanceDuringDrag) {
          return;
        }
        var cardUnder = null;
        // The Element we're dragging
        var draggingElement = this.draggable;
        if (draggingElement) {
          // Disable pointer events to look through element
          draggingElement.style.pointerEvents = 'none';
          // Get element under dragged tasks (look through)
          var elementUnder = document.elementFromPoint(x, y);
          // Reset dragged element's pointers
          cardUnder = Util.getDraggableParentElement(elementUnder);
          draggingElement.style.pointerEvents = 'all';
        }
        return cardUnder;
      },

      /*handlePointerCaptureLoss(e) {
  	if (this.state.wasClicked && e.pointerId != null) {
  		this.draggable.setPointerCapture(e.pointerId);
  	}
  }*/
    },
    {
      key: 'render',
      value: function render() {
        var _this4 = this;

        var active = this.state.isDragging && this.state.wasClicked;
        var draggingStyle = {
          cursor: 'move',
          position:
            this.state.didMoveMinDistanceDuringDrag || this.state.minDragDistanceMoved
              ? 'fixed'
              : '',
          width: this.state.width,
          transition: 'none',
          animation: 'none',
          zIndex: 500,
          top:
            this.state.minDragDistanceMoved || this.state.didMoveMinDistanceDuringDrag
              ? this.state.top + 'px'
              : 0,
          left:
            this.state.minDragDistanceMoved || this.state.didMoveMinDistanceDuringDrag
              ? this.state.left + 'px'
              : 0,
        };

        var propsObject = {
          'data-cy': 'draggable-' + this.props.draggableId,
          className: 'draggable' + (active ? this.props.dragActiveClass : ''),
          style: active
            ? _extends({}, draggingStyle)
            : {
                transform: 'none',
                top: 0,
                left: 0,
                cursor:
                  this.props.disabled || this.props.isSectionHeader
                    ? 'arrow'
                    : this.state.wasClicked
                    ? 'move'
                    : 'grab',
              },
          key: this.props.draggableId,
          draggableid: this.props.isSectionHeader
            ? 'SECTION_HEADER_' +
              this.props.draggableId +
              (this.props.disableMove ? '_DISABLE_MOVE' : '')
            : this.props.draggableId,
          index: this.props.innerIndex,
          tabIndex: '0',
          ref: function ref(div) {
            return (_this4.draggable = div);
          },
          'aria-grabbed': true,
          'aria-dropeffect': 'move',
        };
        propsObject.onMouseDown = function (e) {
          return _this4.onPointerDown(e, false);
        };

        var CustomTag = this.props.tagName ? this.props.tagName : 'div';
        return React__default.createElement(CustomTag, propsObject, this.props.children);
      },
    },
  ]);
  return Draggable;
})(React.Component);

Draggable.propTypes = {
  dragAndDropGroup: PropTypes.string.isRequired,
  draggableId: PropTypes.string.isRequired,
  dragDisabled: PropTypes.bool,
  section: PropTypes.string,
};

var performanceNow = createCommonjsModule(function (module) {
  // Generated by CoffeeScript 1.12.2
  (function () {
    var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

    if (typeof performance !== 'undefined' && performance !== null && performance.now) {
      module.exports = function () {
        return performance.now();
      };
    } else if (typeof process !== 'undefined' && process !== null && process.hrtime) {
      module.exports = function () {
        return (getNanoSeconds() - nodeLoadTime) / 1e6;
      };
      hrtime = process.hrtime;
      getNanoSeconds = function () {
        var hr;
        hr = hrtime();
        return hr[0] * 1e9 + hr[1];
      };
      moduleLoadTime = getNanoSeconds();
      upTime = process.uptime() * 1e9;
      nodeLoadTime = moduleLoadTime - upTime;
    } else if (Date.now) {
      module.exports = function () {
        return Date.now() - loadTime;
      };
      loadTime = Date.now();
    } else {
      module.exports = function () {
        return new Date().getTime() - loadTime;
      };
      loadTime = new Date().getTime();
    }
  }.call(commonjsGlobal));
});

var root = typeof window === 'undefined' ? commonjsGlobal : window,
  vendors = ['moz', 'webkit'],
  suffix = 'AnimationFrame',
  raf = root['request' + suffix],
  caf = root['cancel' + suffix] || root['cancelRequest' + suffix];

for (var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix];
  caf = root[vendors[i] + 'Cancel' + suffix] || root[vendors[i] + 'CancelRequest' + suffix];
}

// Some versions of FF have rAF but not cAF
if (!raf || !caf) {
  var last = 0,
    id = 0,
    queue = [],
    frameDuration = 1000 / 60;

  raf = function (callback) {
    if (queue.length === 0) {
      var _now = performanceNow(),
        next = Math.max(0, frameDuration - (_now - last));
      last = next + _now;
      setTimeout(function () {
        var cp = queue.slice(0);
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0;
        for (var i = 0; i < cp.length; i++) {
          if (!cp[i].cancelled) {
            try {
              cp[i].callback(last);
            } catch (e) {
              setTimeout(function () {
                throw e;
              }, 0);
            }
          }
        }
      }, Math.round(next));
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false,
    });
    return id;
  };

  caf = function (handle) {
    for (var i = 0; i < queue.length; i++) {
      if (queue[i].handle === handle) {
        queue[i].cancelled = true;
      }
    }
  };
}

var raf_1 = function (fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn);
};
var cancel = function () {
  caf.apply(root, arguments);
};
var polyfill = function (object) {
  if (!object) {
    object = root;
  }
  object.requestAnimationFrame = raf;
  object.cancelAnimationFrame = caf;
};
raf_1.cancel = cancel;
raf_1.polyfill = polyfill;

var div = null;
var prefixes = ['Webkit', 'Moz', 'O', 'ms'];

var prefixStyle = function prefixStyle(prop) {
  // re-use a dummy div
  if (!div) {
    div = document.createElement('div');
  }

  var style = div.style;

  // prop exists without prefix
  if (prop in style) {
    return prop;
  }

  // borderRadius -> BorderRadius
  var titleCase = prop.charAt(0).toUpperCase() + prop.slice(1);

  // find the vendor-prefixed prop
  for (var i = prefixes.length; i >= 0; i--) {
    var name = prefixes[i] + titleCase;
    // e.g. WebkitBorderRadius or webkitBorderRadius
    if (name in style) {
      return name;
    }
  }

  return false;
};

/**
 * Export.
 */

var toNoCase_1 = toNoCase;

/**
 * Test whether a string is camel-case.
 */

var hasSpace = /\s/;
var hasSeparator = /(_|-|\.|:)/;
var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/;

/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

function toNoCase(string) {
  if (hasSpace.test(string)) return string.toLowerCase();
  if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase();
  if (hasCamel.test(string)) return uncamelize(string).toLowerCase();
  return string.toLowerCase();
}

/**
 * Separator splitter.
 */

var separatorSplitter = /[\W_]+(.|$)/g;

/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate(string) {
  return string.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : '';
  });
}

/**
 * Camelcase splitter.
 */

var camelSplitter = /(.)([A-Z]+)/g;

/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize(string) {
  return string.replace(camelSplitter, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ');
  });
}

/**
 * Export.
 */

var toSpaceCase_1 = toSpaceCase;

/**
 * Convert a `string` to space case.
 *
 * @param {String} string
 * @return {String}
 */

function toSpaceCase(string) {
  return toNoCase_1(string)
    .replace(/[\W_]+(.|$)/g, function (matches, match) {
      return match ? ' ' + match : '';
    })
    .trim();
}

/**
 * Export.
 */

var toCamelCase_1 = toCamelCase;

/**
 * Convert a `string` to camel case.
 *
 * @param {String} string
 * @return {String}
 */

function toCamelCase(string) {
  return toSpaceCase_1(string).replace(/\s(\w)/g, function (matches, letter) {
    return letter.toUpperCase();
  });
}

/* The following list is defined in React's core */
var IS_UNITLESS = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true,
};

var addPxToStyle = function (name, value) {
  if (typeof value === 'number' && !IS_UNITLESS[name]) {
    return value + 'px';
  } else {
    return value;
  }
};

var cache = { float: 'cssFloat' };

function style(element, property, value) {
  var camel = cache[property];
  if (typeof camel === 'undefined') {
    camel = detect(property);
  }

  // may be false if CSS prop is unsupported
  if (camel) {
    if (value === undefined) {
      return element.style[camel];
    }

    element.style[camel] = addPxToStyle(camel, value);
  }
}

function each(element, properties) {
  for (var k in properties) {
    if (properties.hasOwnProperty(k)) {
      style(element, k, properties[k]);
    }
  }
}

function detect(cssProp) {
  var camel = toCamelCase_1(cssProp);
  var result = prefixStyle(camel);
  cache[camel] = cache[cssProp] = cache[result] = result;
  return result;
}

function set$1() {
  if (arguments.length === 2) {
    if (typeof arguments[1] === 'string') {
      arguments[0].style.cssText = arguments[1];
    } else {
      each(arguments[0], arguments[1]);
    }
  } else {
    style(arguments[0], arguments[1], arguments[2]);
  }
}

var domCss = set$1;
var set_1 = set$1;

var get$1 = function (element, properties) {
  if (Array.isArray(properties)) {
    return properties.reduce(function (obj, prop) {
      obj[prop] = style(element, prop || '');
      return obj;
    }, {});
  } else {
    return style(element, properties || '');
  }
};
domCss.set = set_1;
domCss.get = get$1;

var isString_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });
  exports['default'] = isString;
  function isString(maybe) {
    return typeof maybe === 'string';
  }
});

unwrapExports(isString_1);

var getScrollbarWidth_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });
  exports['default'] = getScrollbarWidth;

  var _domCss2 = _interopRequireDefault(domCss);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var scrollbarWidth = false;

  function getScrollbarWidth() {
    if (scrollbarWidth !== false) return scrollbarWidth;
    /* istanbul ignore else */
    if (typeof document !== 'undefined') {
      var div = document.createElement('div');
      (0, _domCss2['default'])(div, {
        width: 100,
        height: 100,
        position: 'absolute',
        top: -9999,
        overflow: 'scroll',
        MsOverflowStyle: 'scrollbar',
      });
      document.body.appendChild(div);
      scrollbarWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
    } else {
      scrollbarWidth = 0;
    }
    return scrollbarWidth || 0;
  }
});

unwrapExports(getScrollbarWidth_1);

var returnFalse_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });
  exports['default'] = returnFalse;
  function returnFalse() {
    return false;
  }
});

unwrapExports(returnFalse_1);

var getInnerWidth_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });
  exports['default'] = getInnerWidth;
  function getInnerWidth(el) {
    var clientWidth = el.clientWidth;

    var _getComputedStyle = getComputedStyle(el),
      paddingLeft = _getComputedStyle.paddingLeft,
      paddingRight = _getComputedStyle.paddingRight;

    return clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
  }
});

unwrapExports(getInnerWidth_1);

var getInnerHeight_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });
  exports['default'] = getInnerHeight;
  function getInnerHeight(el) {
    var clientHeight = el.clientHeight;

    var _getComputedStyle = getComputedStyle(el),
      paddingTop = _getComputedStyle.paddingTop,
      paddingBottom = _getComputedStyle.paddingBottom;

    return clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
  }
});

unwrapExports(getInnerHeight_1);

var styles = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });
  var containerStyleDefault = (exports.containerStyleDefault = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  });

  // Overrides containerStyleDefault properties
  var containerStyleAutoHeight = (exports.containerStyleAutoHeight = {
    height: 'auto',
  });

  var viewStyleDefault = (exports.viewStyleDefault = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'scroll',
    WebkitOverflowScrolling: 'touch',
  });

  // Overrides viewStyleDefault properties
  var viewStyleAutoHeight = (exports.viewStyleAutoHeight = {
    position: 'relative',
    top: undefined,
    left: undefined,
    right: undefined,
    bottom: undefined,
  });

  var viewStyleUniversalInitial = (exports.viewStyleUniversalInitial = {
    overflow: 'hidden',
    marginRight: 0,
    marginBottom: 0,
  });

  var trackHorizontalStyleDefault = (exports.trackHorizontalStyleDefault = {
    position: 'absolute',
    height: 6,
  });

  var trackVerticalStyleDefault = (exports.trackVerticalStyleDefault = {
    position: 'absolute',
    width: 6,
  });

  var thumbHorizontalStyleDefault = (exports.thumbHorizontalStyleDefault = {
    position: 'relative',
    display: 'block',
    height: '100%',
  });

  var thumbVerticalStyleDefault = (exports.thumbVerticalStyleDefault = {
    position: 'relative',
    display: 'block',
    width: '100%',
  });

  var disableSelectStyle = (exports.disableSelectStyle = {
    userSelect: 'none',
  });

  var disableSelectStyleReset = (exports.disableSelectStyleReset = {
    userSelect: '',
  });
});

unwrapExports(styles);
var styles_1 = styles.containerStyleDefault;
var styles_2 = styles.containerStyleAutoHeight;
var styles_3 = styles.viewStyleDefault;
var styles_4 = styles.viewStyleAutoHeight;
var styles_5 = styles.viewStyleUniversalInitial;
var styles_6 = styles.trackHorizontalStyleDefault;
var styles_7 = styles.trackVerticalStyleDefault;
var styles_8 = styles.thumbHorizontalStyleDefault;
var styles_9 = styles.thumbVerticalStyleDefault;
var styles_10 = styles.disableSelectStyle;
var styles_11 = styles.disableSelectStyleReset;

var defaultRenderElements = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });

  var _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };

  exports.renderViewDefault = renderViewDefault;
  exports.renderTrackHorizontalDefault = renderTrackHorizontalDefault;
  exports.renderTrackVerticalDefault = renderTrackVerticalDefault;
  exports.renderThumbHorizontalDefault = renderThumbHorizontalDefault;
  exports.renderThumbVerticalDefault = renderThumbVerticalDefault;

  var _react2 = _interopRequireDefault(React__default);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  }

  /* eslint-disable react/prop-types */

  function renderViewDefault(props) {
    return _react2['default'].createElement('div', props);
  }

  function renderTrackHorizontalDefault(_ref) {
    var style = _ref.style,
      props = _objectWithoutProperties(_ref, ['style']);

    var finalStyle = _extends({}, style, {
      right: 2,
      bottom: 2,
      left: 2,
      borderRadius: 3,
    });
    return _react2['default'].createElement('div', _extends({ style: finalStyle }, props));
  }

  function renderTrackVerticalDefault(_ref2) {
    var style = _ref2.style,
      props = _objectWithoutProperties(_ref2, ['style']);

    var finalStyle = _extends({}, style, {
      right: 2,
      bottom: 2,
      top: 2,
      borderRadius: 3,
    });
    return _react2['default'].createElement('div', _extends({ style: finalStyle }, props));
  }

  function renderThumbHorizontalDefault(_ref3) {
    var style = _ref3.style,
      props = _objectWithoutProperties(_ref3, ['style']);

    var finalStyle = _extends({}, style, {
      cursor: 'pointer',
      borderRadius: 'inherit',
      backgroundColor: 'rgba(0,0,0,.2)',
    });
    return _react2['default'].createElement('div', _extends({ style: finalStyle }, props));
  }

  function renderThumbVerticalDefault(_ref4) {
    var style = _ref4.style,
      props = _objectWithoutProperties(_ref4, ['style']);

    var finalStyle = _extends({}, style, {
      cursor: 'pointer',
      borderRadius: 'inherit',
      backgroundColor: 'rgba(0,0,0,.2)',
    });
    return _react2['default'].createElement('div', _extends({ style: finalStyle }, props));
  }
});

unwrapExports(defaultRenderElements);
var defaultRenderElements_1 = defaultRenderElements.renderViewDefault;
var defaultRenderElements_2 = defaultRenderElements.renderTrackHorizontalDefault;
var defaultRenderElements_3 = defaultRenderElements.renderTrackVerticalDefault;
var defaultRenderElements_4 = defaultRenderElements.renderThumbHorizontalDefault;
var defaultRenderElements_5 = defaultRenderElements.renderThumbVerticalDefault;

var Scrollbars_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });

  var _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };

  var _createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  var _raf3 = _interopRequireDefault(raf_1);

  var _domCss2 = _interopRequireDefault(domCss);

  var _propTypes2 = _interopRequireDefault(PropTypes);

  var _isString2 = _interopRequireDefault(isString_1);

  var _getScrollbarWidth2 = _interopRequireDefault(getScrollbarWidth_1);

  var _returnFalse2 = _interopRequireDefault(returnFalse_1);

  var _getInnerWidth2 = _interopRequireDefault(getInnerWidth_1);

  var _getInnerHeight2 = _interopRequireDefault(getInnerHeight_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError(
        'Super expression must either be null or a function, not ' + typeof superClass
      );
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: { value: subClass, enumerable: false, writable: true, configurable: true },
    });
    if (superClass)
      Object.setPrototypeOf
        ? Object.setPrototypeOf(subClass, superClass)
        : (subClass.__proto__ = superClass);
  }

  var Scrollbars = (function (_Component) {
    _inherits(Scrollbars, _Component);

    function Scrollbars(props) {
      var _ref;

      _classCallCheck(this, Scrollbars);

      for (
        var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1;
        _key < _len;
        _key++
      ) {
        rest[_key - 1] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(
        this,
        (_ref = Scrollbars.__proto__ || Object.getPrototypeOf(Scrollbars)).call.apply(
          _ref,
          [this, props].concat(rest)
        )
      );

      _this.getScrollLeft = _this.getScrollLeft.bind(_this);
      _this.getScrollTop = _this.getScrollTop.bind(_this);
      _this.getScrollWidth = _this.getScrollWidth.bind(_this);
      _this.getScrollHeight = _this.getScrollHeight.bind(_this);
      _this.getClientWidth = _this.getClientWidth.bind(_this);
      _this.getClientHeight = _this.getClientHeight.bind(_this);
      _this.getValues = _this.getValues.bind(_this);
      _this.getThumbHorizontalWidth = _this.getThumbHorizontalWidth.bind(_this);
      _this.getThumbVerticalHeight = _this.getThumbVerticalHeight.bind(_this);
      _this.getScrollLeftForOffset = _this.getScrollLeftForOffset.bind(_this);
      _this.getScrollTopForOffset = _this.getScrollTopForOffset.bind(_this);

      _this.scrollLeft = _this.scrollLeft.bind(_this);
      _this.scrollTop = _this.scrollTop.bind(_this);
      _this.scrollToLeft = _this.scrollToLeft.bind(_this);
      _this.scrollToTop = _this.scrollToTop.bind(_this);
      _this.scrollToRight = _this.scrollToRight.bind(_this);
      _this.scrollToBottom = _this.scrollToBottom.bind(_this);

      _this.handleTrackMouseEnter = _this.handleTrackMouseEnter.bind(_this);
      _this.handleTrackMouseLeave = _this.handleTrackMouseLeave.bind(_this);
      _this.handleHorizontalTrackMouseDown = _this.handleHorizontalTrackMouseDown.bind(_this);
      _this.handleVerticalTrackMouseDown = _this.handleVerticalTrackMouseDown.bind(_this);
      _this.handleHorizontalThumbMouseDown = _this.handleHorizontalThumbMouseDown.bind(_this);
      _this.handleVerticalThumbMouseDown = _this.handleVerticalThumbMouseDown.bind(_this);
      _this.handleWindowResize = _this.handleWindowResize.bind(_this);
      _this.handleScroll = _this.handleScroll.bind(_this);
      _this.handleDrag = _this.handleDrag.bind(_this);
      _this.handleDragEnd = _this.handleDragEnd.bind(_this);

      _this.state = {
        didMountUniversal: false,
      };
      return _this;
    }

    _createClass(Scrollbars, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.addListeners();
          this.update();
          this.componentDidMountUniversal();
        },
      },
      {
        key: 'componentDidMountUniversal',
        value: function componentDidMountUniversal() {
          // eslint-disable-line react/sort-comp
          var universal = this.props.universal;

          if (!universal) return;
          this.setState({ didMountUniversal: true });
        },
      },
      {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
          this.update();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.removeListeners();
          (0, raf_1.cancel)(this.requestFrame);
          clearTimeout(this.hideTracksTimeout);
          clearInterval(this.detectScrollingInterval);
        },
      },
      {
        key: 'getScrollLeft',
        value: function getScrollLeft() {
          if (!this.view) return 0;
          return this.view.scrollLeft;
        },
      },
      {
        key: 'getScrollTop',
        value: function getScrollTop() {
          if (!this.view) return 0;
          return this.view.scrollTop;
        },
      },
      {
        key: 'getScrollWidth',
        value: function getScrollWidth() {
          if (!this.view) return 0;
          return this.view.scrollWidth;
        },
      },
      {
        key: 'getScrollHeight',
        value: function getScrollHeight() {
          if (!this.view) return 0;
          return this.view.scrollHeight;
        },
      },
      {
        key: 'getClientWidth',
        value: function getClientWidth() {
          if (!this.view) return 0;
          return this.view.clientWidth;
        },
      },
      {
        key: 'getClientHeight',
        value: function getClientHeight() {
          if (!this.view) return 0;
          return this.view.clientHeight;
        },
      },
      {
        key: 'getValues',
        value: function getValues() {
          var _ref2 = this.view || {},
            _ref2$scrollLeft = _ref2.scrollLeft,
            scrollLeft = _ref2$scrollLeft === undefined ? 0 : _ref2$scrollLeft,
            _ref2$scrollTop = _ref2.scrollTop,
            scrollTop = _ref2$scrollTop === undefined ? 0 : _ref2$scrollTop,
            _ref2$scrollWidth = _ref2.scrollWidth,
            scrollWidth = _ref2$scrollWidth === undefined ? 0 : _ref2$scrollWidth,
            _ref2$scrollHeight = _ref2.scrollHeight,
            scrollHeight = _ref2$scrollHeight === undefined ? 0 : _ref2$scrollHeight,
            _ref2$clientWidth = _ref2.clientWidth,
            clientWidth = _ref2$clientWidth === undefined ? 0 : _ref2$clientWidth,
            _ref2$clientHeight = _ref2.clientHeight,
            clientHeight = _ref2$clientHeight === undefined ? 0 : _ref2$clientHeight;

          return {
            left: scrollLeft / (scrollWidth - clientWidth) || 0,
            top: scrollTop / (scrollHeight - clientHeight) || 0,
            scrollLeft: scrollLeft,
            scrollTop: scrollTop,
            scrollWidth: scrollWidth,
            scrollHeight: scrollHeight,
            clientWidth: clientWidth,
            clientHeight: clientHeight,
          };
        },
      },
      {
        key: 'getThumbHorizontalWidth',
        value: function getThumbHorizontalWidth() {
          var _props = this.props,
            thumbSize = _props.thumbSize,
            thumbMinSize = _props.thumbMinSize;
          var _view = this.view,
            scrollWidth = _view.scrollWidth,
            clientWidth = _view.clientWidth;

          var trackWidth = (0, _getInnerWidth2['default'])(this.trackHorizontal);
          var width = Math.ceil((clientWidth / scrollWidth) * trackWidth);
          if (trackWidth === width) return 0;
          if (thumbSize) return thumbSize;
          return Math.max(width, thumbMinSize);
        },
      },
      {
        key: 'getThumbVerticalHeight',
        value: function getThumbVerticalHeight() {
          var _props2 = this.props,
            thumbSize = _props2.thumbSize,
            thumbMinSize = _props2.thumbMinSize;
          var _view2 = this.view,
            scrollHeight = _view2.scrollHeight,
            clientHeight = _view2.clientHeight;

          var trackHeight = (0, _getInnerHeight2['default'])(this.trackVertical);
          var height = Math.ceil((clientHeight / scrollHeight) * trackHeight);
          if (trackHeight === height) return 0;
          if (thumbSize) return thumbSize;
          return Math.max(height, thumbMinSize);
        },
      },
      {
        key: 'getScrollLeftForOffset',
        value: function getScrollLeftForOffset(offset) {
          var _view3 = this.view,
            scrollWidth = _view3.scrollWidth,
            clientWidth = _view3.clientWidth;

          var trackWidth = (0, _getInnerWidth2['default'])(this.trackHorizontal);
          var thumbWidth = this.getThumbHorizontalWidth();
          return (offset / (trackWidth - thumbWidth)) * (scrollWidth - clientWidth);
        },
      },
      {
        key: 'getScrollTopForOffset',
        value: function getScrollTopForOffset(offset) {
          var _view4 = this.view,
            scrollHeight = _view4.scrollHeight,
            clientHeight = _view4.clientHeight;

          var trackHeight = (0, _getInnerHeight2['default'])(this.trackVertical);
          var thumbHeight = this.getThumbVerticalHeight();
          return (offset / (trackHeight - thumbHeight)) * (scrollHeight - clientHeight);
        },
      },
      {
        key: 'scrollLeft',
        value: function scrollLeft() {
          var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

          if (!this.view) return;
          this.view.scrollLeft = left;
        },
      },
      {
        key: 'scrollTop',
        value: function scrollTop() {
          var top = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

          if (!this.view) return;
          this.view.scrollTop = top;
        },
      },
      {
        key: 'scrollToLeft',
        value: function scrollToLeft() {
          if (!this.view) return;
          this.view.scrollLeft = 0;
        },
      },
      {
        key: 'scrollToTop',
        value: function scrollToTop() {
          if (!this.view) return;
          this.view.scrollTop = 0;
        },
      },
      {
        key: 'scrollToRight',
        value: function scrollToRight() {
          if (!this.view) return;
          this.view.scrollLeft = this.view.scrollWidth;
        },
      },
      {
        key: 'scrollToBottom',
        value: function scrollToBottom() {
          if (!this.view) return;
          this.view.scrollTop = this.view.scrollHeight;
        },
      },
      {
        key: 'addListeners',
        value: function addListeners() {
          /* istanbul ignore if */
          if (typeof document === 'undefined' || !this.view) return;
          var view = this.view,
            trackHorizontal = this.trackHorizontal,
            trackVertical = this.trackVertical,
            thumbHorizontal = this.thumbHorizontal,
            thumbVertical = this.thumbVertical;

          view.addEventListener('scroll', this.handleScroll);
          if (!(0, _getScrollbarWidth2['default'])()) return;
          trackHorizontal.addEventListener('mouseenter', this.handleTrackMouseEnter);
          trackHorizontal.addEventListener('mouseleave', this.handleTrackMouseLeave);
          trackHorizontal.addEventListener('mousedown', this.handleHorizontalTrackMouseDown);
          trackVertical.addEventListener('mouseenter', this.handleTrackMouseEnter);
          trackVertical.addEventListener('mouseleave', this.handleTrackMouseLeave);
          trackVertical.addEventListener('mousedown', this.handleVerticalTrackMouseDown);
          thumbHorizontal.addEventListener('mousedown', this.handleHorizontalThumbMouseDown);
          thumbVertical.addEventListener('mousedown', this.handleVerticalThumbMouseDown);
          window.addEventListener('resize', this.handleWindowResize);
        },
      },
      {
        key: 'removeListeners',
        value: function removeListeners() {
          /* istanbul ignore if */
          if (typeof document === 'undefined' || !this.view) return;
          var view = this.view,
            trackHorizontal = this.trackHorizontal,
            trackVertical = this.trackVertical,
            thumbHorizontal = this.thumbHorizontal,
            thumbVertical = this.thumbVertical;

          view.removeEventListener('scroll', this.handleScroll);
          if (!(0, _getScrollbarWidth2['default'])()) return;
          trackHorizontal.removeEventListener('mouseenter', this.handleTrackMouseEnter);
          trackHorizontal.removeEventListener('mouseleave', this.handleTrackMouseLeave);
          trackHorizontal.removeEventListener('mousedown', this.handleHorizontalTrackMouseDown);
          trackVertical.removeEventListener('mouseenter', this.handleTrackMouseEnter);
          trackVertical.removeEventListener('mouseleave', this.handleTrackMouseLeave);
          trackVertical.removeEventListener('mousedown', this.handleVerticalTrackMouseDown);
          thumbHorizontal.removeEventListener('mousedown', this.handleHorizontalThumbMouseDown);
          thumbVertical.removeEventListener('mousedown', this.handleVerticalThumbMouseDown);
          window.removeEventListener('resize', this.handleWindowResize);
          // Possibly setup by `handleDragStart`
          this.teardownDragging();
        },
      },
      {
        key: 'handleScroll',
        value: function handleScroll(event) {
          var _this2 = this;

          var _props3 = this.props,
            onScroll = _props3.onScroll,
            onScrollFrame = _props3.onScrollFrame;

          if (onScroll) onScroll(event);
          this.update(function (values) {
            var scrollLeft = values.scrollLeft,
              scrollTop = values.scrollTop;

            _this2.viewScrollLeft = scrollLeft;
            _this2.viewScrollTop = scrollTop;
            if (onScrollFrame) onScrollFrame(values);
          });
          this.detectScrolling();
        },
      },
      {
        key: 'handleScrollStart',
        value: function handleScrollStart() {
          var onScrollStart = this.props.onScrollStart;

          if (onScrollStart) onScrollStart();
          this.handleScrollStartAutoHide();
        },
      },
      {
        key: 'handleScrollStartAutoHide',
        value: function handleScrollStartAutoHide() {
          var autoHide = this.props.autoHide;

          if (!autoHide) return;
          this.showTracks();
        },
      },
      {
        key: 'handleScrollStop',
        value: function handleScrollStop() {
          var onScrollStop = this.props.onScrollStop;

          if (onScrollStop) onScrollStop();
          this.handleScrollStopAutoHide();
        },
      },
      {
        key: 'handleScrollStopAutoHide',
        value: function handleScrollStopAutoHide() {
          var autoHide = this.props.autoHide;

          if (!autoHide) return;
          this.hideTracks();
        },
      },
      {
        key: 'handleWindowResize',
        value: function handleWindowResize() {
          this.update();
        },
      },
      {
        key: 'handleHorizontalTrackMouseDown',
        value: function handleHorizontalTrackMouseDown(event) {
          event.preventDefault();
          var target = event.target,
            clientX = event.clientX;

          var _target$getBoundingCl = target.getBoundingClientRect(),
            targetLeft = _target$getBoundingCl.left;

          var thumbWidth = this.getThumbHorizontalWidth();
          var offset = Math.abs(targetLeft - clientX) - thumbWidth / 2;
          this.view.scrollLeft = this.getScrollLeftForOffset(offset);
        },
      },
      {
        key: 'handleVerticalTrackMouseDown',
        value: function handleVerticalTrackMouseDown(event) {
          event.preventDefault();
          var target = event.target,
            clientY = event.clientY;

          var _target$getBoundingCl2 = target.getBoundingClientRect(),
            targetTop = _target$getBoundingCl2.top;

          var thumbHeight = this.getThumbVerticalHeight();
          var offset = Math.abs(targetTop - clientY) - thumbHeight / 2;
          this.view.scrollTop = this.getScrollTopForOffset(offset);
        },
      },
      {
        key: 'handleHorizontalThumbMouseDown',
        value: function handleHorizontalThumbMouseDown(event) {
          event.preventDefault();
          this.handleDragStart(event);
          var target = event.target,
            clientX = event.clientX;
          var offsetWidth = target.offsetWidth;

          var _target$getBoundingCl3 = target.getBoundingClientRect(),
            left = _target$getBoundingCl3.left;

          this.prevPageX = offsetWidth - (clientX - left);
        },
      },
      {
        key: 'handleVerticalThumbMouseDown',
        value: function handleVerticalThumbMouseDown(event) {
          event.preventDefault();
          this.handleDragStart(event);
          var target = event.target,
            clientY = event.clientY;
          var offsetHeight = target.offsetHeight;

          var _target$getBoundingCl4 = target.getBoundingClientRect(),
            top = _target$getBoundingCl4.top;

          this.prevPageY = offsetHeight - (clientY - top);
        },
      },
      {
        key: 'setupDragging',
        value: function setupDragging() {
          (0, _domCss2['default'])(document.body, styles.disableSelectStyle);
          document.addEventListener('mousemove', this.handleDrag);
          document.addEventListener('mouseup', this.handleDragEnd);
          document.onselectstart = _returnFalse2['default'];
        },
      },
      {
        key: 'teardownDragging',
        value: function teardownDragging() {
          (0, _domCss2['default'])(document.body, styles.disableSelectStyleReset);
          document.removeEventListener('mousemove', this.handleDrag);
          document.removeEventListener('mouseup', this.handleDragEnd);
          document.onselectstart = undefined;
        },
      },
      {
        key: 'handleDragStart',
        value: function handleDragStart(event) {
          this.dragging = true;
          event.stopImmediatePropagation();
          this.setupDragging();
        },
      },
      {
        key: 'handleDrag',
        value: function handleDrag(event) {
          if (this.prevPageX) {
            var clientX = event.clientX;

            var _trackHorizontal$getB = this.trackHorizontal.getBoundingClientRect(),
              trackLeft = _trackHorizontal$getB.left;

            var thumbWidth = this.getThumbHorizontalWidth();
            var clickPosition = thumbWidth - this.prevPageX;
            var offset = -trackLeft + clientX - clickPosition;
            this.view.scrollLeft = this.getScrollLeftForOffset(offset);
          }
          if (this.prevPageY) {
            var clientY = event.clientY;

            var _trackVertical$getBou = this.trackVertical.getBoundingClientRect(),
              trackTop = _trackVertical$getBou.top;

            var thumbHeight = this.getThumbVerticalHeight();
            var _clickPosition = thumbHeight - this.prevPageY;
            var _offset = -trackTop + clientY - _clickPosition;
            this.view.scrollTop = this.getScrollTopForOffset(_offset);
          }
          return false;
        },
      },
      {
        key: 'handleDragEnd',
        value: function handleDragEnd() {
          this.dragging = false;
          this.prevPageX = this.prevPageY = 0;
          this.teardownDragging();
          this.handleDragEndAutoHide();
        },
      },
      {
        key: 'handleDragEndAutoHide',
        value: function handleDragEndAutoHide() {
          var autoHide = this.props.autoHide;

          if (!autoHide) return;
          this.hideTracks();
        },
      },
      {
        key: 'handleTrackMouseEnter',
        value: function handleTrackMouseEnter() {
          this.trackMouseOver = true;
          this.handleTrackMouseEnterAutoHide();
        },
      },
      {
        key: 'handleTrackMouseEnterAutoHide',
        value: function handleTrackMouseEnterAutoHide() {
          var autoHide = this.props.autoHide;

          if (!autoHide) return;
          this.showTracks();
        },
      },
      {
        key: 'handleTrackMouseLeave',
        value: function handleTrackMouseLeave() {
          this.trackMouseOver = false;
          this.handleTrackMouseLeaveAutoHide();
        },
      },
      {
        key: 'handleTrackMouseLeaveAutoHide',
        value: function handleTrackMouseLeaveAutoHide() {
          var autoHide = this.props.autoHide;

          if (!autoHide) return;
          this.hideTracks();
        },
      },
      {
        key: 'showTracks',
        value: function showTracks() {
          clearTimeout(this.hideTracksTimeout);
          (0, _domCss2['default'])(this.trackHorizontal, { opacity: 1 });
          (0, _domCss2['default'])(this.trackVertical, { opacity: 1 });
        },
      },
      {
        key: 'hideTracks',
        value: function hideTracks() {
          var _this3 = this;

          if (this.dragging) return;
          if (this.scrolling) return;
          if (this.trackMouseOver) return;
          var autoHideTimeout = this.props.autoHideTimeout;

          clearTimeout(this.hideTracksTimeout);
          this.hideTracksTimeout = setTimeout(function () {
            (0, _domCss2['default'])(_this3.trackHorizontal, { opacity: 0 });
            (0, _domCss2['default'])(_this3.trackVertical, { opacity: 0 });
          }, autoHideTimeout);
        },
      },
      {
        key: 'detectScrolling',
        value: function detectScrolling() {
          var _this4 = this;

          if (this.scrolling) return;
          this.scrolling = true;
          this.handleScrollStart();
          this.detectScrollingInterval = setInterval(function () {
            if (
              _this4.lastViewScrollLeft === _this4.viewScrollLeft &&
              _this4.lastViewScrollTop === _this4.viewScrollTop
            ) {
              clearInterval(_this4.detectScrollingInterval);
              _this4.scrolling = false;
              _this4.handleScrollStop();
            }
            _this4.lastViewScrollLeft = _this4.viewScrollLeft;
            _this4.lastViewScrollTop = _this4.viewScrollTop;
          }, 100);
        },
      },
      {
        key: 'raf',
        value: function raf(callback) {
          var _this5 = this;

          if (this.requestFrame) _raf3['default'].cancel(this.requestFrame);
          this.requestFrame = (0, _raf3['default'])(function () {
            _this5.requestFrame = undefined;
            callback();
          });
        },
      },
      {
        key: 'update',
        value: function update(callback) {
          var _this6 = this;

          this.raf(function () {
            return _this6._update(callback);
          });
        },
      },
      {
        key: '_update',
        value: function _update(callback) {
          var _props4 = this.props,
            onUpdate = _props4.onUpdate,
            hideTracksWhenNotNeeded = _props4.hideTracksWhenNotNeeded;

          var values = this.getValues();
          if ((0, _getScrollbarWidth2['default'])()) {
            var scrollLeft = values.scrollLeft,
              clientWidth = values.clientWidth,
              scrollWidth = values.scrollWidth;

            var trackHorizontalWidth = (0, _getInnerWidth2['default'])(this.trackHorizontal);
            var thumbHorizontalWidth = this.getThumbHorizontalWidth();
            var thumbHorizontalX =
              (scrollLeft / (scrollWidth - clientWidth)) *
              (trackHorizontalWidth - thumbHorizontalWidth);
            var thumbHorizontalStyle = {
              width: thumbHorizontalWidth,
              transform: 'translateX(' + thumbHorizontalX + 'px)',
            };
            var scrollTop = values.scrollTop,
              clientHeight = values.clientHeight,
              scrollHeight = values.scrollHeight;

            var trackVerticalHeight = (0, _getInnerHeight2['default'])(this.trackVertical);
            var thumbVerticalHeight = this.getThumbVerticalHeight();
            var thumbVerticalY =
              (scrollTop / (scrollHeight - clientHeight)) *
              (trackVerticalHeight - thumbVerticalHeight);
            var thumbVerticalStyle = {
              height: thumbVerticalHeight,
              transform: 'translateY(' + thumbVerticalY + 'px)',
            };
            if (hideTracksWhenNotNeeded) {
              var trackHorizontalStyle = {
                visibility: scrollWidth > clientWidth ? 'visible' : 'hidden',
              };
              var trackVerticalStyle = {
                visibility: scrollHeight > clientHeight ? 'visible' : 'hidden',
              };
              (0, _domCss2['default'])(this.trackHorizontal, trackHorizontalStyle);
              (0, _domCss2['default'])(this.trackVertical, trackVerticalStyle);
            }
            (0, _domCss2['default'])(this.thumbHorizontal, thumbHorizontalStyle);
            (0, _domCss2['default'])(this.thumbVertical, thumbVerticalStyle);
          }
          if (onUpdate) onUpdate(values);
          if (typeof callback !== 'function') return;
          callback(values);
        },
      },
      {
        key: 'render',
        value: function render() {
          var _this7 = this;

          var scrollbarWidth = (0, _getScrollbarWidth2['default'])();
          /* eslint-disable no-unused-vars */

          var _props5 = this.props,
            onScroll = _props5.onScroll,
            onScrollFrame = _props5.onScrollFrame,
            onScrollStart = _props5.onScrollStart,
            onScrollStop = _props5.onScrollStop,
            onUpdate = _props5.onUpdate,
            renderView = _props5.renderView,
            renderTrackHorizontal = _props5.renderTrackHorizontal,
            renderTrackVertical = _props5.renderTrackVertical,
            renderThumbHorizontal = _props5.renderThumbHorizontal,
            renderThumbVertical = _props5.renderThumbVertical,
            tagName = _props5.tagName,
            hideTracksWhenNotNeeded = _props5.hideTracksWhenNotNeeded,
            autoHide = _props5.autoHide,
            autoHideTimeout = _props5.autoHideTimeout,
            autoHideDuration = _props5.autoHideDuration,
            thumbSize = _props5.thumbSize,
            thumbMinSize = _props5.thumbMinSize,
            universal = _props5.universal,
            autoHeight = _props5.autoHeight,
            autoHeightMin = _props5.autoHeightMin,
            autoHeightMax = _props5.autoHeightMax,
            style = _props5.style,
            children = _props5.children,
            props = _objectWithoutProperties(_props5, [
              'onScroll',
              'onScrollFrame',
              'onScrollStart',
              'onScrollStop',
              'onUpdate',
              'renderView',
              'renderTrackHorizontal',
              'renderTrackVertical',
              'renderThumbHorizontal',
              'renderThumbVertical',
              'tagName',
              'hideTracksWhenNotNeeded',
              'autoHide',
              'autoHideTimeout',
              'autoHideDuration',
              'thumbSize',
              'thumbMinSize',
              'universal',
              'autoHeight',
              'autoHeightMin',
              'autoHeightMax',
              'style',
              'children',
            ]);
          /* eslint-enable no-unused-vars */

          var didMountUniversal = this.state.didMountUniversal;

          var containerStyle = _extends(
            {},
            styles.containerStyleDefault,
            autoHeight &&
              _extends({}, styles.containerStyleAutoHeight, {
                minHeight: autoHeightMin,
                maxHeight: autoHeightMax,
              }),
            style
          );

          var viewStyle = _extends(
            {},
            styles.viewStyleDefault,
            {
              // Hide scrollbars by setting a negative margin
              marginRight: scrollbarWidth ? -scrollbarWidth : 0,
              marginBottom: scrollbarWidth ? -scrollbarWidth : 0,
            },
            autoHeight &&
              _extends({}, styles.viewStyleAutoHeight, {
                // Add scrollbarWidth to autoHeight in order to compensate negative margins
                minHeight: (0, _isString2['default'])(autoHeightMin)
                  ? 'calc(' + autoHeightMin + ' + ' + scrollbarWidth + 'px)'
                  : autoHeightMin + scrollbarWidth,
                maxHeight: (0, _isString2['default'])(autoHeightMax)
                  ? 'calc(' + autoHeightMax + ' + ' + scrollbarWidth + 'px)'
                  : autoHeightMax + scrollbarWidth,
              }),
            autoHeight &&
              universal &&
              !didMountUniversal && {
                minHeight: autoHeightMin,
                maxHeight: autoHeightMax,
              },
            universal && !didMountUniversal && styles.viewStyleUniversalInitial
          );

          var trackAutoHeightStyle = {
            transition: 'opacity ' + autoHideDuration + 'ms',
            opacity: 0,
          };

          var trackHorizontalStyle = _extends(
            {},
            styles.trackHorizontalStyleDefault,
            autoHide && trackAutoHeightStyle,
            (!scrollbarWidth || (universal && !didMountUniversal)) && {
              display: 'none',
            }
          );

          var trackVerticalStyle = _extends(
            {},
            styles.trackVerticalStyleDefault,
            autoHide && trackAutoHeightStyle,
            (!scrollbarWidth || (universal && !didMountUniversal)) && {
              display: 'none',
            }
          );

          return (0, React__default.createElement)(
            tagName,
            _extends({}, props, {
              style: containerStyle,
              ref: function ref(_ref3) {
                _this7.container = _ref3;
              },
            }),
            [
              (0, React__default.cloneElement)(
                renderView({ style: viewStyle }),
                {
                  key: 'view',
                  ref: function ref(_ref4) {
                    _this7.view = _ref4;
                  },
                },
                children
              ),
              (0, React__default.cloneElement)(
                renderTrackHorizontal({ style: trackHorizontalStyle }),
                {
                  key: 'trackHorizontal',
                  ref: function ref(_ref5) {
                    _this7.trackHorizontal = _ref5;
                  },
                },
                (0, React__default.cloneElement)(
                  renderThumbHorizontal({ style: styles.thumbHorizontalStyleDefault }),
                  {
                    ref: function ref(_ref6) {
                      _this7.thumbHorizontal = _ref6;
                    },
                  }
                )
              ),
              (0, React__default.cloneElement)(
                renderTrackVertical({ style: trackVerticalStyle }),
                {
                  key: 'trackVertical',
                  ref: function ref(_ref7) {
                    _this7.trackVertical = _ref7;
                  },
                },
                (0, React__default.cloneElement)(
                  renderThumbVertical({ style: styles.thumbVerticalStyleDefault }),
                  {
                    ref: function ref(_ref8) {
                      _this7.thumbVertical = _ref8;
                    },
                  }
                )
              ),
            ]
          );
        },
      },
    ]);

    return Scrollbars;
  })(React__default.Component);

  exports['default'] = Scrollbars;

  Scrollbars.propTypes = {
    onScroll: _propTypes2['default'].func,
    onScrollFrame: _propTypes2['default'].func,
    onScrollStart: _propTypes2['default'].func,
    onScrollStop: _propTypes2['default'].func,
    onUpdate: _propTypes2['default'].func,
    renderView: _propTypes2['default'].func,
    renderTrackHorizontal: _propTypes2['default'].func,
    renderTrackVertical: _propTypes2['default'].func,
    renderThumbHorizontal: _propTypes2['default'].func,
    renderThumbVertical: _propTypes2['default'].func,
    tagName: _propTypes2['default'].string,
    thumbSize: _propTypes2['default'].number,
    thumbMinSize: _propTypes2['default'].number,
    hideTracksWhenNotNeeded: _propTypes2['default'].bool,
    autoHide: _propTypes2['default'].bool,
    autoHideTimeout: _propTypes2['default'].number,
    autoHideDuration: _propTypes2['default'].number,
    autoHeight: _propTypes2['default'].bool,
    autoHeightMin: _propTypes2['default'].oneOfType([
      _propTypes2['default'].number,
      _propTypes2['default'].string,
    ]),
    autoHeightMax: _propTypes2['default'].oneOfType([
      _propTypes2['default'].number,
      _propTypes2['default'].string,
    ]),
    universal: _propTypes2['default'].bool,
    style: _propTypes2['default'].object,
    children: _propTypes2['default'].node,
  };

  Scrollbars.defaultProps = {
    renderView: defaultRenderElements.renderViewDefault,
    renderTrackHorizontal: defaultRenderElements.renderTrackHorizontalDefault,
    renderTrackVertical: defaultRenderElements.renderTrackVerticalDefault,
    renderThumbHorizontal: defaultRenderElements.renderThumbHorizontalDefault,
    renderThumbVertical: defaultRenderElements.renderThumbVerticalDefault,
    tagName: 'div',
    thumbMinSize: 30,
    hideTracksWhenNotNeeded: false,
    autoHide: false,
    autoHideTimeout: 1000,
    autoHideDuration: 400,
    autoHeight: false,
    autoHeightMin: 0,
    autoHeightMax: 400,
    universal: false,
  };
});

unwrapExports(Scrollbars_1);

var lib = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });
  exports.Scrollbars = undefined;

  var _Scrollbars2 = _interopRequireDefault(Scrollbars_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  exports['default'] = _Scrollbars2['default'];
  exports.Scrollbars = _Scrollbars2['default'];
});

unwrapExports(lib);
var lib_1 = lib.Scrollbars;

var rebound = createCommonjsModule(function (module, exports) {
  /**
   *  Copyright (c) 2013, Facebook, Inc.
   *  All rights reserved.
   *
   *  This source code is licensed under the BSD-style license found in the
   *  LICENSE file in the root directory of this source tree. An additional grant
   *  of patent rights can be found in the PATENTS file in the same directory.
   */
  (function (global, factory) {
    module.exports = factory();
  })(commonjsGlobal, function () {
    var _onFrame = void 0;
    if (typeof window !== 'undefined') {
      _onFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame;
    }

    if (!_onFrame && typeof process !== 'undefined' && process.title === 'node') {
      _onFrame = setImmediate;
    }

    _onFrame =
      _onFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

    var _onFrame$1 = _onFrame;

    /* eslint-disable flowtype/no-weak-types */

    var concat = Array.prototype.concat;
    var slice = Array.prototype.slice;

    // Bind a function to a context object.
    function bind(func, context) {
      for (
        var _len = arguments.length, outerArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2;
        _key < _len;
        _key++
      ) {
        outerArgs[_key - 2] = arguments[_key];
      }

      return function () {
        for (
          var _len2 = arguments.length, innerArgs = Array(_len2), _key2 = 0;
          _key2 < _len2;
          _key2++
        ) {
          innerArgs[_key2] = arguments[_key2];
        }

        func.apply(context, concat.call(outerArgs, slice.call(innerArgs)));
      };
    }

    // Add all the properties in the source to the target.
    function extend(target, source) {
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
    }

    // Cross browser/node timer functions.
    function onFrame(func) {
      return _onFrame$1(func);
    }

    // Lop off the first occurence of the reference in the Array.
    function removeFirst(array, item) {
      var idx = array.indexOf(item);
      idx !== -1 && array.splice(idx, 1);
    }

    var colorCache = {};
    /**
     * Converts a hex-formatted color string to its rgb-formatted equivalent. Handy
     * when performing color tweening animations
     * @public
     * @param colorString A hex-formatted color string
     * @return An rgb-formatted color string
     */
    function hexToRGB(colorString) {
      if (colorCache[colorString]) {
        return colorCache[colorString];
      }
      var normalizedColor = colorString.replace('#', '');
      if (normalizedColor.length === 3) {
        normalizedColor =
          normalizedColor[0] +
          normalizedColor[0] +
          normalizedColor[1] +
          normalizedColor[1] +
          normalizedColor[2] +
          normalizedColor[2];
      }
      var parts = normalizedColor.match(/.{2}/g);
      if (!parts || parts.length < 3) {
        throw new Error('Expected a color string of format #rrggbb');
      }

      var ret = {
        r: parseInt(parts[0], 16),
        g: parseInt(parts[1], 16),
        b: parseInt(parts[2], 16),
      };

      colorCache[colorString] = ret;
      return ret;
    }

    /**
     * Converts a rgb-formatted color string to its hex-formatted equivalent. Handy
     * when performing color tweening animations
     * @public
     * @param colorString An rgb-formatted color string
     * @return A hex-formatted color string
     */
    function rgbToHex(rNum, gNum, bNum) {
      var r = rNum.toString(16);
      var g = gNum.toString(16);
      var b = bNum.toString(16);
      r = r.length < 2 ? '0' + r : r;
      g = g.length < 2 ? '0' + g : g;
      b = b.length < 2 ? '0' + b : b;
      return '#' + r + g + b;
    }

    var util = Object.freeze({
      bind: bind,
      extend: extend,
      onFrame: onFrame,
      removeFirst: removeFirst,
      hexToRGB: hexToRGB,
      rgbToHex: rgbToHex,
    });

    /**
     * This helper function does a linear interpolation of a value from
     * one range to another. This can be very useful for converting the
     * motion of a Spring to a range of UI property values. For example a
     * spring moving from position 0 to 1 could be interpolated to move a
     * view from pixel 300 to 350 and scale it from 0.5 to 1. The current
     * position of the `Spring` just needs to be run through this method
     * taking its input range in the _from_ parameters with the property
     * animation range in the _to_ parameters.
     * @public
     */
    function mapValueInRange(value, fromLow, fromHigh, toLow, toHigh) {
      var fromRangeSize = fromHigh - fromLow;
      var toRangeSize = toHigh - toLow;
      var valueScale = (value - fromLow) / fromRangeSize;
      return toLow + valueScale * toRangeSize;
    }

    /**
     * Interpolate two hex colors in a 0 - 1 range or optionally provide a
     * custom range with fromLow,fromHight. The output will be in hex by default
     * unless asRGB is true in which case it will be returned as an rgb string.
     *
     * @public
     * @param asRGB Whether to return an rgb-style string
     * @return A string in hex color format unless asRGB is true, in which case a string in rgb format
     */
    function interpolateColor(val, startColorStr, endColorStr) {
      var fromLow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var fromHigh = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var asRGB = arguments[5];

      var startColor = hexToRGB(startColorStr);
      var endColor = hexToRGB(endColorStr);
      var r = Math.floor(mapValueInRange(val, fromLow, fromHigh, startColor.r, endColor.r));
      var g = Math.floor(mapValueInRange(val, fromLow, fromHigh, startColor.g, endColor.g));
      var b = Math.floor(mapValueInRange(val, fromLow, fromHigh, startColor.b, endColor.b));
      if (asRGB) {
        return 'rgb(' + r + ',' + g + ',' + b + ')';
      } else {
        return rgbToHex(r, g, b);
      }
    }

    function degreesToRadians(deg) {
      return (deg * Math.PI) / 180;
    }

    function radiansToDegrees(rad) {
      return (rad * 180) / Math.PI;
    }

    var MathUtil = Object.freeze({
      mapValueInRange: mapValueInRange,
      interpolateColor: interpolateColor,
      degreesToRadians: degreesToRadians,
      radiansToDegrees: radiansToDegrees,
    });

    // Math for converting from
    // [Origami](http://facebook.github.io/origami/) to
    // [Rebound](http://facebook.github.io/rebound).
    // You mostly don't need to worry about this, just use
    // SpringConfig.fromOrigamiTensionAndFriction(v, v);

    function tensionFromOrigamiValue(oValue) {
      return (oValue - 30.0) * 3.62 + 194.0;
    }

    function origamiValueFromTension(tension) {
      return (tension - 194.0) / 3.62 + 30.0;
    }

    function frictionFromOrigamiValue(oValue) {
      return (oValue - 8.0) * 3.0 + 25.0;
    }

    function origamiFromFriction(friction) {
      return (friction - 25.0) / 3.0 + 8.0;
    }

    var OrigamiValueConverter = Object.freeze({
      tensionFromOrigamiValue: tensionFromOrigamiValue,
      origamiValueFromTension: origamiValueFromTension,
      frictionFromOrigamiValue: frictionFromOrigamiValue,
      origamiFromFriction: origamiFromFriction,
    });

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    };

    var _extends =
      Object.assign ||
      function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

    /**
     * Plays each frame of the SpringSystem on animation
     * timing loop. This is the default type of looper for a new spring system
     * as it is the most common when developing UI.
     * @public
     */
    /**
     *  Copyright (c) 2013, Facebook, Inc.
     *  All rights reserved.
     *
     *  This source code is licensed under the BSD-style license found in the
     *  LICENSE file in the root directory of this source tree. An additional grant
     *  of patent rights can be found in the PATENTS file in the same directory.
     *
     *
     */

    var AnimationLooper = (function () {
      function AnimationLooper() {
        classCallCheck(this, AnimationLooper);
        this.springSystem = null;
      }

      AnimationLooper.prototype.run = function run() {
        var springSystem = getSpringSystem.call(this);

        onFrame(function () {
          springSystem.loop(Date.now());
        });
      };

      return AnimationLooper;
    })();

    /**
     * Resolves the SpringSystem to a resting state in a
     * tight and blocking loop. This is useful for synchronously generating
     * pre-recorded animations that can then be played on a timing loop later.
     * Sometimes this lead to better performance to pre-record a single spring
     * curve and use it to drive many animations; however, it can make dynamic
     * response to user input a bit trickier to implement.
     * @public
     */
    var SimulationLooper = (function () {
      function SimulationLooper(timestep) {
        classCallCheck(this, SimulationLooper);
        this.springSystem = null;
        this.time = 0;
        this.running = false;

        this.timestep = timestep || 16.667;
      }

      SimulationLooper.prototype.run = function run() {
        var springSystem = getSpringSystem.call(this);

        if (this.running) {
          return;
        }
        this.running = true;
        while (!springSystem.getIsIdle()) {
          springSystem.loop((this.time += this.timestep));
        }
        this.running = false;
      };

      return SimulationLooper;
    })();

    /**
     * Resolves the SpringSystem one step at a
     * time controlled by an outside loop. This is useful for testing and
     * verifying the behavior of a SpringSystem or if you want to control your own
     * timing loop for some reason e.g. slowing down or speeding up the
     * simulation.
     * @public
     */
    var SteppingSimulationLooper = (function () {
      function SteppingSimulationLooper() {
        classCallCheck(this, SteppingSimulationLooper);
        this.springSystem = null;
        this.time = 0;
        this.running = false;
      }

      SteppingSimulationLooper.prototype.run = function run() {};
      // this.run is NOOP'd here to allow control from the outside using
      // this.step.

      // Perform one step toward resolving the SpringSystem.

      SteppingSimulationLooper.prototype.step = function step(timestep) {
        var springSystem = getSpringSystem.call(this);
        springSystem.loop((this.time += timestep));
      };

      return SteppingSimulationLooper;
    })();

    function getSpringSystem() {
      if (this.springSystem == null) {
        throw new Error('cannot run looper without a springSystem');
      }
      return this.springSystem;
    }

    var Loopers = Object.freeze({
      AnimationLooper: AnimationLooper,
      SimulationLooper: SimulationLooper,
      SteppingSimulationLooper: SteppingSimulationLooper,
    });

    /**
     * Provides math for converting from Origami PopAnimation
     * config values to regular Origami tension and friction values. If you are
     * trying to replicate prototypes made with PopAnimation patches in Origami,
     * then you should create your springs with
     * SpringSystem.createSpringWithBouncinessAndSpeed, which uses this Math
     * internally to create a spring to match the provided PopAnimation
     * configuration from Origami.
     */
    var BouncyConversion = (function () {
      function BouncyConversion(bounciness, speed) {
        classCallCheck(this, BouncyConversion);

        this.bounciness = bounciness;
        this.speed = speed;

        var b = this.normalize(bounciness / 1.7, 0, 20.0);
        b = this.projectNormal(b, 0.0, 0.8);
        var s = this.normalize(speed / 1.7, 0, 20.0);

        this.bouncyTension = this.projectNormal(s, 0.5, 200);
        this.bouncyFriction = this.quadraticOutInterpolation(
          b,
          this.b3Nobounce(this.bouncyTension),
          0.01
        );
      }

      BouncyConversion.prototype.normalize = function normalize(value, startValue, endValue) {
        return (value - startValue) / (endValue - startValue);
      };

      BouncyConversion.prototype.projectNormal = function projectNormal(n, start, end) {
        return start + n * (end - start);
      };

      BouncyConversion.prototype.linearInterpolation = function linearInterpolation(t, start, end) {
        return t * end + (1.0 - t) * start;
      };

      BouncyConversion.prototype.quadraticOutInterpolation = function quadraticOutInterpolation(
        t,
        start,
        end
      ) {
        return this.linearInterpolation(2 * t - t * t, start, end);
      };

      BouncyConversion.prototype.b3Friction1 = function b3Friction1(x) {
        return 0.0007 * Math.pow(x, 3) - 0.031 * Math.pow(x, 2) + 0.64 * x + 1.28;
      };

      BouncyConversion.prototype.b3Friction2 = function b3Friction2(x) {
        return 0.000044 * Math.pow(x, 3) - 0.006 * Math.pow(x, 2) + 0.36 * x + 2;
      };

      BouncyConversion.prototype.b3Friction3 = function b3Friction3(x) {
        return 0.00000045 * Math.pow(x, 3) - 0.000332 * Math.pow(x, 2) + 0.1078 * x + 5.84;
      };

      BouncyConversion.prototype.b3Nobounce = function b3Nobounce(tension) {
        var friction = 0;
        if (tension <= 18) {
          friction = this.b3Friction1(tension);
        } else if (tension > 18 && tension <= 44) {
          friction = this.b3Friction2(tension);
        } else {
          friction = this.b3Friction3(tension);
        }
        return friction;
      };

      return BouncyConversion;
    })();

    /**
     * Maintains a set of tension and friction constants
     * for a Spring. You can use fromOrigamiTensionAndFriction to convert
     * values from the [Origami](http://facebook.github.io/origami/)
     * design tool directly to Rebound spring constants.
     * @public
     */

    var SpringConfig = (function () {
      /**
       * Convert an origami Spring tension and friction to Rebound spring
       * constants. If you are prototyping a design with Origami, this
       * makes it easy to make your springs behave exactly the same in
       * Rebound.
       * @public
       */
      SpringConfig.fromOrigamiTensionAndFriction = function fromOrigamiTensionAndFriction(
        tension,
        friction
      ) {
        return new SpringConfig(
          tensionFromOrigamiValue(tension),
          frictionFromOrigamiValue(friction)
        );
      };

      /**
       * Convert an origami PopAnimation Spring bounciness and speed to Rebound
       * spring constants. If you are using PopAnimation patches in Origami, this
       * utility will provide springs that match your prototype.
       * @public
       */

      SpringConfig.fromBouncinessAndSpeed = function fromBouncinessAndSpeed(bounciness, speed) {
        var bouncyConversion = new BouncyConversion(bounciness, speed);
        return SpringConfig.fromOrigamiTensionAndFriction(
          bouncyConversion.bouncyTension,
          bouncyConversion.bouncyFriction
        );
      };

      /**
       * Create a SpringConfig with no tension or a coasting spring with some
       * amount of Friction so that it does not coast infininitely.
       * @public
       */

      SpringConfig.coastingConfigWithOrigamiFriction = function coastingConfigWithOrigamiFriction(
        friction
      ) {
        return new SpringConfig(0, frictionFromOrigamiValue(friction));
      };

      function SpringConfig(tension, friction) {
        classCallCheck(this, SpringConfig);

        this.tension = tension;
        this.friction = friction;
      }

      return SpringConfig;
    })();

    SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG = SpringConfig.fromOrigamiTensionAndFriction(40, 7);

    /**
     * Consists of a position and velocity. A Spring uses
     * this internally to keep track of its current and prior position and
     * velocity values.
     */
    var PhysicsState = function PhysicsState() {
      classCallCheck(this, PhysicsState);
      this.position = 0;
      this.velocity = 0;
    };

    /**
     * Provides a model of a classical spring acting to
     * resolve a body to equilibrium. Springs have configurable
     * tension which is a force multipler on the displacement of the
     * spring from its rest point or `endValue` as defined by [Hooke's
     * law](http://en.wikipedia.org/wiki/Hooke's_law). Springs also have
     * configurable friction, which ensures that they do not oscillate
     * infinitely. When a Spring is displaced by updating it's resting
     * or `currentValue`, the SpringSystems that contain that Spring
     * will automatically start looping to solve for equilibrium. As each
     * timestep passes, `SpringListener` objects attached to the Spring
     * will be notified of the updates providing a way to drive an
     * animation off of the spring's resolution curve.
     * @public
     */

    var Spring = (function () {
      function Spring(springSystem) {
        classCallCheck(this, Spring);
        this.listeners = [];
        this._startValue = 0;
        this._currentState = new PhysicsState();
        this._displacementFromRestThreshold = 0.001;
        this._endValue = 0;
        this._overshootClampingEnabled = false;
        this._previousState = new PhysicsState();
        this._restSpeedThreshold = 0.001;
        this._tempState = new PhysicsState();
        this._timeAccumulator = 0;
        this._wasAtRest = true;

        this._id = 's' + Spring._ID++;
        this._springSystem = springSystem;
      }

      /**
       * Remove a Spring from simulation and clear its listeners.
       * @public
       */

      Spring.prototype.destroy = function destroy() {
        this.listeners = [];
        this._springSystem.deregisterSpring(this);
      };

      /**
       * Get the id of the spring, which can be used to retrieve it from
       * the SpringSystems it participates in later.
       * @public
       */

      Spring.prototype.getId = function getId() {
        return this._id;
      };

      /**
       * Set the configuration values for this Spring. A SpringConfig
       * contains the tension and friction values used to solve for the
       * equilibrium of the Spring in the physics loop.
       * @public
       */

      Spring.prototype.setSpringConfig = function setSpringConfig(springConfig) {
        this._springConfig = springConfig;
        return this;
      };

      /**
       * Retrieve the SpringConfig used by this Spring.
       * @public
       */

      Spring.prototype.getSpringConfig = function getSpringConfig() {
        return this._springConfig;
      };

      /**
       * Set the current position of this Spring. Listeners will be updated
       * with this value immediately. If the rest or `endValue` is not
       * updated to match this value, then the spring will be dispalced and
       * the SpringSystem will start to loop to restore the spring to the
       * `endValue`.
       *
       * A common pattern is to move a Spring around without animation by
       * calling.
       *
       * ```
       * spring.setCurrentValue(n).setAtRest();
       * ```
       *
       * This moves the Spring to a new position `n`, sets the endValue
       * to `n`, and removes any velocity from the `Spring`. By doing
       * this you can allow the `SpringListener` to manage the position
       * of UI elements attached to the spring even when moving without
       * animation. For example, when dragging an element you can
       * update the position of an attached view through a spring
       * by calling `spring.setCurrentValue(x)`. When
       * the gesture ends you can update the Springs
       * velocity and endValue
       * `spring.setVelocity(gestureEndVelocity).setEndValue(flingTarget)`
       * to cause it to naturally animate the UI element to the resting
       * position taking into account existing velocity. The codepaths for
       * synchronous movement and spring driven animation can
       * be unified using this technique.
       * @public
       */

      Spring.prototype.setCurrentValue = function setCurrentValue(currentValue, skipSetAtRest) {
        this._startValue = currentValue;
        this._currentState.position = currentValue;
        if (!skipSetAtRest) {
          this.setAtRest();
        }
        this.notifyPositionUpdated(false, false);
        return this;
      };

      /**
       * Get the position that the most recent animation started at. This
       * can be useful for determining the number off oscillations that
       * have occurred.
       * @public
       */

      Spring.prototype.getStartValue = function getStartValue() {
        return this._startValue;
      };

      /**
       * Retrieve the current value of the Spring.
       * @public
       */

      Spring.prototype.getCurrentValue = function getCurrentValue() {
        return this._currentState.position;
      };

      /**
       * Get the absolute distance of the Spring from its resting endValue
       * position.
       * @public
       */

      Spring.prototype.getCurrentDisplacementDistance = function getCurrentDisplacementDistance() {
        return this.getDisplacementDistanceForState(this._currentState);
      };

      /**
       * Get the absolute distance of the Spring from a given state value
       */

      Spring.prototype.getDisplacementDistanceForState = function getDisplacementDistanceForState(
        state
      ) {
        return Math.abs(this._endValue - state.position);
      };

      /**
       * Set the endValue or resting position of the spring. If this
       * value is different than the current value, the SpringSystem will
       * be notified and will begin running its solver loop to resolve
       * the Spring to equilibrium. Any listeners that are registered
       * for onSpringEndStateChange will also be notified of this update
       * immediately.
       * @public
       */

      Spring.prototype.setEndValue = function setEndValue(endValue) {
        if (this._endValue === endValue && this.isAtRest()) {
          return this;
        }
        this._startValue = this.getCurrentValue();
        this._endValue = endValue;
        this._springSystem.activateSpring(this.getId());
        for (var i = 0, len = this.listeners.length; i < len; i++) {
          var listener = this.listeners[i];
          var onChange = listener.onSpringEndStateChange;
          onChange && onChange(this);
        }
        return this;
      };

      /**
       * Retrieve the endValue or resting position of this spring.
       * @public
       */

      Spring.prototype.getEndValue = function getEndValue() {
        return this._endValue;
      };

      /**
       * Set the current velocity of the Spring, in pixels per second. As
       * previously mentioned, this can be useful when you are performing
       * a direct manipulation gesture. When a UI element is released you
       * may call setVelocity on its animation Spring so that the Spring
       * continues with the same velocity as the gesture ended with. The
       * friction, tension, and displacement of the Spring will then
       * govern its motion to return to rest on a natural feeling curve.
       * @public
       */

      Spring.prototype.setVelocity = function setVelocity(velocity) {
        if (velocity === this._currentState.velocity) {
          return this;
        }
        this._currentState.velocity = velocity;
        this._springSystem.activateSpring(this.getId());
        return this;
      };

      /**
       * Get the current velocity of the Spring, in pixels per second.
       * @public
       */

      Spring.prototype.getVelocity = function getVelocity() {
        return this._currentState.velocity;
      };

      /**
       * Set a threshold value for the movement speed of the Spring below
       * which it will be considered to be not moving or resting.
       * @public
       */

      Spring.prototype.setRestSpeedThreshold = function setRestSpeedThreshold(restSpeedThreshold) {
        this._restSpeedThreshold = restSpeedThreshold;
        return this;
      };

      /**
       * Retrieve the rest speed threshold for this Spring.
       * @public
       */

      Spring.prototype.getRestSpeedThreshold = function getRestSpeedThreshold() {
        return this._restSpeedThreshold;
      };

      /**
       * Set a threshold value for displacement below which the Spring
       * will be considered to be not displaced i.e. at its resting
       * `endValue`.
       * @public
       */

      Spring.prototype.setRestDisplacementThreshold = function setRestDisplacementThreshold(
        displacementFromRestThreshold
      ) {
        this._displacementFromRestThreshold = displacementFromRestThreshold;
      };

      /**
       * Retrieve the rest displacement threshold for this spring.
       * @public
       */

      Spring.prototype.getRestDisplacementThreshold = function getRestDisplacementThreshold() {
        return this._displacementFromRestThreshold;
      };

      /**
       * Enable overshoot clamping. This means that the Spring will stop
       * immediately when it reaches its resting position regardless of
       * any existing momentum it may have. This can be useful for certain
       * types of animations that should not oscillate such as a scale
       * down to 0 or alpha fade.
       * @public
       */

      Spring.prototype.setOvershootClampingEnabled = function setOvershootClampingEnabled(enabled) {
        this._overshootClampingEnabled = enabled;
        return this;
      };

      /**
       * Check if overshoot clamping is enabled for this spring.
       * @public
       */

      Spring.prototype.isOvershootClampingEnabled = function isOvershootClampingEnabled() {
        return this._overshootClampingEnabled;
      };

      /**
       * Check if the Spring has gone past its end point by comparing
       * the direction it was moving in when it started to the current
       * position and end value.
       * @public
       */

      Spring.prototype.isOvershooting = function isOvershooting() {
        var start = this._startValue;
        var end = this._endValue;
        return (
          this._springConfig.tension > 0 &&
          ((start < end && this.getCurrentValue() > end) ||
            (start > end && this.getCurrentValue() < end))
        );
      };

      /**
       * The main solver method for the Spring. It takes
       * the current time and delta since the last time step and performs
       * an RK4 integration to get the new position and velocity state
       * for the Spring based on the tension, friction, velocity, and
       * displacement of the Spring.
       * @public
       */

      Spring.prototype.advance = function advance(time, realDeltaTime) {
        var isAtRest = this.isAtRest();

        if (isAtRest && this._wasAtRest) {
          return;
        }

        var adjustedDeltaTime = realDeltaTime;
        if (realDeltaTime > Spring.MAX_DELTA_TIME_SEC) {
          adjustedDeltaTime = Spring.MAX_DELTA_TIME_SEC;
        }

        this._timeAccumulator += adjustedDeltaTime;

        var tension = this._springConfig.tension;
        var friction = this._springConfig.friction;
        var position = this._currentState.position;
        var velocity = this._currentState.velocity;
        var tempPosition = this._tempState.position;
        var tempVelocity = this._tempState.velocity;
        var aVelocity = void 0;
        var aAcceleration = void 0;
        var bVelocity = void 0;
        var bAcceleration = void 0;
        var cVelocity = void 0;
        var cAcceleration = void 0;
        var dVelocity = void 0;
        var dAcceleration = void 0;
        var dxdt = void 0;
        var dvdt = void 0;

        while (this._timeAccumulator >= Spring.SOLVER_TIMESTEP_SEC) {
          this._timeAccumulator -= Spring.SOLVER_TIMESTEP_SEC;

          if (this._timeAccumulator < Spring.SOLVER_TIMESTEP_SEC) {
            this._previousState.position = position;
            this._previousState.velocity = velocity;
          }

          aVelocity = velocity;
          aAcceleration = tension * (this._endValue - tempPosition) - friction * velocity;

          tempPosition = position + aVelocity * Spring.SOLVER_TIMESTEP_SEC * 0.5;
          tempVelocity = velocity + aAcceleration * Spring.SOLVER_TIMESTEP_SEC * 0.5;
          bVelocity = tempVelocity;
          bAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity;

          tempPosition = position + bVelocity * Spring.SOLVER_TIMESTEP_SEC * 0.5;
          tempVelocity = velocity + bAcceleration * Spring.SOLVER_TIMESTEP_SEC * 0.5;
          cVelocity = tempVelocity;
          cAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity;

          tempPosition = position + cVelocity * Spring.SOLVER_TIMESTEP_SEC;
          tempVelocity = velocity + cAcceleration * Spring.SOLVER_TIMESTEP_SEC;
          dVelocity = tempVelocity;
          dAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity;

          dxdt = (1.0 / 6.0) * (aVelocity + 2.0 * (bVelocity + cVelocity) + dVelocity);
          dvdt =
            (1.0 / 6.0) * (aAcceleration + 2.0 * (bAcceleration + cAcceleration) + dAcceleration);

          position += dxdt * Spring.SOLVER_TIMESTEP_SEC;
          velocity += dvdt * Spring.SOLVER_TIMESTEP_SEC;
        }

        this._tempState.position = tempPosition;
        this._tempState.velocity = tempVelocity;

        this._currentState.position = position;
        this._currentState.velocity = velocity;

        if (this._timeAccumulator > 0) {
          this._interpolate(this._timeAccumulator / Spring.SOLVER_TIMESTEP_SEC);
        }

        if (this.isAtRest() || (this._overshootClampingEnabled && this.isOvershooting())) {
          if (this._springConfig.tension > 0) {
            this._startValue = this._endValue;
            this._currentState.position = this._endValue;
          } else {
            this._endValue = this._currentState.position;
            this._startValue = this._endValue;
          }
          this.setVelocity(0);
          isAtRest = true;
        }

        var notifyActivate = false;
        if (this._wasAtRest) {
          this._wasAtRest = false;
          notifyActivate = true;
        }

        var notifyAtRest = false;
        if (isAtRest) {
          this._wasAtRest = true;
          notifyAtRest = true;
        }

        this.notifyPositionUpdated(notifyActivate, notifyAtRest);
      };

      Spring.prototype.notifyPositionUpdated = function notifyPositionUpdated(
        notifyActivate,
        notifyAtRest
      ) {
        for (var i = 0, len = this.listeners.length; i < len; i++) {
          var listener = this.listeners[i];
          if (notifyActivate && listener.onSpringActivate) {
            listener.onSpringActivate(this);
          }

          if (listener.onSpringUpdate) {
            listener.onSpringUpdate(this);
          }

          if (notifyAtRest && listener.onSpringAtRest) {
            listener.onSpringAtRest(this);
          }
        }
      };

      /**
       * Check if the SpringSystem should advance. Springs are advanced
       * a final frame after they reach equilibrium to ensure that the
       * currentValue is exactly the requested endValue regardless of the
       * displacement threshold.
       * @public
       */

      Spring.prototype.systemShouldAdvance = function systemShouldAdvance() {
        return !this.isAtRest() || !this.wasAtRest();
      };

      Spring.prototype.wasAtRest = function wasAtRest() {
        return this._wasAtRest;
      };

      /**
       * Check if the Spring is atRest meaning that it's currentValue and
       * endValue are the same and that it has no velocity. The previously
       * described thresholds for speed and displacement define the bounds
       * of this equivalence check. If the Spring has 0 tension, then it will
       * be considered at rest whenever its absolute velocity drops below the
       * restSpeedThreshold.
       * @public
       */

      Spring.prototype.isAtRest = function isAtRest() {
        return (
          Math.abs(this._currentState.velocity) < this._restSpeedThreshold &&
          (this.getDisplacementDistanceForState(this._currentState) <=
            this._displacementFromRestThreshold ||
            this._springConfig.tension === 0)
        );
      };

      /**
       * Force the spring to be at rest at its current position. As
       * described in the documentation for setCurrentValue, this method
       * makes it easy to do synchronous non-animated updates to ui
       * elements that are attached to springs via SpringListeners.
       * @public
       */

      Spring.prototype.setAtRest = function setAtRest() {
        this._endValue = this._currentState.position;
        this._tempState.position = this._currentState.position;
        this._currentState.velocity = 0;
        return this;
      };

      Spring.prototype._interpolate = function _interpolate(alpha) {
        this._currentState.position =
          this._currentState.position * alpha + this._previousState.position * (1 - alpha);
        this._currentState.velocity =
          this._currentState.velocity * alpha + this._previousState.velocity * (1 - alpha);
      };

      Spring.prototype.getListeners = function getListeners() {
        return this.listeners;
      };

      Spring.prototype.addListener = function addListener(newListener) {
        this.listeners.push(newListener);
        return this;
      };

      Spring.prototype.removeListener = function removeListener(listenerToRemove) {
        removeFirst(this.listeners, listenerToRemove);
        return this;
      };

      Spring.prototype.removeAllListeners = function removeAllListeners() {
        this.listeners = [];
        return this;
      };

      Spring.prototype.currentValueIsApproximately = function currentValueIsApproximately(value) {
        return Math.abs(this.getCurrentValue() - value) <= this.getRestDisplacementThreshold();
      };

      return Spring;
    })();

    Spring._ID = 0;
    Spring.MAX_DELTA_TIME_SEC = 0.064;
    Spring.SOLVER_TIMESTEP_SEC = 0.001;

    /**
     * A set of Springs that all run on the same physics
     * timing loop. To get started with a Rebound animation, first
     * create a new SpringSystem and then add springs to it.
     * @public
     */

    var SpringSystem = (function () {
      function SpringSystem(looper) {
        classCallCheck(this, SpringSystem);
        this.listeners = [];
        this._activeSprings = [];
        this._idleSpringIndices = [];
        this._isIdle = true;
        this._lastTimeMillis = -1;
        this._springRegistry = {};

        this.looper = looper || new AnimationLooper();
        this.looper.springSystem = this;
      }

      /**
       * A SpringSystem is iterated by a looper. The looper is responsible
       * for executing each frame as the SpringSystem is resolved to idle.
       * There are three types of Loopers described below AnimationLooper,
       * SimulationLooper, and SteppingSimulationLooper. AnimationLooper is
       * the default as it is the most useful for common UI animations.
       * @public
       */

      SpringSystem.prototype.setLooper = function setLooper(looper) {
        this.looper = looper;
        looper.springSystem = this;
      };

      /**
       * Add a new spring to this SpringSystem. This Spring will now be solved for
       * during the physics iteration loop. By default the spring will use the
       * default Origami spring config with 40 tension and 7 friction, but you can
       * also provide your own values here.
       * @public
       */

      SpringSystem.prototype.createSpring = function createSpring(tension, friction) {
        var springConfig = void 0;
        if (tension === undefined || friction === undefined) {
          springConfig = SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG;
        } else {
          springConfig = SpringConfig.fromOrigamiTensionAndFriction(tension, friction);
        }
        return this.createSpringWithConfig(springConfig);
      };

      /**
       * Add a spring with a specified bounciness and speed. To replicate Origami
       * compositions based on PopAnimation patches, use this factory method to
       * create matching springs.
       * @public
       */

      SpringSystem.prototype.createSpringWithBouncinessAndSpeed =
        function createSpringWithBouncinessAndSpeed(bounciness, speed) {
          var springConfig = void 0;
          if (bounciness === undefined || speed === undefined) {
            springConfig = SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG;
          } else {
            springConfig = SpringConfig.fromBouncinessAndSpeed(bounciness, speed);
          }
          return this.createSpringWithConfig(springConfig);
        };

      /**
       * Add a spring with the provided SpringConfig.
       * @public
       */

      SpringSystem.prototype.createSpringWithConfig = function createSpringWithConfig(
        springConfig
      ) {
        var spring = new Spring(this);
        this.registerSpring(spring);
        spring.setSpringConfig(springConfig);
        return spring;
      };

      /**
       * Check if a SpringSystem is idle or active. If all of the Springs in the
       * SpringSystem are at rest, i.e. the physics forces have reached equilibrium,
       * then this method will return true.
       * @public
       */

      SpringSystem.prototype.getIsIdle = function getIsIdle() {
        return this._isIdle;
      };

      /**
       * Retrieve a specific Spring from the SpringSystem by id. This
       * can be useful for inspecting the state of a spring before
       * or after an integration loop in the SpringSystem executes.
       * @public
       */

      SpringSystem.prototype.getSpringById = function getSpringById(id) {
        return this._springRegistry[id];
      };

      /**
       * Get a listing of all the springs registered with this
       * SpringSystem.
       * @public
       */

      SpringSystem.prototype.getAllSprings = function getAllSprings() {
        var vals = [];
        for (var _id in this._springRegistry) {
          if (this._springRegistry.hasOwnProperty(_id)) {
            vals.push(this._springRegistry[_id]);
          }
        }
        return vals;
      };

      /**
       * Manually add a spring to this system. This is called automatically
       * if a Spring is created with SpringSystem#createSpring.
       *
       * This method sets the spring up in the registry so that it can be solved
       * in the solver loop.
       * @public
       */

      SpringSystem.prototype.registerSpring = function registerSpring(spring) {
        this._springRegistry[spring.getId()] = spring;
      };

      /**
       * Deregister a spring with this SpringSystem. The SpringSystem will
       * no longer consider this Spring during its integration loop once
       * this is called. This is normally done automatically for you when
       * you call Spring#destroy.
       * @public
       */

      SpringSystem.prototype.deregisterSpring = function deregisterSpring(spring) {
        removeFirst(this._activeSprings, spring);
        delete this._springRegistry[spring.getId()];
      };

      SpringSystem.prototype.advance = function advance(time, deltaTime) {
        while (this._idleSpringIndices.length > 0) {
          this._idleSpringIndices.pop();
        }
        for (var i = 0, len = this._activeSprings.length; i < len; i++) {
          var spring = this._activeSprings[i];
          if (spring.systemShouldAdvance()) {
            spring.advance(time / 1000.0, deltaTime / 1000.0);
          } else {
            this._idleSpringIndices.push(this._activeSprings.indexOf(spring));
          }
        }
        while (this._idleSpringIndices.length > 0) {
          var idx = this._idleSpringIndices.pop();
          idx >= 0 && this._activeSprings.splice(idx, 1);
        }
      };

      /**
       * This is the main solver loop called to move the simulation
       * forward through time. Before each pass in the solver loop
       * onBeforeIntegrate is called on an any listeners that have
       * registered themeselves with the SpringSystem. This gives you
       * an opportunity to apply any constraints or adjustments to
       * the springs that should be enforced before each iteration
       * loop. Next the advance method is called to move each Spring in
       * the systemShouldAdvance forward to the current time. After the
       * integration step runs in advance, onAfterIntegrate is called
       * on any listeners that have registered themselves with the
       * SpringSystem. This gives you an opportunity to run any post
       * integration constraints or adjustments on the Springs in the
       * SpringSystem.
       * @public
       */

      SpringSystem.prototype.loop = function loop(currentTimeMillis) {
        var listener = void 0;
        if (this._lastTimeMillis === -1) {
          this._lastTimeMillis = currentTimeMillis - 1;
        }
        var ellapsedMillis = currentTimeMillis - this._lastTimeMillis;
        this._lastTimeMillis = currentTimeMillis;

        var i = 0;
        var len = this.listeners.length;
        for (i = 0; i < len; i++) {
          listener = this.listeners[i];
          listener.onBeforeIntegrate && listener.onBeforeIntegrate(this);
        }

        this.advance(currentTimeMillis, ellapsedMillis);
        if (this._activeSprings.length === 0) {
          this._isIdle = true;
          this._lastTimeMillis = -1;
        }

        for (i = 0; i < len; i++) {
          listener = this.listeners[i];
          listener.onAfterIntegrate && listener.onAfterIntegrate(this);
        }

        if (!this._isIdle) {
          this.looper.run();
        }
      };

      /**
       * Used to notify the SpringSystem that a Spring has become displaced.
       * The system responds by starting its solver loop up if it is currently idle.
       */

      SpringSystem.prototype.activateSpring = function activateSpring(springId) {
        var spring = this._springRegistry[springId];
        if (this._activeSprings.indexOf(spring) === -1) {
          this._activeSprings.push(spring);
        }
        if (this.getIsIdle()) {
          this._isIdle = false;
          this.looper.run();
        }
      };

      /**
       * Add a listener to the SpringSystem to receive before/after integration
       * notifications allowing Springs to be constrained or adjusted.
       * @public
       */

      SpringSystem.prototype.addListener = function addListener(listener) {
        this.listeners.push(listener);
      };

      /**
       * Remove a previously added listener on the SpringSystem.
       * @public
       */

      SpringSystem.prototype.removeListener = function removeListener(listener) {
        removeFirst(this.listeners, listener);
      };

      /**
       * Remove all previously added listeners on the SpringSystem.
       * @public
       */

      SpringSystem.prototype.removeAllListeners = function removeAllListeners() {
        this.listeners = [];
      };

      return SpringSystem;
    })();

    var index = _extends({}, Loopers, {
      OrigamiValueConverter: OrigamiValueConverter,
      MathUtil: MathUtil,
      Spring: Spring,
      SpringConfig: SpringConfig,
      SpringSystem: SpringSystem,
      util: _extends({}, util, MathUtil),
    });

    return index;
  });
});

var VirtualizedScrollBar = (function (_Component) {
  inherits(VirtualizedScrollBar, _Component);

  function VirtualizedScrollBar(props) {
    classCallCheck(this, VirtualizedScrollBar);

    var _this = possibleConstructorReturn(
      this,
      (VirtualizedScrollBar.__proto__ || Object.getPrototypeOf(VirtualizedScrollBar)).call(
        this,
        props
      )
    );

    _this.state = {
      elemHeight: _this.props.staticElemHeight ? _this.props.staticElemHeight : 50,
      scrollOffset: 0,
      elemOverScan: _this.props.overScan ? _this.props.overScan : 3,
      topSpacerHeight: 0,
      unrenderedBelow: 0,
      unrenderedAbove: 0,
    };
    _this.stickyElems = null;
    return _this;
  }

  createClass(VirtualizedScrollBar, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.springSystem = new rebound.SpringSystem();
        this.spring = this.springSystem.createSpring();
        this.spring.setOvershootClampingEnabled(true);
        this.spring.addListener({ onSpringUpdate: this.handleSpringUpdate.bind(this) });
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.springSystem.deregisterSpring(this.spring);
        this.springSystem.removeAllListeners();
        this.springSystem = undefined;
        this.spring.destroy();
        this.spring = undefined;
      },
    },
    {
      key: 'handleSpringUpdate',
      value: function handleSpringUpdate(spring) {
        var val = spring.getCurrentValue();
        this.scrollBars.scrollTop(val);
      },

      // Find the first element to render, and render (containersize + overScan / index * height) elems after the first.
    },
    {
      key: 'getListToRender',
      value: function getListToRender(list) {
        var _this2 = this;

        var listToRender = [];
        this.stickyElems = [];
        var elemHeight = this.state.elemHeight;
        var containerHeight = this.props.containerHeight;
        var maxVisibleElems = Math.floor(containerHeight / elemHeight);
        if (!containerHeight || this.state.scrollOffset == null) {
          return list;
        }

        var smallestIndexVisible = null;
        if (
          this.state.scrollOffset === 0 &&
          this.props.stickyElems &&
          this.props.stickyElems.length === 0
        ) {
          smallestIndexVisible = 0;
        } else {
          var _loop = function _loop(index) {
            var child = list[index];
            // Maintain elements that have the alwaysRender flag set. This is used to keep a dragged element rendered, even if its scroll parent would normally unmount it.
            if (
              _this2.props.stickyElems.find(function (id) {
                return id === child.props.draggableId;
              })
            ) {
              _this2.stickyElems.push(child);
            } else {
              var ySmallerThanList = (index + 1) * elemHeight < _this2.state.scrollOffset;

              if (ySmallerThanList) {
                // Keep overwriting to obtain the last element that is not smaller
                smallestIndexVisible = index;
              }
            }
          };

          for (var index = 0; index < list.length; index++) {
            _loop(index);
          }
        }
        var start = Math.max(
          0,
          (smallestIndexVisible != null ? smallestIndexVisible : 0) - this.state.elemOverScan
        );
        // start plus number of visible elements plus overscan
        var end = smallestIndexVisible + maxVisibleElems + this.state.elemOverScan;
        // +1 because Array.slice isn't inclusive
        listToRender = list.slice(start, end + 1);
        // Remove any element from the list, if it was included in the stickied list
        if (this.stickyElems && this.stickyElems.length > 0) {
          listToRender = listToRender.filter(function (elem) {
            return !_this2.stickyElems.find(function (e) {
              return e.props.draggableId === elem.props.draggableId;
            });
          });
        }
        return listToRender;
      },

      // Save scroll position in state for virtualization
    },
    {
      key: 'handleScroll',
      value: function handleScroll(e) {
        var scrollOffset = this.scrollBars ? this.scrollBars.getScrollTop() : 0;
        var scrollDiff = Math.abs(scrollOffset - this.state.scrollOffset);
        var leniency = Math.max(5, this.state.elemHeight * 0.1); // As to not update exactly on breakpoint, but instead 5px or 10% within an element being scrolled past
        if (!this.state.scrollOffset || scrollDiff >= this.state.elemHeight - leniency) {
          this.setState({ scrollOffset: scrollOffset });
        }
        if (this.props.onScroll) {
          this.props.onScroll(e);
        }
      },

      // Animated scroll to top
    },
    {
      key: 'animateScrollTop',
      value: function animateScrollTop(top) {
        var scrollTop = this.scrollBars.getScrollTop();
        this.spring.setCurrentValue(scrollTop).setAtRest();
        this.spring.setEndValue(top);
      },

      // Get height of virtualized scroll container
    },
    {
      key: 'getScrollHeight',
      value: function getScrollHeight() {
        return this.scrollBars.getScrollHeight();
      },
      // Set scroll offset of virtualized scroll container
    },
    {
      key: 'scrollTop',
      value: function scrollTop(val) {
        this.scrollBars.scrollTop(val);
      },
      // Get scroll offset of virtualized scroll container
    },
    {
      key: 'getScrollTop',
      value: function getScrollTop() {
        return this.scrollBars.getScrollTop();
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var _props = this.props,
          customScrollbars = _props.customScrollbars,
          children = _props.children;

        var UseScrollbars = customScrollbars || lib_1;
        var rowCount = children.length;
        var elemHeight = this.state.elemHeight;

        var height = rowCount * this.state.elemHeight;
        var childrenWithProps = React__default.Children.map(children, function (child, index) {
          return React__default.cloneElement(child, { originalindex: index });
        });
        this.numChildren = childrenWithProps.length;

        var hasScrolled = this.state.scrollOffset > 0;

        var listToRender = this.getListToRender(childrenWithProps);

        var unrenderedBelow = hasScrolled
          ? (listToRender && listToRender.length > 0 ? listToRender[0].props.originalindex : 0) -
            (this.stickyElems ? this.stickyElems.length : 0)
          : 0;
        var unrenderedAbove =
          listToRender && listToRender.length > 0
            ? childrenWithProps.length -
              (listToRender[listToRender.length - 1].props.originalindex + 1)
            : 0;
        var belowSpacerStyle = this.props.disableVirtualization
          ? { width: '100%', height: 0 }
          : { width: '100%', height: unrenderedBelow ? unrenderedBelow * elemHeight : 0 };

        var aboveSpacerStyle = this.props.disableVirtualization
          ? { width: '100%', height: 0 }
          : { width: '100%', height: unrenderedAbove ? unrenderedAbove * elemHeight : 0 };

        if (this.stickyElems && this.stickyElems.length > 0) {
          listToRender.push(this.stickyElems[0]);
        }

        var innerStyle = {
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1',
        };
        if (!this.props.disableVirtualization) {
          innerStyle.minHeight = height;
          innerStyle.height = height;
          innerStyle.maxHeight = height;
        }

        return React__default.createElement(
          UseScrollbars,
          _extends(
            {
              onScroll: this.handleScroll.bind(this),
              ref: function ref(div) {
                return (_this3.scrollBars = div);
              },
              autoHeight: true,
              autoHeightMax: this.props.containerHeight,
              autoHeightMin: this.props.containerHeight,
            },
            this.props.scrollProps
          ),
          React__default.createElement(
            'div',
            {
              className: 'virtualized-scrollbar-inner',
              style: innerStyle,
              ref: function ref(div) {
                return (_this3._test = div);
              },
            },
            React__default.createElement('div', {
              style: belowSpacerStyle,
              className: 'below-spacer',
            }),
            listToRender,
            React__default.createElement('div', {
              style: aboveSpacerStyle,
              className: 'above-spacer',
            })
          )
        );
      },
    },
  ]);
  return VirtualizedScrollBar;
})(React.Component);

VirtualizedScrollBar.propTypes = {};

var DynamicVirtualizedScrollbar = (function (_Component) {
  inherits(DynamicVirtualizedScrollbar, _Component);

  function DynamicVirtualizedScrollbar(props) {
    classCallCheck(this, DynamicVirtualizedScrollbar);

    // Set initial elements to render - either specific amount, or the amount that can be in the viewPort + some optimistic amount to account for number of elements that deviate from min
    var _this = possibleConstructorReturn(
      this,
      (
        DynamicVirtualizedScrollbar.__proto__ || Object.getPrototypeOf(DynamicVirtualizedScrollbar)
      ).call(this, props)
    );

    _this.optimisticCount = 4;
    // Threshold at which to start virtualizing. Virtualizing small lists can produce jumping, and adds uneccesary overhead
    _this.virtualizationThreshold =
      props.virtualizationThreshold != null ? props.virtualizationThreshold : 40;
    var initialElemsToRender = _this.getInitialRenderAmount(props);
    _this.state = {
      // Update this when dynamic row height becomes a thing
      scrollOffset: 0,
      firstRenderedItemIndex: 0,
      lastRenderedItemIndex: initialElemsToRender,
      aboveSpacerHeight: 0,
      // Initially guess that all elems are min height
      belowSpacerHeight:
        initialElemsToRender === _this.props.listLength - 1
          ? 0
          : (Math.floor(props.listLength * 0.75) - 1) * props.minElemHeight,
      numElemsSized: 0,
      totalElemsSizedSize: 0,
      renderPart: null,
    };
    _this.elemOverScan =
      _this.props.elemOverScan != null ? _this.props.elemOverScan : _this.props.simplified ? 0 : 10;
    _this.childRefs = [];
    _this.stickyElems = null;
    _this.lastElemBounds = null;
    _this.firstElemBounds = null;
    _this.lastSectionChangeAt = 0;
    _this.updateRemainingSpace = _this.updateRemainingSpace.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    _this.setFullRender = _this.setFullRender.bind(_this);
    _this.clearTimer = _this.clearTimer.bind(_this);
    return _this;
  }

  createClass(DynamicVirtualizedScrollbar, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.springSystem = new rebound.SpringSystem();
        this.spring = this.springSystem.createSpring();
        this.spring.setOvershootClampingEnabled(true);
        this.spring.addListener({ onSpringUpdate: this.handleSpringUpdate.bind(this) });
        if (this.inner != null) {
          this.setState({ containerTop: this.inner.getBoundingClientRect().top });
        }
        // Set initial bounds for first and last rendered elems
        if (this.itemsContainer && this.itemsContainer.children && !this.props.simplified) {
          var lastElem = this.itemsContainer.lastElementChild;
          var firstElem = this.itemsContainer.firstElementChild;
          var lastElemBounds =
            lastElem && lastElem.firstElementChild
              ? lastElem.firstElementChild.getBoundingClientRect()
              : {};
          var firstElemBounds = firstElem ? firstElem.getBoundingClientRect() : {};
          this.firstElemBounds = {
            top: firstElemBounds.top,
            bottom: firstElemBounds.bottom,
            left: firstElemBounds.left,
            right: firstElemBounds.right,
          };
          this.lastElemBounds = {
            top: lastElemBounds.top,
            bottom: lastElemBounds.bottom,
            left: lastElemBounds.left,
            right: lastElemBounds.right,
          };
        }
        if (this.scrollBars) {
          this.scrollHeight = this.scrollBars.getScrollHeight();
        }
        this.updateAverageSizing();
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        var _this2 = this;

        if (prevState.firstRenderedItemIndex !== this.state.firstRenderedItemIndex) {
          this.firstElemBounds = null;
        }
        if (prevState.lastRenderedItemIndex !== this.state.lastRenderedItemIndex) {
          this.lastElemBounds = null;
        }
        if (this.props.listLength !== prevProps.listLength) {
          this.updateRemainingSpace();
          if (this.scrollBars) {
            this.scrollHeight = this.scrollBars.getScrollHeight();
          }
        }
        if (this.state.renderPart !== prevState.renderPart) {
          // We rendered a new section - start timer to not bounce back and forth if on the edge between two renderParts
          this.renderPartTimeout = setTimeout(function () {
            return _this2.clearTimer();
          }, 200);
        }
      },

      // Clear timeout, allowing changes to renderpart
    },
    {
      key: 'clearTimer',
      value: function clearTimer() {
        clearTimeout(this.renderPartTimeout);
        this.renderPartTimeout = null;
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.springSystem.deregisterSpring(this.spring);
        this.springSystem.removeAllListeners();
        this.springSystem = undefined;
        this.spring.destroy();
        this.spring = undefined;
      },
    },
    {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        // only render when visible items change -> smooth scroll
        return (
          (this.props.stickyElems && this.props.stickyElems.length > 0) ||
          this.props.listLength !== nextProps.listLength ||
          nextState.aboveSpacerHeight !== this.state.aboveSpacerHeight ||
          nextState.belowSpacerHeight !== this.state.belowSpacerHeight ||
          nextState.firstRenderedItemIndex !== this.state.firstRenderedItemIndex ||
          nextState.lastRenderedItemIndex !== this.state.lastRenderedItemIndex ||
          this.propsDidChange(this.props, nextProps)
        );
      },
    },
    {
      key: 'getInitialRenderAmount',
      value: function getInitialRenderAmount(props) {
        // Return full list if list is small, else return first quarter
        if (props.listLength <= this.virtualizationThreshold) {
          return props.listLength - 1;
        }
        return Math.round((props.listLength - 1) / 4) + this.optimisticCount;
      },
    },
    {
      key: 'propsDidChange',
      value: function propsDidChange(props, nextProps) {
        var newProps = Object.entries(nextProps);
        return (
          newProps.filter(function (_ref) {
            var _ref2 = slicedToArray(_ref, 2),
              key = _ref2[0],
              val = _ref2[1];

            return props[key] !== val;
          }).length > 0
        );
      },

      // Calculate remaining space below list, given the current rendering (first to last + overscan below and above)
    },
    {
      key: 'updateRemainingSpace',
      value: function updateRemainingSpace() {
        var _this3 = this;

        var lastRenderedItemIndex = Math.min(
          this.props.listLength - 1,
          this.state.lastRenderedItemIndex + this.elemOverScan
        );
        var remainingElemsBelow = Math.max(this.props.listLength - (lastRenderedItemIndex + 1), 0);
        var averageItemSize = this.getElemSizeAvg();
        var belowSpacerHeight = remainingElemsBelow * averageItemSize;
        if (belowSpacerHeight !== this.state.belowSpacerHeight) {
          this.setState({ belowSpacerHeight: belowSpacerHeight, renderPart: null }, function () {
            return _this3.setSpacingValidationTimer();
          });
        }
      },
    },
    {
      key: 'setSpacingValidationTimer',
      value: function setSpacingValidationTimer() {
        var _this4 = this;

        if (this.autoCalcTimeout) {
          clearTimeout(this.autoCalcTimeout);
        }
        this.autoCalcTimeout = setTimeout(function () {
          return _this4.autoCalculateSpacing();
        }, 500);
      },
    },
    {
      key: 'autoCalculateSpacing',
      value: function autoCalculateSpacing() {
        var shouldCalc = false;
        // Only re-calculate if we're more than 10 pixels past triggers
        var triggerOffset = 10;
        if (this.belowSpacer && this.aboveSpacer) {
          var belowSpacerBounds = this.belowSpacer.getBoundingClientRect();
          var aboveSpacerBounds = this.aboveSpacer.getBoundingClientRect();
          // Below spacer is in viewport
          if (
            this.state.containerTop + this.props.containerHeight - triggerOffset >
            belowSpacerBounds.top
          ) {
            shouldCalc = true;
          }
          // Above spacer is in viewport
          if (this.state.containerTop < aboveSpacerBounds.bottom - triggerOffset) {
            shouldCalc = true;
          }
        }
        if (shouldCalc) {
          var scrollOffset = this.scrollBars.getScrollTop();
          var averageItemSize = this.getElemSizeAvg();
          var elemsAbove = Math.round(scrollOffset / averageItemSize);
          var elemsToRender = Math.round(this.props.containerHeight / averageItemSize);
          this.setState({
            aboveSpacerHeight: elemsAbove * averageItemSize,
            belowSpacerHeight:
              (this.props.listLength - (elemsAbove + elemsToRender)) * averageItemSize +
              averageItemSize,
            firstRenderedItemIndex: Math.max(0, elemsAbove),
            lastRenderedItemIndex: Math.min(this.props.listLength - 1, elemsAbove + elemsToRender),
          });
        }
      },
    },
    {
      key: 'handleSpringUpdate',
      value: function handleSpringUpdate(spring) {
        var val = spring.getCurrentValue();
        this.scrollBars.scrollTop(val);
      },
    },
    {
      key: 'getListToRender',
      value: function getListToRender(list) {
        var _this5 = this;

        this.stickyElems = [];
        var lastRenderedItemIndex = this.state.lastRenderedItemIndex;
        var firstRenderedItemIndex = this.state.firstRenderedItemIndex;
        var start = 0;
        var end = list.length - 1;
        // Only virtualize if we have more elements than our combined overscan
        if (list.length > this.elemOverScan * 2) {
          // Render elemOverscan amount of elements above and below the indices
          start = Math.max(firstRenderedItemIndex - this.elemOverScan, 0);
          end = Math.min(lastRenderedItemIndex + this.elemOverScan, this.props.listLength - 1);
          if (this.props.stickyElems) {
            end += this.props.stickyElems.length;
          }
        }

        var items = [];
        // Add sticky (dragged) elems and render other visible items
        list.forEach(function (child, index) {
          // Maintain elements that have the alwaysRender flag set. This is used to keep a dragged element rendered, even if its scroll parent would normally unmount it.
          if (
            _this5.props.stickyElems.find(function (id) {
              return id === child.props.draggableId;
            })
          ) {
            _this5.stickyElems.push(child);
          } else if (index >= start && index <= end) {
            items.push(child);
          }
        });

        return items;
      },
    },
    {
      key: 'setScrollSection',
      value: function setScrollSection(scrollOffset, isScrollingDown) {
        var _this6 = this;

        var avgElemSize = this.getElemSizeAvg();
        // The number of elements you can see in the container at a time (size of chunks we virtualize)
        var elemsPerSection = Math.ceil(this.props.containerHeight / avgElemSize);
        // Optimisticly render more than neccesary, to avoid removing elements at borders
        // Scale optimism with amount of elements, up to a max of 10. Mostly for small lists to avoid rendering the entirety of an upcoming section along with the prior section
        this.optimisticCount = Math.min(Math.round(elemsPerSection * 0.8), 4);
        var numSections = Math.floor(this.props.listLength / elemsPerSection);

        // The sector we've scrolled to. Height of each section (virtualizable chunk) should be roughly the container size
        var sectionScrolledTo = Math.round(scrollOffset / this.props.containerHeight);
        var isScrolledToLastSection = sectionScrolledTo >= numSections - 1;

        // Only update if changed
        if (this.state.renderPart !== sectionScrolledTo) {
          // Optimism used above at start.
          var usedOptimismAbove = sectionScrolledTo === 0 ? 0 : this.optimisticCount;
          var optimismAboveHeight = usedOptimismAbove * avgElemSize;

          // Optimism used below to end of list
          var usedOptimismBelow = isScrolledToLastSection ? 0 : this.optimisticCount;
          var optimismBelowHeight = usedOptimismBelow * avgElemSize;

          var firstIndex =
            sectionScrolledTo == 0
              ? 0
              : isScrolledToLastSection
              ? Math.max(0, this.props.listLength - 1 - elemsPerSection - this.optimisticCount)
              : sectionScrolledTo * elemsPerSection - this.optimisticCount;
          var lastIndex = Math.min(
            this.props.listLength - 1,
            firstIndex + elemsPerSection + this.optimisticCount
          );
          // Sometimes, scroll bounces weirdly, causing a scroll down to actually render something pushes elements so far down, that the result is a lower scroll value.
          // In this case, we don't want to update anything.
          var didBounce = isScrollingDown
            ? sectionScrolledTo < this.state.renderPart
            : sectionScrolledTo > this.state.renderPart;
          if (didBounce) {
            return;
          }
          var aboveSpacerHeight =
            sectionScrolledTo === 0
              ? 0
              : sectionScrolledTo * this.props.containerHeight - optimismAboveHeight;
          var belowSpacerHeight = isScrolledToLastSection
            ? 0
            : (numSections - sectionScrolledTo) * this.props.containerHeight - optimismBelowHeight;
          this.setState(
            {
              renderPart: sectionScrolledTo,
              // If we're at section 1, we have scrolled past section 0, and the above height will be 1 sections height
              aboveSpacerHeight: aboveSpacerHeight,
              belowSpacerHeight: belowSpacerHeight,
              firstRenderedItemIndex: firstIndex,
              lastRenderedItemIndex: lastIndex,
            },
            function () {
              return _this6.updateAverageSizing();
            }
          );
        }
      },
      // Render entire list, if we aren't already viewing all of it
    },
    {
      key: 'setFullRender',
      value: function setFullRender() {
        var stateUpdate = {};
        if (this.state.firstRenderedItemIndex !== 0) {
          stateUpdate.firstRenderedItemIndex = 0;
          stateUpdate.aboveSpacerHeight = 0;
        }
        if (this.state.lastRenderedItemIndex !== this.props.listLength - 1) {
          stateUpdate.lastRenderedItemIndex = this.props.listLength - 1;
          stateUpdate.belowSpacerHeight = 0;
        }
        if (Object.entries(stateUpdate).length > 0) {
          this.setState(stateUpdate);
        }
      },
    },
    {
      key: 'handleScroll',
      value: function handleScroll(e) {
        // Don't start rendering new things more than once every 200ms.
        if (this.renderPartTimeout != null) {
          return;
        }
        var avgElemSize = this.getElemSizeAvg();
        var scrollOffset = e.scrollTop;

        var scrollHeight = this.scrollHeight;
        // Scrolling difference in px since last time we rendered a new section
        var scrollDiff = scrollOffset - this.lastSectionChangeAt;

        // Update only if difference isn't minimal
        if (Math.abs(scrollDiff) < Math.max(5, avgElemSize * 0.1)) {
          return;
        } else {
          this.lastSectionChangeAt = scrollOffset;
        }
        // If list contains fewer elements in total than some small number, or the list's scroll area isn't at least 2x bigger than the container, don't virtualize
        if (
          this.props.listLength <= this.virtualizationThreshold ||
          Math.round(scrollHeight / this.props.containerHeight) <= 2
        ) {
          this.setFullRender(); // Just render entire list
          return;
        } else {
          // Set section to render based on the current scroll
          this.setScrollSection(scrollOffset, scrollDiff > 0);
        }
        if (this.props.onScroll) {
          this.props.onScroll(e);
        }
      },
    },
    {
      key: 'updateAverageSizing',
      value: function updateAverageSizing() {
        var numSized = 0;
        var totalSize = 0;
        if (this.itemsContainer && this.itemsContainer.children) {
          for (var i = 0; i < this.itemsContainer.children.length; i++) {
            var child = this.itemsContainer.children[i];
            numSized++;
            totalSize += child.clientHeight;
          }
        }
        if (numSized !== this.state.numElemsSized) {
          var scrollHeight = this.scrollBars
            ? this.scrollBars.getScrollHeight()
            : window.innerHeight;
          this.scrollHeight = scrollHeight;
          this.setState({ numElemsSized: numSized, totalElemsSizedSize: totalSize });
        }
      },

      // Animated scroll to top
    },
    {
      key: 'animateScrollTop',
      value: function animateScrollTop(top) {
        var scrollTop = this.scrollBars.getScrollTop();
        this.spring.setCurrentValue(scrollTop).setAtRest();
        this.spring.setEndValue(top);
      },

      // Get height of virtualized scroll container
    },
    {
      key: 'getScrollHeight',
      value: function getScrollHeight() {
        return this.scrollBars.getScrollHeight();
      },
      // Set scroll offset of virtualized scroll container
    },
    {
      key: 'scrollTop',
      value: function scrollTop(val) {
        this.scrollBars.scrollTop(val);
      },
      // Get scroll offset of virtualized scroll container
    },
    {
      key: 'getScrollTop',
      value: function getScrollTop() {
        return this.scrollBars.getScrollTop();
      },
    },
    {
      key: 'getElemSizeAvg',
      value: function getElemSizeAvg() {
        return Math.ceil(
          this.state.numElemsSized > 0
            ? this.state.totalElemsSizedSize / this.state.numElemsSized
            : this.props.minElemHeight
        );
      },
    },
    {
      key: 'getOverScanUsed',
      value: function getOverScanUsed() {
        var overscan = {
          above:
            this.state.firstRenderedItemIndex > this.elemOverScan
              ? Math.min(this.elemOverScan, this.state.firstRenderedItemIndex - this.elemOverScan)
              : 0,
          below: Math.min(
            this.elemOverScan,
            this.props.listLength - 1 - this.state.lastRenderedItemIndex
          ),
        };
        return overscan;
      },
    },
    {
      key: 'onScrollStop',
      value: function onScrollStop() {
        this.shouldScroll = false;
        this.setScrollStopTimer();
      },
    },
    {
      key: 'setScrollStopTimer',
      value: function setScrollStopTimer() {
        var _this7 = this;

        if (this.scrollStopTimer) {
          clearTimeout(this.scrollStopTimer);
        }
        // Don't allow scroll updates more than once every 5ms
        this.scrollStopTimer = setTimeout(function () {
          return (_this7.shouldScroll = true);
        }, 5);
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this8 = this;

        var children = this.props.children;

        var overscanUsed = this.getOverScanUsed();
        var childrenWithProps = React__default.Children.map(children, function (child, index) {
          return React__default.cloneElement(child, {
            originalindex: index,
            ref: function ref(node) {
              return (_this8.childRefs[index] = node);
            },
          });
        });
        var overScanHeightBelow = overscanUsed.below * this.getElemSizeAvg();
        var overScanHeightAbove = overscanUsed.above * this.getElemSizeAvg();

        var listToRender = this.getListToRender(childrenWithProps);
        // Always add one empty space below
        var belowSpacerStyle = {
          border: this.props.showIndicators ? 'solid 3px yellow' : 'none',
          width: '100%',
          height:
            this.state.belowSpacerHeight +
            (this.props.stickyElems && this.props.stickyElems.length > 0
              ? this.props.stickyElems.length * this.getElemSizeAvg()
              : 0) -
            overScanHeightBelow,
        };
        var aboveSpacerStyle = {
          border: this.props.showIndicators ? 'solid 3px purple' : 'none',
          width: '100%',
          height: Math.max(this.state.aboveSpacerHeight - overScanHeightAbove, 0),
        };
        if (this.stickyElems && this.stickyElems.length > 0) {
          // Insert element that is being dragged (stickyElems - currentl represented as arrays, in case we want more than 1, but multidrag only sticks 1 in the current design).
          // This is done to avoid virtualizing the element we're dragging away, when its parent container is virtuaized away (drag + scroll)
          listToRender.push(this.stickyElems[0]);
        }

        var innerStyle = {
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1',
          minHeight: this.props.containerHeight,
        };

        var listItemsStyle = {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1',
        };

        var firstIndicatorStyle = void 0;
        var lastIndicatorStyle = void 0;
        if (this.firstElemBounds && this.lastElemBounds && !this.props.simplified) {
          firstIndicatorStyle = {
            top: this.firstElemBounds.top,
            left: this.firstElemBounds.left,
            width: this.firstElemBounds.right - this.firstElemBounds.left - 6,
            height: this.firstElemBounds.bottom - this.firstElemBounds.top - 6,
            boxSizing: 'border-box',
            background: 'transparent',
            border: 'solid 3px green',
            position: 'fixed',
          };
          lastIndicatorStyle = {
            top: this.lastElemBounds.top,
            left: this.lastElemBounds.left,
            width: this.lastElemBounds.right - this.lastElemBounds.left - 6,
            height: this.lastElemBounds.bottom - this.lastElemBounds.top - 6,
            boxSizing: 'border-box',
            background: 'transparent',
            border: 'solid 3px blue',
            position: 'fixed',
          };
        }
        return React__default.createElement(
          lib_1,
          // onScrollStop={this.onScrollStop.bind(this)}
          _extends(
            {
              onScrollFrame: this.handleScroll.bind(this),
              ref: function ref(div) {
                return (_this8.scrollBars = div);
              },
            },
            this.props.scrollProps,
            {
              autoHeight: true,
              autoHeightMax: this.props.containerHeight,
              autoHeightMin: this.props.containerHeight,
            }
          ),
          this.props.showIndicators
            ? React__default.createElement('div', {
                className: 'first-indicator',
                style: firstIndicatorStyle,
              })
            : null,
          this.props.showIndicators
            ? React__default.createElement('div', {
                className: 'last-indicator',
                style: lastIndicatorStyle,
              })
            : null,
          React__default.createElement(
            'div',
            {
              className: 'virtualized-scrollbar-inner',
              style: innerStyle,
              ref: function ref(div) {
                return (_this8.inner = div);
              },
            },
            React__default.createElement('div', {
              ref: function ref(div) {
                return (_this8.aboveSpacer = div);
              },
              style: aboveSpacerStyle,
              className: 'above-spacer',
            }),
            React__default.createElement(
              'div',
              {
                className: 'list-items',
                style: listItemsStyle,
                ref: function ref(div) {
                  return (_this8.itemsContainer = div);
                },
              },
              listToRender
            ),
            React__default.createElement('div', {
              ref: function ref(div) {
                return (_this8.belowSpacer = div);
              },
              style: belowSpacerStyle,
              className: 'below-spacer',
            })
          )
        );
      },
    },
  ]);
  return DynamicVirtualizedScrollbar;
})(React.Component);

DynamicVirtualizedScrollbar.propTypes = {
  minElemHeight: PropTypes.number.isRequired,
};

var Droppable = (function (_Component) {
  inherits(Droppable, _Component);

  function Droppable(props) {
    classCallCheck(this, Droppable);

    var _this = possibleConstructorReturn(
      this,
      (Droppable.__proto__ || Object.getPrototypeOf(Droppable)).call(this, props)
    );

    _this.state = {
      placeholder: null,
      scrollOffset: 0,
      topSpacerHeight: 0,
      unrenderedBelow: 0,
      unrenderedAbove: 0,
      dragAndDropGroup: Util.getDragEvents(_this.props.dragAndDropGroup),
      currentlyActiveDraggable: null,
    };
    _this.onPlaceholderChange = _this.onPlaceholderChange.bind(_this);
    _this.onScrollChange = _this.onScrollChange.bind(_this);
    _this.onDragEnd = _this.onDragEnd.bind(_this);
    _this.onDragStart = _this.onDragStart.bind(_this);
    _this.getDraggedElemHeight = _this.getDraggedElemHeight.bind(_this);
    _this.defaultElemHeight = 50;
    //this.getShouldAlwaysRender = this.getShouldAlwaysRender.bind(this);
    return _this;
  }

  createClass(Droppable, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        event_manager_2(this.state.dragAndDropGroup.placeholderEvent, this.onPlaceholderChange);
        event_manager_2(this.state.dragAndDropGroup.scrollEvent, this.onScrollChange);
        event_manager_2(this.state.dragAndDropGroup.endEvent, this.onDragEnd);
        event_manager_2(this.state.dragAndDropGroup.startEvent, this.onDragStart);
        this.setState({ mounted: true });
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        event_manager_3(this.state.dragAndDropGroup.endEvent, this.onDragEnd);
        event_manager_3(this.state.dragAndDropGroup.startEvent, this.onDragStart);
        event_manager_3(this.state.dragAndDropGroup.placeholderEvent, this.onPlaceholderChange);
        event_manager_3(this.state.dragAndDropGroup.scrollEvent, this.onScrollChange);
      },
    },
    {
      key: 'getScrollTop',
      value: function getScrollTop() {
        if (this.scrollBars) {
          return this.scrollBars.getScrollTop();
        }
      },
    },
    {
      key: 'animateScrollTop',
      value: function animateScrollTop(val) {
        if (this.scrollBars) {
          this.scrollBars.animateScrollTop(val);
        }
      },
    },
    {
      key: 'scrollTop',
      value: function scrollTop(val) {
        if (this.scrollBars) {
          this.scrollBars.scrollTop(val);
        }
      },
    },
    {
      key: 'getScrollHeight',
      value: function getScrollHeight() {
        if (this.scrollBars) {
          return this.scrollBars.getScrollHeight();
        }
      },
    },
    {
      key: 'onDragEnd',
      value: function onDragEnd(draggedElem) {
        var _this2 = this;

        this.setState({ currentlyActiveDraggable: null }, function () {
          return _this2.forceUpdate();
        });
      },
    },
    {
      key: 'onDragStart',
      value: function onDragStart(draggedElem) {
        this.setState({ currentlyActiveDraggable: draggedElem });
      },

      // Receives notification about placeholder from context. If we're not the active droppable, don't show placeholder.
    },
    {
      key: 'onPlaceholderChange',
      value: function onPlaceholderChange(placeholder, droppableActive) {
        var isTargetingMe = droppableActive === this.props.droppableId;
        if (isTargetingMe) {
          this.setState({ placeholder: placeholder, droppableActive: droppableActive });
        } else if (this.state.placeholder != null || this.state.droppableActive !== null) {
          this.setState({ placeholder: null, droppableActive: null });
        }
      },
    },
    {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        // If we're not in a drag, and one is not coming up, always update
        if (
          this.state.currentlyActiveDraggable == null &&
          this.state.droppableActive == null &&
          nextState.droppableActive == null &&
          nextState.currentlyActiveDraggable == null
        ) {
          return true;
        }
        if (this.state.mounted !== nextState.mounted) {
          return true;
        }
        if (this.state.scrollOffset !== nextState.scrollOffset) {
          return true;
        }
        if (
          this.props.children &&
          nextProps.children &&
          this.props.children.length !== nextProps.children.length
        ) {
          return true;
        }
        var isTargetingMe = nextState.droppableActive === this.props.droppableId;
        if (isTargetingMe) {
          if (
            this.state.droppableActive === nextState.droppableActive &&
            this.state.placeholder === nextState.placeholder
          ) {
            return false;
          }
        } else if (this.state.placeholder == null && this.state.droppableActive == null) {
          //If we're not being targeted, we dont' want a placeholder update.
          return false;
        }
        return true;
      },
    },
    {
      key: 'getDraggedElemHeight',
      value: function getDraggedElemHeight() {
        if (this.state.currentlyActiveDraggable) {
          return this.state.currentlyActiveDraggable.height;
        }
        return this.props.elemHeight ? this.props.elemHeight : this.defaultElemHeight;
      },
    },
    {
      key: 'pushPlaceholder',
      value: function pushPlaceholder(children) {
        var _this3 = this;

        var pushedPlaceholder = false;
        var listToRender = [].concat(toConsumableArray(children));
        var placeholderHeight = this.props.dynamicElemHeight
          ? this.getDraggedElemHeight()
          : this.props.elemHeight
          ? this.props.elemHeight
          : this.defaultElemHeight;
        var style = void 0;

        if (this.props.placeholderStyle) {
          style = _extends({}, this.props.placeholderStyle);
          style.height = placeholderHeight;
        } else {
          style = {
            border: '1px dashed grey',
            height: placeholderHeight,
            backgroundColor: 'transparent',
          };
        }

        if (this.state.placeholder) {
          listToRender.forEach(function (elem, index) {
            if (
              elem &&
              elem.props &&
              elem.props.draggableId === _this3.state.placeholder &&
              !pushedPlaceholder
            ) {
              listToRender.splice(
                index,
                0,
                React__default.createElement(
                  'div',
                  {
                    key: 'placeholder',
                    draggableid: 'placeholder',
                    className: 'draggable-test',
                    style: style,
                  },
                  React__default.createElement('p', { className: 'placeholder-text' })
                )
              );
              pushedPlaceholder = true;
            }
          });
        } else if (!pushedPlaceholder) {
          listToRender.push(
            React__default.createElement(
              'div',
              {
                key: 'placeholder',
                draggableid: 'placeholder',
                className: 'draggable-test',
                style: style,
              },
              React__default.createElement('p', { className: 'placeholder-text' })
            )
          );
        }
        return listToRender;
      },
    },
    {
      key: 'onScrollChange',
      value: function onScrollChange(droppableActive, scrollOffset) {
        var goingDown = scrollOffset > 0;
        if (
          droppableActive != null &&
          droppableActive === this.state.droppableActive &&
          this.scrollBars
        ) {
          if (
            (goingDown && this.scrollBars.getScrollHeight() <= this.scrollBars.getScrollTop()) ||
            (!goingDown && this.scrollBars.getScrollTop() <= 0)
          ) {
            return;
          }
          this.scrollBars.scrollTop(this.scrollBars.getScrollTop() + scrollOffset);
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this4 = this;

        var _props = this.props,
          children = _props.children,
          customScrollbars = _props.customScrollbars;
        // Objects we want to render

        var listToRender = [];
        var propsObject = {
          key: this.props.droppableId,
          droppableid: this.props.droppableId,
          droppablegroup: this.props.dragAndDropGroup,
        };

        if (children && children.length > 0) {
          // Pass my droppableId to all children to give a source for DnD
          var childrenWithProps = React__default.Children.map(children, function (child) {
            return React__default.cloneElement(child, {
              droppableId: _this4.props.droppableId,
              //alwaysRender: this.getShouldAlwaysRender
            });
          });
          listToRender = childrenWithProps;
        }
        var optimism = 25;
        var elemHeight = 0;
        var rowsTotalHeight = 0;
        var shouldScroll = true;
        var calculatedRowMinHeight = 0;
        var listHeaderHeight = this.props.listHeader != null ? this.props.listHeaderHeight : 0;
        var outerContainerHeight = this.props.containerHeight;
        elemHeight = this.props.hideList
          ? 0
          : this.props.dynamicElemHeight
          ? this.props.minElemHeight
          : this.props.elemHeight;
        rowsTotalHeight = listToRender.length * elemHeight;
        // Container smaller than calculated height of rows?
        shouldScroll =
          this.props.dynamicElemHeight ||
          this.props.containerHeight <= rowsTotalHeight + listHeaderHeight + optimism;

        // Total rows + height of one row (required for DnD to empty lists/dropping below list)
        calculatedRowMinHeight = rowsTotalHeight + (this.props.hideList ? 0 : elemHeight);

        // The minimum height of the container is the # of elements + 1 (same reason as above), unless a minimum height is specificied that is larger than this.
        // If the minimum height exceeds the containerHeight, we limit it to containerHeight and enable scroll instead
        outerContainerHeight = this.props.enforceContainerMinHeight
          ? this.props.containerHeight
          : shouldScroll
          ? this.props.containerHeight
          : this.props.containerMinHeight && this.props.containerMinHeight >= calculatedRowMinHeight
          ? this.props.containerMinHeight
          : Math.min(calculatedRowMinHeight + listHeaderHeight, this.props.containerHeight);

        var draggedElemId = this.state.currentlyActiveDraggable
          ? this.state.currentlyActiveDraggable.draggableId
          : null;
        var CustomTag = this.props.tagName ? this.props.tagName : 'div';
        var headerWithProps =
          this.props.listHeader != null && this.props.listHeaderHeight != null
            ? React__default.cloneElement(this.props.listHeader, {
                draggableid: this.props.droppableId + '-header',
              })
            : null;
        var isActive =
          this.state.droppableActive && this.state.droppableActive === this.props.droppableId;
        var headerActive =
          isActive && this.state.placeholder && this.state.placeholder.includes('header');

        return React__default.createElement(
          CustomTag,
          _extends({}, propsObject, {
            style: {
              height: outerContainerHeight,
              minHeight: outerContainerHeight,
              maxHeight: outerContainerHeight,
              overflow: 'hidden',
            },
          }),
          React__default.createElement(
            'div',
            { className: 'header-wrapper ' + (headerActive ? this.props.activeHeaderClass : '') },
            headerWithProps
          ),
          this.props.hideList
            ? null
            : shouldScroll && !this.props.disableScroll
            ? this.props.externalVirtualization
              ? React__default.createElement(
                  lib_1,
                  // onScrollStop={this.onScrollStop.bind(this)}
                  _extends(
                    {
                      onScrollFrame: this.props.onScroll,
                      ref: function ref(div) {
                        return (_this4.scrollBars = div);
                      },
                    },
                    this.props.scrollProps,
                    {
                      autoHeight: true,
                      autoHeightMax: this.props.containerHeight - listHeaderHeight,
                      autoHeightMin: this.props.containerHeight - listHeaderHeight,
                    }
                  ),
                  isActive ? this.pushPlaceholder(listToRender) : listToRender
                )
              : this.props.dynamicElemHeight
              ? React__default.createElement(
                  DynamicVirtualizedScrollbar,
                  {
                    elemOverScan: this.props.elemOverScan,
                    initialElemsToRender: this.props.initialElemsToRender,
                    disableVirtualization: this.props.disableVirtualization,
                    listLength: listToRender.length,
                    minElemHeight: this.props.minElemHeight,
                    stickyElems: draggedElemId ? [draggedElemId] : [],
                    ref: function ref(scrollDiv) {
                      return (_this4.scrollBars = scrollDiv);
                    },
                    containerHeight: this.props.containerHeight - listHeaderHeight,
                    showIndicators: this.props.showIndicators,
                    scrollProps: this.props.scrollProps,
                    onScroll: this.props.onScroll,
                  },
                  isActive ? this.pushPlaceholder(listToRender) : listToRender
                )
              : React__default.createElement(
                  VirtualizedScrollBar,
                  {
                    disableVirtualization: this.props.disableVirtualization,
                    stickyElems: draggedElemId ? [draggedElemId] : [],
                    staticElemHeight: elemHeight,
                    ref: function ref(scrollDiv) {
                      return (_this4.scrollBars = scrollDiv);
                    },
                    customScrollbars: customScrollbars,
                    containerHeight: this.props.containerHeight - listHeaderHeight,
                    onScroll: this.props.onScroll,
                  },
                  isActive ? this.pushPlaceholder(listToRender) : listToRender
                )
            : React__default.createElement(
                'div',
                { className: 'no-scroll-container' },
                isActive ? this.pushPlaceholder(listToRender) : listToRender
              )
        );
      },
    },
  ]);
  return Droppable;
})(React.Component);

Droppable.propTypes = {
  droppableId: PropTypes.string.isRequired,
  dragAndDropGroup: PropTypes.string.isRequired,
  containerHeight: PropTypes.number.isRequired,
  placeholderStyle: PropTypes.object,
  elemHeight: PropTypes.number,
  dynamicElemHeight: PropTypes.bool,
  disableScroll: PropTypes.bool,
};

var DragDropContext = (function (_Component) {
  inherits(DragDropContext, _Component);

  function DragDropContext(props) {
    classCallCheck(this, DragDropContext);

    var _this = possibleConstructorReturn(
      this,
      (DragDropContext.__proto__ || Object.getPrototypeOf(DragDropContext)).call(this, props)
    );

    _this.state = {
      placeholder: null,
      dragStarted: false,
      dragActive: false,
      draggedElem: null,
      droppableActive: null,
      targetSection: null,
      dragAndDropGroup: Util.getDragEvents(_this.props.dragAndDropGroup),
    };
    _this.onDragMove = _this.onDragMove.bind(_this);
    _this.resetPlaceholderIndex = _this.resetPlaceholderIndex.bind(_this);
    _this.onDragEnd = _this.onDragEnd.bind(_this);
    _this.onDragStart = _this.onDragStart.bind(_this);
    _this.dispatchPlaceholder = _this.dispatchPlaceholder.bind(_this);
    return _this;
  }

  createClass(DragDropContext, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        event_manager_2(this.state.dragAndDropGroup.endEvent, this.onDragEnd);
        event_manager_2(this.state.dragAndDropGroup.startEvent, this.onDragStart);
        event_manager_2(this.state.dragAndDropGroup.moveEvent, this.onDragMove);
        event_manager_2(this.state.dragAndDropGroup.resetEvent, this.resetPlaceholderIndex);
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        event_manager_3(this.state.dragAndDropGroup.endEvent, this.onDragEnd);
        event_manager_3(this.state.dragAndDropGroup.startEvent, this.onDragStart);
        event_manager_3(this.state.dragAndDropGroup.moveEvent, this.onDragMove);
        event_manager_3(this.state.dragAndDropGroup.resetEvent, this.resetPlaceholderIndex);
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        // If our placeholder has changed, notify droppables
        if (
          this.state.placeholder !== prevState.placeholder ||
          this.state.droppableActive !== prevState.droppableActive
        ) {
          this.dispatchPlaceholder();
        }
      },
    },
    {
      key: 'dispatchPlaceholder',
      value: function dispatchPlaceholder() {
        if (this.state.draggedElem && this.state.dragActive && this.state.droppableActive) {
          event_manager_4(
            this.state.dragAndDropGroup.placeholderEvent,
            this.state.placeholder,
            this.state.droppableActive,
            this.state.draggedElem
          );
        } else {
          event_manager_4(this.state.dragAndDropGroup.placeholderEvent, null, null);
        }
      },
    },
    {
      key: 'onDragStart',
      value: function onDragStart(draggable, x, y) {
        if (!this.state.dragActive) {
          this.setState({ dragActive: true, draggedElem: draggable });
        }
        if (this.props.onDragStart) {
          this.props.onDragStart(draggable, x, y);
        }
      },
    },
    {
      key: 'onDragEnd',
      value: function onDragEnd() {
        if (this.state.draggedElem && this.state.droppableActive) {
          var placeholder = this.state.placeholder != null ? this.state.placeholder : 'END_OF_LIST';
          if (this.props.onDragEnd) {
            if (this.state.targetSection && this.state.targetSection === placeholder) {
              // Send null and placeholderSection, not both
              placeholder = null;
            }
            this.props.onDragEnd(
              this.state.draggedElem,
              this.state.droppableActive,
              placeholder,
              this.state.targetSection
            );
          }
        } else {
          if (this.props.onDragCancel) {
            this.props.onDragCancel(this.state.draggedElem);
          }
        }
        this.setState({
          draggedElem: null,
          placeholder: null,
          dragActive: false,
          droppableActive: null,
          dragStarted: false,
          globalScroll: null,
          globalScrollXDirection: null,
          globalScrollYDirection: null,
        });
      },
      // Check if global scroll is at appropriate edge already
    },
    {
      key: 'getCanScrollDirection',
      value: function getCanScrollDirection(dir) {
        if (!this.outerScrollBar) {
          return false;
        }
        switch (dir) {
          case 'down':
            return (
              this.outerScrollBar.getScrollTop() <
              this.outerScrollBar.getScrollHeight() - this.props.scrollContainerHeight
            );
          case 'up':
            return this.outerScrollBar.getScrollTop() > 0;
          case 'left':
            return this.outerScrollBar.getScrollLeft() > 0;
          case 'right':
            return (
              this.outerScrollBar.getScrollLeft() <
              this.outerScrollBar.getScrollWidth() - window.innerWidth
            );
        }
      },

      // When a card is moved, check for autoScroll
    },
    {
      key: 'onMoveScroll',
      value: function onMoveScroll(x, y, droppable) {
        var _this2 = this;

        //var h = this.container.getBoundingClientRect().bottom - this.container.getBoundingClientRect().top;
        if (this.state.dragActive && this.state.draggedElem) {
          var screenWidth = window.innerWidth;
          // Scroll when within 5% or 50px of edge, depending on which one is larger.
          // This gives nice big areas for computer screens, without scrolling everywhere on phones
          var scrollThreshold =
            this.props.autoScrollThreshold || Math.max(50, Math.round(screenWidth * 0.05));
          var scrollContainerPos = this.container.getBoundingClientRect();

          var isNearPageLeft = Math.abs(x - scrollContainerPos.left) <= scrollThreshold;
          var isNearPageRight = Math.abs(x - scrollContainerPos.right) <= scrollThreshold;
          var isNearPageTop = Math.abs(y - scrollContainerPos.top) <= scrollThreshold;
          var isNearPageBottom = Math.abs(y - scrollContainerPos.bottom) <= scrollThreshold;

          var shouldScrollGlobally =
            isNearPageBottom || isNearPageTop || isNearPageLeft || isNearPageRight;
          var canScrollGlobally = this.getCanScrollDirection(
            isNearPageBottom
              ? 'down'
              : isNearPageTop
              ? 'up'
              : isNearPageLeft
              ? 'left'
              : isNearPageRight
              ? 'right'
              : ''
          );
          // BEGIN GLOBAL SCROLLING //
          if (shouldScrollGlobally && canScrollGlobally) {
            if (this.outerScrollBar) {
              if (isNearPageRight) {
                // Scroll right
                this.setState({
                  globalScroll: true,
                  globalScrollXDirection: 'right',
                });
              } else if (isNearPageLeft) {
                // Scroll left
                this.setState({
                  globalScroll: true,
                  globalScrollXDirection: 'left',
                });
              } else {
                this.setState({
                  globalScrollXDirection: null,
                });
              }
              if (isNearPageBottom) {
                this.setState({
                  globalScroll: true,
                  globalScrollYDirection: 'down',
                });
                // can only scroll down if the current scroll is less than height
              } else if (isNearPageTop) {
                this.setState({
                  globalScroll: true,
                  globalScrollYDirection: 'up',
                });
                // can only scroll up if current scroll is larger than 0
              } else {
                this.setState({ globalScrollYDirection: null });
              }
              if (!this.frame) {
                this.frame = requestAnimationFrame(function () {
                  return _this2.autoScroll(x, y);
                });
              }
            }
            // END GLOBAL SCROLLING //
          } else if (droppable) {
            // Clear global scroll
            this.setState({ globalScroll: null });
            var containerBoundaries = {
              left: droppable.getBoundingClientRect().left,
              right: droppable.getBoundingClientRect().right,
              top: droppable.getBoundingClientRect().top,
              bottom: droppable.getBoundingClientRect().bottom,
            };

            var isNearYBottom = containerBoundaries.bottom - y <= scrollThreshold;
            var isNearYTop = y - containerBoundaries.top <= scrollThreshold;

            if (isNearYBottom) {
              //Scroll down the page, increase y values
              this.setState({
                shouldScrollY: true,
                increaseYScroll: true,
              });
            } else if (isNearYTop) {
              //Scroll up
              this.setState({ shouldScrollY: true, increaseYScroll: false });
            } else {
              this.setState({ shouldScrollY: false });
            }
            if (!this.frame) {
              this.frame = requestAnimationFrame(function () {
                return _this2.autoScroll(x, y);
              });
            }
          }
        } else {
          this.frame = null;
          this.clearScrolling();
        }
      },
    },
    {
      key: 'clearScrolling',
      value: function clearScrolling() {
        var mutationObject = {};
        if (this.state.globalScroll) {
          mutationObject.globalScroll = false;
        }
        this.setState({ mutationObject: mutationObject });
      },
    },
    {
      key: 'onDragMove',
      value: function onDragMove(draggable, droppable, draggableHoveredOverId, x, y, sectionId) {
        if (draggable && droppable) {
          var shouldUpdateDraggable =
            this.state.draggedElem != null
              ? this.state.draggedElem.id !== draggable.id
              : draggable != null;
          var shouldUpdateDroppable =
            this.state.droppableActive != null
              ? this.state.droppableActive !== droppable
              : droppable != null;
          var shouldUpdatePlaceholder =
            this.state.placeholder != null
              ? this.state.placeholder !== draggableHoveredOverId
              : draggableHoveredOverId != null;
          var shouldUpdateSectionId =
            this.state.targetSection != null
              ? this.state.targetSection !== sectionId
              : sectionId != null;
          var mutationObject = {};
          var shouldUpdate = false;
          // Update if field is currently not set, and it is in nextstate, or if the two IDs differ.
          if (shouldUpdateDraggable) {
            mutationObject.draggedElem = draggable;
            shouldUpdate = true;
          }
          if (shouldUpdateDroppable) {
            mutationObject.droppableActive = droppable.getAttribute('droppableid');
            shouldUpdate = true;
          }
          if (shouldUpdatePlaceholder) {
            mutationObject.placeholder = draggableHoveredOverId;
            shouldUpdate = true;
          }
          if (shouldUpdateSectionId) {
            mutationObject.targetSection = sectionId;
            shouldUpdate = true;
          }
          if (shouldUpdate) {
            this.setState(mutationObject);
          }
        }
        // Register move no matter what (even if draggable/droppably wasnt updated here)
        this.onMoveScroll(x, y, droppable);
      },
    },
    {
      key: 'resetPlaceholderIndex',
      value: function resetPlaceholderIndex() {
        if (this.state.placeholder != null || this.state.droppableActive != null) {
          this.setState({ placeholder: null, droppableActive: null });
        }
      },
    },
    {
      key: 'sideScroll',
      value: function sideScroll(val) {
        if (this.outerScrollBar) {
          this.outerScrollBar.scrollLeft(val);
        }
      },
    },
    {
      key: 'getSideScroll',
      value: function getSideScroll() {
        if (this.outerScrollBar) {
          return this.outerScrollBar.getScrollLeft();
        }
      },
    },
    {
      key: 'autoScroll',
      value: function autoScroll(x, y) {
        var _this3 = this;

        if (this.state.dragActive && this.state.draggedElem) {
          if (
            this.state.globalScroll &&
            (this.state.globalScrollXDirection || this.state.globalScrollYDirection) &&
            this.outerScrollBar
          ) {
            switch (this.state.globalScrollYDirection) {
              case 'down':
                if (this.outerScrollBar.getScrollTop() < this.outerScrollBar.getScrollHeight()) {
                  this.outerScrollBar.scrollTop(
                    this.outerScrollBar.getScrollTop() +
                      (this.props.scrollYSpeed ? this.props.scrollYSpeed : 10)
                  );
                }
                break;
              case 'up':
                if (this.outerScrollBar.getScrollTop() > 0) {
                  this.outerScrollBar.scrollTop(
                    this.outerScrollBar.getScrollTop() -
                      (this.props.scrollYSpeed ? this.props.scrollYSpeed : 10)
                  );
                }
                break;
              default:
                break;
            }
            switch (this.state.globalScrollXDirection) {
              case 'right':
                if (this.outerScrollBar.getScrollLeft() < this.outerScrollBar.getScrollWidth()) {
                  this.outerScrollBar.scrollLeft(
                    this.outerScrollBar.getScrollLeft() +
                      (this.props.scrollXSpeed ? this.props.scrollXSpeed : 10)
                  );
                }
                break;
              case 'left':
                if (this.outerScrollBar.getScrollLeft() > 0) {
                  this.outerScrollBar.scrollLeft(
                    this.outerScrollBar.getScrollLeft() -
                      (this.props.scrollXSpeed ? this.props.scrollXSpeed : 10)
                  );
                }
                break;
              default:
                break;
            }
            requestAnimationFrame(function () {
              return _this3.autoScroll(x, y);
            });
          } else if (this.state.droppableActive && this.state.shouldScrollY) {
            if (this.state.increaseYScroll) {
              event_manager_4(
                this.state.dragAndDropGroup.scrollEvent,
                this.state.droppableActive,
                15
              );
            } else {
              event_manager_4(
                this.state.dragAndDropGroup.scrollEvent,
                this.state.droppableActive,
                -15
              );
            }
            requestAnimationFrame(function () {
              return _this3.autoScroll(x, y);
            });
          } else {
            this.frame = null;
            return;
          }
        } else {
          this.frame = null;
          return;
        }
      },
    },
    {
      key: 'handleScroll',
      value: function handleScroll(e) {
        if (this.props.onScroll) {
          var scrollOffsetY = this.outerScrollBar ? this.outerScrollBar.getScrollTop() : 0;
          var scrollOffsetX = this.outerScrollBar ? this.outerScrollBar.getScrollLeft() : 0;
          this.props.onScroll({ scrollX: scrollOffsetX, scrollY: scrollOffsetY });
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this4 = this;

        return this.props.outerScrollBar
          ? React__default.createElement(
              'div',
              {
                ref: function ref(div) {
                  return (_this4.container = div);
                },
                className: 'drag-drop-context',
                style: { display: 'flex', flexDirection: 'column' },
              },
              React__default.createElement(
                lib_1,
                _extends(
                  {
                    onScroll: this.handleScroll.bind(this),
                    ref: function ref(scrollDiv) {
                      return (_this4.outerScrollBar = scrollDiv);
                    },
                    autoHeight: true,
                    autoHeightMin:
                      this.props.scrollContainerMinHeight != null
                        ? this.props.scrollContainerMinHeight
                        : 1,
                    autoHeightMax: this.props.scrollContainerHeight,
                  },
                  this.props.scrollProps
                ),
                this.props.children
              )
            )
          : React__default.createElement(
              'div',
              {
                ref: function ref(div) {
                  return (_this4.container = div);
                },
                className: 'drag-drop-context',
              },
              this.props.children
            );
      },
    },
  ]);
  return DragDropContext;
})(React.Component);

var DragScrollBar = (function (_Component) {
  inherits(DragScrollBar, _Component);

  function DragScrollBar(props) {
    classCallCheck(this, DragScrollBar);

    var _this = possibleConstructorReturn(
      this,
      (DragScrollBar.__proto__ || Object.getPrototypeOf(DragScrollBar)).call(this, props)
    );

    _this.state = {
      placeholder: null,
      dragStarted: false,
      dragActive: false,
      draggedElem: null,
      droppableActive: null,
      targetSection: null,
      dragAndDropGroup: Util.getDragEvents(_this.props.dragAndDropGroup),
    };
    _this.onDragMove = _this.onDragMove.bind(_this);
    _this.onDragStart = _this.onDragStart.bind(_this);
    _this.onDragEnd = _this.onDragEnd.bind(_this);
    return _this;
  }

  createClass(DragScrollBar, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        event_manager_2(this.state.dragAndDropGroup.startEvent, this.onDragStart);
        event_manager_2(this.state.dragAndDropGroup.endEvent, this.onDragEnd);
        event_manager_2(this.state.dragAndDropGroup.moveEvent, this.onDragMove);
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        event_manager_3(this.state.dragAndDropGroup.startEvent, this.onDragStart);
        event_manager_3(this.state.dragAndDropGroup.endEvent, this.onDragEnd);
        event_manager_3(this.state.dragAndDropGroup.moveEvent, this.onDragMove);
      },
    },
    {
      key: 'onDragEnd',
      value: function onDragEnd() {
        // Todo, performance
        this.setState({
          draggedElem: null,
          dragActive: false,
          droppableActive: null,
          dragStarted: false,
          globalScroll: null,
          globalScrollXDirection: null,
          globalScrollYDirection: null,
        });
      },
    },
    {
      key: 'onDragStart',
      value: function onDragStart(draggable, x, y) {
        if (!this.state.dragActive) {
          this.setState({ dragActive: true, draggedElem: draggable });
        }
        if (this.props.onDragStart) {
          this.props.onDragStart(draggable, x, y);
        }
      },

      // Check if global scroll is at appropriate edge already
    },
    {
      key: 'getCanScrollDirection',
      value: function getCanScrollDirection(dir) {
        if (!this.outerScrollBar) {
          return false;
        }
        var containerHeight = this.container
          ? this.container.clientHeight
          : this.props.maxHeight
          ? this.props.maxHeight
          : window.innerHeight;
        var scrollHeight = this.outerScrollBar.getScrollHeight();
        switch (dir) {
          case 'down':
            return (
              scrollHeight > this.props.maxHeight &&
              this.outerScrollBar.getScrollTop() < scrollHeight - containerHeight
            );
          case 'up':
            return scrollHeight > this.props.maxHeight && this.outerScrollBar.getScrollTop() > 0;
          case 'left':
            return this.outerScrollBar.getScrollLeft() > 0;
          case 'right':
            return (
              this.outerScrollBar.getScrollLeft() <
              this.outerScrollBar.getScrollWidth() - window.innerWidth
            );
        }
      },

      // When a card is moved, check for autoScroll
    },
    {
      key: 'onMoveScroll',
      value: function onMoveScroll(x, y, droppable) {
        var _this2 = this;

        //var h = this.container.getBoundingClientRect().bottom - this.container.getBoundingClientRect().top;
        // Scroll when within 60px of edge
        var shouldScroll = this.state.dragActive && this.state.draggedElem;
        if (shouldScroll) {
          var scrollThreshold = this.props.autoScrollThreshold || 60;
          var scrollContainerPos = this.container.getBoundingClientRect();

          var isNearPageLeft = Math.abs(x - scrollContainerPos.left) <= scrollThreshold;
          var isNearPageRight = Math.abs(x - scrollContainerPos.right) <= scrollThreshold;
          var isNearPageTop = Math.abs(y - scrollContainerPos.top) <= scrollThreshold;
          var isNearPageBottom = Math.abs(y - scrollContainerPos.bottom) <= scrollThreshold;

          var shouldScrollGlobally =
            isNearPageBottom || isNearPageTop || isNearPageLeft || isNearPageRight;
          var canScrollGlobally = this.getCanScrollDirection(
            isNearPageBottom
              ? 'down'
              : isNearPageTop
              ? 'up'
              : isNearPageLeft
              ? 'left'
              : isNearPageRight
              ? 'right'
              : ''
          );
          // BEGIN GLOBAL SCROLLING //
          if (shouldScrollGlobally && canScrollGlobally) {
            if (this.outerScrollBar) {
              if (isNearPageRight) {
                // Scroll right
                this.setState({
                  globalScroll: true,
                  globalScrollXDirection: 'right',
                });
              } else if (isNearPageLeft) {
                // Scroll left
                this.setState({
                  globalScroll: true,
                  globalScrollXDirection: 'left',
                });
              } else {
                this.setState({
                  globalScrollXDirection: null,
                });
              }
              if (isNearPageBottom) {
                this.setState({
                  globalScroll: true,
                  globalScrollYDirection: 'down',
                });
                // can only scroll down if the current scroll is less than height
              } else if (isNearPageTop) {
                this.setState({
                  globalScroll: true,
                  globalScrollYDirection: 'up',
                });
                // can only scroll up if current scroll is larger than 0
              } else {
                this.setState({ globalScrollYDirection: null });
              }
              if (!this.frame && shouldScroll) {
                this.frame = requestAnimationFrame(function () {
                  return _this2.autoScroll(x, y);
                });
              }
            }
            // END GLOBAL SCROLLING //
          } else if (droppable) {
            // Clear global scroll
            this.setState({ globalScroll: null });
            var containerBoundaries = {
              left: droppable.getBoundingClientRect().left,
              right: droppable.getBoundingClientRect().right,
              top: droppable.getBoundingClientRect().top,
              bottom: droppable.getBoundingClientRect().bottom,
            };

            var isNearYBottom = containerBoundaries.bottom - y <= scrollThreshold;
            var isNearYTop = y - containerBoundaries.top <= scrollThreshold;

            if (isNearYBottom) {
              //Scroll down the page, increase y values
              this.setState({
                shouldScrollY: true,
                increaseYScroll: true,
              });
            } else if (isNearYTop) {
              //Scroll up
              this.setState({ shouldScrollY: true, increaseYScroll: false });
            } else {
              this.setState({ shouldScrollY: false });
            }
            if (!this.frame && shouldScroll) {
              this.frame = requestAnimationFrame(function () {
                return _this2.autoScroll(x, y);
              });
            }
          }
        } else {
          this.frame = null;
          if (this.state.globalScroll) {
            this.setState({ globalScroll: false });
          }
        }
      },
    },
    {
      key: 'onDragMove',
      value: function onDragMove(draggable, droppable, draggableHoveredOverId, x, y, sectionId) {
        if (draggable && droppable) {
          var shouldUpdateDraggable =
            this.state.draggedElem != null
              ? this.state.draggedElem.id !== draggable.id
              : draggable != null;
          var shouldUpdateDroppable =
            this.state.droppableActive != null
              ? this.state.droppableActive !== droppable
              : droppable != null;
          var shouldUpdatePlaceholder =
            this.state.placeholder != null
              ? this.state.placeholder !== draggableHoveredOverId
              : draggableHoveredOverId != null;
          var shouldUpdateSectionId =
            this.state.targetSection != null
              ? this.state.targetSection !== sectionId
              : sectionId != null;
          var mutationObject = {};
          var shouldUpdate = false;
          // Update if field is currently not set, and it is in nextstate, or if the two IDs differ.
          if (shouldUpdateDraggable) {
            mutationObject.draggedElem = draggable;
            shouldUpdate = true;
          }
          if (shouldUpdateDroppable) {
            mutationObject.droppableActive = droppable.getAttribute('droppableid');
            shouldUpdate = true;
          }
          if (shouldUpdatePlaceholder) {
            mutationObject.placeholder = draggableHoveredOverId;
            shouldUpdate = true;
          }
          if (shouldUpdateSectionId) {
            mutationObject.targetSection = sectionId;
            shouldUpdate = true;
          }
          if (shouldUpdate) {
            this.setState(mutationObject);
          }
        }
        // Register move no matter what (even if draggable/droppably wasnt updated here)
        this.onMoveScroll(x, y, droppable);
      },
    },
    {
      key: 'sideScroll',
      value: function sideScroll(val) {
        if (this.outerScrollBar) {
          this.outerScrollBar.scrollLeft(val);
        }
      },
    },
    {
      key: 'getSideScroll',
      value: function getSideScroll() {
        if (this.outerScrollBar) {
          return this.outerScrollBar.getScrollLeft();
        }
      },
    },
    {
      key: 'autoScroll',
      value: function autoScroll(x, y) {
        var _this3 = this;

        var shouldScroll = this.state.dragActive && this.state.draggedElem;
        if (shouldScroll) {
          if (
            this.state.globalScroll &&
            (this.state.globalScrollXDirection || this.state.globalScrollYDirection) &&
            this.outerScrollBar
          ) {
            switch (this.state.globalScrollYDirection) {
              case 'down':
                if (this.outerScrollBar.getScrollTop() < this.outerScrollBar.getScrollHeight()) {
                  this.outerScrollBar.scrollTop(
                    this.outerScrollBar.getScrollTop() +
                      (this.props.scrollYSpeed ? this.props.scrollYSpeed : 10)
                  );
                }
                break;
              case 'up':
                if (this.outerScrollBar.getScrollTop() > 0) {
                  this.outerScrollBar.scrollTop(
                    this.outerScrollBar.getScrollTop() -
                      (this.props.scrollYSpeed ? this.props.scrollYSpeed : 10)
                  );
                }
                break;
              default:
                break;
            }
            switch (this.state.globalScrollXDirection) {
              case 'right':
                if (this.outerScrollBar.getScrollLeft() < this.outerScrollBar.getScrollWidth()) {
                  this.outerScrollBar.scrollLeft(
                    this.outerScrollBar.getScrollLeft() +
                      (this.props.scrollXSpeed ? this.props.scrollXSpeed : 10)
                  );
                }
                break;
              case 'left':
                if (this.outerScrollBar.getScrollLeft() > 0) {
                  this.outerScrollBar.scrollLeft(
                    this.outerScrollBar.getScrollLeft() -
                      (this.props.scrollXSpeed ? this.props.scrollXSpeed : 10)
                  );
                }
                break;
              default:
                break;
            }
            if (shouldScroll) {
              requestAnimationFrame(function () {
                return _this3.autoScroll(x, y);
              });
            }
          } else if (this.state.droppableActive && this.state.shouldScrollY) {
            if (this.state.increaseYScroll) {
              event_manager_4(
                this.state.dragAndDropGroup.scrollEvent,
                this.state.droppableActive,
                15
              );
            } else {
              event_manager_4(
                this.state.dragAndDropGroup.scrollEvent,
                this.state.droppableActive,
                -15
              );
            }
            if (shouldScroll) {
              requestAnimationFrame(function () {
                return _this3.autoScroll(x, y);
              });
            }
          } else {
            this.frame = null;
            return;
          }
        } else {
          this.frame = null;
          if (this.state.globalScroll || this.state.shouldScrollY) {
            this.setState({ globalScroll: false, shouldScrollY: false });
          }
          return;
        }
      },
    },
    {
      key: 'getScrollTop',
      value: function getScrollTop() {
        if (this.outerScrollBar) {
          return this.outerScrollBar.getScrollTop();
        }
      },
    },
    {
      key: 'scrollTop',
      value: function scrollTop(val) {
        if (this.outerScrollBar) {
          this.outerScrollBar.scrollTop(val);
        }
      },
    },
    {
      key: 'getScrollHeight',
      value: function getScrollHeight() {
        if (this.outerScrollBar) {
          return this.outerScrollBar.getScrollHeight();
        }
      },
    },
    {
      key: 'handleScroll',
      value: function handleScroll(e) {
        var scrollOffsetY = this.outerScrollBar ? this.outerScrollBar.getScrollTop() : 0;
        var scrollOffsetX = this.outerScrollBar ? this.outerScrollBar.getScrollLeft() : 0;
        if (this.props.onScroll) {
          this.props.onScroll({ scrollX: scrollOffsetX, scrollY: scrollOffsetY });
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this4 = this;

        var _props = this.props,
          customScrollbars = _props.customScrollbars,
          children = _props.children;

        var UseScrollbars = customScrollbars || lib_1;
        return React__default.createElement(
          'div',
          {
            ref: function ref(div) {
              return (_this4.container = div);
            },
            className: 'drag-drop-context',
            style: { display: 'flex', flexDirection: 'column' },
          },
          React__default.createElement(
            UseScrollbars,
            _extends(
              {
                onScroll: this.handleScroll.bind(this),
                ref: function ref(scrollDiv) {
                  return (_this4.outerScrollBar = scrollDiv);
                },
                autoHeight: true,
                autoHeightMin: this.props.minHeight != null ? this.props.minHeight : 1,
                autoHeightMax:
                  this.props.maxHeight != null ? this.props.maxHeight : window.innerHeight,
              },
              this.props.scrollProps
            ),
            children
          )
        );
      },
    },
  ]);
  return DragScrollBar;
})(React.Component);

DragScrollBar.propTypes = {
  dragAndDropGroup: PropTypes.string.isRequired,
  onScroll: PropTypes.func,
  autoScrollThreshold: PropTypes.number,
  tagName: PropTypes.string,
};

var ExampleBoard = (function (_Component) {
  inherits(ExampleBoard, _Component);

  function ExampleBoard(props) {
    classCallCheck(this, ExampleBoard);

    var _this = possibleConstructorReturn(
      this,
      (ExampleBoard.__proto__ || Object.getPrototypeOf(ExampleBoard)).call(this, props)
    );

    _this.state = {
      listData: [],
      numItems: 100,
      numColumns: 6,
    };
    _this.dragAndDropGroupName = 'exampleboard';
    _this.droppables = [];
    return _this;
  }

  createClass(ExampleBoard, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.getListData();
      },
    },
    {
      key: 'getListData',
      value: function getListData() {
        var numLists = this.state.numColumns;
        var newItemLists = [];
        for (var i = 0; i < numLists; i++) {
          newItemLists.push(this.generateTestList(i, this.state.numItems));
        }
        this.setState({ listData: newItemLists });
      },
    },
    {
      key: 'generateTestList',
      value: function generateTestList(num, numItems) {
        var entry = { name: 'droppable' + num + 'Items', items: [], index: num };
        for (var i = 0; i < numItems; i++) {
          entry.items.push({ id: num + '-' + i, name: 'Item ' + num + '-' + i });
        }
        return entry;
      },
    },
    {
      key: 'getElemsToRender',
      value: function getElemsToRender(list) {
        var _this2 = this;

        var dataToRender = [];

        list.forEach(function (entry, index) {
          var list = [];
          entry.items.forEach(function (item) {
            list.push(
              React__default.createElement(
                Draggable,
                {
                  dragAndDropGroup: _this2.dragAndDropGroupName,
                  draggableId: item.id,
                  dragDisabled: false,
                  key: item.id,
                },
                React__default.createElement(
                  'div',
                  {
                    onClick: function onClick() {
                      return alert('A click is not a drag');
                    },
                    className: 'draggable-test',
                    style: {
                      border: 'solid 1px black',
                      height: '48px',
                      backgroundColor: 'white',
                      flexGrow: 1,
                    },
                  },
                  React__default.createElement(
                    'p',
                    { style: { marginLeft: '5px' }, className: 'item-name' },
                    item.name
                  )
                )
              )
            );
          });
          dataToRender.push({ droppableId: 'droppable' + index, items: list });
        });
        return dataToRender;
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        if (
          prevState.numItems !== this.state.numItems ||
          prevState.numColumns !== this.state.numColumns
        ) {
          this.getListData();
        }
      },
    },
    {
      key: 'handleInputChange',
      value: function handleInputChange(e) {
        if (Number(e.target.value) > 5000) {
          alert('Please, calm down.');
          return;
        }
        if (e.target.value !== this.state.numItems && e.target.value) {
          this.setState({ numItems: Number(e.target.value) });
        }
      },
    },
    {
      key: 'handleColumnInputChange',
      value: function handleColumnInputChange(e) {
        if (Number(e.target.value) > 100) {
          alert('Please, calm down.');
          return;
        }
        if (e.target.value !== this.state.numColumns && e.target.value) {
          this.setState({ numColumns: Number(e.target.value) });
        }
      },
    },
    {
      key: 'scroll',
      value: function scroll(ref) {
        if (ref) {
          ref.animateScrollTop(ref.getScrollTop() + 200);
        }
      },
    },
    {
      key: 'sideScroll',
      value: function sideScroll(val) {
        this.dragDropContext.sideScroll(this.dragDropContext.getSideScroll() + val);
      },
    },
    {
      key: 'onDragEnd',
      value: function onDragEnd(source, destinationId, placeholderId) {
        var listToRemoveFrom = this.state.listData.find(function (list) {
          return list.name.includes(source.droppableId);
        });
        var listToAddTo = this.state.listData.find(function (list) {
          return list.name.includes(destinationId);
        });
        var elemToAdd = listToRemoveFrom.items.find(function (entry) {
          return entry.id === source.draggableId;
        });
        var indexToRemove = listToRemoveFrom.items.findIndex(function (item) {
          return item.id === source.draggableId;
        });
        var indexToInsert =
          placeholderId === 'END_OF_LIST'
            ? listToAddTo.items.length
            : placeholderId.includes('header')
            ? 0
            : listToAddTo.items.findIndex(function (item) {
                return item.id === placeholderId;
              });
        // Re-arrange within the same list
        if (listToRemoveFrom.name === listToAddTo.name) {
          if (indexToRemove === indexToInsert) {
            return;
          }
          // If we're moving an element below the insertion point, indexes will change.
          var direction = indexToRemove < indexToInsert ? 1 : 0;
          listToRemoveFrom.items.splice(indexToRemove, 1);
          listToAddTo.items.splice(indexToInsert - direction, 0, elemToAdd);
        } else {
          listToRemoveFrom.items.splice(indexToRemove, 1);
          listToAddTo.items.splice(indexToInsert, 0, elemToAdd);
        }

        var newData = this.state.listData;
        newData[listToRemoveFrom.index] = listToRemoveFrom;
        newData[listToAddTo.index] = listToAddTo;
        this.setState({ testData: newData });
      },
    },
    {
      key: 'toggleSplit',
      value: function toggleSplit() {
        this.setState(function (prevState) {
          return { split: !prevState.split };
        });
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var elemsToRender = this.getElemsToRender(this.state.listData);
        var getListHeader = function getListHeader(index) {
          return React__default.createElement(
            'div',
            { className: 'list-header', style: { height: 60 } },
            React__default.createElement('div', { className: 'list-header-text' }, 'List ', index),
            React__default.createElement(
              'button',
              {
                className: 'scroll-button',
                onClick: function onClick() {
                  return _this3.scroll(_this3.droppables[index]);
                },
              },
              'Scroll'
            )
          );
        };

        return React__default.createElement(
          'div',
          { className: 'example-board' },
          React__default.createElement(
            DragDropContext,
            {
              ref: function ref(div) {
                return (_this3.dragDropContext = div);
              },
              // 10px margin around page
              scrollContainerHeight: window.innerHeight - 10,
              dragAndDropGroup: this.dragAndDropGroupName,
              onDragEnd: this.onDragEnd.bind(this),
              outerScrollBar: true,
            },
            React__default.createElement(
              'div',
              { className: 'title-and-controls' },
              React__default.createElement(
                'div',
                { className: 'title' },
                React__default.createElement('h1', null, 'Example Board')
              ),
              React__default.createElement(
                'div',
                { className: 'controls' },
                React__default.createElement('div', {
                  title: 'Sidescroll Backwards',
                  className: 'backwards',
                  onClick: this.sideScroll.bind(this, -50),
                }),
                React__default.createElement('div', {
                  itle: 'Sidescroll Forwards',
                  className: 'forwards',
                  onClick: this.sideScroll.bind(this, 50),
                })
              ),
              React__default.createElement(
                'div',
                { className: 'row-splitter' },
                React__default.createElement(
                  'button',
                  {
                    className:
                      'row-split-button first-button' + (!this.state.split ? ' active' : ''),
                    onClick: this.toggleSplit.bind(this),
                  },
                  'Single Row'
                ),
                React__default.createElement(
                  'button',
                  {
                    className:
                      'row-split-button second-button' + (this.state.split ? ' active' : ''),
                    onClick: this.toggleSplit.bind(this),
                  },
                  'Multi Row'
                )
              )
            ),
            React__default.createElement(
              'div',
              { className: 'input-section' },
              React__default.createElement('p', null, 'Items per column'),
              React__default.createElement('input', {
                style: { marginLeft: 20, marginTop: 8, marginBottom: 8, padding: 2 },
                placeholder: 100,
                onKeyDown: function onKeyDown(e) {
                  return e.key === 'Enter' ? _this3.handleInputChange(e) : void 0;
                },
                onBlur: this.handleInputChange.bind(this),
              })
            ),
            React__default.createElement(
              'div',
              { className: 'input-section' },
              React__default.createElement('p', null, 'Number of columns'),
              React__default.createElement('input', {
                style: { marginLeft: 20, marginTop: 8, marginBottom: 8, padding: 2 },
                placeholder: 6,
                onKeyDown: function onKeyDown(e) {
                  return e.key === 'Enter' ? _this3.handleColumnInputChange(e) : void 0;
                },
                onBlur: this.handleColumnInputChange.bind(this),
              })
            ),
            React__default.createElement(
              'div',
              {
                className: 'test-container',
                style: { display: 'flex', flexDirection: 'row', position: 'relative' },
              },
              elemsToRender.map(function (elem, index) {
                return !_this3.state.split || index < elemsToRender.length / 2
                  ? React__default.createElement(
                      'div',
                      {
                        className: 'sizer',
                        style: { flexGrow: 1, minWidth: 350 },
                        key: index + elem.droppableId,
                      },
                      React__default.createElement(
                        Droppable,
                        //enforceContainerMinHeight={true}
                        {
                          activeHeaderClass: 'header-active',
                          listHeader: getListHeader(index),
                          listHeaderHeight: 60,
                          ref: function ref(div) {
                            return _this3.droppables.push(div);
                          },
                          containerHeight: 620,
                          elemHeight: 50,
                          dragAndDropGroup: _this3.dragAndDropGroupName,
                          droppableId: elem.droppableId,
                          key: elem.droppableId,
                        },
                        elem.items
                      )
                    )
                  : null;
              })
            ),
            this.state.split
              ? React__default.createElement(
                  'div',
                  {
                    className: 'test-container',
                    style: { display: 'flex', flexDirection: 'row', position: 'relative' },
                  },
                  elemsToRender.map(function (elem, index) {
                    return index >= elemsToRender.length / 2
                      ? React__default.createElement(
                          'div',
                          {
                            className: 'sizer',
                            style: { flexGrow: 1, minWidth: 350 },
                            key: index + elem.droppableId,
                          },
                          React__default.createElement(
                            Droppable,
                            {
                              activeHeaderClass: 'header-active',
                              listHeader: getListHeader(index),
                              listHeaderHeight: 60,
                              ref: function ref(div) {
                                return _this3.droppables.push(div);
                              },
                              containerHeight: 500,
                              dragAndDropGroup: _this3.dragAndDropGroupName,
                              droppableId: elem.droppableId,
                              key: elem.droppableId,
                            },
                            elem.items
                          )
                        )
                      : null;
                  })
                )
              : null
          )
        );
      },
    },
  ]);
  return ExampleBoard;
})(React.Component);

ExampleBoard.propTypes = {};

var DynamicHeightExample = (function (_Component) {
  inherits(DynamicHeightExample, _Component);

  function DynamicHeightExample(props) {
    classCallCheck(this, DynamicHeightExample);

    var _this = possibleConstructorReturn(
      this,
      (DynamicHeightExample.__proto__ || Object.getPrototypeOf(DynamicHeightExample)).call(
        this,
        props
      )
    );

    _this.state = {
      listData: [],
      numItems: 50,
      numColumns: 6,
      showIndicators: false,
      useSections: false,
      lazyLoad: false,
    };
    _this.dragAndDropGroupName = 'exampleboard';
    _this.droppables = [];
    _this.TEST_ENV = window.location.href.includes('localhost');
    return _this;
  }

  createClass(DynamicHeightExample, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.getListData();
      },
    },
    {
      key: 'addMoreElements',
      value: function addMoreElements(e) {
        if (this.state.lazyLoad && e.scrollHeight - e.scrollTop < e.clientHeight + 1000) {
          this.setState({ numItems: 100 });
        }
      },
    },
    {
      key: 'toggleIndicators',
      value: function toggleIndicators() {
        this.setState(function (prevState) {
          return { showIndicators: !prevState.showIndicators };
        });
      },
    },
    {
      key: 'toggleUseSections',
      value: function toggleUseSections() {
        this.setState(function (prevState) {
          return { useSections: !prevState.useSections };
        });
      },
    },
    {
      key: 'getListData',
      value: function getListData() {
        var numLists = this.state.numColumns;
        var newItemLists = [];
        for (var i = 0; i < numLists; i++) {
          newItemLists.push(this.generateTestList(i, this.state.numItems));
        }
        this.setState({ listData: newItemLists });
      },
    },
    {
      key: 'generateTestList',
      value: function generateTestList(num, numItems) {
        var entry = { name: 'droppable' + num + 'Items', items: [], index: num };
        var randomSize = function randomSize() {
          return 50 + Math.floor(Math.random() * Math.floor(250));
        };
        var pseudoRandomSize = function pseudoRandomSize(i) {
          return (
            50 +
            (((i + 1) * (num + 1)) % 5 === 0
              ? 200
              : ((i + 1) * (num + 1)) % 4 === 0
              ? 150
              : ((i + 1) * (num + 1)) % 3 === 0
              ? 100
              : ((i + 1) * (num + 1)) % 2 === 0
              ? 50
              : 0)
          );
        };
        var sectionId = 0;
        for (var i = 0; i < numItems; i++) {
          if (i % 3 === 0) {
            sectionId = i;
          }
          entry.items.push({
            id: num + '-' + i,
            name: 'Item ' + num + '-' + i,
            height: this.state.lazyLoad ? pseudoRandomSize(i) : randomSize(),
            sectionId: 'Person ' + sectionId / 3,
          });
        }
        return entry;
      },
    },
    {
      key: 'getElemsToRender',
      value: function getElemsToRender(list) {
        var _this2 = this;

        var dataToRender = [];
        var seenSections = [];
        list.forEach(function (entry, index) {
          var list = [];
          entry.items.forEach(function (item, idx) {
            if (
              _this2.state.useSections &&
              !seenSections.includes(entry.index + '-' + item.sectionId)
            ) {
              list.push(
                React__default.createElement(
                  Draggable,
                  {
                    sectionId: item.sectionId,
                    ignorePlaceHolder: index === 0,
                    draggableId: item.sectionId,
                    dragAndDropGroup: _this2.dragAndDropGroupName,
                    isSectionHeader: true,
                    disableMove: idx === 0,
                    key: item.sectionId + '#' + item.id,
                  },
                  React__default.createElement(
                    'div',
                    {
                      className: 'draggable-test section',
                      style: {
                        height: 50,
                        outline: 'none',
                        backgroundColor: '#dbdbdb',
                        flexGrow: 1,
                      },
                    },
                    React__default.createElement(
                      'div',
                      {
                        style: { marginLeft: '5px', paddingTop: '8px' },
                        className: 'item-name row',
                      },
                      React__default.createElement('div', { className: 'person-image' }),
                      item.sectionId
                    )
                  )
                )
              );
              seenSections.push(entry.index + '-' + item.sectionId);
            }
            list.push(
              React__default.createElement(
                Draggable,
                {
                  sectionId: item.sectionId,
                  dragAndDropGroup: _this2.dragAndDropGroupName,
                  draggableId: item.id,
                  dragDisabled: false,
                  key: item.id,
                },
                React__default.createElement(
                  'div',
                  {
                    onClick: function onClick() {
                      return alert('A click is not a drag');
                    },
                    className:
                      'draggable-test' +
                      (_this2.state.recentlyMovedItem === item.id ? ' dropGlow' : ''),
                    style: {
                      border: 'solid 1px black',
                      height: item.height,
                      backgroundColor: 'white',
                      flexGrow: 1,
                      marginBottom: '2.5px',
                      marginTop: '2.5px',
                    },
                  },
                  React__default.createElement(
                    'p',
                    { style: { marginLeft: '5px' }, className: 'item-name' },
                    item.name
                  )
                )
              )
            );
          });
          dataToRender.push({ droppableId: 'droppable' + index, items: list });
        });
        return dataToRender;
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        if (
          prevState.numItems !== this.state.numItems ||
          prevState.numColumns !== this.state.numColumns ||
          prevState.lazyLoad !== this.state.lazyLoad
        ) {
          this.getListData();
        }
      },
    },
    {
      key: 'handleInputChange',
      value: function handleInputChange(e) {
        if (Number(e.target.value) > 5000) {
          alert('Please, calm down.');
          return;
        }
        this.setState({ numItems: Number(e.target.value) });
      },
    },
    {
      key: 'handleColumnInputChange',
      value: function handleColumnInputChange(e) {
        if (Number(e.target.value) > 100) {
          alert('Please, calm down.');
          return;
        }
        this.setState({ numColumns: Number(e.target.value) });
      },
    },
    {
      key: 'handleLazyLoadChange',
      value: function handleLazyLoadChange(e) {
        this.setState({ lazyLoad: !this.state.lazyLoad });
      },
    },
    {
      key: 'scroll',
      value: function scroll(ref) {
        if (ref) {
          ref.animateScrollTop(ref.getScrollTop() + 200);
        }
      },
    },
    {
      key: 'sideScroll',
      value: function sideScroll(val) {
        this.dragDropContext.sideScroll(this.dragDropContext.getSideScroll() + val);
      },
    },
    {
      key: 'onDragCancel',
      value: function onDragCancel() {
        this.setState({ recentlyMovedItem: null });
      },
    },
    {
      key: 'onDragEnd',
      value: function onDragEnd(source, destinationId, placeholderId, sectionId) {
        var listToRemoveFrom = this.state.listData.find(function (list) {
          return list.name.includes(source.droppableId);
        });
        var listToAddTo = this.state.listData.find(function (list) {
          return list.name.includes(destinationId);
        });
        var elemToAdd = listToRemoveFrom.items.find(function (entry) {
          return entry.id === source.draggableId;
        });
        var indexToRemove = listToRemoveFrom.items.findIndex(function (item) {
          return item.id === source.draggableId;
        });
        var indexToInsert =
          placeholderId != null
            ? placeholderId === 'END_OF_LIST'
              ? listToAddTo.items.length
              : placeholderId.includes('header')
              ? 0
              : listToAddTo.items.findIndex(function (item) {
                  return item.id === placeholderId;
                })
            : sectionId != null
            ? listToAddTo.items.findIndex(function (item) {
                return item.sectionId === sectionId;
              }) // Add at the first occurence of the section when dropping on top of a section
            : -1;
        var targetElem = listToAddTo.items[indexToInsert - 1];
        var isSameSection =
          targetElem &&
          targetElem.sectionId &&
          source.sectionId &&
          targetElem.sectionId === source.sectionId;
        //indexToInsert += 1; // move into next section //TODO NOPE

        // Re-arrange within the same list
        if (listToRemoveFrom.name === listToAddTo.name) {
          if (indexToRemove === indexToInsert) {
            return;
          }
          // If we're moving an element below the insertion point, indexes will change.
          var direction = indexToRemove < indexToInsert ? 1 : 0;
          listToRemoveFrom.items.splice(indexToRemove, 1);
          listToAddTo.items.splice(indexToInsert - direction, 0, elemToAdd);
        } else {
          listToRemoveFrom.items.splice(indexToRemove, 1);
          listToAddTo.items.splice(indexToInsert, 0, elemToAdd);
        }

        var newData = this.state.listData;
        newData[listToRemoveFrom.index] = listToRemoveFrom;
        newData[listToAddTo.index] = listToAddTo;
        this.setState({ testData: newData, recentlyMovedItem: source.draggableId });
      },
    },
    {
      key: 'toggleSplit',
      value: function toggleSplit() {
        this.setState(function (prevState) {
          return { split: !prevState.split };
        });
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var elemsToRender = this.getElemsToRender(this.state.listData);
        var getListHeader = function getListHeader(index) {
          return React__default.createElement(
            'div',
            { className: 'list-header', style: { height: 60 } },
            React__default.createElement('div', { className: 'list-header-text' }, 'List ', index),
            React__default.createElement(
              'button',
              {
                className: 'scroll-button',
                onClick: function onClick() {
                  return _this3.scroll(_this3.droppables[index]);
                },
              },
              'Scroll'
            )
          );
        };

        var scrollProps = {
          autoHide: true,
          hideTracksWhenNotNeeded: true,
        };

        return React__default.createElement(
          'div',
          { className: 'example-board' },
          React__default.createElement(
            DragDropContext,
            {
              ref: function ref(div) {
                return (_this3.dragDropContext = div);
              },
              // 10px margin around page
              scrollContainerHeight: window.innerHeight - 10,
              dragAndDropGroup: this.dragAndDropGroupName,
              onDragEnd: this.onDragEnd.bind(this),
              onDragCancel: this.onDragCancel.bind(this),
              outerScrollBar: true,
            },
            React__default.createElement(
              'div',
              { className: 'title-and-controls' },
              React__default.createElement(
                'div',
                { className: 'title' },
                React__default.createElement('h1', null, 'Dynamic Height Example')
              ),
              React__default.createElement(
                'div',
                { className: 'controls' },
                React__default.createElement('div', {
                  title: 'Sidescroll Backwards',
                  className: 'backwards',
                  onClick: this.sideScroll.bind(this, -50),
                }),
                React__default.createElement('div', {
                  itle: 'Sidescroll Forwards',
                  className: 'forwards',
                  onClick: this.sideScroll.bind(this, 50),
                })
              ),
              React__default.createElement(
                'div',
                { className: 'row-splitter' },
                React__default.createElement(
                  'button',
                  {
                    className:
                      'row-split-button first-button' + (!this.state.split ? ' active' : ''),
                    onClick: this.toggleSplit.bind(this),
                  },
                  'Single Row'
                ),
                React__default.createElement(
                  'button',
                  {
                    className:
                      'row-split-button second-button' + (this.state.split ? ' active' : ''),
                    onClick: this.toggleSplit.bind(this),
                  },
                  'Multi Row'
                ),
                React__default.createElement(
                  'button',
                  {
                    className: 'indicator-button' + (this.state.showIndicators ? ' active' : ''),
                    onClick: this.toggleIndicators.bind(this),
                  },
                  'Show Virtualization Indicators'
                ),
                this.TEST_ENV
                  ? React__default.createElement(
                      'button',
                      {
                        className: 'indicator-button' + (this.state.useSections ? ' active' : ''),
                        onClick: this.toggleUseSections.bind(this),
                      },
                      'Use Sections'
                    )
                  : null
              )
            ),
            React__default.createElement(
              'div',
              { className: 'input-section' },
              React__default.createElement('p', null, 'Items per column'),
              React__default.createElement('input', {
                style: { marginLeft: 20, marginTop: 8, marginBottom: 8, padding: 2 },
                placeholder: this.state.numItems,
                onKeyDown: function onKeyDown(e) {
                  return e.key === 'Enter' ? _this3.handleInputChange(e) : void 0;
                },
                onBlur: this.handleInputChange.bind(this),
              })
            ),
            React__default.createElement(
              'div',
              { className: 'input-section' },
              React__default.createElement('p', null, 'Number of columns'),
              React__default.createElement('input', {
                style: { marginLeft: 20, marginTop: 8, marginBottom: 8, padding: 2 },
                placeholder: this.state.numColumns,
                onKeyDown: function onKeyDown(e) {
                  return e.key === 'Enter' ? _this3.handleColumnInputChange(e) : void 0;
                },
                onBlur: this.handleColumnInputChange.bind(this),
              })
            ),
            React__default.createElement(
              'div',
              { className: 'input-section' },
              React__default.createElement('div', null, 'Lazy loading example'),
              React__default.createElement('input', {
                type: 'checkbox',
                value: this.state.lazyLoad,
                onClick: this.handleLazyLoadChange.bind(this),
              })
            ),
            React__default.createElement(
              'div',
              {
                className: 'test-container',
                style: { display: 'flex', flexDirection: 'row', position: 'relative' },
              },
              elemsToRender.map(function (elem, index) {
                return !_this3.state.split || index < elemsToRender.length / 2
                  ? React__default.createElement(
                      'div',
                      {
                        className: 'sizer',
                        style: { flexGrow: 1, minWidth: 350 },
                        key: index + elem.droppableId,
                      },
                      React__default.createElement(
                        Droppable,
                        {
                          scrollProps: scrollProps,
                          showIndicators: _this3.state.showIndicators,
                          dynamicElemHeight: true,
                          minElemHeight: 50,
                          activeHeaderClass: 'header-active',
                          listHeader: getListHeader(index),
                          listHeaderHeight: 60,
                          ref: function ref(div) {
                            return _this3.droppables.push(div);
                          },
                          containerHeight: 800,
                          dragAndDropGroup: _this3.dragAndDropGroupName,
                          droppableId: elem.droppableId,
                          key: elem.droppableId,
                          onScroll: _this3.addMoreElements.bind(_this3),
                        },
                        elem.items
                      )
                    )
                  : null;
              })
            ),
            this.state.split
              ? React__default.createElement(
                  'div',
                  {
                    className: 'test-container',
                    style: { display: 'flex', flexDirection: 'row', position: 'relative' },
                  },
                  elemsToRender.map(function (elem, index) {
                    return index >= elemsToRender.length / 2
                      ? React__default.createElement(
                          'div',
                          {
                            className: 'sizer',
                            style: { flexGrow: 1, minWidth: 350 },
                            key: index + elem.droppableId,
                          },
                          React__default.createElement(
                            Droppable,
                            {
                              showIndicators: _this3.state.showIndicators,
                              dynamicElemHeight: true,
                              minElemHeight: 50,
                              activeHeaderClass: 'header-active',
                              listHeader: getListHeader(index),
                              listHeaderHeight: 60,
                              ref: function ref(div) {
                                return _this3.droppables.push(div);
                              },
                              containerHeight: 620,
                              dragAndDropGroup: _this3.dragAndDropGroupName,
                              droppableId: elem.droppableId,
                              key: elem.droppableId,
                            },
                            elem.items
                          )
                        )
                      : null;
                  })
                )
              : null
          )
        );
      },
    },
  ]);
  return DynamicHeightExample;
})(React.Component);

DynamicHeightExample.propTypes = {};

var ExampleMultipleDroppables = (function (_Component) {
  inherits(ExampleMultipleDroppables, _Component);

  function ExampleMultipleDroppables(props) {
    classCallCheck(this, ExampleMultipleDroppables);

    var _this = possibleConstructorReturn(
      this,
      (
        ExampleMultipleDroppables.__proto__ || Object.getPrototypeOf(ExampleMultipleDroppables)
      ).call(this, props)
    );

    _this.state = {
      listData: [],
      numItems: 100,
      numColumns: 6,
    };
    _this.dragAndDropGroupName = 'exampleboard';
    _this.droppables = [];
    return _this;
  }

  createClass(ExampleMultipleDroppables, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.getListData();
      },
    },
    {
      key: 'getListData',
      value: function getListData() {
        var numLists = this.state.numColumns;
        var newItemLists = [];
        for (var i = 0; i < numLists; i++) {
          newItemLists.push(this.generateTestList(i, this.state.numItems));
        }
        this.setState({ listData: newItemLists });
      },
    },
    {
      key: 'generateTestList',
      value: function generateTestList(num, numItems) {
        var entry = { name: 'droppable' + num + 'Items', items: [], index: num };
        for (var i = 0; i < numItems; i++) {
          entry.items.push({ id: num + '-' + i, name: 'Item ' + num + '-' + i });
        }
        return entry;
      },
    },
    {
      key: 'getElemsToRender',
      value: function getElemsToRender(list) {
        var _this2 = this;

        var dataToRender = [];

        list.forEach(function (entry, index) {
          var list = [];
          entry.items.forEach(function (item) {
            list.push(
              React__default.createElement(
                Draggable,
                {
                  dragAndDropGroup: _this2.dragAndDropGroupName,
                  draggableId: item.id,
                  dragDisabled: false,
                  key: item.id,
                },
                React__default.createElement(
                  'div',
                  {
                    onClick: function onClick() {
                      return alert('A click is not a drag');
                    },
                    className: 'draggable-test',
                    style: {
                      border: 'solid 1px black',
                      height: '48px',
                      backgroundColor: 'white',
                      flexGrow: 1,
                    },
                  },
                  React__default.createElement(
                    'p',
                    { style: { marginLeft: '5px' }, className: 'item-name' },
                    item.name
                  )
                )
              )
            );
          });
          dataToRender.push({ droppableId: 'droppable' + index, items: list });
        });
        return dataToRender;
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        if (
          prevState.numItems !== this.state.numItems ||
          prevState.numColumns !== this.state.numColumns
        ) {
          this.getListData();
        }
      },
    },
    {
      key: 'handleInputChange',
      value: function handleInputChange(e) {
        if (Number(e.target.value) > 5000) {
          alert('Please, calm down.');
          return;
        }
        if (e.target.value !== this.state.numItems && e.target.value) {
          this.setState({ numItems: Number(e.target.value) });
        }
      },
    },
    {
      key: 'handleColumnInputChange',
      value: function handleColumnInputChange(e) {
        if (Number(e.target.value) > 100) {
          alert('Please, calm down.');
          return;
        }
        if (e.target.value !== this.state.numColumns && e.target.value) {
          this.setState({ numColumns: Number(e.target.value) });
        }
      },
    },
    {
      key: 'scroll',
      value: function scroll(ref) {
        if (ref) {
          ref.animateScrollTop(ref.getScrollTop() + 200);
        }
      },
    },
    {
      key: 'sideScroll',
      value: function sideScroll(val) {
        this.dragDropContext.sideScroll(this.dragDropContext.getSideScroll() + val);
      },
    },
    {
      key: 'onDragEnd',
      value: function onDragEnd(source, destinationId, placeholderId) {
        var listToRemoveFrom = this.state.listData.find(function (list) {
          return list.name.includes(source.droppableId);
        });
        var listToAddTo = this.state.listData.find(function (list) {
          return list.name.includes(destinationId);
        });
        var elemToAdd = listToRemoveFrom.items.find(function (entry) {
          return entry.id === source.draggableId;
        });
        var indexToRemove = listToRemoveFrom.items.findIndex(function (item) {
          return item.id === source.draggableId;
        });
        var indexToInsert =
          placeholderId === 'END_OF_LIST'
            ? listToAddTo.items.length
            : placeholderId.includes('header')
            ? 0
            : listToAddTo.items.findIndex(function (item) {
                return item.id === placeholderId;
              });
        // Re-arrange within the same list
        if (listToRemoveFrom.name === listToAddTo.name) {
          if (indexToRemove === indexToInsert) {
            return;
          }
          // If we're moving an element below the insertion point, indexes will change.
          var direction = indexToRemove < indexToInsert ? 1 : 0;
          listToRemoveFrom.items.splice(indexToRemove, 1);
          listToAddTo.items.splice(indexToInsert - direction, 0, elemToAdd);
        } else {
          listToRemoveFrom.items.splice(indexToRemove, 1);
          listToAddTo.items.splice(indexToInsert, 0, elemToAdd);
        }

        var newData = this.state.listData;
        newData[listToRemoveFrom.index] = listToRemoveFrom;
        newData[listToAddTo.index] = listToAddTo;
        this.setState({ testData: newData });
      },
    },
    {
      key: 'toggleSplit',
      value: function toggleSplit() {
        this.setState(function (prevState) {
          return { split: !prevState.split };
        });
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var elemsToRender = this.getElemsToRender(this.state.listData);
        var getListHeader = function getListHeader(index) {
          return React__default.createElement(
            'div',
            { className: 'list-header', style: { height: 60 } },
            React__default.createElement('div', { className: 'list-header-text' }, 'List ', index),
            React__default.createElement(
              'button',
              {
                className: 'scroll-button',
                onClick: function onClick() {
                  return _this3.scroll(_this3.droppables[index]);
                },
              },
              'Scroll'
            )
          );
        };

        return React__default.createElement(
          'div',
          { className: 'example-board' },
          React__default.createElement(
            DragDropContext,
            {
              ref: function ref(div) {
                return (_this3.dragDropContext = div);
              },
              // 10px margin around page
              scrollContainerHeight: window.innerHeight - 10,
              dragAndDropGroup: this.dragAndDropGroupName,
              onDragEnd: this.onDragEnd.bind(this),
              outerScrollBar: true,
            },
            React__default.createElement(
              'div',
              { className: 'title-and-controls' },
              React__default.createElement(
                'div',
                { className: 'title' },
                React__default.createElement('h1', null, 'Example Board')
              ),
              React__default.createElement(
                'div',
                { className: 'controls' },
                React__default.createElement('div', {
                  title: 'Sidescroll Backwards',
                  className: 'backwards',
                  onClick: this.sideScroll.bind(this, -50),
                }),
                React__default.createElement('div', {
                  itle: 'Sidescroll Forwards',
                  className: 'forwards',
                  onClick: this.sideScroll.bind(this, 50),
                })
              )
            ),
            React__default.createElement(
              'div',
              { className: 'input-section' },
              React__default.createElement('p', null, 'Items per column'),
              React__default.createElement('input', {
                style: { marginLeft: 20, marginTop: 8, marginBottom: 8, padding: 2 },
                placeholder: 100,
                onKeyDown: function onKeyDown(e) {
                  return e.key === 'Enter' ? _this3.handleInputChange(e) : void 0;
                },
                onBlur: this.handleInputChange.bind(this),
              })
            ),
            React__default.createElement(
              'div',
              { className: 'input-section' },
              React__default.createElement('p', null, 'Number of columns'),
              React__default.createElement('input', {
                style: { marginLeft: 20, marginTop: 8, marginBottom: 8, padding: 2 },
                placeholder: 6,
                onKeyDown: function onKeyDown(e) {
                  return e.key === 'Enter' ? _this3.handleColumnInputChange(e) : void 0;
                },
                onBlur: this.handleColumnInputChange.bind(this),
              })
            ),
            React__default.createElement(
              'h1',
              { className: 'droppable-section-header' },
              'Droppable Group 1'
            ),
            React__default.createElement(
              'div',
              { className: 'test-container col page-margin with-border' },
              React__default.createElement(
                DragScrollBar,
                { maxHeight: 500, dragAndDropGroup: this.dragAndDropGroupName },
                elemsToRender.map(function (elem, index) {
                  return !_this3.state.split || index < elemsToRender.length / 2
                    ? React__default.createElement(
                        'div',
                        {
                          className: 'sizer with-space',
                          style: { flexGrow: 1, minWidth: 350 },
                          key: index + elem.droppableId,
                        },
                        React__default.createElement(
                          Droppable,
                          //enforceContainerMinHeight={true}
                          {
                            activeHeaderClass: 'header-active',
                            listHeader: getListHeader(index),
                            listHeaderHeight: 60,
                            ref: function ref(div) {
                              return _this3.droppables.push(div);
                            },
                            containerHeight: 350,
                            elemHeight: 50,
                            dragAndDropGroup: _this3.dragAndDropGroupName,
                            droppableId: elem.droppableId,
                            key: elem.droppableId,
                          },
                          elem.items
                        )
                      )
                    : null;
                })
              )
            ),
            React__default.createElement(
              'h1',
              { className: 'droppable-section-header top-margin' },
              'Droppable Group 2'
            ),
            React__default.createElement(
              'div',
              { className: 'test-container col page-margin with-border  last' },
              React__default.createElement(
                DragScrollBar,
                { maxHeight: 500, dragAndDropGroup: this.dragAndDropGroupName },
                elemsToRender.map(function (elem, index) {
                  return !_this3.state.split || index < elemsToRender.length / 2
                    ? React__default.createElement(
                        'div',
                        {
                          className: 'sizer with-space',
                          style: { flexGrow: 1, minWidth: 350 },
                          key: index + elem.droppableId,
                        },
                        React__default.createElement(
                          Droppable,
                          //enforceContainerMinHeight={true}
                          {
                            activeHeaderClass: 'header-active',
                            listHeader: getListHeader(index),
                            listHeaderHeight: 60,
                            ref: function ref(div) {
                              return _this3.droppables.push(div);
                            },
                            containerHeight: 350,
                            elemHeight: 50,
                            dragAndDropGroup: _this3.dragAndDropGroupName,
                            droppableId: elem.droppableId,
                            key: elem.droppableId,
                          },
                          elem.items
                        )
                      )
                    : null;
                })
              )
            )
          )
        );
      },
    },
  ]);
  return ExampleMultipleDroppables;
})(React.Component);

ExampleMultipleDroppables.propTypes = {};

exports.Draggable = Draggable;
exports.Droppable = Droppable;
exports.DragDropContext = DragDropContext;
exports.DragScrollBar = DragScrollBar;
exports.VirtualizedScrollBar = VirtualizedScrollBar;
exports.ExampleBoard = ExampleBoard;
exports.DynamicHeightExample = DynamicHeightExample;
exports.ExampleMultipleDroppables = ExampleMultipleDroppables;
//# sourceMappingURL=index.js.map
