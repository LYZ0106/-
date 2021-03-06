/*
 * 订阅者模式涉及三个对象：主题对象、订阅者、发布者
 * 它定义一对多的关系，让多个订阅者对象同时监听一个主题对象
 * 每当主题对象状态发生改变时，其相关依赖对象都会得到通知，并被自动更新

   主题对象维护一个数组，把几个函数推入数组中待用，主题负责发布事件
   发布，执行缓存在数组中的函数列队,订阅者通过订阅这些事件来观察该主体

  比如在一个按钮上绑定click事件，这其实就是个订阅的过程；而何时触发，就是发布。
  但大家只是知道有这么回事就行，没有任何实用价值。
  因为通过鼠标或手指点击的发布动作是浏览器封装好的，我们其实只看见了订阅过程，
  这对整个模式的理解毫无用处。


观察者模式：要求想要接受相关通知的观察者必须到发起这个事件的被观察者上注册这个事件。

发布/订阅模式：使用一个主题/事件频道，这个频道处于想要获取通知的订阅者和发起事件的发布者之间。
这个事件系统允许代码定义应用相关的事件，这个事件可以传递特殊的参数，
参数中包含有订阅者所需要的值。这种想法是为了避免订阅者和发布者之间的依赖性。


区别
1、调度的地方。
虽然两种模式都存在订阅者和发布者（具体观察者可认为是订阅者、具体目标可认为是发布者），
但是观察者模式是由具体目标调度的，而发布/订阅模式是统一由调度中心调的，
所以观察者模式的订阅者与发布者之间是存在依赖的，而发布/订阅模式则不会。

2、这种和观察者模式之间的不同，使订阅者可以实现一个合适的事件处理函数，
用于注册和接受由发布者广播的相关通知。


优点：
   两种模式都可以用于松散耦合，改进代码管理和潜在的复用。

缺点：
    1、在发布/订阅模式中，将发布者与订阅者上解耦，导致很难确保我们应用中的特定部分按照我们预期的那样正常工作。
例如，发布者可以假设有一个或者多个订阅者正在监听它们。比如我们基于这样的假设
在某些应用处理过程中来记录或者输出错误日志。如果订阅者执行日志功能崩溃了（或者因为某些原因不能正常工作），
因为系统本身的解耦本质，发布者没有办法感知到这些事情。
    2、阅者对彼此之间存在没有感知，对切换发布者的代价无从得知。
因为订阅者和发布者之间的动态关系，更新依赖也很能去追踪。

 */

function Dep() {    //主题对象
  this.subs = []    //订阅者列表
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  notify: function () {                  //主题对象通知订阅者
    this.subs.forEach(function (sub) {  //遍历所有的订阅者，执行订阅者提供的更新方法
      sub.update()
    })
  }
}

function Sub(n) { //订阅者
  this.n = n;
}

Sub.prototype = {
  update: function () { //订阅者更新
    this.n = this.n + 1;
    console.log(this.n);
  }
}


let dep = new Dep()
function pub() { //发布者 即数据的来源
  dep.notify()
}


//新增 3 个订阅者
dep.addSub(new Sub(1))
dep.addSub(new Sub(2))
dep.addSub(new Sub(3))

pub() //发布者发布更新
