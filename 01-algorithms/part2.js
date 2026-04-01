main()

function main() {
  console.log("Задача 1", task1([4,1]))

  console.log("Задача 2", task2([1,2,3], [2,3,4]))

  console.log("Задача 3", task3([1,"a",3,true], 3, "a", 5, true))

  console.log("Задача 4", task4([{"apple" : 1, "bat" : 2}, {"apple" : 1}, {"apple" : 1, "bat" : 2, "cookie" : 2}, {"bat" : 2}], {"apple" : 1, "bat" : 2}))

  console.log("Задача 5", task5("Cтрока _строка_CСтрока"))

  console.log("Задача 6", task6("исходная строка", "строка", "НовАя"))

  console.log("Задача 7", task7("abce"))

  console.log("Задача 8", task8([1,2,3], [3,4,5], [1,7,8]))

  console.log("Задача 9", task9("aa\" aa& !@ < >"))

  console.log("Задача 10", task10(10))

  console.log("Задача 11", task11([1,2,3,4], function(n) {return n >= 3}))

  console.log("Задача 12", task12([1,[2],[3,[[4]]]], function(n) {return n >= 3}))

  console.log("Задача 13", task13(4)(2))
}

function task1(arr) {
  let min = arr[0]
  let max = arr[1]
  if(min > max) {
    const tmp = min
    min = max
    max = tmp
  }
  let result = 0
  for(let i = min; i <= max; i++) {
    result += i
  }
  return result
}

function task2(arr1, arr2) {
  const result = []
  dict = {}
  for(let i = 0; i < arr1.length; i++) {
    dict[arr1[i]] = { val: arr1[i], both: false }
  }
  for(let i = 0; i < arr2.length; i++) {
    contains = dict[arr2[i]]
    if(contains !== undefined) {
      dict[arr2[i]] = { val: arr2[i], both: true }
    } else {
      dict[arr2[i]] = { val: arr2[i], both: false }
    }
  }
  let count = 0
  for(let key in dict) {
    if(!dict[key].both) {
      result[count++] = dict[key].val
    }
  }
  return result
}

function task3(arr, ...args) {
  const dict = {}
  for(let i = 0; i < args.length; i++) {
    dict[args[i]] = {}
  }
  const result = []
  let count = 0
  for(let i = 0; i < arr.length; i++) {
    const contains = dict[arr[i]]
    if(contains === undefined) {
      result[count++] = arr[i]
    }
  }
  return result
}

function task4(arr1, obj) {
  const result = []
  let count = 0
  const objKeys = Object.keys(obj)
  for (let i = 0; i < arr1.length; i++) {
    const currentObj = arr1[i]
    var isMatch = true
    for(let j = 0; j < objKeys.length; j++) {
      const key = objKeys[j]
      if(currentObj[key] !== obj[key]) {
        isMatch = false
        break
      }
    }
    if(isMatch) {
      result[count++] = currentObj
    }
  }
  return result
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
  let result = ""
  let prev = ""
  for(let i = 0; i < str.length; i++) {
    if(str[i] === " " || str[i] === "_") {
      if(prev !== "-" && i !== 0) {
        result += "-"
      }
    } else {
      const lower = upperToLower[str[i]]
      if(lower === undefined) {
        result += str[i]
      } else {
        if(prev !== "-" && i !== 0) {
          result += "-"
        }
        result += lower
      }
    }
    prev = result[result.length - 1]
  }
  return result
}

function task6(str1, str2, str3) {
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

  function processWord(currentWord) {
    if (currentWord === str2) {
      let updated = ""
      const isCapital = upperToLower[currentWord[0]] !== undefined
      for (let j = 0; j < str3.length; j++) {
        if (j === 0) {
          if(isCapital) {
            const upper = lowerToUpper[str3[0]]
            if(upper === undefined) {
              updated += str3[0]
            } else {
              updated += upper
            }
          } else {
            const lower = upperToLower[str3[0]]
            if(lower === undefined) {
              updated += str3[0]
            } else {
              updated += lower
            }
          }
        } else {
          updated += str3[j]
        }
      }
      return updated
    }
    return currentWord
  }

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] === " ") {
      result += processWord(word) + " "
      word = ""
    } else {
      word += str1[i]
    }
  }
  return result + processWord(word)
}

function task7(str) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz абвгдежзийклмнопрстуфхцчшщъыьэюя"
  let startIndex = -1
  for(let i = 0; i < alphabet.length; i++) {
    if (alphabet[i] === str[0]) {
      startIndex = i
      break
    }
  }
  if(startIndex === -1) {
    return undefined
  }
  for (let j = 0; j < str.length; j++) {
    if(alphabet[startIndex + j] === " ") {
      return undefined
    }
    if(str[j] !== alphabet[startIndex + j]) {
      return alphabet[startIndex + j]
    }
  }
  return undefined
}

function task8(arr1, arr2, ...args) {
  const arrays = [arr1, arr2, ...args] 
  const dict = {}
  const result = []
  let count = 0
  for (let i = 0; i < arrays.length; i++) {
    const currentArr = arrays[i]
    for (let j = 0; j < currentArr.length; j++) {
      const value = currentArr[j]
      if (dict[value] === undefined) {
        result[count++] = value
        dict[value] = true
      }
    }
  }
  return result
}

function task9(str) {
  let result = ""
  const dict = {"&" : "&amp;", "<" : "&lt;", ">" : "&gt;", "\"" : "&quot;"}
  for(let i = 0; i < str.length; i++) {
    const contains = dict[str[i]]
    if(contains !== undefined) {
      result += contains
    } else {
        result += str[i]
    }
  }
  return result
}

function task10(n) {
  let result = 0
  for (let i = 2; i <= n; i++) {
    let isSimple = true;
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        isSimple = false
        break
      }
    }
    if (isSimple) {
      result += i
    }
  }
  return result
}

function task11(arr, fnc) {
  const result = []
  let found = false
  let count = 0
  for(let i = 0; i < arr.length; i++) {
    if(found) {
      result[count++] = arr[i]
    } else {
      if(fnc(arr[i])) {
        found = true
        result[count++] = arr[i]
      }
    }
  }
  return result
}

function task12(arr) {
  const result = []
  let count = 0
  function internal(items) {
    for (let i = 0; i < items.length; i++) {
      if(items[i] instanceof Array) {
        internal(items[i])
      } else {
        result[count++] = items[i]
      }
    }
  }
  internal(arr)
  return result
}

function task13(arg1, arg2) {
  if(arg2 === undefined) {
    return function(arg) {
      return arg1 + arg
    }
  }
  return arg1 + arg2
}