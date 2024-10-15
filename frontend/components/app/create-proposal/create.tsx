import React, { useEffect, useState } from "react";
import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { Web3 } from "web3";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../ui/textarea";
import WORLDid from "../../ui/IdKit";
import { ethers } from "ethers";
import { ABI } from "./attestation_ABI";
const provider = new ethers.JsonRpcProvider("https://base-rpc.publicnode.com");
const contractAddress = "0x2c7eE1E5f416dfF40054c27A62f7B357C4E8619C";
const indexerContract = new ethers.Contract(contractAddress, ABI, provider);
import { sdk } from "../../../src/clent";

const formSchema = z.object({
  name: z.string(),
  projectLink: z.string().url(),
  projectXUsername: z.string(),
  projectHeaderImageLink: z.string().url(),
  projectCategory: z.string(),
  projectDescription: z.string(),
  targetAmountETH: z.string(),
  walletAddress: z.string(),
  projectTeamInformation: z.string(),
  otherLinks: z.string(),
  moreProjectDetails: z.string(),
});

function CreateProposalForm() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  useEffect(() => {
    const fetchAccounts = async () => {
      //@ts-ignore
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
    };
    fetchAccounts();
  }, []);

  const [verifying, setVerifying] = React.useState(false);
  async function getAttestationUID(walletAddress, schemaID) {
    try {
      const attestationUID = await indexerContract.getAttestationUid(
        walletAddress,
        schemaID
      );
      return attestationUID;
    } catch (error) {
      console.error("Error fetching Attestation UID:", error);
    }
  }
  async function getAttestationData(uid) {
    try {
      const EASContractAddress = "0x4200000000000000000000000000000000000021";
      const eas = new EAS(EASContractAddress);
      eas.connect(provider);
      const attestation = await eas.getAttestation(uid);
      return attestation;
    } catch (error) {
      console.error("Error fetching Metadata: ", error);
    }
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      projectLink: "",
      projectXUsername: "",
      projectHeaderImageLink: "",
      projectCategory: "",
      projectDescription: "",
      targetAmountETH: "0",
      walletAddress: "",
      projectTeamInformation: "",
      otherLinks: "",
      moreProjectDetails: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const walletAddress = "0x115aBfDa6b101bDC813B90c2780952E89E185F54";
    const schemaID =
      "0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9";
    try {
      setVerifying(true);
      const uid = await getAttestationUID(walletAddress, schemaID);
      console.log("UID:", uid);
      const metadata = await getAttestationData(uid);
      console.log("Metadata:", metadata);
      const proposal = {
        ...values,
        votes: 0,
        proposers: [],
        authorNamespace: "0x123abc45739892783618hjdghyuwe783",
        id: uuidv4(),
      };
      // console.log(proposal);
      setVerifying(false);
    } catch (error) {
      setVerifying(false);
      console.error("Error:", error);
    }
  }
  if (verifying) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="logo font-bold text-xl">Verifying...</h1>
      </div>
    );
  }
  return (
    <div className="mx-4 pb-8">
      <div>
        <h1 className="my-2 logo text-3xl font-semibold text-benefits">
          Create Proposal
        </h1>
        <p className="relaxed title max-w-3xl leading-relaxed my-4 text-sm">
          Please fill in the details of your project. After submission your
          project will be reviewed by the community members and users who
          believe in your idea will exercise their community voting power to
          vote for your proposal.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="flex flex-col gap-3 md:gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="logo">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Wakulima Market"
                        className="title"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-[#808080]">
                      Title of your project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="logo">Project Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://wakulima-market.com"
                        className="title"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-[#808080]">
                      Link to your project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectHeaderImageLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="logo">Header Image</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://mkulima.png"
                        className="title"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-[#808080]">
                      Image url of your project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="logo">Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Crop Farming"
                        className="title"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-[#808080]">
                      Category of your project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="logo">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What does your project entail?"
                        className="title"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-[#808080]">
                      Description of your project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="targetAmountETH"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="logo">Target</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0.6 ETH"
                        className="title"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-[#808080]">
                      Target amount in ETH
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="logo">
                      Project Wallet Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0x123abc45739892783618hjdghyuwe783"
                        className="title"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-[#808080]">
                      Link to your project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectTeamInformation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="logo">Team Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the team behind your project"
                        className="title"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-[#808080]">
                      Information about your team
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otherLinks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="logo">Relevant Links</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Links to your project"
                        className="title"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-[#808080]">
                      Other relevant links
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="moreProjectDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="logo">Additional Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional details about your project"
                        className="title"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-[#808080]">
                      Additional project information
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-benefits text-hero logo my-4"
            disabled={form.formState.isSubmitting}
          >
            Submit
          </Button>
          {/* <p className="text-sm logo text-[#808080]">
            You need to verify your identity with WorldID before proceeding
          </p>
          <div className="flex items-center justify-center w-full border-2 border-benefits rounded-md">
            <WORLDid />
          </div> */}
        </form>
      </Form>
    </div>
  );
}

export default CreateProposalForm;
