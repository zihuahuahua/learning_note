function say(person){
  console.log(person+'aaaaa')
}

Function.prototype.before = function(fn){
  let that = this;
  return function(){
    fn();
    that(...arguments);
  }
}
let newFn = say.before(()=>{
  console.log('我先')
})
newFn('我来了')
