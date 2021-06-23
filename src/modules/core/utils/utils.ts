export const replaceItemInArray = (
    array: any[],
    item: any,
    predicate: (item: any) => boolean
) => {
    const index = array.findIndex((obj) => predicate(obj));
    const updatedArray = [...array];
    if (item !== undefined) {
        updatedArray.splice(index, 1, item);
    } else {
        updatedArray.splice(index, 1);
    }
    return updatedArray;
};
