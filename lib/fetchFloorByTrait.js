import puppeteer from "puppeteer-core";
import Chromium from "chrome-aws-lambda";
// import { executablePath } from "puppeteer";

export default async function fetchFloorByTrait(type, value) {
  const browser = await puppeteer.launch({
    executablePath: await Chromium.executablePath,
  });

  const page = await browser.newPage();
  const formattedTraitType = type.trim().split(" ").join("%20");
  const formattedTraitValue = value.trim().split(" ").join("%20");

  page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
  );

  await page.goto(
    `https://api-mainnet.magiceden.io/rpc/getListedNFTsByQueryLite?q=%7B%22%24match%22%3A%7B%22%24or%22%3A%5B%7B%22collectionSymbol%22%3A%22y00ts%22%7D%2C%7B%22onChainCollectionAddress%22%3A%224mKSoDDqApmF1DqXvVTSL6tu2zixrSSNjqMxUnwvVzy2%22%7D%5D%2C%22%24and%22%3A%5B%7B%22%24or%22%3A%5B%7B%22attributes%22%3A%7B%22%24elemMatch%22%3A%7B%22trait_type%22%3A%22${formattedTraitType}%22%2C%22value%22%3A%22${formattedTraitValue}%22%7D%7D%7D%5D%7D%5D%7D%2C%22%24sort%22%3A%7B%22takerAmount%22%3A1%7D%2C%22%24skip%22%3A1%2C%22%24limit%22%3A1%2C%22status%22%3A%5B%5D%7D`
  );

  const data = await page.evaluate(
    () => document.querySelector("pre").innerHTML
  );

  const jsonData = JSON.parse(data);

  await browser.close();

  return jsonData.results[0];
}
