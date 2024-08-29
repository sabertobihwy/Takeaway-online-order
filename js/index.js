class Goods{
    constructor(obj){
        this.number = 0;
        this.data = obj;
    }

    isChosen(){
        return this.number > 0
    }

    increase(){
        this.number++;
    }

    getGoodsPrice(){
        return this.number * this.data.price;
    }

    decrease(){
        if(this.number > 0){
            this.number--;
        }
    }
}

class UIGoods{
    constructor(){
        var goodsList = [];
        for(var i = 0; i< goods.length; i++){
            var good = new Goods(goods[i])
            goodsList.push(good)
        }
        this.goodsList = goodsList
        this.deliveryThreshold = 30
        this.deliveryFee = 5
    }

    increase(index){
        this.goodsList[index].increase()
    }

    decrease(index){
        this.goodsList[index].decrease()
    }

    getTotalPrice(){
        var sum = 0;
        for(var i = 0; i< this.goodsList.length; i++){
            sum += this.goodsList[i].getGoodsPrice()
        }
        return sum
    }

    getTotalNumber(){
        var sum = 0;
        for(var i = 0; i< this.goodsList.length; i++){
            sum += this.goodsList[i].number
        }
        return sum
    }

    overThreshold(){
        return getTotalPrice() >= this.deliveryThreshold
    }

    hasGoodsInCart(){
        return this.getTotalNumber() > 0
    }

    isChosen(index){
        return this.goodsList[index].isChosen()
    }


}

class UI{
    constructor(){
        this.UIGoods = new UIGoods()
        this.dom = {
            goodsListHTML :  document.querySelector('.goods-list')
        }
       // console.log(document.querySelector('.goods-list'));
        this.createHTML()
    }

    createHTML(){
        var html = ''
        for(var i = 0; i< this.UIGoods.goodsList.length; i++){
            var g = this.UIGoods.goodsList[i]
            html += `<div class="goods-item">
            <img src="${g.data.pic}" alt="" class="goods-pic" />
            <div class= "rightbox">
            <div class="goods-info">
                <h2 class="goods-title">${g.data.title}</h2>
                <p class="goods-desc">${g.data.desc}</p>
                <p class="goods-sell">
                    <span>月售 ${g.data.sellNumber}</span>
                    <span>好评率 ${g.data.favorRate}%</span>
                </p>
            </div>
            <div class="goods-confirm">
                <p class="goods-price">
                    <span class="goods-price-unit">¥</span>
                    ${g.data.price}
                </p>
                <div class="goods-btns">
                    <i class="iconfont i-jianhao"></i>
                    <span>${g.number}</span>
                    <i class="iconfont i-jiahao"></i>
                </div>
            </div>
            </div>
        </div>`

        }
        this.dom.goodsListHTML.innerHTML = html
    }
}

var u = new UI()