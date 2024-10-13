import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { uuid } from "uuidv4";
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

const formSchema = z.object({
  name: z.string(),
  projectLink: z.string().url(),
  projectXUsername: z.string(),
  projectHeaderImageLink: z.string(),
  projectCategory: z.string(),
  projectDescription: z.string(),
  targetAmountETH: z.string(),
  walletAddress: z.string(),
  projectTeamInformation: z.string(),
  otherLinks: z.string(),
  moreProjectDetails: z.string(),
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
      targetAmountETH: "0",
      walletAddress: "",
      projectTeamInformation: "",
      otherLinks: "",
      moreProjectDetails: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const proposal = {
      ...values,
      votes: 0,
      proposers: [],
      authorNamespace: "0x123abc45739892783618hjdghyuwe783",
      id: uuid(),
    };
    console.log(proposal);
  }
  return (
    <div className="mx-4">
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
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateProposalForm;
