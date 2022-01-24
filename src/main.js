let sumCal = 0;
let url =
  "http://openapi.foodsafetykorea.go.kr/api/92804346bfe547c5a581/I2790/json/1/30/DESC_KOR=";
onLoadFood(foodURL("돼지고기콩나물두루치기"));

// Load menus
loadMenu().then((menus) => {
  menus.map((item) => {
    const whenVal = item[Object.keys(item)[0]];
    const whenTxt = Object.keys(item)[0];
    const content = document.querySelector(`.${whenTxt} .item__content`);
    const kcalEl = document.querySelector(`.${whenTxt} .content--calorie`);

    whenVal.map((menu) => {
      const li = addMenu(menu);
      content.append(li);
    });
  });
});

// Load food's Ingredients data
function onLoadFood(url) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const data = new Function("return [" + xhr.response + "];")();
      const target = data[0].I2790.row[0];

      const cal = Number(target.NUTR_CONT1);
    } else {
      console.log("통신 실패");
    }
  };
}

// Make new URL of Filtered data
function foodURL(foodName) {
  return url + foodName;
}

// Load Menus
function loadMenu() {
  return fetch("data/menus.json")
    .then((response) => response.json())
    .then((json) => json.menus);
}

// Add Menu
function addMenu(menu) {
  const li = document.createElement("li");
  li.setAttribute("class", "content--menu");
  li.append(menu);
  return li;
}
