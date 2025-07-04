
export const getRefreshToken = () => {
    return localStorage.getItem("fie29idf49fgsjit47guor4")
}

export const setRefreshToken = (token) => {
    localStorage.setItem("fie29idf49fgsjit47guor4", token)
}

export const deleteRefreshToken = () => {
    localStorage.removeItem("fie29idf49fgsjit47guor4")
}