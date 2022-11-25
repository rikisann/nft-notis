import dotenv from "dotenv";
import mongoose from "mongoose";
import * as lib from "./lib/lib.js";
import nftCollections from "./traits.js";
import { wait, sortArrayByBlockTimestamp } from "./helpers/helpers.js";
import { HyperspaceClient } from "hyperspace-client-js";
dotenv.config();

const hsClient = new HyperspaceClient(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSaWtpIiwibmFtZSI6Ikh5cGVyc3BhY2UiLCJpYXQiOjE1MTYyMzkwMjJ9.iLr-HBp12Scf4K3pkJJ38wo036ecz6F3aASyGq34BtM"
);

const main = async () => {
  // Fetch all collections from db

  // Figure out how to make message fit into twilio message

  let fetchFunctions = [];

  // Turn all collections into a promise
  for (const collection of nftCollections) {
    fetchFunctions.push(
      new Promise(async (resolve, reject) => {
        const listings = await lib.fetchAndFormatListings(hsClient, collection);
        if (!listings) reject();
        resolve(listings);
      })
    );
  }

  // Fetch all listings
  const listingsResponses = await Promise.all(fetchFunctions);

  // Format them into one array
  const listings: any = listingsResponses.flat(1);

  // Sort from earliest block timestamp to latest
  const sortedListings = sortArrayByBlockTimestamp(listings);

  // Check each listing
  sortedListings.forEach((listing: any) =>
    lib.checkListings(hsClient, listing)
  );
};

console.log("Online");
mongoose.connect(process.env.MONGODB_URI!).then(async () => {
  while (true) {
    await main();
    await wait(10000);
  }
});
