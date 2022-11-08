const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  const Token = await hre.ethers.getContractFactory("Token");
  const Exchange = await hre.ethers.getContractFactory("Exchange");

  const accounts = await ethers.getSigners()

  console.log(`Acounts fetched : \n ${accounts[0].address} \n ${accounts[1].address}\n`)

  const LIQ = await Token.deploy("Liquidity" , "LIQ" , "1000000");
  await LIQ.deployed();
  console.log(`LIQUIDITY Deployed to ${LIQ.address}`);

  const mETH = await Token.deploy("MOCK ETHER" , "mETH" , "1000000");
  await mETH.deployed();
  console.log(`mETH Deployed to ${mETH.address}`);

  const SOL = await Token.deploy("SOLIDITY" , "SOL" , "1000000");
  await SOL.deployed();
  console.log(`SOL Deployed to ${SOL.address}`);

  const exchange = await Exchange.deploy(accounts[1].address,10)
  await exchange.deployed()
  console.log(`Exchange Deployed to : ${exchange.address}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

  // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266                                      
  // 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
// Acounts fetched : 
//  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
//  0x70997970C51812dc3A010C7d01b50e0d17dc79C8

// LIQUIDITY Deployed to 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
// mETH Deployed to 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707
// SOL Deployed to 0x0165878A594ca255338adfa4d48449f69242Eb8F
// Exchange Deployed to : 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853


// LIQUIDITY Deployed to 0x809d550fca64d94Bd9F66E60752A544199cfAC3D
// mETH Deployed to 0x4c5859f0F772848b2D91F1D83E2Fe57935348029
// SOL Deployed to 0x1291Be112d480055DaFd8a610b7d1e203891C274
// Exchange Deployed to : 0x5f3f1dBD7B74C6B46e8c44f98792A1dAf8d69154