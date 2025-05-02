import { create } from "zustand"

const useShowSearchBar = create((set) => ({
    showSearchBar: false,
    ToggleShowBar: () => { set((state) => ({ showSearchBar: !state.showSearchBar })) },
    resetShowBar: () => { set((state) => ({ showSearchBar: false })) }
}))

export default useShowSearchBar