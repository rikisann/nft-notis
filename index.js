import * as lib from "./lib/lib.js";
import wantedTraits from "./traits.js";
import * as helpers from "./helpers/helpers.js";

let latestSlot = await helpers.getLatestSlot();

const main = async () => {
  const listings = await helpers.fetchListings();

  for (const listing of listings.reverse()) {
    await helpers.wait(1000);

    const { tokenMint, price: listingPrice } = listing;

    // Fetch the latest activies of the token
    const tokenActivity = await helpers.fetchTokenActivity(tokenMint);

    for (const activity of tokenActivity) {
      // If the activity type isn't list keep looking
      if (activity.type !== "list") continue;

      // If activity type is list but the slot is less than the latest processed slot break out of the loop
      if (activity.slot <= latestSlot) break;

      // Set the latest slot checked the current NFTs slot
      latestSlot = activity.slot;

      const tokenMetadata = await helpers.fetchTokenMetadata(tokenMint);
      // Iterate through the NFT's traits
      tokenMetadata.attributes.forEach(async (trait) => {
        // If trait is in wanted traits
        if (wantedTraits[trait["trait_type"]].includes(trait.value)) {
          const traitFloor = await lib.fetchFloorByTrait(
            trait["trait_type"],
            trait.value
          );

          lib.sendMessage({
            traitType: trait["trait_type"],
            traitValue: trait.value,
            price: listingPrice,
            floorPrice: traitFloor.price,
            name: tokenMetadata.name,
            link: `https://magiceden.io/item-details/${tokenMint}`,
          });
          // if (listingPrice < traitFloor.price - 5) {
          // }
        }
      });
    }
  }
};

console.log("Online");
while (true) {
  await main();
}
