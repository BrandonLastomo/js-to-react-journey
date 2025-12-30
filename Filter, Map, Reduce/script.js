// 1st attempt
// const videos = document.querySelectorAll("li");
// console.log(videos);

// const titles = [];
// const durations = [];
// videos.forEach((video) => {
//   titles.push(video.innerHTML);
//   durations.push(video.dataset.duration);
// });

// console.log(titles);
// console.log(durations);

// const tutorialVideos = titles.filter((title) =>
//   title.toLowerCase().includes("drawing tutorial")
// );

// tutorialQty.innerHTML = tutorialVideos.length;

// 2nd attempt
// get HTML elements for displaying datas
// const tutorialQty = document.getElementById("drawing-qty");
// const tutorialTotalDuration = document.getElementById("drawing-total-duration");

// // get videos datas
// const videos = Array.from(document.querySelectorAll("[data-duration]"));

// // get videos datas with Drawing Tutorial ONLY
// const drawingVideos = videos.filter((video) =>
//   video.innerHTML.toLowerCase().includes("drawing tutorial")
// );

// // prepare variables for title and duration
// const titles = [];
// const durations = [];

// // insert datas
// drawingVideos.forEach((video) => {
//   titles.push(video.innerHTML);
//   durations.push(parseInt(video.dataset.duration));
// });

// // sum durations
// let totalDuration = durations.reduce((acc, curr) => {
//   return acc + curr;
// });

// // display data
// tutorialQty.innerHTML = titles.length;
// tutorialTotalDuration.innerHTML = totalDuration / 60;

// 3rd attempt
// get HTML elements for displaying datas
const tutorialQty = document.getElementById("drawing-qty");
const tutorialTotalDuration = document.getElementById("drawing-total-duration");

const videos = Array.from(document.querySelectorAll("[data-duration]"));

let drawingTutorial = videos
  .filter((video) => video.textContent.includes("Drawing Tutorial"))
  .map((item) => item.dataset.duration)
  .map((duration) => {
    const parts = duration.split(":").map((part) => parseFloat(part));
    return parts[0] * 60 + parts[1];
  })
  .reduce((sum, second) => sum + second);

const hour = drawingTutorial / 3600;
drawingTutorial = drawingTutorial - hour * 3600;
const min = drawingTutorial / 60;
const sec = drawingTutorial - min * 60;

tutorialTotalDuration.innerHTML = `${hour} Hour(s) ${min} Min(s) ${sec} Sec(s)`;

let drawingTitle = videos.filter((video) =>
  video.textContent.includes("Drawing Tutorial")
);

tutorialQty.innerHTML = drawingTitle.length;
