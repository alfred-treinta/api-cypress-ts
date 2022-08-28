export const getDate = () => {
    let today = new Date()
    return Date.parse(today.toString())
}
