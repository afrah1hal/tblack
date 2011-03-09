/*****************************************************************************
 *                              ~b.lack.object~                              *
 *                            ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                            *
 * Provides missing functionality for JavaScript vanilla Objects.            *
 *                                                                           *
 *     ________________________________________________________________      *
 *       Copyright (c) 2011 Quildreen Motta // Licenced under MIT/X11        *
 *****************************************************************************/


(function (root) {

	// Error message, variables, alias and such
	var EObjExpected = "Object prototype may only be an Object or null"
      , ENonObjProto = "Object.getPrototypeOf called on non-object"

	  , has_proto    = typeof "".__proto__ == "object"


	///// Function `fallback` ////////////////////////////////////////////////
	//
	//     fallback(map)
	//
	// Provides a fallback implementation to the Object's attribute if
	// it's not implemented natively (or by another library) in the
	// browser.
	//
	function fallback(map) {
		var attr
		for (attr in map)
			if (!Object[attr]) Object[attr] = map[attr]
	}


	///// Function `create` //////////////////////////////////////////////////
	//
	//     create(Obj:proto[, Obj:props]) → Obj
	//
	// Creates a new Object with the specified [[Prototype]] and properties.
	//
	function create(proto, props) {
		if (typeof proto != "object") throw new TypeError(EObjExpected)

		var Empty = function(){ }
		  , obj, prop

		Empty.prototype = proto
		obj             = new Empty
		for (prop in props)
			if (obj.hasOwnProperty(prop)) obj[prop] = props[prop]

		return obj
	}
	

	///// Function `getPrototypeOf` //////////////////////////////////////////
	//
	//     getPrototypeOf(Obj:obj) → Obj
	//
	// Returns the [[Prototype]] of the specified object.
	//
	// Kinda stolen from John Resig's blog :3
	// http://ejohn.org/blog/objectgetprototypeof/
	//
	function get_proto(obj) {
		if (typeof obj != "object") throw new ENonObjProto
	
		if (has_proto) return object.__proto__
		else           return object.constructor.prototype
	}


	///// Provides the fallbacks /////////////////////////////////////////////
	fallback({ create:         create
	         , getPrototypeOf: get_proto })
})(this)
