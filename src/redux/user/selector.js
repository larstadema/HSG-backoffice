export const isAuthenticated = (state) => state.user.authenticated

export const credentials = (state) => state.user.credentials

export const isAdmin = (state) => state.user.credentials.isAdmin

export const isLoading = (state) => state.user.isLoading

export const backupList = (state) => state.user.backup

export const notifications = (state) => state.user.notifications