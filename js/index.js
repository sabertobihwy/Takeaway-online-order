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
        console.log(index)
        console.log(this.goodsList[index])
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
        return this.getTotalPrice() >= this.deliveryThreshold
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
            goodsListHTML :  document.querySelector('.goods-list'),
            footerNumHTML: document.querySelector('.footer-car-badge'),
            footerTotalHTML: document.querySelector('.footer-car-total'),
            footerTipHTML: document.querySelector('.footer-car-tip'),
            footerPayHTML: document.querySelector('.footer-pay'),
            cartHTML:document.querySelector('.footer-car')
        }
       var rect = this.dom.cartHTML.getBoundingClientRect()
       this.targetCart = {
            x: rect.left+ rect.width /2 ,
            y: rect.top + rect.height /5 
       }
        this.createHTML()
        this.updateTip()
        this.addEventListener()
    }

    createHTML(){
        var html = ''
        for(var i = 0; i< this.UIGoods.goodsList.length; i++){
            var g = this.UIGoods.goodsList[i]
            html += `<div class="goods-item">
            <div class= "leftbox">
            <img src="${g.data.pic}" alt="" class="goods-pic" />
            </div>
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
                <p class="goods-btns">
                    <span data-index="${i}" class="jianhao" >
                        <svg class="icon hidden inactive" aria-hidden="true">
                            <use xlink:href="#icon-jianhao"></use>
                        </svg>
                    </span>
                    <span class="hidden inactive number">${g.number}</span>
                    <span data-index="${i}" class="jiahao">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiahao"></use>
                        </svg>
                    </div>
                </p>
            </div>
            </div>
        </div>`

        }
        this.dom.goodsListHTML.innerHTML = html
    }

    overThreshold(){
        return this.UIGoods.overThreshold()
    }

    getNumber(index){
        return this.UIGoods.goodsList[index].number
    }

    getTotalPrice(){
        return this.UIGoods.getTotalPrice()
    }

    getTotalNumber(){
        return this.UIGoods.getTotalNumber()
    }

    increase(index){
        this.UIGoods.increase(index);
        this.updateGoodsItem(index);
        this.updateFooter();
        this.addAnimate();
        this.jump(index);
    }

    decrease(index){
        this.UIGoods.decrease(index);
        this.updateGoodsItem(index);
        this.updateFooter();
        this.addAnimate();
    }

    updateTip(){
        this.dom.footerTipHTML.innerHTML = `配送费¥${this.UIGoods.deliveryFee}`
    }

    updateGoodsItem(index){
        var itemHTML = this.dom.goodsListHTML.children[index]
       // console.log(itemHTML)
        var hiddenHTMLs = itemHTML.querySelectorAll('.hidden')
        if(this.UIGoods.isChosen(index)){
            hiddenHTMLs.forEach(e=>{
                e.classList.remove('inactive')
            })
            var number = itemHTML.querySelector('.number')
            number.innerHTML = this.getNumber(index)
        }else{
           hiddenHTMLs.forEach(e=>{
                e.classList.add('inactive');
            })
        }
    }

    updateFooter(){
        var cartNumHTML = this.dom.footerNumHTML
        cartNumHTML.innerHTML = this.getTotalNumber()
        this.dom.footerTotalHTML.innerHTML = this.getTotalPrice()
        var footerPayHTML_a = this.dom.footerPayHTML.querySelector('a')
        var footerPayHTML_span = this.dom.footerPayHTML.querySelector('span')
        if(this.overThreshold()){
            footerPayHTML_a.classList.remove('inactive')
            footerPayHTML_span.classList.add('inactive')
        }else{
            footerPayHTML_a.classList.add('inactive')
            footerPayHTML_span.classList.remove('inactive')
            footerPayHTML_span.innerHTML = `还差¥${this.UIGoods.deliveryThreshold - this.getTotalPrice()}元起送`
        }
    }

    addEventListener(){
        // listen animation
        this.dom.cartHTML.addEventListener('animationend',()=>{
            this.dom.cartHTML.classList.remove('animate')
        })


    }
    
   addAnimate(){
            this.dom.cartHTML.classList.add('animate')
   }

   jump(index){
    var itemHTML = this.dom.goodsListHTML.children[index].querySelector('.jiahao')
   //var itemHTML = document.querySelector('.jiahao')
   // console.log(itemHTML)
    var from = itemHTML.getBoundingClientRect()
   // console.log(from)
    var fromAxios = {
        x: from.left,
        y: from.top
    }
   // console.log(fromAxios)
    // create cart
    var span = document.createElement('span')
    span.className = 'addToCartAnimation'
    span.style.transform = `translateX(${fromAxios.x}px)`
    span.innerHTML = `<svg class="icon trans" aria-hidden="true" style="transform: translateY(${fromAxios.y}px)">
                        <use xlink:href="#icon-jiahao"></use>
                     </svg>`

    // 获取 <body> 的第一个子元素
    var firstChild = document.body.firstChild;

    // 将 <div> 插入到 <body> 的最前面
    document.body.insertBefore(span, firstChild);
   // console.log(span)

    // reflow
    span.clientWidth

    // 飞到destination
    span.style.transform = `translateX(${this.targetCart.x}px)`
    span.children[0].style.transform = `translateY(${this.targetCart.y}px)`
   // console.log(span.children[0])

    var that = this
    span.addEventListener('transitionend',function(){
        span.remove()
        that.addAnimate()
    },{
        once: true // only trigger once
    })
    
   }

}
    

var u = new UI()

u.dom.goodsListHTML.addEventListener('click',(e)=>{
    // if(e.target.classList.contains('jianhao')){
    //     var index = +e.target.getAttribute('data-index')
    //     u.decrease(index)
    // }else if(e.target.classList.contains('jiahao')) {
    //     u.increase(index)
    // }

    var index; 
    var jia = e.target.closest('.jiahao')
    var jian = e.target.closest('.jianhao')
    if(jia){
        index = +jia.getAttribute('data-index')
        u.increase(index)
    }else if(jian){
        index = +jian.getAttribute('data-index')
        u.decrease(index)
        
    }
})

