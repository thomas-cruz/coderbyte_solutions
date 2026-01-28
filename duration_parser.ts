// Duration Parser

// Parse human-written time durations into total seconds.

// Input: A string representing a duration in human-readable format

// Output: The total number of seconds as an integer, or null if the input cannot be parsed

// Supported units:

// Seconds: s, sec, secs, second, seconds
// Minutes: m, min, mins, minute, minutes
// Hours: h, hr, hrs, hour, hours
// Days: d, day, days
// Weeks: w, wk, wks, week, weeks

// Examples:

// javascript

// parse("5 minutes")           // 300
// parse("2h30m")               // 9000
// parse("1 day, 2 hours")      // 93600
// parse("1.5 hours")           // 5400
// parse("90 mins")             // 5400

// Rules:

//     Parsing should be case-insensitive (2H equals 2h)
//     Multiple units can be combined with or without separators
//     Valid separators between units: spaces, commas, and the word "and"
//     Decimal values are allowed for any unit (e.g., 1..5 days)
//     Return null for invalid or unparseable input
//     A number without a unit is invalid
//     The final result should be rounded to the nearest integer


const durationParser = {
  parse: function(inputString: string): number {
    var seconds = 0;
    var days = inputString.match(/(\d+)\s*d/);
    var hours = inputString.match(/(\d+)\s*h(?:rs?)?/);
    var minutes = inputString.match(/(\d+)\s*m/);
    if (days) { seconds += parseFloat(days[1])*86400; }
    if (hours) { seconds += parseFloat(hours[1])*3600; }
    if (minutes) { seconds += parseFloat(minutes[1])*60; }
    return Math.round(seconds);
  }
};

module.exports = durationParser;
