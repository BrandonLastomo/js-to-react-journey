let status = true;
const movies = new Promise((resolve, reject) => {
  if (status == true) {
    setTimeout(() => {
      resolve([
        {
          title: "Gachiakuta",
          type: "animation",
        },
      ]);
    }, 1000);
  } else {
    reject("No data");
  }
});

movies
  .then((response) => console.log("Get data success")) // for success get data
  .catch((response) => console.log("Get data failed")); // for failed get data

// method 1 (return array in array)
// Promise.all([movies]).then((response) => console.log(response));

// method 2 (return array)
Promise.all([movies]).then((response) => {
  const [movie] = response;
  console.log(movie);
});
