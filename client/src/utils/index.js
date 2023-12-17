export const formatDate = (dateString) => {

    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
    return formattedDate;
}