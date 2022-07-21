import { TokenInfo } from "@uniswap/token-lists";
import bsc_testnet from "../../src/bsc_testnet.tokens.json";
import godwoken_testnet from "../../src/godwoken_testnet.tokens.json";
import ropsten from "../../src/ropsten.tokens.json";

type IRawToken = Pick<TokenInfo, "address" | "name" | "symbol"> &
  Partial<Pick<TokenInfo, "logoURI" | "decimals">> & {
    isExperimental?: boolean;
    logoFile?: string;
  };

type IRawTokenListJson = readonly IRawToken[];

export const WEB3_NETWORK_NAMES = [
  "bsc_testnet",
  "godwoken_testnet",
  "ropsten",
] as const;
export type IWeb3Network = typeof WEB3_NETWORK_NAMES[number];

// assert the JSON is valid
const rawTokensJson: {
  [network in IWeb3Network]: [number, IRawTokenListJson];
} = {
  bsc_testnet: [97, bsc_testnet],
  godwoken_testnet: [71401, godwoken_testnet],
  ropsten: [3, ropsten],
};

export const getNetworkTokens = (network: IWeb3Network): IRawTokenListJson =>
  rawTokensJson[network][1];

export const rawTokens: readonly (IRawToken & {
  chainId: number;
})[] = Object.values(rawTokensJson).flatMap(([chainId, tokens]) =>
  tokens.map((tok) => ({ ...tok, chainId }))
);
