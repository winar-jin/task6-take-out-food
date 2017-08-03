// 请把与index.html页面相关的javascript代码写在这里
// 同时删除该注释
const allFoods = loadAllItems();
const allPromotions = loadPromotions();

function insertAllFoods() {
  allFoods.forEach(food => {
    let foodDiv = document.createElement('div');
    let innerHtml = `<span>${food.name}</span><span>${food.price}</span>`;
    foodDiv.innerHTML = innerHtml;
    let itemsContainer = document.getElementById('items');
    itemsContainer.appendChild(foodDiv);
  });
}

function insertAllPromotions() {
  allPromotions.forEach(promotion => {
    let promotionDiv = document.createElement('div');
    let innerHtml = `<span>${promotion.type}</span><span>${promotion.items?promotion.items:''}</span>`;
    promotionDiv.innerHTML = innerHtml;
    let itemsContainer = document.getElementById('promotions');
    itemsContainer.appendChild(promotionDiv);
  });
}

function clearCharge() {
  document.getElementById('message').innerHTML = '';
}

function calculatePrice() {
  let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
  let chargeString = bestCharge(inputs);
  document.getElementById('message').textContent = chargeString;
}

window.onload = _ => {
  insertAllFoods();
  insertAllPromotions();
};
