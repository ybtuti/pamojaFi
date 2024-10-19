import React, { useEffect } from "react";
import Navbar from "../components/app/landing/Navbar";
import { DashboardSidebar } from "../components/app/dashboard/sidebar";
import { prepareContractCall } from "thirdweb";
import { useReadContract, useSendTransaction } from "thirdweb/react";
import { set } from "zod";
import { contract } from "../src/client";
import toast from "react-hot-toast";

function Dashboard() {
  const [isUser, setIsUser] = React.useState(false);
  const [walletAddress, setWalletAddress] = React.useState<string | null>(null);
  const [isError, setIsError] = React.useState(false);
  const { mutate: sendTransaction } = useSendTransaction();
  const [loading, setLoading] = React.useState(false);
  const fetchAccounts = async () => {
    try {
      //@ts-ignore
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    } catch (error) {
      console.error("Error fetching accounts:", error);
      return null;
    }
  };
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function addressToUser(address) view returns (address userAddress, string proposalsMade, string proposalsVotedOn, string name)",
    params: [walletAddress || "0x43a9c07acb27a76f2d9f5933f3dcd6bddf9b3ed3"],
  });

  const generateRandomUsername = () => {
    return `user_${Math.floor(Math.random() * 10000)}`;
  };

  useEffect(() => {
    const createUser = async () => {
      try {
        setLoading(true);
        if (!isUser) {
          const username = generateRandomUsername();
          const address = await fetchAccounts();
          if (address) {
            setWalletAddress(address);

            if (data && data[3]?.length > 3) {
              setIsUser(true);
              console.log("User already exists");
              toast.success("User already exists");
            } else {
              localStorage.setItem("currentUser", JSON.stringify(data));
              const transaction = prepareContractCall({
                contract,
                method: "function addUser(address _userAddress, string _name)",
                params: [address, username],
              });
              await sendTransaction(transaction);
            }
            toast.success("User created successfully");
            setIsUser(true);
          } else {
            console.error("Address is null");
            setIsError(true);
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error in createUser:", error);
      }
    };
    createUser();
  }, [walletAddress, isPending]);

  if (loading || isPending) {
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
