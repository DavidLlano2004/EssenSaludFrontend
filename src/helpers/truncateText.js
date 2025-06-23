export const truncateText = (name, maxLength) => {
    if (name?.length <= maxLength) return name;
    return name?.substr(0, maxLength - 3) + "...";
};