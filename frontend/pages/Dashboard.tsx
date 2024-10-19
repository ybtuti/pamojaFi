import React, { useEffect } from "react";
import Navbar from "../components/app/landing/Navbar";
import { DashboardSidebar } from "../components/app/dashboard/sidebar";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { set } from "zod";
import { contract } from "../src/client";
import toast from "react-hot-toast";

function Dashboard() {
  const [isUser, setIsUser] = React.useState(false);
  const [walletAddress, setWalletAddress] = React.useState<string | null>(null);
  const [isError, setIsError] = React.useState(false);
  const { mutate: sendTransaction } = useSendTransaction();
  const [loading, setLoading] = React.useState(false);

  const generateRandomUsername = (): string => {
    const randomUsername = Math.random().toString(36).substring(2, 15);
    const randomNumber = Math.floor(Math.random() * 1000);
    const username = `${randomUsername}${randomNumber}`;
    console.log(username);
    localStorage.setItem("currentUser", `${username}`);
    setIsUser(true);
    return username;
  };

  const fetchAccounts = async (): Promise<string> => {
    //@ts-ignore
    const { ethereum } = window;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletAddress(accounts[0]);
    return accounts[0];
  };

  useEffect(() => {
    const createUser = async () => {
      console.log("function triggered => create user");
      try {
        setLoading(true);
        const user: string | null = localStorage.getItem("currentUser");
        console.log(user);
        if (user) {
          toast.success("User already exists");
          setIsUser(true);
        } else {
          console.log("creating user");
          console.log(isUser);
          setIsUser(false);
          if (walletAddress) {
            const username = generateRandomUsername();
            const address = await fetchAccounts();
            const transaction = prepareContractCall({
              contract,
              method: "function addUser(address _userAddress, string _name)",
              params: [address, username],
            });
            console.log(username, address);
            await sendTransaction(transaction);
            toast.success("User created successfully");
          } else {
            setIsError(true);
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    createUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

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
