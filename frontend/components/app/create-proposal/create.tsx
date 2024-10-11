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
      <h1>CreateProposalForm</h1>
    </div>
  );
}

export default CreateProposalForm;
