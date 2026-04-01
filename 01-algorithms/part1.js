main()

function main() {
  console.log("Задача 1", task1(5))

  console.log("Задача 2", task2("aa  aaa aaaa"))

  console.log("Задача 3", task3([[1,2,3], [4,5], [6,7,8,9]]))

  console.log("Задача 4", task4("aaaaaaaaaaaaa", 3))

  console.log("Задача 5", task5("YYyyyY yyY ппппПП"))

  console.log("Задача 6", task6([1,2,3], [4,5], 1))

  console.log("Задача 7", task7([3, false, null, 0, "1"]))

  console.log("Задача 8", task8(["Alien", "line"]))

  console.log("Задача 9", task9([1,2,3,4,5,6,7], 2))

  console.log("Задача 10", task10([], 10))
}

function task1(num) {
  let result = 1
  for(let i = 1; i <= num; i++) {
    result *= i
  }
  return result
}

function task2(str) {
  let result = 0
  let current = 0
  for(let i = 0; i < str.length; i++) {
    if(str[i] === " ") {
      if(current > result) {
        result = current
      }
      current = 0
    } else {
      current++
    }
  }
  if(current > result) {
    result = current
  }
  return result
}

function task3(arr) {
  const result = []
  for(let i = 0; i < arr.length; i++) {
    let max = 0
    for(let j = 0; j < arr[i].length; j++) {
        if(max < arr[i][j]) {
            max = arr[i][j]
        }
    }
    result[i] = max
  }
  return result
}

function task4(str, num) {
  if (str.length <= num) {
    return str
  }
  let result = ""
  for (let i = 0; i < num; i++) {
    result += str[i]
  }
  return result + "..."
}

function task5(str) {
  const upperToLower = {
    'А': 'а', 'Б': 'б', 'В': 'в', 'Г': 'г', 'Д': 'д', 'Е': 'е', 'Ё': 'ё', 'Ж': 'ж',
    'З': 'з', 'И': 'и', 'Й': 'й', 'К': 'к', 'Л': 'л', 'М': 'м', 'Н': 'н', 'О': 'о',
    'П': 'п', 'Р': 'р', 'С': 'с', 'Т': 'т', 'У': 'у', 'Ф': 'ф', 'Х': 'х', 'Ц': 'ц',
    'Ч': 'ч', 'Ш': 'ш', 'Щ': 'щ', 'Ъ': 'ъ', 'Ы': 'ы', 'Ь': 'ь', 'Э': 'э', 'Ю': 'ю', 'Я': 'я',
    'A': 'a', 'B': 'b', 'C': 'c', 'D': 'd', 'E': 'e', 'F': 'f', 'G': 'g', 'H': 'h',
    'I': 'i', 'J': 'j', 'K': 'k', 'L': 'l', 'M': 'm', 'N': 'n', 'O': 'o', 'P': 'p',
    'Q': 'q', 'R': 'r', 'S': 's', 'T': 't', 'U': 'u', 'V': 'v', 'W': 'w', 'X': 'x', 'Y': 'y', 'Z': 'z'
  }
  const lowerToUpper = {
    'а': 'А', 'б': 'Б', 'в': 'В', 'г': 'Г', 'д': 'Д', 'е': 'Е', 'ё': 'Ё', 'ж': 'Ж',
    'з': 'З', 'и': 'И', 'й': 'Й', 'к': 'К', 'л': 'Л', 'м': 'М', 'н': 'Н', 'о': 'О',
    'п': 'П', 'р': 'Р', 'с': 'С', 'т': 'Т', 'у': 'У', 'ф': 'Ф', 'х': 'Х', 'ц': 'Ц',
    'ч': 'Ч', 'ш': 'Ш', 'щ': 'Щ', 'ъ': 'Ъ', 'ы': 'Ы', 'ь': 'Ь', 'э': 'Э', 'ю': 'Ю', 'я': 'Я',
    'a': 'A', 'b': 'B', 'c': 'C', 'd': 'D', 'e': 'E', 'f': 'F', 'g': 'G', 'h': 'H',
    'i': 'I', 'j': 'J', 'k': 'K', 'l': 'L', 'm': 'M', 'n': 'N', 'o': 'O', 'p': 'P',
    'q': 'Q', 'r': 'R', 's': 'S', 't': 'T', 'u': 'U', 'v': 'V', 'w': 'W', 'x': 'X', 'y': 'Y', 'z': 'Z'
  }
  let result = ""
  let word = ""
  for(let i = 0; i < str.length; i++) {
    if(str[i] === " ") {
      if(word !== "") {
        result += word
        word = ""
      }
      result += str[i]
    } else {
      if(word === "") {
        upper = lowerToUpper[str[i]]
        if(upper !== undefined) {
          word += upper
        } else {
          word += str[i]
        }
      } else {
        lower = upperToLower[str[i]]
        if(lower !== undefined) {
          word += lower
        } else {
          word += str[i]
        }
      }
    }
  }
  return result + word
}

function task6(arr1, arr2, n) {
  const result = []
  for(let i = 0; i < n; i++) {
    result[i] = arr2[i]
  }
  for(let i = 0; i < arr1.length; i++) {
    result[n + i] = arr1[i]
  }
  for(let i = n; i < arr2.length; i++) {
    result[arr1.length + i] = arr2[i]
  }
  return result
}

function task7(arr) {
  const result = []
  let count = 0
  for(let i = 0; i < arr.length; i++) {
    if(arr[i]) {
      result[count++] = arr[i]
    }
  }
  return result
}

function task8(arr) {
  const upperToLower = {
    'А': 'а', 'Б': 'б', 'В': 'в', 'Г': 'г', 'Д': 'д', 'Е': 'е', 'Ё': 'ё', 'Ж': 'ж',
    'З': 'з', 'И': 'и', 'Й': 'й', 'К': 'к', 'Л': 'л', 'М': 'м', 'Н': 'н', 'О': 'о',
    'П': 'п', 'Р': 'р', 'С': 'с', 'Т': 'т', 'У': 'у', 'Ф': 'ф', 'Х': 'х', 'Ц': 'ц',
    'Ч': 'ч', 'Ш': 'ш', 'Щ': 'щ', 'Ъ': 'ъ', 'Ы': 'ы', 'Ь': 'ь', 'Э': 'э', 'Ю': 'ю', 'Я': 'я',
    'A': 'a', 'B': 'b', 'C': 'c', 'D': 'd', 'E': 'e', 'F': 'f', 'G': 'g', 'H': 'h',
    'I': 'i', 'J': 'j', 'K': 'k', 'L': 'l', 'M': 'm', 'N': 'n', 'O': 'o', 'P': 'p',
    'Q': 'q', 'R': 'r', 'S': 's', 'T': 't', 'U': 'u', 'V': 'v', 'W': 'w', 'X': 'x', 'Y': 'y', 'Z': 'z'
  }
  const str1 = arr[0]
  const str2 = arr[1]
  const dict = {}
  for(let i = 0; i < str1.length; i++) {
    let lower = upperToLower[str1[i]]
    if(lower === undefined) {
      lower = str1[i]
    }
    dict[lower] = {}
  }
  for(let i = 0; i < str2.length; i++) {
    let lower = upperToLower[str2[i]]
    if(lower === undefined) {
        lower = str2[i]
    }
    const contains = dict[lower]
    if(contains === undefined) {
      return false
    }
  }
  return true
}

function task9(arr, num) {
  const result = []
  let count = 0
  let i = 0
  while(i < arr.length) {
    const group = []
    for(let j = 0; j < num; j++) {
      if (i + j < arr.length) {
        group[j] = arr[i + j]
      }
    }
    result[count++] = group
    i += num
  }
  return result
}

function task10(arr, n) {
  if(n < 1) {
    return arr
  }
  arr[arr.length] = n
  return task10(arr, n - 1)
}