import { defaultConfig } from "@web3modal/ethers"

const {
  VITE_CHAIN_ID,
  VITE_CHAIN_NAME,
  VITE_CHAIN_CURRENCY,
  VITE_CHAIN_ETHERSCAN_URL,
  VITE_CHAIN_RPC_URL,
  VITE_WALLETCONNECT_PROJECT_ID
} = import.meta.env;


// 1. Get projectId
const projectId = VITE_WALLETCONNECT_PROJECT_ID

// 2. Set chains
const mainnet = {
  chainId: VITE_CHAIN_ID,
  name: VITE_CHAIN_NAME,
  currency: VITE_CHAIN_CURRENCY,
  explorerUrl: VITE_CHAIN_ETHERSCAN_URL,
  rpcUrl: VITE_CHAIN_RPC_URL
}

// 3. Create a metadata object
const metadata = {
  name: 'Provify',
  description: 'Decentralized proof issuer',
  url: 'https://provify.nfpsaraiva.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1 // used for the Coinbase SDK
})

export {
  ethersConfig,
  mainnet,
  projectId
};