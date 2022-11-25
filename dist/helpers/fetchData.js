import fetch from "node-fetch";
import { MarketPlaceActionEnum, SortOrderEnum, StringInputOperationEnum, } from "hyperspace-client-js/dist/sdk.js";
const fetchData = async (link) => {
    const response = await fetch(link, { method: "GET", redirect: "follow" });
    const data = await response.json();
    return data;
};
export const fetchFloorByTrait = async (hsClient, projectsInfo) => {
    const floors = await hsClient.getMarketplaceSnapshot({
        condition: {
            projects: projectsInfo,
        },
        paginationInfo: {
            page_number: 1,
            page_size: 2,
        },
        orderBy: {
            field_name: "lowest_listing_price",
            sort_order: SortOrderEnum.Asc,
        },
    });
    const floorNft = floors.getMarketPlaceSnapshots.market_place_snapshots[1];
    return floorNft;
};
export const fetchTokenMetadata = async (tokenMint) => {
    const data = await fetchData(`https://api-mainnet.magiceden.dev/v2/tokens/${tokenMint}`);
    return data;
};
export const fetchProject = async (hsClient, projectId) => {
    const project = await hsClient.searchProjectByName({
        condition: {
            matchName: {
                value: projectId,
                operation: StringInputOperationEnum.Exact,
            },
        },
    });
    if (project.getProjectStatByName.project_stats?.length === 0)
        return;
    return project.getProjectStatByName.project_stats[0];
};
export const fetchListings = async (hsClient, projectsInfo, pageNumber = 1) => {
    const listings = await hsClient.getProjectHistory({
        condition: {
            projects: projectsInfo,
            actionTypes: [MarketPlaceActionEnum.Listing],
        },
        paginationInfo: {
            page_number: pageNumber,
        },
    });
    return listings;
};
