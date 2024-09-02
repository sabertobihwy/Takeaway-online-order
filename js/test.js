class Goods {
    // ES6 
    get GoodsPrice() {
        return this.number * this.data.price;
    }

    get isChosen() {
        return this.number > 0
    }

    constructor(obj) {
        // g.data.price cannot be modified!!! 
        // obj是原始对象，不冻结原始对象
        // 冻结的是g.data的对象
        obj = { ...obj }
        Object.freeze(obj)
        // xxx.data = ?? throw error 
        Object.defineProperty(this, 'data', {
            set: function () {
                throw new Error('readonly!')
            },
            get: function () {
                return obj;
            },
            configurable: false
        })
        // xxx.number = 'abc' or float, throw error
        var temp = 0;
        Object.defineProperty(this, 'number', {
            set: function (val) {
                if (typeof val !== 'number') {
                    throw new Error('should be number!')
                }
                var i = parseInt(val)
                if (i !== val) {
                    throw new Error('cannot be float!')
                }
                if (i < 0) {
                    throw new Error('cannot be lower than zero!')
                }
                temp = i
            },
            get: function () {
                return temp;
            },
            configurable: false
        })

        // 冻结g，防止添加属性：g.abc = 123
        Object.freeze(this) // or seal() 不能加属性，能改属性

        // Object.defineProperties(this, 'GoodsPrice',{
        //     get: function(){
        //         return this.number * this.data.price;
        //     }
        // })

    }

    increase() {
        this.number++;
    }

    // getGoodsPrice(){
    //     return this.number * this.data.price;
    // }

    decrease() {
        if (this.number > 0) {
            this.number--;
        }
    }
}

// freeze prototype
Object.freeze(Goods.prototype)

var g = new Goods({
    pic: './assets/g3.png',
    title: '奶香红豆拿铁',
    desc: '1人份 【年度爆款，一口甜蜜】\n√原味红豆topping，浓郁奶香搭配软糯红豆，口感丰富。\n选用优质奶源，搭配红豆特调糖浆，入口丝滑，甜而不腻，经典不失时尚。',
    sellNumber: 150,
    favorRate: 92,
    price: 28,
})

g.increase()
g.increase()
g.increase()
console.log(g.number)

Goods.prototype.haha = 'haha'
console.log(g.haha)