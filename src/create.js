import isNativeFunction from './isNativeFunction';

if (!isNativeFunction(Object.create)) {

  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const REFERENCE_TYPE = {
    'object': !0,
    'function': !0
  };
  // es5 Object.create
  (Object.create = function create(object, props) {
    if (object == null || !REFERENCE_TYPE[typeof object]) {
      throw 'Object prototype may only be an Object or null';
    }
    var proto = { __proto__: object },
      prop, propName;

    if (props) {
      if (REFERENCE_TYPE[typeof props]) {
        for (propName in props) {
          if (hasOwnProperty.call(props, propName)) {
            if ((prop = props[propName]) && REFERENCE_TYPE[typeof prop]) {
              object[propName] = prop.value;
            } else {
              throw 'Property description must be an object: value';
            }
          }
        }
      }
    }
    return proto;
  });

}

var create = Object.create;

export default create;