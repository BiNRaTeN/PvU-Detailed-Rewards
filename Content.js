var data;
const api_url =
  "https://api.pancakeswap.info/api/v2/tokens/0x31471e0791fcdbe82fbf4c44943255e923f1b794";

//{"updated_at":1632242470724,"data":{"name":"Plant vs Undead Token","symbol":"PVU","price":"5.71257521362660923829106251039","price_BNB":"0.01560120504464614168579536763741"}}

var lepvu = 550;
let rate = 1.1;
let fecha = new Date();
let startDate = 1633046400000;
let day = 86400000;
let week = day * 7;
let now = Date.now().valueOf();
let weeksFromStart = Math.trunc((now - startDate) / week);
for (let i = 0; i < weeksFromStart; i++) {
  lepvu = lepvu * rate;
}

//console.log(weeksFromStart);
//console.log(lepvu);

var pvuprice;
async function getapi(url) {
  const response = await fetch(url);
  var info = await response.text();
  var parsed = JSON.parse(info);
  pvuprice = Number(parsed.data.price);
  //console.log("Price: " + pvuprice);
}

getapi(api_url);

var observer = new MutationObserver(function () {
  if (document.getElementsByClassName("le tw-text-center")) {
    //console.log("table has appeared.");
    moreData();
  }
});

const observe = () => {
  observer.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  });
};
observe();

function moreData() {
  data = document.getElementsByClassName("le tw-text-center");

  dataToChange = document.getElementsByClassName(
    "text-gray tw-mt-1 tw-text-right"
  );

  observer.disconnect();
  console.log(lepvu);
  for (let i = 0; i < data.length; i++) {
    var num = data[i].innerHTML;
    var le = Number(num.substring(num.indexOf("LE") + 4, num.indexOf("/")));
    var hour = Number(
      num.substring(num.indexOf("/") + 1, num.indexOf("Hour") - 2)
    );
    var lehour = le / hour;
    var lemonth = lehour * 24 * 30;
    //var pvumonth = lemonth / lepvu;
    var pvumonth =
      ((lemonth / 30) * 7) / lepvu +
      ((lemonth / 30) * 7) / (lepvu * rate) +
      ((lemonth / 30) * 7) / (lepvu * rate * rate) +
      ((lemonth / 30) * 7) / (lepvu * rate * rate * rate) +
      ((lemonth / 30) * 2) / (lepvu * rate * rate * rate * rate);
    var pvuday = (lehour * 24) / lepvu;
    var USDmonth = pvumonth * pvuprice;
    var USDday = pvuday * pvuprice;

    dataToChange[i].innerHTML =
      "\n </div><p style='color:yellow'> LE/h: " +
      lehour.toFixed(2) +
      "   LE/M: " +
      lemonth.toFixed(0) +
      "</p>" +
      "\n <p style='color:orange'> PVU/d: " +
      pvuday.toFixed(2) +
      "   PVU/M: " +
      pvumonth.toFixed(2) +
      "</p>" +
      "\n <p style='color:lightgreen'> USD/d: " +
      USDday.toFixed(2) +
      "   USD/M: " +
      USDmonth.toFixed(2);
  }

  observe();
}
