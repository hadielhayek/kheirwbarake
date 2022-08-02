export const filterData = (itemToFilterOut, data) => {

    const filteredData = data.filter(
        (item) => { if (item._id !== itemToFilterOut) return item }
    )

    return filteredData
}