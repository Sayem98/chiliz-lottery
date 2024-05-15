import Web3 from "web3";
import {
  LOTTERY_CONTRACT_ADDRESS,
  WOKE_CONTRACT_ADDRESS,
  GONE_CONTRACT_ADDRESS,
  LIC_CONTRACT_ADDRESS,
  MOON_CONTRACT_ADDRESS,
  JOKER_CONTRACT_ADDRESS,
  LOTTERY_CONTRACT_ABI,
  TOKEN_CONTRACT_ABI,
} from "../contract/contract";
import toast from "react-hot-toast";
import { N } from "ethers";

function useLottary() {
  const getWeb3 = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask!");
      return;
    }
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    return web3;
  };

  const getContract = async (web3, contractAddress, contractAbi) => {
    const contract = new web3.eth.Contract(contractAbi, contractAddress);
    return contract;
  };

  const buyTicket = async (paymentType, amount, ref, uintPrice) => {
    const web3 = await getWeb3();

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const chain_id = await web3.eth.getChainId();

    console.log(paymentType);

    const contract = await getContract(
      web3,
      LOTTERY_CONTRACT_ADDRESS,
      LOTTERY_CONTRACT_ABI
    );
    if (!account) {
      toast.error("Please connect your wallet!");
      return;
    }
    const gas = await web3.eth.getGasPrice();
    //(gas);
    // check if ref empty
    if (ref === "") {
      ref = "0x0000000000000000000000000000000000000000";
    }
    //(ref);
    if (paymentType === "chz") {
      const _pay = Web3.utils.toWei((amount * uintPrice).toString(), "ether");

      await contract.methods.buyTickets(0, amount, ref).send({
        from: account,
        value: _pay,
      });
    } else if (paymentType === "chadz") {
      let approve_amount = amount * uintPrice;
      //(approve_amount);
      approve_amount = Number(approve_amount) * 10000;

      const wokeContract = await getContract(
        web3,
        WOKE_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ABI
      );

      try {
        // approve
        await wokeContract.methods
          .approve(LOTTERY_CONTRACT_ADDRESS, approve_amount)
          .send({ from: account });

        await contract.methods.buyTickets(1, amount, ref).send({
          from: account,
        });
      } catch (e) {
        //(e);
        toast.error("Transaction failed");
      }
    } else if (paymentType === "mc") {
      let approve_amount = amount * uintPrice;
      approve_amount = Web3.utils.toWei(approve_amount.toString(), "ether");

      const goneContract = await getContract(
        web3,
        GONE_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ABI
      );

      try {
        // approve
        await goneContract.methods
          .approve(LOTTERY_CONTRACT_ADDRESS, approve_amount)
          .send({ from: account });

        await contract.methods.buyTickets(2, amount, ref).send({
          from: account,
        });
      } catch (e) {
        toast.error("Transaction failed");
      }
    } else if (paymentType === "fanfan") {
      let approve_amount = amount * uintPrice;
      approve_amount = Web3.utils.toWei(approve_amount.toString(), "ether");

      const licContract = await getContract(
        web3,
        LIC_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ABI
      );

      try {
        // approve
        await licContract.methods
          .approve(LOTTERY_CONTRACT_ADDRESS, approve_amount)
          .send({ from: account });

        await contract.methods.buyTickets(3, amount, ref).send({
          from: account,
        });
      } catch (e) {
        toast.error("Transaction failed");
      }
    } else if (paymentType === "squad") {
      let approve_amount = amount * uintPrice;
      approve_amount = Web3.utils.toWei(approve_amount.toString(), "ether");

      const moonContract = await getContract(
        web3,
        MOON_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ABI
      );

      try {
        // approve
        await moonContract.methods
          .approve(LOTTERY_CONTRACT_ADDRESS, approve_amount)
          .send({ from: account });

        await contract.methods.buyTickets(4, amount, ref).send({
          from: account,
        });
      } catch (e) {
        toast.error("Transaction failed");
      }
    } else if (paymentType === "joker") {
      let approve_amount = amount * uintPrice;
      approve_amount = Web3.utils.toWei(approve_amount.toString(), "ether");

      const jokerContract = await getContract(
        web3,
        JOKER_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ABI
      );

      try {
        // approve
        await jokerContract.methods
          .approve(LOTTERY_CONTRACT_ADDRESS, approve_amount)
          .send({ from: account });

        await contract.methods.buyTickets(5, amount, ref).send({
          from: account,
        });
      } catch (e) {
        toast.error("Transaction failed");
      }
    } else {
      toast.error("Invalid payment type");
    }
  };

  const myTickets = async () => {
    if (!window.ethereum) return; //("Please install MetaMask!");
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const contract = await getContract(
      web3,
      LOTTERY_CONTRACT_ADDRESS,
      LOTTERY_CONTRACT_ABI
    );

    const tickets = await contract.methods.myTickets().call({
      from: account,
    });
    //(tickets);
    return tickets;
  };
  const getData = async () => {
    const web3 = await getWeb3();
    const contract = await getContract(
      web3,
      LOTTERY_CONTRACT_ADDRESS,
      LOTTERY_CONTRACT_ABI
    );

    const latest_lottery_id = await contract.methods.numberOfLotteries().call();
    //(Number(latest_lottery_id));
    if (Number(latest_lottery_id) === 0) {
      //("ok");
      return {};
    }
    //("getting");
    const lottery = await contract.methods
      .lotteries(Number(latest_lottery_id) - 1)
      .call();
    //(lottery);
    return lottery;
  };
  const wokeBalanceF = async () => {
    const web3 = await getWeb3();
    const wokeToken = await getContract(
      web3,
      WOKE_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_ABI
    );

    const balance = await wokeToken.methods
      .balanceOf(LOTTERY_CONTRACT_ADDRESS)
      .call();
    //(balance);
    return Number(balance) / 10000;
  };

  const goneBalanceF = async () => {
    const web3 = await getWeb3();
    const goneToken = await getContract(
      web3,
      GONE_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_ABI
    );

    const balance = await goneToken.methods
      .balanceOf(LOTTERY_CONTRACT_ADDRESS)
      .call();
    //(balance);
    return Web3.utils.fromWei(balance.toString(), "ether");
  };

  const licBalanceF = async () => {
    const web3 = await getWeb3();
    const goneToken = await getContract(
      web3,
      LIC_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_ABI
    );

    const balance = await goneToken.methods
      .balanceOf(LOTTERY_CONTRACT_ADDRESS)
      .call();
    //(balance);
    return Web3.utils.fromWei(balance.toString(), "ether");
  };
  const moonBalanceF = async () => {
    const web3 = await getWeb3();
    const goneToken = await getContract(
      web3,
      MOON_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_ABI
    );

    const balance = await goneToken.methods
      .balanceOf(LOTTERY_CONTRACT_ADDRESS)
      .call();
    //(balance);
    return Web3.utils.fromWei(balance.toString(), "ether");
  };
  const jokerBalanceF = async () => {
    const web3 = await getWeb3();
    const goneToken = await getContract(
      web3,
      JOKER_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_ABI
    );

    const balance = await goneToken.methods
      .balanceOf(LOTTERY_CONTRACT_ADDRESS)
      .call();
    //(balance);
    return Web3.utils.fromWei(balance.toString(), "ether");
  };

  const maticBalanceF = async () => {
    const web3 = await getWeb3();
    const balance = await web3.eth.getBalance(LOTTERY_CONTRACT_ADDRESS);
    return Web3.utils.fromWei(balance.toString(), "ether");
  };

  const getWinners = async () => {
    const web3 = await getWeb3();
    const contract = await getContract(
      web3,
      LOTTERY_CONTRACT_ADDRESS,
      LOTTERY_CONTRACT_ABI
    );
    const winners = await contract.methods.winners().call();
    console.log(winners);
    return winners;
  };

  const owner = async () => {
    const web3 = await getWeb3();
    const contract = await getContract(
      web3,
      LOTTERY_CONTRACT_ADDRESS,
      LOTTERY_CONTRACT_ABI
    );
    const owner = await contract.methods.owner().call();
    //(owner);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    //(account);
    if (owner === account) return true;
    else return false;
  };

  const createLottery = async (
    startTime,
    endTime,
    maticPrice,
    wokePrice,
    gonePrice,
    licPrice,
    moonPrice
  ) => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const chain_id = await web3.eth.getChainId();

    const contract = await getContract(
      web3,
      LOTTERY_CONTRACT_ADDRESS,
      LOTTERY_CONTRACT_ABI
    );

    await contract.methods
      .createLottery(
        startTime,
        endTime,
        maticPrice,
        wokePrice,
        gonePrice,
        licPrice,
        moonPrice
      )
      .send({ from: account, gas: 300000, gasPrice: 250000000000 });
  };

  const getLotteryPrices = async () => {
    const web3 = await getWeb3();
    const contract = await getContract(
      web3,
      LOTTERY_CONTRACT_ADDRESS,
      LOTTERY_CONTRACT_ABI
    );

    try {
      let maticPrice = await contract.methods.chzPrice().call();
      maticPrice = Web3.utils.fromWei(maticPrice.toString(), "ether");

      let wokePrice = await contract.methods.chadzPrice().call();
      wokePrice = Number(wokePrice) / 10000;
      let gonePrice = await contract.methods.mcPrice().call();
      gonePrice = Web3.utils.fromWei(gonePrice.toString(), "ether");

      let licPrice = await contract.methods.fanfanPrice().call();
      licPrice = Web3.utils.fromWei(licPrice.toString(), "ether");

      let moonPrice = await contract.methods.squadPrice().call();
      moonPrice = Web3.utils.fromWei(moonPrice.toString(), "ether");
      return {
        maticPrice,
        wokePrice,
        gonePrice,
        licPrice,
        moonPrice,
      };
    } catch (e) {
      console.log(e);
    }
  };

  return {
    buyTicket,
    getData,
    myTickets,
    wokeBalanceF,
    goneBalanceF,
    maticBalanceF,
    licBalanceF,
    moonBalanceF,
    jokerBalanceF,
    getWinners,
    owner,
    createLottery,
    getLotteryPrices,
  };
}

export default useLottary;
