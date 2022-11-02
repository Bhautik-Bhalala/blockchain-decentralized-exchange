const hre = require("hardhat");

async function main() {

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();

  await token.deployed();

  console.log(
    `Deployed to ${token.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
