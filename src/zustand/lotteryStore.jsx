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
    refresh: null, // function to refresh the Pot
  },
  tickets: {
    amount: 1,
    buyTicket: {
      transaction: null,
      func: null,
    },
  },
  numbers: {
    selected: [],
  },
  endTime: {
    unixTimeStamp: 0,
    refresh: null, // function to refresh the End Time
  },
  errors: [],
  hasLotteryEnded: false,
  setErrors: (errors) => set({ errors: errors }),

  setPot: (updatedPot) => set({ pot: updatedPot }),
  refreshPot: async () => {
    const response = await get().pot.refresh();
    set({
      pot: {
        amount: ethers.utils.formatEther(BigNumber.from(response.data)),
        refresh: get().pot.refresh,
      },
    });
  },

  setEndTime: (updatedEndTime) => set({ endTime: updatedEndTime }),

  setHasLotteryEnded: (hasLotteryEnded) =>
    set({ hasLotteryEnded: hasLotteryEnded }),

  setSelectedNumbers: (numbers) => set({ numbers: { selected: numbers } }),

  setTicketAmount: (amount) => set({ tickets: { amount: amount } }),

  // write contract data for submitting bid
  setBuyTicket: (transaction, func) =>
    set({
      tickets: {
        amount: get().tickets.amount,
        buyTicket: {
          transaction,
          func,
        },
      },
    }),
}));
