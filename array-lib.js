module.exports = {

  contains: function (arr,v) {
      for(var i = 0; i < arr.length; i++) {
          if(arr[i] === v) return true;
      }
      return false;
  },

  unique: function (arr) {
      var result = [];
      for(var i = 0; i < arr.length; i++) {
          if(!result.includes(arr[i])) {
              result.push(arr[i]);
          }
      }
      return result;
  },
  repeated: function (arr){
    var result = arr.filter(function(user){
      return arr.indexOf(user) != arr.lastIndexOf(user);
    });
    return this.unique(result);
  }
};
