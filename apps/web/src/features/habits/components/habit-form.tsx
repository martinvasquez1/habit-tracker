import { UseFormReturn } from "react-hook-form";
import { UseMutationResult } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { colors } from "@/styles/main";
import { Button } from "@/components/ui/button";

interface HabitFormProps {
  form: UseFormReturn<any>; // Use the specific type for form values
  onSubmit: (values: any) => void; // Use the specific type for form values
  mutation: UseMutationResult<any, unknown, any>; // Adjust the types based on your mutation
  submitText: string;
}

export const HabitForm: React.FC<HabitFormProps> = ({
  form,
  onSubmit,
  mutation,
  submitText,
}) => {
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Meditating" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="I'll meditate every day for 5 minutes."
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(colors).map(([name, className]) => (
                      <SelectItem key={name} value={name}>
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full ${className} mr-2`}
                          />
                          <span className="capitalize">{name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full md:mb-0 mb-4"
            disabled={mutation.isPending}
          >
            {submitText}
          </Button>
        </form>
      </Form>
    </div>
  );
};
