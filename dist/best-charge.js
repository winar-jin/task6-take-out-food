/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function loadAllItems() {
  return [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const allFoods = __webpack_require__(0)();
const allPromotions = __webpack_require__(1)();
const bestCharge = __webpack_require__(3);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const loadAllItems = __webpack_require__(0);
const loadPromotions = __webpack_require__(1);
module.exports = function bestCharge(selectedItems) {
  let originItemsInfo = getOriginItemsInfo(selectedItems);
  let promotionsInfo = getPromotionItemsInfo(originItemsInfo);
  let finalPromotion = promotionsInfo[0];
  for (let index = 1; index < promotionsInfo.length; index++) {
    finalPromotion = promotionsInfo[index].savedMoney > finalPromotion.savedMoney ? promotionsInfo[index] : finalPromotion;
  }
  let chargeString = '============= 订餐明细 =============\n';
  originItemsInfo.forEach(item => {
    chargeString += `${item.name} x ${item.quantity} = ${item.itemAmount}元\n`;
  });
  chargeString += '-----------------------------------\n';
  chargeString += !finalPromotion.savedMoney ? '' :
    finalPromotion.whoSavedMoney ? `使用优惠:\n${finalPromotion.type}(${finalPromotion.whoSavedMoney.join('，')})，省${finalPromotion.savedMoney}元\n-----------------------------------\n` :
      `使用优惠:\n${finalPromotion.type}，省${finalPromotion.savedMoney}元\n-----------------------------------\n`;
  let totalAmount = originItemsInfo.reduce((total,item) => total + item.itemAmount,0) - finalPromotion.savedMoney;
  chargeString += `总计：${totalAmount}元\n===================================\n`;
  return chargeString.trim();
}

function getOriginItemsInfo(selectedItems) {
  return selectedItems.map(item => {
    let [itemId, itemQuantity] = [item.split('x')[0].trim(), parseInt(item.split('x')[1])];
    let itemInfo = originItemInfo(itemId);
    itemInfo.quantity = itemQuantity;
    itemInfo.itemAmount = itemQuantity * itemInfo.price;
    return itemInfo;
  });
}

function originItemInfo(id) {
  const itemsInfo = loadAllItems();
  return itemsInfo.find(item => item.id === id);
}

function getPromotionItemsInfo(originItemsInfo) {
  const promotionsInfo = loadPromotions();
  let presentPromotion = [];
  promotionsInfo.forEach(promotion => {
    let saveMoneyInfo = promotionstrategies[promotion.type](originItemsInfo, promotion.items);
    presentPromotion.push({
      type: promotion.type,
      savedMoney: saveMoneyInfo.promotionAmount,
      whoSavedMoney: saveMoneyInfo.specificFoods ? saveMoneyInfo.specificFoods : null
    });
  });
  return presentPromotion;
}

const promotionstrategies = {
  '满30减6元': originItemsInfo => {
    const totalAmount = originItemsInfo.reduce((amount, item) => amount + item.itemAmount, 0);
    return {
      promotionAmount: Math.floor(totalAmount / 30) * 6
    };
  },
  '指定菜品半价': (originItemsInfo, specificItems) => {
    let specificFoods = [];
    let promotionAmount = 0;
    specificItems.forEach(item => {
      let promotion = originItemsInfo.find(itemInfo => itemInfo.id === item);
      if (promotion) {
        specificFoods.push(promotion.name);
        promotionAmount += (promotion.price / 2 * promotion.quantity);
      }
    });
    return { promotionAmount, specificFoods };
  }
};

/***/ })
/******/ ]);