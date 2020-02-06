function modeArray(array) {
  if (array.length == 0) return null;
  
  var tempMap = {},
    maxCount = 1,
    modes = [];

  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    
    if (tempMap[el] == null) tempMap[el] = 1;
    else tempMap[el]++;

    if (tempMap[el] > maxCount) {
      modes = [el];
      maxCount = tempMap[el];
    } else if (tempMap[el] == maxCount) {
      modes.push(el);
      maxCount = tempMap[el];
    }
  }
  
  return modes.sort().pop();
}