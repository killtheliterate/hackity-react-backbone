/**
 * @file
 *
 * Predicate functions for determining the existiness and truthiness of values.
 * Borrowed from the book "Functional Javascript", pg.19
 */

/**
 * Meant to define the existence of something. JavaScript * has two values—null
 * and undefined—that signify nonexistence. Thus, existy * checks that its
 * argument is neither of these things.
 */
var existy = function existy(x) {
    return x != null;
};

/**
 * The truthy function is used to determine if something should be considered
 * a synonym for true
 */
var truthy = function truthy(x) {
    return (x !== false) && existy(x);
};

module.exports = {
    existy: existy,
    truthy: truthy
};
