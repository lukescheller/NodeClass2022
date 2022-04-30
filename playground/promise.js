const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    });
  }, 2000);
};

// add(1, 1)
//   .then((sum) => {
//     console.log(sum);
//     add(sum, 3)
//       .then((sum2) => {
//         console.log(sum2);
//       })
//       .catch((Er) => {
//         console.log(Er);
//       });
//   })
//   .catch((E) => {
//     console.log(E);
//   });

add(3, 3)
  .then((sum) => {
    console.log(sum);
    return add(sum, 3);
  })
  .then((sum2) => {
    console.log(sum2);
  })
  .catch((e) => {
    console.log(e);
  });
