import { fetchListings } from "../helpers/helpers.js";
export default async function fetchAndFormatListings(hsClient, collection) {
    const fetchedListings = await fetchListings(hsClient, [
        {
            project_id: collection.project_id,
        },
    ]);
    if (!fetchedListings.getProjectHistory.market_place_snapshots)
        return;
    const listings = fetchedListings.getProjectHistory.market_place_snapshots.map((listing) => ({
        projectId: collection.project_id,
        desiredMetadata: collection.traitFetchList,
        anyNftList: collection.anyNftList,
        ...listing,
    }));
    return listings;
}
// export default async function gatherListings(
//   hsClient: HyperspaceClient,
//   collection: NftCollection
// ) {
//   const formattedTraits = collection.fetchList.map((trait) => {
//     const values = Object.keys(trait.traitValues);
//     return { name: trait.traitType, type: "CATEGORY", values: values };
//   });
//   const fetchedListings = await fetchListings(hsClient, [
//     {
//       project_id: collection.project_id,
//       attributes: formattedTraits,
//     },
//   ]);
//   if (!fetchedListings.getProjectHistory.market_place_snapshots) return;
//   const listings = fetchedListings.getProjectHistory.market_place_snapshots.map(
//     (listing: any) => ({
//       projectId: collection.project_id,
//       desiredMetadata: collection.fetchList,
//       ...listing,
//     })
//   );
//   return listings;
// }
