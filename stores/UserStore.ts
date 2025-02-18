import type { TUser } from "@/lib/types";

import { create } from "zustand";

type TUserStore = {
    user: TUser;
    updateUser: (user: TUser) => void;
};

const useUserStore = create<TUserStore>((set) => ({
    user: {
        email: "",
    },

    updateUser(userInfo: TUser) {
        set(() => ({
            user: userInfo,
        }));
    },
}));

export default useUserStore;
