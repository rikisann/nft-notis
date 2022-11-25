import {
  LowerThanFloorTraitMessage,
  LowerThanPriceTraitMessage,
  LowerThanPriceAnyMessage,
  LowerThanFloorMessage,
} from "../types/types";
import { sendMessage } from "../lib/lib.js";

export const sendLowerThanFloorTraitMessage = (
  message: LowerThanFloorTraitMessage
) => {
  const link = `https://www.hyperspace.xyz/token/${message.tokenAddress}`;

  const text = `\nListing Price: ${message.price.toFixed(
    2
  )} SOL\nTrait Floor Price: ${message.floorPrice.toFixed(
    2
  )} SOL\nFloor difference: ${(message.floorPrice - message.price).toFixed(
    2
  )} SOL\n${message.traitType[0] + message.traitType.slice(1)} - ${
    message.traitValue[0] + message.traitValue.slice(1)
  }\n${link}`;

  sendMessage({
    subject: message.name,
    text,
  });
};

export const sendLowerThanPriceTraitMessage = (
  message: LowerThanPriceTraitMessage
) => {
  const link = `https://www.hyperspace.xyz/token/${message.tokenAddress}`;

  const text = `\nListing Price: ${message.price.toFixed(
    2
  )} SOL\nDesired Price: ${message.desiredPrice.toFixed(
    2
  )} SOL\nPrice Difference: ${(message.desiredPrice - message.price).toFixed(
    2
  )} SOL\n${
    message.traitType[0].toUpperCase() + message.traitType.slice(1)
  } - ${
    message.traitValue[0].toUpperCase() + message.traitValue.slice(1)
  }\n${link}`;

  sendMessage({
    subject: message.name,
    text,
  });
};

export const sendLowerThanAnyNftMessage = (
  message: LowerThanPriceAnyMessage
) => {
  const link = `https://www.hyperspace.xyz/token/${message.tokenAddress}`;

  const text = `\nListing Price: ${message.price.toFixed(
    2
  )} SOL\nDesired Price: ${message.desiredPrice.toFixed(
    2
  )} SOL\nPrice Difference: ${(message.desiredPrice - message.price).toFixed(
    2
  )} SOL\n${link}`;

  sendMessage({
    subject: message.name,
    text,
  });
};

export const sendLowerThanFloorMessage = (message: LowerThanFloorMessage) => {
  const link = `https://www.hyperspace.xyz/token/${message.tokenAddress}`;

  const text = `\nListing Price: ${message.price.toFixed(
    2
  )} SOL\nFloor Price: ${message.floorPrice.toFixed(
    2
  )} SOL\nPrice Difference: ${(message.floorPrice - message.price).toFixed(
    2
  )} SOL\n${link}`;

  sendMessage({
    subject: message.name,
    text,
  });
};
