const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject("numbers must be non-negative");
      }
      resolve(a + b);
    }, 1000);
  });
};

const doWork = async () => {
  const sum = await add(2, 2);
  const sum2 = await add(sum, -100);
  const sum3 = await add(sum2, 200);
  return sum3;
};

doWork()
  .then((val) => {
    console.log("value:", val);
  })
  .catch((e) => {
    console.log(e);
  });
