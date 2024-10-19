import React, { useEffect } from "react";
import Navbar from "../components/app/landing/Navbar";
import { DashboardSidebar } from "../components/app/dashboard/sidebar";

function Dashboard() {
  const [isUser, setIsUser] = React.useState(false);
  const [walletAddress, setWalletAddress] = React.useState<string | null>(null);

  const generateRandomUsername = () => {
    const randomUsername = Math.random().toString(36).substring(2, 15);
    const randomNumber = Math.floor(Math.random() * 1000);
    const username = `${randomUsername}${randomNumber}`;
    console.log(username);
    localStorage.setItem("user", `${username}`);
    setIsUser(true);
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      //@ts-ignore
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    };
    fetchAccounts();
    const createUser = async () => {
      const user: string | null = localStorage.getItem("user");
      if (user) {
        setIsUser(true);
      } else {
        setIsUser(false);
        generateRandomUsername();
      }
    };
  }, []);
  return (
    <div className="">
      <Navbar />
      <div className="w-full">
        <DashboardSidebar />
      </div>
    </div>
  );
}

export default Dashboard;
