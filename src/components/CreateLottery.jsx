import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useLottary from "../hooks/useLottary";
import Web3 from "web3";

function CreateLottery() {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [chzPrice, setchzPrice] = useState(0);
  const [chadzPrice, setchadzPrice] = useState(0);
  const [mcPrice, setmcPrice] = useState(0);
  const [fanfanPrice, setfanfanPrice] = useState(0);
  const [squadPrice, setsquadPrice] = useState(0);

  const { createLottery } = useLottary();

  const handleCreate = async () => {
    // convert date to epoch timestamp
    const start = startTime.getTime() / 1000;
    const end = endTime.getTime() / 1000;
    const matic = Web3.utils.toWei(chzPrice.toString(), "ether");
    const woke = chadzPrice * 10000;
    const gone = Web3.utils.toWei(mcPrice.toString(), "ether");
    const lic = Web3.utils.toWei(fanfanPrice.toString(), "ether");
    const joker = Web3.utils.toWei(squadPrice.toString(), "ether");

    try {
      await createLottery(start, end, matic, woke, gone, lic, joker);
    } catch (e) {
      //(e);
    }
  };

  const handleDateChange = (date) => {
    // date must be a future date
    if (date < new Date()) {
      //("Date must be a future date");
      window.alert("Date must be a future date");
      return;
    }
    setStartTime(date);
  };

  const handleEndDateChange = (date) => {
    // end date must be greater than start date
    if (date < startTime) {
      //("End date must be greater than start date");
      window.alert("End date must be greater than start date");
      return;
    }
    setEndTime(date);
  };

  return (
    <div className="flex flex-col text-black">
      <h1 className="text-white">Create Lottery</h1>
      <div className="flex flex-col gap-5">
        {/* input of date picker */}
        <div className="flex flex-col gap-1">
          <label className="text-white text-center">Start Time</label>
          <DatePicker
            selected={startTime}
            onChange={(date) => handleDateChange(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            // change design
            className="rounded p-1 w-full"
          />
        </div>
        {/* input of date picker */}
        <div className="flex flex-col gap-1">
          <label className="text-white text-center">End Time</label>
          <DatePicker
            selected={endTime}
            onChange={(date) => handleEndDateChange(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            // change design
            className="rounded p-1 w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white text-center">Chz Price</label>
          <input
            type="number"
            placeholder="Matic Price"
            className="rounded p-1 "
            value={chzPrice}
            onChange={(e) => setchzPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white text-center">Chadz Price</label>
          <input
            type="number"
            placeholder="Woke Price"
            className="rounded p-1 "
            value={chadzPrice}
            onChange={(e) => setchadzPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white text-center">MC Price</label>
          <input
            type="number"
            placeholder="Gone Price"
            className="rounded p-1 "
            value={mcPrice}
            onChange={(e) => setmcPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white text-center">Fan Fan Price</label>
          <input
            type="number"
            placeholder="Gone Price"
            className="rounded p-1 "
            value={fanfanPrice}
            onChange={(e) => setfanfanPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white text-center">Chsquad Price</label>
          <input
            type="number"
            placeholder="Gone Price"
            className="rounded p-1 "
            value={squadPrice}
            onChange={(e) => setsquadPrice(e.target.value)}
          />
        </div>

        <button className="bg-green-500 rounded p-2" onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateLottery;
