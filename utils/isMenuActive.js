export const isParentActive = (children, path) => {
    if (!Array.isArray(children) || !path) {
        return false;
    }

    return children.some((item) => {
        if (!item) {
            return false;
        }

        if (item.path === path) {
            return true;
        }

        return Array.isArray(item.subMenu)
            ? item.subMenu.some((item2) => item2?.path === path)
            : false;
    });
};
