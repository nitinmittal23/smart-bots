# Savify

Smart Savings Account DeFi Platform doing automatic funds transfer to the highest savings return Platform using InstaDapp DSA and Biconomy.

## Pre-requisites :
1. Install Metamask in your browser (Chrome : webstore , Mozilla: Add-ons). Code will show a message if its not installed.
2. Signup in Metamask and add some ether in your Kovan Test Network because all the transactions fee will be deducted from you account.

## How to run the code:
1. Install all Dependencies

    `npm install`

2. Run index.html file in your browser using "http-server" or use "npx http-server".

    `http-server` or `npx http-server`


## InstaDapp DSA Function:

### Deposit
To deposit the DAI in your DSA Account.

### WithDraw
To withdraw the DAI from your DSA Account into your MetaMask.

### Toggle (Happens Automatically in the Background after every 30 seconds after comparing interest rates across platform)
For automatic funds transfer to the Highest Savings return Platform. 
For this functionality we have used Biconomy and Gnosis forwarder Contract for Automatic funds transfer (Meta Transaction). For this, we had to Integrate our Demo DSA account with Biconomy, Hence, this functionality cannot be used by any other DSA account at this moment. 

## Demo UseCase

Since on Kovan testnet, refinance functionality as of now is only available for makerDao and compound. We have build our usecase to transfer funds from Maker to Compound or vice-versa. And since, currently MakerDao gives Saving option for DAI, we have built our Demo Usecase for DAI only. 

Once Aave and Dydx refinance functionality is available on Kovan, we will Integrate our usecase with these two Platforms as well. Currently, DAI address for Aave and compound are different in Kovan.

## Biconomy support for Gnosis contract wallet

Integration between Gnosis Wallets and Biconomy Relayer Infrastructure has been used by SaviFi Dapp.


