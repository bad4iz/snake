// /**
//  * Created by bad4iz on 14.03.2017.
//  */
// let canvas = document.getElementById('canvas');
// let ctx = canvas.getContext('2d');
// //
// // ctx.fillStyle = '#369';
// // ctx.fillRect(10, 10, 55, 50);
//
// ctx.fillStyle = '#369';
// for (var x = 0.5; x < 1000; x += 10) {
//     ctx.moveTo(x, 0);
//     ctx.lineTo(x, 1500);
// }
// ctx.strokeStyle = "#000";
// ctx.stroke();
// for (var y = 0.5; y < 1500; y += 10) {
//     ctx.moveTo(0, y);
//     ctx.lineTo(1000, y);
// }
// ctx.strokeStyle = "#000";
// ctx.stroke();
//
// ctx.beginPath();
// ctx.moveTo(0, 40);
// ctx.lineTo(240, 40);
// ctx.moveTo(260, 40);
// ctx.lineTo(500, 40);
// ctx.moveTo(495, 35);
// ctx.lineTo(500, 40);
// ctx.lineTo(495, 45);
// ctx.strokeStyle = "#666";
// ctx.stroke();
//
// ctx.moveTo(60, 0);
// ctx.lineTo(60, 153);
// ctx.moveTo(60, 173);
// ctx.lineTo(60, 375);
// ctx.moveTo(65, 370);
// ctx.lineTo(60, 375);
// ctx.lineTo(55, 370);
// ctx.strokeStyle = "#741";
// ctx.stroke();
//
// function graf(step = 0.5) {
//     ctx.moveTo(0, 200);
//     return function () {
//         ctx.beginPath();
//         for (var x = 0.5; x < 1500; x += step) {
//             ctx.lineTo(x, Math.random() * 150 + 200);
//         }
//         ctx.strokeStyle = "#789";
//         ctx.stroke();
//         setTimeout(function () {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//         }, 1);
//
//     }
// }
//
//
// // setInterval(graf(2), 2);
//
// (function () {
//     ctx.beginPath();
//     for (var x = 0.5; x < 1500; x += 1) {
//         ctx.lineTo(x, Math.random() * 150 + 200);
//     }
//     ctx.strokeStyle = "#789";
//     ctx.stroke();
//     // ctx.clearRect(0, 0, canvas.width, canvas.height);
// })();


