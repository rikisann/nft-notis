import fetch from "node-fetch";
import { Connection, clusterApiUrl } from "@solana/web3.js";

export const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const fetchData = async (link) => {
  const response = await fetch(link, { method: "GET", redirect: "follow" });

  const data = await response.json();
  return data;
};

export const fetchListings = async () => {
  const data = await fetchData(
    "https://api-mainnet.magiceden.dev/v2/collections/y00ts/listings?offset=0&limit=20"
  );

  return data;
};

export const fetchTokenActivity = async (tokenMint) => {
  const data = await fetchData(
    `https://api-mainnet.magiceden.dev/v2/tokens/${tokenMint}/activities`
  );

  return data;
};

export const fetchTokenMetadata = async (tokenMint) => {
  const data = await fetchData(
    `https://api-mainnet.magiceden.dev/v2/tokens/${tokenMint}`
  );

  return data;
};

export const getLatestSlot = async () => {
  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
  const slot = await connection.getSlot();
  return slot;
};
