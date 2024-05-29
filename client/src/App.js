import "./App.css";
import abi from "./contracts/CarRenter.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import AddCar from "./components/AddCar";
import ReserveCar from "./components/ReserveCar";
import ReturnCar from "./components/ReturnCar";
import UpdateRentalRate from "./components/UpdateRentalRate";
import Navbar from "./components/Navbar";
import CurrentInfo from "./components/CurrentInfo";

function App() {
  const [account, setAccount] = useState("None");
  const [rentalRate, setRentalRate] = useState("");
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x3746e02b9784723617c39b17b8fdafd07f418ba3";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <section className="App container">
      <Navbar account={account} />
      <section className="flex justify-center mt-10">
        <div className="w-[40rem] space-y-10">
          <CurrentInfo state={state} />
          <div className="border border-black p-10 space-y-5 rounded-md">
            <ReserveCar  state={state} rentalRate={rentalRate}/>
            <ReturnCar state={state} />
            <UpdateRentalRate state={state} rentalRate={rentalRate} setRentalRate={setRentalRate} />
            <AddCar state={state} />
          </div>
        </div>
      </section>
    </section>
  );
}

export default App;
