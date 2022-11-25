import { Connection, clusterApiUrl } from "@solana/web3.js";
export const sortArrayByBlockTimestamp = (input, ascending = true) => {
    let sorted;
    if (ascending) {
        sorted = input.sort((a, b) => a.market_place_state?.block_timestamp -
            b.market_place_state?.block_timestamp);
    }
    else {
        sorted = input.sort((a, b) => b.market_place_state?.block_timestamp -
            a.market_place_state?.block_timestamp);
    }
    return sorted;
};
export const getLatestBlockTimestamp = async () => {
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
    const slot = await connection.getSlot();
    // const block = await connection.getParsedBlock(slot);
    const block = await connection.getBlockTime(slot);
    return block;
};
