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
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx++;
  }
}

//Logs the memos stored on-chain from coffee purchases
async function printMemos(memos) {
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
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  //get contract + deploy
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed();
  // console.log("BuyMeACoffee deployed to :  ", buyMeACoffee.address);

  // check account balance before purchase
  const addresses = [owner.address, tipper.address, buyMeACoffee.address];
  console.log("== start ==");
  await printBalances(addresses);

  //buy owner coffee

  const tip = { value: hre.ethers.utils.parseEther("1")};

  await buyMeACoffee.connect(tipper).buyCoffee("First Tipper", "Heres a Coffee", tip);

  await buyMeACoffee.connect(tipper2).buyCoffee("Tipperr 2", "Keep Coding", tip);

  await buyMeACoffee.connect(tipper3).buyCoffee("Tipster 3", "Stay Curious", tip);

  // check balance after transaction
  console.log("== after tip ==");
  await printBalances(addresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
