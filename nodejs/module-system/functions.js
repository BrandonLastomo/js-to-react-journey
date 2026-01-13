const helloWorld = (name) => `Hello World for ${name}!`;
const time = "12";

// export more than one thing manually
// module.exports.helloWorld = helloWorld; // = not ()
// module.exports.time = time;

// export more than one thing all at once old ver
// module.exports = {
//   helloWorld: helloWorld,
//   time: time,
// };

// export more than one thing all at once new ver (if property/method name is same)
module.exports = {
  helloWorld,
  time,
};
