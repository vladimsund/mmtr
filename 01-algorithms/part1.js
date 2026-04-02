main();

function main() {
  console.log("Задача 1", task1(5));

  console.log("Задача 2", task2("aa  aaa aaaa"));

  console.log(
    "Задача 3",
    task3([
      [1, 2, 3],
      [4, 5],
      [6, 7, 8, 9],
    ]),
  );

  console.log("Задача 4", task4("aaaaaaaaaaaaa", 3));

  console.log("Задача 5", task5("YYyyyY yyY ппппПП"));

  console.log("Задача 6", task6([1, 2, 3], [4, 5], 1));

  console.log("Задача 7", task7([3, false, null, 0, "1"]));

  console.log("Задача 8", task8(["Alien", "line"]));

  console.log("Задача 9", task9([1, 2, 3, 4, 5, 6, 7], 2));

  console.log("Задача 10", task10([], 10));
}

function task1(num) {
  let result = 1;
  for (let i = 1; i <= num; i++) {
    result *= i;
  }
  return result;
}

function task2(str) {
  return Math.max(...str.split(" ").map((word) => word.length));
}

function task3(arr) {
  return arr.map((val) => Math.max(...val));
}

function task4(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

function task5(str) {
  return str
    .split(" ")
    .map((val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase())
    .join(" ");
}

function task6(arr1, arr2, n) {
  return [...arr2.slice(0, n), ...arr1, ...arr2.slice(n)];
}

function task7(arr) {
  return arr.filter((val) => val);
}

function task8(arr) {
  const str1 = arr[0].toLowerCase();
  const str2 = arr[1].toLowerCase();
  return str2.split("").every((char) => str1.includes(char));
}

function task9(arr, num) {
  const result = [];
  let i = 0;
  while (i < arr.length) {
    result.push(arr.slice(i, i + num));
    i += num;
  }
  return result;
}

function task10(arr, n) {
  if (n < 1) {
    return arr;
  }
  arr[arr.length] = n;
  return task10(arr, n - 1);
}
