import { create } from "zustand"

const useShowSearchBar = create((set) => ({
    initialVisibility: false,
    showSearchBar: false,
    ToggleShowBar: () => { set((state) => ({ showSearchBar: !state.showSearchBar })) },
    ToggleVisibilityBar: () => { set((state) => ({ initialVisibility: !state.initialVisibility })) },
    resetShowBar: () => { set((state) => ({ showSearchBar: false })) }
}))

export default useShowSearchBar