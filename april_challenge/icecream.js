var tests = [];
var testObj = function(c, flavors) {
  this.totalCost = c;
  this.flavorList = flavors.split(" ");
  for (var x = 0; x < this.flavorList.length; x++) {
    this.flavorList[x] = parseInt(this.flavorList[x]);
  }
};

var str = "";

testObj.prototype.get_total = function() {
  return this.totalCost;
};

testObj.prototype.get_flavors = function() {
  return this.flavorList;
};

process.stdin.resume();
process.stdin.setEncoding("ascii");
process.stdin.on("data", function (input) {
  str += input;
});

process.stdin.on("end", function () {
  var inLines = str.split ("\n");
  var numTests = parseInt(inLines[0]);

  var c, l, subTestCounter = 0;
  for (var i = 1; i < inLines.length; i++) {
    if (subTestCounter == 0) {
      c = inLines[i];
      subTestCounter ++;
    } else if (subTestCounter == 1) {
      subTestCounter ++;
    } else if (subTestCounter == 2) {
      l = inLines[i];
      subTestCounter = 0;
      tests.push(new testObj(c, l));
    }       
  }

  var processNumbers = function(testcase){
    var flavors = testcase.get_flavors();
    for (var i = 0; i < flavors.length; i++) {
      for (var j = i; j < flavors.length; j++) {
        if (((flavors[i] + flavors[j]) == testcase.get_total()) && (i != j)) {
          console.log((i + 1) + " " + (j + 1));
          i = testcase.get_flavors().length;
          return;
        }
      }
    }
  };
  for (var x = 0; x < numTests; x++) {
    processNumbers(tests[x]);
  }
});

