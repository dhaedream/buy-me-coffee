// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

//returns ether balance of any given address
async function getBalance(address) {
  // using waffle provider to get balance
  const balanceBigInt = await hre.waffle.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

// calls get balance on multiple addresses
// prints out looped list addresses
async function printBalances(addresses) {
  let idx = 0;
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, ${tipper} (${tipperAddress}) said: ${message}`
    );
  }
}

async function main() {
  // get example accounts/default hardhat owner addresses
  cont[(owner, tipper, tipper2, tipper3)] = await hre.ethers.getSigners();

  //get contract to deploy

  // deploy contract

  // check account balance before purchase

  // withdraw funds

  // check balance after withdraw

  // read all memos left for owner
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
