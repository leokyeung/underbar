(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if(n === undefined){
      return array[0];
    } else{
      return array.slice(0,n);
    }

  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if( n === undefined) {
      return array[array.length-1]
     } else if ( n === 0){
       return [];
     } else if ( n > array.length){
       return array;
     } else {
      return array.slice(n-1, array.length)
     };
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // callback function over each item in the input collection.
  _.each = function(collection, callBack) {
    if (Array.isArray(collection)){
      // iterated the whole array
      for( var i = 0; i < collection.length;  i++){
        //apply the callback function on each of the value
        callBack(collection[i], i, collection);
    }
  } else if ( typeof collection === "object"){
      for ( var key in collection){
        callBack(collection[key], key, collection);
      }
  }
};
  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){

    var result = -1;
    // for ( var i = 0; i <= array.length; i++){
    //   if( array[i] === target && result === -1){
    //     result = i;
    //   }
    // }

    // each function will iterate the whole array element
    _.each(array, function(value, index) {
      // if the given value is the same as the target value
      if (value === target && result === -1) {
      // replace the result value with the index location
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(array, test){
    var output = [];

      // for(var i = 0;i<collection.length;i++) {
      //   if(test(collection[i])) {
      //     output.push(collection[i]);
      //   }
      // }
      _.each(array, function(value) {
        if ( test(value) ) {
          output.push(value);
        }
      });

    return output;
  };


  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    //  var output = [];
    // for( var i = 0; i< collection.length; i++){
    //   if ( !test(collection[i])){
    //     output.push(collection[i]);
    //   }
    // }

    // _.each(collection, function(value){
    //   if(!test(value)){
    //     output.push(value);
    //   }
    // })

    return _.filter(collection, function(value){
      return !test(value)
    })
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, callBack) {
    var output = [];
    var iterated = [];
    if (callBack) {
      //loops throught the whole array
      for (var i = 0; i < array.length; i++) {
        // if iterated array list does not have exisiting value
        // after running the callBack
        if (!iterated.includes(callBack(array[i]))) {
          // push the value to the iterated list
          // updates the iterated list so it can be continue to be compared
          iterated.push(callBack(array[i]));
          //push the same value to the output list
          output.push(array[i])
        }
      }
    } else {
      for (var i = 0; i < array.length; i++) {
        if (!output.includes(array[i])) {
          output.push(array[i]);
        }
      }
    }
    return output;
  };



  // Return the results of applying an iterator to each element.
  _.map = function(array, callBack) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
      var output = [];
      // for ( var i = 0; i < array.length; i++){
      //   output.push(callBack(array[i]));
      // }
      _.each(array, function(value){
        output.push(callBack(value));
      });

      return output;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(object, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(object, function(item){
      return item[key];
    })
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, callBack, accumlator) {

    if (accumlator === undefined) {
      //set initial to be the first item of the array if no memo is passed in
      accumlator = collection[0];
      //pass the second item of the array into the iterator first if no memo is passed in
      collection = collection.slice(1);
    }
    //iterates over the collection and executes the callback function on total and each value
    _.each(collection, function(value){
      accumlator = callBack(accumlator, value);
    })

    return accumlator;
 };


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {

    return _.reduce(collection, function(wasFound, value) {
      if (wasFound) {
        return true;
      }
      // matches the value with target
      return value === target;
      // set the inital value is false because this is a test to find the value in the collection which changes the accumlator to true
    }, false);
  };
    // if (Array.isArray(collection)) {
    //   for ( var i = 0; i < collection.length; i++){
    //     if(target === collection[i]){
    //       return true;
    //     }else{
    //       return false;
    //     }
    //   }
    // } else {
    //   for ( var key in collection){
    //     if( target === collection[key]){
    //       return true;
    //     } else{
    //       return false;
    //     }
    //   }
    // }



  // Determine whether all of the elements match a truth test.
  _.every = function(collection, callBack = _.identity) {
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(result, item) {
      if(!callBack(item)) {
        result = false;
      }
      return result;
    },true)
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(array, callBack) {

    // returns TRUE if all of the values in the list pass the predicate FALSE test
    return !_.every(array, function(value) {
      if (callBack) {
      return !callBack(value);
      } else {
        return !_.identity(value);
      }
    });
  };



  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var keys in arguments[i]) {
        obj[keys] = arguments[i][keys];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var keys in arguments[i]) {
        if (obj[keys] == undefined) {
          obj[keys] = arguments[i][keys];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {

    var alreadyCalled = false;
    var result;

    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the info from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var obj;
    var wasCalled = false;

    return function () {
      if (JSON.stringify(obj) === JSON.stringify(arguments)) {
        wasCalled === true;
        return obj;
      }
      if (!wasCalled) {
      var result;
      result = func.apply(this, arguments);
      obj = arguments;
      return result;
      }
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    return setTimeout.apply(this, arguments);
};


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    //makes a copy of the array
    var array1 = array.slice();
    // empty array to hold result
    var output = [];
    // loops through the input array
    for (var i = 0; i < array.length; i ++) {
      // creating a random number
      var randomNum = Math.floor(Math.random() * array1.length);
      // add a random number from the array copy into result
      output.push(array1[randomNum]);
      //remove a number out of the copied array list
      array1.splice(randomNum, 1);
    }
    // output should have all the shuffled number
    return output;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
