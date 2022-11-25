import * as helpers from "../helpers/helpers.js";
import { getLatestBlockTimestamp, fetchProject } from "../helpers/helpers.js";
let latestBlockTimestamp = await getLatestBlockTimestamp();
export default async function checkListings(hsClient, listing) {
    // If activity type is list but the slot is less than the latest processed slot break out of the loop
    if (listing.market_place_state?.block_timestamp <= latestBlockTimestamp)
        return;
    // Set the latest slot checked the current NFTs slot
    latestBlockTimestamp = listing.market_place_state?.block_timestamp;
    const listingNftPrice = listing.market_place_state.price;
    let sentNotisUserIds = [];
    const tokenMetadata = await helpers.fetchTokenMetadata(listing.token_address);
    if (!tokenMetadata)
        return;
    // Iterate through token's fetched metadata
    for (const listingMetadata of tokenMetadata.attributes) {
        // Iterate through metadata that user desires
        for (const metadata of listing.desiredMetadata) {
            // If trait type on token's metadata matches desired traits metadata
            if (listingMetadata.trait_type === metadata.traitType) {
                // Iterate through all the values in desired values metadata
                for (const metadataValue of Object.keys(metadata.traitValues)) {
                    // If trait value on token's metadata matches desired traits metadata
                    if (listingMetadata.value === metadataValue) {
                        const traitFloor = await helpers.fetchFloorByTrait(hsClient, [
                            {
                                project_id: listing.projectId,
                                attributes: [
                                    {
                                        name: metadata.traitType,
                                        type: "CATEGORY",
                                        values: [metadataValue],
                                    },
                                ],
                            },
                        ]);
                        if (!traitFloor.lowest_listing_mpa)
                            return;
                        const floorPrice = Number(traitFloor.lowest_listing_mpa.price);
                        const formattedFloorPrice = Math.round(floorPrice * 100) / 100;
                        for (const user of metadata.traitValues[listingMetadata.value]) {
                            if (user.prices.lessThanFloor &&
                                listingNftPrice <=
                                    formattedFloorPrice - user.prices.lessThanFloor) {
                                helpers.sendLowerThanFloorTraitMessage({
                                    traitType: metadata.traitType,
                                    traitValue: metadataValue,
                                    price: listingNftPrice,
                                    floorPrice: formattedFloorPrice,
                                    name: listing.name,
                                    tokenAddress: listing.token_address,
                                });
                                sentNotisUserIds.push(user.userId);
                            }
                            // INTEGRATE THE DEPENDENCY TRAITS
                            if (user.prices.lessThanPrice &&
                                listingNftPrice <= user.prices.lessThanPrice) {
                                helpers.sendLowerThanPriceTraitMessage({
                                    traitType: metadata.traitType,
                                    traitValue: metadataValue,
                                    price: listingNftPrice,
                                    desiredPrice: user.prices.lessThanPrice,
                                    name: listing.name,
                                    tokenAddress: listing.token_address,
                                });
                                sentNotisUserIds.push(user.userId);
                            }
                        }
                    }
                }
            }
        }
    }
    // Check anyNftList
    for (const user of listing.anyNftList) {
        // Less than a certain price
        if (user.prices.lessThanPrice &&
            listingNftPrice <= user.prices.lessThanPrice &&
            !sentNotisUserIds.includes(user.userId)) {
            helpers.sendLowerThanAnyNftMessage({
                price: listingNftPrice,
                desiredPrice: user.prices.lessThanPrice,
                name: listing.name,
                tokenAddress: listing.token_address,
            });
        }
        // x amount less than global floor
        if (user.prices.lessThanFloor && !sentNotisUserIds.includes(user.userId)) {
            // Fetch collection floor
            const project = await fetchProject(hsClient, listing.projectId);
            if (project?.floor_price <= user.prices.lessThanFloor) {
                helpers.sendLowerThanFloorMessage({
                    price: listingNftPrice,
                    floorPrice: Number(project?.floor_price),
                    name: listing.name,
                    tokenAddress: listing.token_address,
                });
            }
        }
    }
}
