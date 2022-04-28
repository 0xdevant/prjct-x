# Customizable ERC721 Collection Minting Package

## NFT Launch Technical Flow
1. Generate the images and jsons (Generator Program)
2. Prepare a hidden.json and a hidden image for displaying on marketplaces while the NFT is not revealed yet
3. Upload the hidden image to IPFS to get the CID, 
then replace the CID of “image” value in hidden.json with the CID 
4. Upload all the real images to IPFS to get the CID, 
then replace the CID of “image” value of all real metadata jsons with the CID
5. Configure the relevant contractName, tokenName, tokenSymbol, price, max supply etc in ```CollectionConfig.js```, and replace the CID you get from uploading the hidden.json within the ```__CID__``` of the hiddenMetadataUri
6. Deploy the smart contract by running command ```yarn deploy --network mainnet``` (```mainnet``` depends on which network you want the contract to deploy on, this principle applies to all the below commands)
7. When whitelist sale is going to happen:
Run command ```yarn whitelist-open --network mainnet``` to change the smart contract whitelistMintEnabled state to true
People will mint via the frontend using the whiteListMint function by providing a proof generated via MerkleTree.js
8. After the whitelist sale is completed:
	Run command ```yarn whitelist-close --network mainnet``` to change the smart contract
whitelistMintEnabled state to false
9. When public sale is going to happen:
Run command ```yarn public-sale-open --network mainnet``` to change the smart contract
paused state to false to start the public mint
People will mint using the mint function
10. After the public sale is completed:
	Run command ```yarn public-sale-close --network mainnet``` to change the smart contract
paused state to true to stop the public sale mint
11. When you want to reveal the collection:
Init COLLECTION_URI_PREFIX in the .env file, and run command ```yarn reveal --network mainnet``` to change the smart contract revealed state to true to make it happen
