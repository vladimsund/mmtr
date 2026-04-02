main();

function main() {
  console.log("Задача 1", task1([4, 1]));

  console.log("Задача 2", task2([1, 2, 3], [2, 3, 4]));

  console.log("Задача 3", task3([1, "a", 3, true], 3, "a", 5, true));

  console.log(
    "Задача 4",
    task4(
      [
        { apple: 1, bat: 2 },
        { apple: 1 },
        { apple: 1, bat: 2, cookie: 2 },
        { bat: 2 },
      ],
      { apple: 1, bat: 2 },
    ),
  );

  console.log("Задача 5", task5("Cтрока_строка_CСтрока"));

  console.log("Задача 6", task6("исходная строка", "строка", "НовАя"));

  console.log("Задача 7", task7("abce"));

  console.log("Задача 8", task8([1, 2, 3], [3, 4, 5], [1, 7, 8]));

  console.log("Задача 9", task9('aa" aa& !@ < >'));

  console.log("Задача 10", task10(10));

  console.log(
    "Задача 11",
    task11([1, 2, 3, 4], function (n) {
      return n >= 3;
    }),
  );

  console.log("Задача 12", task12([1, [2], [3, [[4]]]]));

  console.log("Задача 13", task13(4)(2));
}

function task1(arr) {
  let min = arr[0];
  let max = arr[1];
  if (min > max) {
    const tmp = min;
    min = max;
    max = tmp;
  }
  let result = 0;
  for (let i = min; i <= max; i++) {
    result += i;
  }
  return result;
}

function task2(arr1, arr2) {
  const total = [...arr1, ...arr2];
  return total.filter((val) => !arr1.includes(val) || !arr2.includes(val));
}

function task3(arr, ...args) {
  return arr.filter((val) => !args.includes(val));
}

function task4(arr1, obj) {
  return arr1.filter((val) => {
    let isMatch = true;
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      if (val[keys[i]] !== obj[keys[i]]) {
        isMatch = false;
        break;
      }
    }
    return isMatch;
  });
}

function task5(str) {
  let result = "";
  let prev = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i].includes("_")) {
      if (prev !== "-") {
        result += "-";
      }
    } else if (str[i] === str[i].toUpperCase()) {
      if (prev === "-" || prev === "") {
        result += str[i].toLowerCase();
      } else {
        result += "-" + str[i].toLowerCase();
      }
    } else {
      result += str[i];
    }
    prev = result[result.length - 1];
  }
  return result;
}

function task6(str1, str2, str3) {
  if (str1.includes(str2)) {
    const indexStart = str1.indexOf(str2);
    let newStr = "";
    if (str1.charAt(indexStart).toUpperCase() === str1.charAt(indexStart)) {
      newStr = str3.charAt(0).toUpperCase() + str3.slice(1);
    } else {
      newStr = str3.charAt(0).toLowerCase() + str3.slice(1);
    }
    str1 = str1.replace(str2, newStr);
  }
  return str1;
}

function task7(str) {
  for (let i = 0; i < str.length; i++) {
    const currentCode = str.charCodeAt(i);
    const nextCode = str.charCodeAt(i + 1);
    if (nextCode - currentCode > 1) {
      return String.fromCharCode(currentCode + 1);
    }
  }
  return undefined;
}

function task8(arr1, arr2, ...args) {
  const nums = [...arr1, ...arr2, ...args.flat()];
  return nums.filter((item, index) => {
    return nums.indexOf(item) === index;
  });
}

function task9(str) {
  const dict = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  return [...str].reduce((prev, current) => {
    if (dict[current] !== undefined) {
      return prev + dict[current];
    }
    return prev + current;
  }, "");
}

function task10(n) {
  let result = 0;
  for (let i = 2; i <= n; i++) {
    let isSimple = true;
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        isSimple = false;
        break;
      }
    }
    if (isSimple) {
      result += i;
    }
  }
  return result;
}

function task11(arr, fnc) {
  let isMatch = false;
  return arr.filter((val) => {
    if (!isMatch && fnc(val)) {
      isMatch = true;
    }
    return isMatch;
  });
}

function task12(arr) {
  return arr.flat(Infinity);
}

function task13(arg1, arg2) {
  if (arg2 === undefined) {
    return function (arg) {
      return arg1 + arg;
    };
  }
  return arg1 + arg2;
}
