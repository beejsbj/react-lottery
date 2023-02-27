import { create } from "zustand";
import tokenContract from "../contracts/lottery.json";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { prepareWriteContract, writeContract } from "wagmi/actions";
import { BigNumber, ethers } from "ethers";
import { useEffect } from "react";

export const useStore = create((set, get) => ({
  pot: {
    amount: 0,
    refreshPot: null, // function to refresh the Pot
  },
  tickets: {
    amount: 1,
    buyTicket: null,
  },
  numbers: {
    selected: [],
  },
  endTime: {
    unixTimeStamp: 0,
    refreshEndTime: null, // function to refresh the End Time
  },
  errors: [],

  setErrors: (errors) => set({ errors: errors }),

  setPot: (updatedPot) => set({ pot: updatedPot }),
  setEndTime: (updatedEndTime) => set({ endTime: updatedEndTime }),

  setSelectedNumbers: (numbers) => set({ numbers: { selected: numbers } }),

  setTicketAmount: (amount) => set({ tickets: { amount: amount } }),

  // write contract data for submitting bid
  setBuyTicket: (buyTicketFunction) =>
    set({ tickets: { amount: 1, buyTicket: buyTicketFunction } }),
}));
