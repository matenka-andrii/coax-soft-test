export const sort = (data, sortingDirection, i) => {
    const sortedData = data.sort((a, b) => {
        if (sortingDirection === 'DESC') {
            if (i === 1) {
                if (a[i].toLowerCase() > b[i].toLowerCase()) {
                    return -1;
                }
                if (a[i].toLowerCase() < b[i].toLowerCase()) {
                    return 1;
                }
            } else if (i === 2) {
                if (Number(a[i].substr(1)) > Number(b[i].substr(1))) {
                    return -1;
                }
                if (Number(a[i].substr(1)) < Number(b[i].substr(1))) {
                    return 1;
                }
            } else {
                if (a[i] > b[i]) {
                    return -1;
                }
                if (a[i] < b[i]) {
                    return 1;
                }
            }

        } else if (i === 1) {
            if (a[i].toLowerCase() > b[i].toLowerCase()) {
                return 1;
            }
            if (a[i].toLowerCase() < b[i].toLowerCase()) {
                return -1;
            }
        } else if (i === 2) {
            if (Number(a[i].substr(1)) > Number(b[i].substr(1))) {
                return 1;
            }
            if (Number(a[i].substr(1)) < Number(b[i].substr(1))) {
                return -1;
            }
        } else {
            if (a[i] > b[i]) {
                return 1;
            }
            if (a[i] < b[i]) {
                return -1;
            }
        }

        return false;
    });

    return sortedData;
};
