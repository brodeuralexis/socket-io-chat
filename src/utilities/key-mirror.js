'use strict';

function defaultTransform(value) {
    return String(value).toLowerCase();
}

module.exports = function keyMirror(object, delimiter, prefix, transform) {
    if (delimiter == null) {
        delimiter = ' ';
    }

    if (prefix == null) {
        prefix = '';
    }

    if (transform == null) {
        transform = defaultTransform;
    }

    let clone = {};

    return Object.keys(object).reduce((mirror, key) => {
        if (object[key] && typeof object[key] === 'object') {
            mirror[key] = keyMirror(object[key], delimiter, prefix + transform(key) + delimiter, transform);
        }
        else if (typeof object[key] === 'string' && object[key] !== '') {
            mirror[key] = object[key];
        }
        else {
            mirror[key] = prefix + transform(key);
        }

        return mirror;
    }, {});
};
