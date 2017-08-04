// const loadAllItems = require('./items.js');
// const loadPromotions = require('./promotions.js');
// module.exports = function bestCharge(selectedItems) {
function bestCharge(selectedItems) {
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