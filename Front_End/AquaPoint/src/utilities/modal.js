import { defineStore } from "pinia";

export const useModalStore = defineStore('modal', {
    state: () => ({
        loginModalOpen: false,
        aquapointDetailsModalOpen: false,
    }),
    actions: {
        openLoginModal() { this.loginModalOpen = true },
        closeLoginModal() { this.loginModalOpen = false },
        openAquapointDetailsModal() { this.aquapointDetailsModalOpen = true },
        closeAquapointDetailsModal() { this.aquapointDetailsModalOpen = false }
    }
})