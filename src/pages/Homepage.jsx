import { useEffect, useState } from "react";
import Header from "../components/Header";
import SwapCard from "../components/SwapCard";
import useLottary from "../hooks/useLottary";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import Web3 from "web3";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

function Homepage() {
  // make a countdown timer

  const [days, setDays] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [data, setData] = useState(null);
  const [maticBalance, setMaticBalance] = useState(0);
  const [wokeBalance, setWokBalance] = useState(0);
  const [goneBalance, setGoneBalance] = useState(0);
  const [licBalance, setLicBalance] = useState(0);
  const [moonBalance, setMoonBalance] = useState(0);
  const [jokerBalance, setJokerBalance] = useState(0);

  const {
    getData,
    wokeBalanceF,
    goneBalanceF,
    maticBalanceF,
    licBalanceF,
    moonBalanceF,
    jokerBalanceF,
  } = useLottary();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    const fetchData = async () => {
      const web3 = new Web3(window.ethereum);
      const chain_id = await web3.eth.getChainId();

      const data = await getData();

      setData(data);
      try {
        const _maticBalance = await maticBalanceF();
        console.log(_maticBalance);
        setMaticBalance(_maticBalance);
      } catch (e) {
        //("Matic balance error");
      }

      try {
        const _wokeBalance = await wokeBalanceF();
        setWokBalance(_wokeBalance);
      } catch (e) {
        //("Woke balance error");
      }

      try {
        const _goneBalance = await goneBalanceF();
        setGoneBalance(_goneBalance);
      } catch (e) {
        //("Gone balance error");
      }

      try {
        const _goneBalance = await licBalanceF();
        setLicBalance(_goneBalance);
      } catch (e) {
        //("lic balance error");
      }

      try {
        const _goneBalance = await moonBalanceF();
        setMoonBalance(_goneBalance);
      } catch (e) {
        //("moon balance error");
      }

      try {
        const _goneBalance = await jokerBalanceF();
        setJokerBalance(_goneBalance);
      } catch (e) {
        //(e);
      }
    };
    try {
      fetchData();
    } catch (e) {
      window.location.reload();
    }
  }, [isConnected]);

  useEffect(() => {
    const interval = setInterval(() => {
      // check if data.endtime is smaller than current time
      if (data && data.endTime * 1000 < new Date().getTime()) {
        clearInterval(interval);
        return;
      }
      let countDownDate;

      if (data?.startTime * 1000 > new Date().getTime()) {
        countDownDate = data?.startTime
          ? data?.startTime * 1000
          : new Date().getTime();
      } else {
        countDownDate = data?.endTime
          ? data?.endTime * 1000
          : new Date().getTime();
      }

      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(days);
      setHour(hours);
      setMinute(minutes);
      setSecond(seconds);
    }, 1000);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="w-screen h-screen home">
      <Header />
      <div className="flex justify-center flex-col items-center mt-4 gap-4 text-center p-8">
        {data?.startTime ? (
          Number(data?.startTime) * 1000 > new Date().getTime() ? (
            <p className="text-2xl">Starting At</p>
          ) : (
            <p className="text-2xl">Get your tickets now !</p>
          )
        ) : (
          <p className="text-2xl">Lottery is coming soon !</p>
        )}

        <p className="text-4xl">
          <span className="text-3xl">{days}</span>D{" "}
          <span className="text-3xl">{hour}</span>H{" "}
          <span className="text-3xl">{minute}</span>M{" "}
          <span className="text-3xl">{second}</span>S
        </p>
      </div>

      <div className="flex justify-center flex-col items-center mt-4 gap-4 text-center p-8">
        <p className="text-2xl font-bold">TOTAL POT</p>
        <div className=" flex flex-col justify-center items-center  text-lg gap-5 md:gap-8 rounded-md border-4 p-5 w-full md:w-[40%]">
          <div>
            <p>Chz</p>
            <p>{Number(maticBalance).toFixed(4)}</p>
          </div>
          <div className="flex gap-20 md:gap-60">
            <div>
              <p>Chadz</p>
              <p>{Number(maticBalance).toFixed(2)}</p>
            </div>
            <div>
              <p>Mc</p>
              <p>{Number(wokeBalance).toFixed(2)}</p>
            </div>
          </div>
          <div className="flex gap-20 md:gap-60">
            <div>
              <p>FanFan</p>
              <p>{Number(goneBalance).toFixed(2)}</p>
            </div>
            <div>
              <p>Chsquad</p>
              <p>{Number(licBalance).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <SwapCard />
      <Footer />
    </div>
  );
}

export default Homepage;
