const puppeteer = require("puppeteer");

const getAllUrl = async browser => {
  const page = await browser.newPage();
  await page.goto(
    "https://www.tripadvisor.fr/?fid=7891d63d-0841-40af-acc8-47b70413af3b"
  );
  await page.waitFor("body");
  const result = await page.evaluate(() =>
    [
      ...document.querySelectorAll(
        ".social-shelf-items-ShelfLocationSection__section--Lj8Ap .ui_poi_thumbnail"
      )
    ].map(link => link.href)
  );
  return result;
};

const getDataFromUrl = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitFor("body");
  return page.evaluate(() => {
    let title = document.querySelector(".h1");
    if (title && title.innerText) {
      title.innerText;
      return { title };
    }
  });
};

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const scrap = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const urlList = await getAllUrl(browser);
  let results = [];
  for (const url of urlList) {
    results = [...results, await getDataFromUrl(browser, url)];
    await sleep(100);
  }
  browser.close();
  return results;
};

scrap()
  .then(value => {
    console.log(value);
  })
  .catch(e => console.log(`error: ${e}`));

// function getParents(elem) {
//   var parents = [];
//   var i = 0
//   while(elem.parentNode && elem.parentNode.nodeName.toLowerCase() != 'body') {
//     elem = elem.parentNode;

//     if(elem.childElementCount > 1){
//          parents.push(elem.localName+":nth-child("+ elem.childElementCount+")");
//     }else {
//         parents.push(elem.localName)
//     }
//     i++;
//   }
//   return parents;
// }

// console.log(getParents($0).reverse().join(" > "))
