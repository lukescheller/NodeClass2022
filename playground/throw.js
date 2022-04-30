const exception = (n) => {
  if (isNaN(n)) {
    throw new Error("jk;lkj;l");
  }
};

try {
  exception("e");
} catch (e) {
  console.log(e);
}
