import { TokenInfo } from "@uniswap/token-lists";
import bsc_testnet from "../../src/bsc_testnet.tokens.json";
import gw_testnet from "../../src/gw_testnet.tokens.json";
import rinkeby from "../../src/rinkeby.tokens.json";

type IRawToken = Pick<TokenInfo, "address" | "name" | "symbol"> &
  Partial<Pick<TokenInfo, "logoURI" | "decimals">> & {
    isExperimental?: boolean;
    logoFile?: string;
  };

type IRawTokenListJson = readonly IRawToken[];

export const WEB3_NETWORK_NAMES = [
  "bsc_testnet",
  "gw_testnet",
  "rinkeby",
] as const;
export type IWeb3Network = typeof WEB3_NETWORK_NAMES[number];

// assert the JSON is valid
const rawTokensJson: {
  [network in IWeb3Network]: [number, IRawTokenListJson];
} = {
  bsc_testnet: [97, bsc_testnet],
  gw_testnet: [71401, gw_testnet],
  rinkeby: [4, rinkeby],
};

export const getNetworkTokens = (network: IWeb3Network): IRawTokenListJson =>
  rawTokensJson[network][1];

export const rawTokens: readonly (IRawToken & {
  chainId: number;
})[] = Object.values(rawTokensJson).flatMap(([chainId, tokens]) =>
  tokens.map((tok) => ({ ...tok, chainId }))
);
