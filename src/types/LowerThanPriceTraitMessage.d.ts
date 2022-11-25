export default interface LowerThanPriceTraitMessage {
  traitType: string;
  traitValue: string;
  price: number;
  desiredPrice: number;
  name: string;
  tokenAddress: string;
}
