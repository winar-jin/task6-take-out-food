const allFoods = require('../src/items.js')();
const allPromotions = require('../src/promotions.js')();
const bestCharge = require('../src/best-charge.js');

function insertAllFoods() {
  allFoods.forEach(food => {
    let foodDiv = document.createElement('div');
    foodDiv.classList.add('food');
    let foodName = document.createElement('span');
    foodName.classList.add('food__name');
    foodName.textContent = food.name;
    foodDiv.appendChild(foodName);
    let foodPrice = document.createElement('span');
    foodPrice.classList.add('food__price');
    foodPrice.textContent = `${food.price}元`;
    foodDiv.appendChild(foodPrice);
    let buttonGroup = getButtonGroup(food.id);
    foodDiv.appendChild(buttonGroup);
    document.getElementById('items').appendChild(foodDiv);
  });
}

function getButtonGroup(id) {
  let addButton = document.createElement('button');
  addButton.classList.add('addOne');
  addButton.textContent = '+';
  addButton.setAttribute('data-foodid', id);
  addButton.addEventListener('click', addOne.bind(null, id));
  let minusButton = document.createElement('button');
  minusButton.classList.add('minusOne');
  minusButton.textContent = '-';
  minusButton.setAttribute('data-foodid', id);
  minusButton.addEventListener('click', minusOne.bind(null, id));
  let buttonGroup = document.createElement('div');
  buttonGroup.classList.add('buttonGroup');
  buttonGroup.appendChild(addButton);
  buttonGroup.appendChild(minusButton);
  return buttonGroup;
}

function insertAllPromotions() {
  allPromotions.forEach((promotion, index) => {
    let promotionDiv = document.createElement('div');
    promotionDiv.classList.add('promotion');
    let promotionType = document.createElement('span');
    promotionType.classList.add('promotion__type');
    promotionType.textContent = `${index+1}: ${promotion.type}`;
    promotionDiv.appendChild(promotionType);
    if (promotion.items) {
      let promotionItems = promotion.items.map(id => getFoodInfoById(id).name);
      let itemDiv = document.createElement('div');
      itemDiv.classList.add('promotion__items');
      let itemsSpan = document.createElement('span');
      itemsSpan.textContent = promotionItems.join('，');
      itemDiv.appendChild(itemsSpan);
      promotionDiv.appendChild(itemDiv);
    }
    document.getElementById('promotions').appendChild(promotionDiv);
  });
}

function getFoodInfoById(id) {
  return allFoods.find(food => food.id === id);
}

function cartControl() {
  let cartInfo = {};
  return {
    addOne: function (id) {
      cartInfo[id] = cartInfo[id] ? ++cartInfo[id] : 1;

      paintMenu();
    },
    minusOne: function (id) {
      if (cartInfo[id] >= 1) {
        --cartInfo[id];
        cartInfo[id] === 0 ? delete cartInfo[id] : null;

      } else {
        alert('您尚未购买该商品！');
      }
      paintMenu();
    },
    clearCharge: function () {
      cartInfo = {};
    },
    getCartInfo: function () {
      return cartInfo;
    },
    getCharge: function () {
      let cartItems = [];
      for (let id in cartInfo) {
        cartItems.push(`${id} x ${cartInfo[id]}`);
      }
      return bestCharge(cartItems);
    }
  }
}
let cartInfo = cartControl();

function paintMenu() {
  document.getElementById('all__items').innerHTML = '';
  let cart = cartInfo.getCartInfo();
  for (var i in cart) {
    let menuDiv = document.createElement('div');
    menuDiv.classList.add('item');
    let nameSpan = document.createElement('span');
    nameSpan.classList.add('item__name');
    nameSpan.textContent = getFoodInfoById(i).name;
    menuDiv.appendChild(nameSpan);
    let priceSpan = document.createElement('span');
    priceSpan.classList.add('item__price');
    priceSpan.textContent = `x ${cart[i]}`;
    menuDiv.appendChild(priceSpan);
    document.getElementById('all__items').appendChild(menuDiv);
  }
}

function addOne(id) {
  cartInfo.addOne(id);
}

function minusOne(id) {
  cartInfo.minusOne(id);
}

function clearCharge() {
  cartInfo.clearCharge();
  paintCheck('', false);
}

function calculatePrice() {
  let checkString = cartInfo.getCharge();
  paintCheck(checkString, true);
}

function paintCheck(checkString, flag) {
  let message = document.getElementById('message');
  flag ? message.classList.remove('disable') : message.classList.add('disable');
  message.innerHTML = checkString;
}

window.onload = _ => {
  insertAllFoods();
  insertAllPromotions();
  document.querySelector('.tools .calculatePrice').addEventListener('click', calculatePrice);
  document.querySelector('.tools .clearCharge').addEventListener('click', clearCharge);
};
