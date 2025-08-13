/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { startTransition, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";

import { IIndustry } from "@/lib/database/models/industry.model";
import { createIndustry, getAllIndustry } from "@/lib/actions/industry.action";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [industries, setIndustries] = useState<IIndustry[]>([]);
  const [newIndustry, setNewIndustry] = useState("");

  const handleAddIndustry = () => {
    createIndustry({
      industryName: newIndustry.trim(),
    }).then((industry) => {
      setIndustries((prevState) => [...prevState, industry]);
    });
  };

  useEffect(() => {
    const getIndustries = async () => {
      const industryList = await getAllIndustry();

      industryList && setIndustries(industryList as IIndustry[]);
    };

    getIndustries();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Industry" />
      </SelectTrigger>
      <SelectContent>
        {industries.length > 0 &&
          industries.map((industry) => (
            <SelectItem
              key={industry._id}
              value={industry._id}
              className="select-item p-regular-14"
            >
              {industry.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new Industry
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Industry</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Industry name"
                  className="input-field mt-3"
                  onChange={(e) => setNewIndustry(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddIndustry)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
