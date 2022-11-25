import fetch from "node-fetch";
import { HyperspaceClient } from "hyperspace-client-js";

import {
  MarketPlaceActionEnum,
  SortOrderEnum,
  ProjectIdWithAttributes,
  StringInputOperationEnum,
} from "hyperspace-client-js/dist/sdk.js";

const fetchData = async (link: string) => {
  const response = await fetch(link, { method: "GET", redirect: "follow" });

  const data = await response.json();
  return data;
};

export const fetchFloorByTrait = async (
  hsClient: HyperspaceClient,
  projectsInfo: ProjectIdWithAttributes[]
) => {
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

  const floorNft = floors.getMarketPlaceSnapshots.market_place_snapshots![1];

  return floorNft;
};

export const fetchTokenMetadata = async (tokenMint: string) => {
  const data = await fetchData(
    `https://api-mainnet.magiceden.dev/v2/tokens/${tokenMint}`
  );

  return data;
};

export const fetchProject = async (
  hsClient: HyperspaceClient,
  projectId: string
) => {
  const project = await hsClient.searchProjectByName({
    condition: {
      matchName: {
        value: projectId,
        operation: StringInputOperationEnum.Exact,
      },
    },
  });

  if (project.getProjectStatByName.project_stats?.length === 0) return;

  return project.getProjectStatByName.project_stats![0];
};

export const fetchListings = async (
  hsClient: HyperspaceClient,
  projectsInfo: ProjectIdWithAttributes[],
  pageNumber: number = 1
) => {
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
