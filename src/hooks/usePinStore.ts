import { create } from 'zustand';

interface PinState {
  pinnedIds: number[];
  togglePin: (id: number) => void;
  isPinned: (id: number) => boolean;
}

export const usePinStore = create<PinState>((set, get) => ({
  pinnedIds: [],
  togglePin: (id: number) =>
    set((state) => ({
      pinnedIds: state.pinnedIds.includes(id)
        ? state.pinnedIds.filter((pinnedId) => pinnedId !== id)
        : [...state.pinnedIds, id],
    })),
  isPinned: (id: number) => get().pinnedIds.includes(id),
}));
