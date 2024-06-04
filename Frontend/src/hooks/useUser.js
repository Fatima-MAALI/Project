import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


export const useUser = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            setUser: (user) => set({ user: user, token: get().token }),
            setToken: (token) => set({ token: token, user: get().user }),
            getBearer: (token) => { return `bearer ${get().token}` },
            signOut: () => { set({ token: null, user: null }); location.reload() }
        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)