import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import InputBox from "./InputBox";
import Spinner from "./Spinner";
import useLottary from "../hooks/useLottary";
import CreateLottery from "./CreateLottery";
import MATIC from "../images/chains/polygon.png";
import WOKE from "../images/tokens/woke.jpg";
import GONE from "../images/tokens/gone.jpg";
import LLC from "../images/tokens/gone.jpg";
import MOON from "../images/tokens/gone.jpg";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const options = [
  {
    name: "CHZ",
    value: "chz",
    img: MATIC,
  },
  {
    name: "CHADZ",
    value: "chadz",
    img: WOKE,
  },
  {
    name: "MC",
    value: "mc",
    img: GONE,
  },
  {
    name: "FANFAN",
    value: "fanfan",
    img: LLC,
  },
  {
    name: "CHSQUAD",
    value: "squad",
    img: MOON,
  },
];

function LottarySection({ referral }) {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [tickets, setTickets] = useState(0);
  const [isCancled, setIsCancled] = useState(false);
  const [prices, setPrices] = useState(null);
  const [loading2, setLoading2] = useState(false);

  const [paymentType, setPaymentType] = useState("chz");
  const [cost, setCost] = useState(0);

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { buyTicket, myTickets, owner, getLotteryPrices } = useLottary();

  const [own, setOwn] = useState(false);

  useEffect(() => {
    const _ownerr = async () => {
      setLoading2(true);
      try {
        const data = await owner();
        setOwn(data);
        const _prices = await getLotteryPrices();
        setPrices(_prices);
        setLoading2(false);
      } catch (err) {
        console.log(err);
        setLoading2(false);
      }
    };
    if (isConnected) _ownerr();
  }, [isConnected]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await myTickets();
      setTickets(data.toString());
    };
    if (address) fetchData();
  }, [address]);
  useEffect(() => {
    if (paymentType === "chz") {
      setCost(amount * prices?.maticPrice);
    } else if (paymentType === "chadz") {
      setCost(amount * prices?.wokePrice);
    } else if (paymentType === "mc") {
      setCost(amount * prices?.gonePrice);
    } else if (paymentType === "fanfan") {
      setCost(amount * prices?.licPrice);
    } else if (paymentType === "squad") {
      setCost(amount * prices?.moonPrice);
    }
  }, [paymentType, amount]);

  const handleBuy = async (e) => {
    if (!amount) {
      toast.error("Please enter the amount!");
      return;
    }
    setIsLoading(true);
    try {
      //(paymentType, amount, referral);
      let unitPrice = 0;
      if (paymentType === "chz") {
        unitPrice = prices.maticPrice;
      } else if (paymentType === "chadz") {
        unitPrice = prices.wokePrice;
      } else if (paymentType === "mc") {
        unitPrice = prices.gonePrice;
      } else if (paymentType === "fanfan") {
        unitPrice = prices.licPrice;
      } else if (paymentType === "squad") {
        unitPrice = prices.moonPrice;
      }
      await buyTicket(paymentType, amount, referral, unitPrice);
    } catch (e) {
      //(e);
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };

  return loading2 ? (
    <Spinner />
  ) : (
    <>
      {own ? (
        <CreateLottery />
      ) : (
        <div className="flex flex-col gap-2">
          {!isCancled && (
            <>
              <div className="text-lg text-gray-200 font-semibold uppercase flex justify-between">
                <div className="flex items-center justify-between gap-2 w-full">
                  <h2 className="w-[60%]">Select Payment Type:</h2>
                  {/* <img src={WOKE} alt="WOKE" /> */}

                  <select
                    className="w-[30%] bg-[#27262C] rounded-md p-1"
                    onChange={(e) => {
                      //("Selecting");
                      setPaymentType(e.target.value);
                    }}
                  >
                    {options.map((option, index) => {
                      return (
                        <option value={option.value} key={index}>
                          {" "}
                          <p>{option.name}</p>
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="flex justify-between">
                <p className="text-lg">MY TICKETS</p>
                <p className="text-lg">{tickets}</p>
              </div>
              <InputBox
                name="amount"
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter the amount"
              />
            </>
          )}

          <div className="flex justify-end">
            <p className="text-lg">COST :</p>&nbsp;
            <p className="text-lg">{isNaN(cost) ? 0 : cost}</p>
            &nbsp;
            <p className="text-lg">
              {paymentType === "chz"
                ? "CHZ"
                : paymentType === "chadz"
                ? "CHADZ"
                : paymentType === "mc"
                ? "MC"
                : paymentType === "fanfan"
                ? "FAN FAN"
                : "SQUAD"}
            </p>
          </div>

          <button
            className="uppercase text-lg bg-[#4f46e5] hover:bg-[#5b54e8] px-6 py-2 rounded-lg mt-4 shadow-xl"
            onClick={handleBuy}
            disabled={false}
          >
            {isLoading ? <Spinner /> : isCancled ? "Withdraw" : "Buy"}
          </button>
        </div>
      )}
    </>
  );
}

export default LottarySection;
