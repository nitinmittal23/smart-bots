# Savify

Smart Savings Account DeFi Platform doing automatic funds transfer to the highest savings return Platform using InstaDapp DSA and Biconomy.

## Pre-requisites :
1. Install Metamask in your browser (Chrome : webstore , Mozilla: Add-ons). Code will show a message if its not installed.
2. Signup in Metamask and add some ether in your Kovan Test Network because all the transactions fee will be deducted in Ether.

## How to run the code:
1. Install all Dependencies

    `npm install`

2. Run index.html file in your browser using "http-server" or use "npx http-server".

    `http-server` or `npx http-server`

3. Create a 1:1 Liquidity pool of both Aave and Compound Dai(just for Kovan Test-net) in your DSA Account. For example in our case, We added 50 Aave Dai and 50 Compound Dai in our DSA Account. 

#### For Aave DAI - `https://testnet.aave.com/faucet` 
#### For Compound DAI - `https://app.compound.finance/` or via Uniswap Exchange

## InstaDapp DSA Function:

### Deposit
To deposit the DAI in your DSA Account.

### WithDraw
To withdraw the DAI from your DSA Account into your MetaMask.

### Refinance 
#### (Happens Automatically in the Background after every 30 seconds after comparing interest rates across platform)
For automatic funds transfer to the Highest Savings return Platform. 
For this functionality we have used Biconomy and Gnosis forwarder Contract for Automatic funds transfer (Meta Transaction). For this, we had to Integrate our Demo DSA account with Biconomy, Hence, this functionality cannot be used by any other DSA account at this moment. 

## Demo UseCase

Currently on Kovan testnet of InstaDapp, refinance functionality as of now is only available for Aave, Compound and MakerDao. We have build our usecase to transfer funds from Aave to Compound or vice-versa, MakerDao is excluded since actual supply rate is 0%.

Once Other lending Protocols are available on Kovan, we will Integrate our usecase with those Platforms as well. We aim to capture all the tokens being offered on these protocols for supply on our interface. For the sake of demonstrating our Usecase, we have chosen DAI. 

## Biconomy support for Gnosis contract wallet

By using Authority function, we have given Authority to our Gnosis Forwarder contract to enable meta-transactions. We have used Biconomy relayer Insfrastructure to automatically pay gas fees for our refinance feature (Automatic Funds Transfer). 

