import { persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
const recentWalletsLimit = 10;
export const createBookmarksStore = ({ namePrefix, toAddress, }) => createWithEqualityFn(persist((set, get) => ({
    selectedBookmark: toAddress,
    bookmarks: [],
    recentWallets: [],
    getBookmark: (address) => get().bookmarks.find((bookmark) => bookmark.address === address),
    addBookmark: (bookmark) => {
        set((state) => ({
            bookmarks: [bookmark, ...state.bookmarks],
        }));
    },
    removeBookmark: (address) => {
        set((state) => ({
            bookmarks: state.bookmarks.filter((storedBookmark) => storedBookmark.address !== address),
        }));
    },
    getSelectedBookmark: () => get().selectedBookmark,
    setSelectedBookmark: (bookmark) => {
        set((state) => ({
            selectedBookmark: bookmark,
        }));
    },
    addRecentWallet: (bookmark) => {
        set((state) => ({
            recentWallets: [
                bookmark,
                ...state.recentWallets.filter((recentWallet) => recentWallet.address !== bookmark.address),
            ].slice(0, recentWalletsLimit),
        }));
    },
    removeRecentWallet: (address) => {
        set((state) => ({
            recentWallets: state.recentWallets.filter((storedRecent) => storedRecent.address !== address),
        }));
    },
}), {
    name: `${namePrefix || 'li.fi'}-bookmarks`,
    version: 0,
    partialize: (state) => ({
        bookmarks: state.bookmarks,
        recentWallets: state.recentWallets,
    }),
    onRehydrateStorage: () => {
        return (state) => {
            if (state && toAddress && !toAddress.name) {
                const existingBookmark = state.getBookmark(toAddress.address);
                if (existingBookmark) {
                    state.setSelectedBookmark(existingBookmark);
                }
            }
        };
    },
}), Object.is);
//# sourceMappingURL=createBookmarkStore.js.map