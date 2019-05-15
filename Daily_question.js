// 1. 里面都是0-9的数字， 例如 123213314145251251254787112434. 请找出里面出现过多少个3位的回文数。 3位回文数就是类似121，232，434这样的数字
let data = '123213314145251251254787112434'
const arr1 = []
for (let i = 0; i < data.length; i++) {
  let a = data.slice(i, i + 3)
  let b = data.slice(i, i + 3).split("").reverse().join("")
  if (a == b && a.length == 3) arr1.push(a)
}
console.log(arr1)

// 2. 数组[1,[2],[3,4,[5,[6]]]] => [1,2,3,4,5,6]; 实现数组的扁平化
let arr2 = [1,[2],[3,4,[5,[6]]]]
// console.log(arr2.flat(3)) // ES10 兼容性很差
function flat(arr) {
  return arr.reduce((Accumulate,current)=>{
    return Accumulate.concat(Array.isArray(current)?flat(current):current)
  },[])
}
console.log(flat(arr2))