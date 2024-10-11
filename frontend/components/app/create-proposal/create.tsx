import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
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

const formSchema = z.object({
  name: z.string().min(3).max(255),
  projectLink: z.string().url(),
  projectXUsername: z.string().min(3).max(100),
  projectHeaderImageLink: z.string().url(),
  projectCategory: z.string(),
  projectDescription: z.string().min(10).max(500),
  targetAmountETH: z.number().min(0),
  walletAddress: z.string().length(42),
  projectTeamInformation: z.string().min(10).max(300),
  otherLinks: z.string().min(10).max(300),
  moreProjectDetails: z.string().min(10).max(300),
});

function CreateProposalForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      projectLink: "",
      projectXUsername: "",
      projectHeaderImageLink: "",
      projectCategory: "",
      projectDescription: "",
      targetAmountETH: 0,
      walletAddress: "",
      projectTeamInformation: "",
      otherLinks: "",
      moreProjectDetails: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div>
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
    </div>
  );
}

export default CreateProposalForm;
