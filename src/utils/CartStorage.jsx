
export const cartStorDataSetItem = (data) => {
    const JSONStringify = JSON.stringify(data)
    localStorage.setItem("cart", JSONStringify)
}
