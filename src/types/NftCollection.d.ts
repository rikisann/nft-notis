export type NftPrices = {
  lessThanFloor: number | null;
  lessThanPrice: number | null;
};

export type UserEntry = {
  userId: string;
  prices: NftPrices;
};

export type TraitValue = {
  [key: string]: UserEntry[];
};

export type TraitFetchList = {
  traitType: string;
  traitValues: Object<TraitValue>;
};

export default interface NftCollection {
  project_id: string;
  traits: {};
  anyNftList: UserEntry[];
  traitFetchList: TraitFetchList[];
}
