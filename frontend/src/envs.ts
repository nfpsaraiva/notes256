const config = {
  CONTRACT_ADDRESS: import.meta.env.VITE_CONTRACT_ADDRESS,
  CHAIN_ID: import.meta.env.VITE_CHAIN_ID,
  CHAIN_NAME: import.meta.env.VITE_CHAIN_NAME,
  CHAIN_CURRENCY: import.meta.env.VITE_CHAIN_CURRENCY,
  CHAIN_ETHERSCAN_URL: import.meta.env.VITE_CHAIN_ETHERSCAN_URL,
  CHAIN_RPC_URL: import.meta.env.VITE_CHAIN_RPC_URL,
  ALCHEMY_API_KEY: import.meta.env.VITE_ALCHEMY_API_KEY,
  PROOF_TOKEN_URI: import.meta.env.VITE_PROOF_TOKEN_URI,
  WALLETCONNECT_PROJECT_ID: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  APP_VERSION: import.meta.env.VITE_APP_VERSION
};

export default config;