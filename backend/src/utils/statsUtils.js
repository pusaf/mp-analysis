// Calculates median for an array of numbers
function median(arr) {
    var sorted = arr.sort(function (a, b) {
        return a - b;
    });

    var length = sorted.length;

    if (length % 2 === 1) {
        return sorted[(length / 2) - 0.5];
    } else {
        return (sorted[length / 2] + sorted[(length / 2) - 1]) / 2;
    }
}

// Checks if two arrays are equal
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// Calculates mean for an array of numbers
function mean(arr) {
    return avg = arr.reduce((total, value) => total + value) / arr.length
}



module.exports = { mean, median, arraysEqual };