import { defineStore } from "pinia";

export const useModalStore = defineStore('modal', {
    state: () => ({
        loginModalOpen: false
    }),
    actions: {
        openLoginModal() { this.loginModalOpen = true },
        closeLoginModal() { this.loginModalOpen = false }
    }
})