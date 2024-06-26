import { defaultConfig } from "@web3modal/ethers"

// 1. Get projectId
const projectId = "random"

// 2. Set chains
const mainnet = {
  chainId: 31337,
  name: 'Localhost',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'http://localhost:8545'
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