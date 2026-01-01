// handled by V8 (stack)
console.log("test1");
// handled by WEB API, callback queue, and event loop
setTimeout(
  // callback (function as argument)
  () => {
    console.log("why");
  },
  3000
);
// handled by V8 (stack)
console.log("test2");
