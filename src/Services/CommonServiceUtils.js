const getHeaders = async (isAuth, userPermissions = null) => {
    const headers = { "Content-Type": "application/json" };
    if (isAuth) {
        headers["x-auth"] = true;
    }
    if (userPermissions) {
        headers["x-auth-scope"] = userPermissions;
    }
    return headers;
};
const handleErrors = async (response) => {
    if (!response.ok) {
        let errorResponse;
        try {
            errorResponse = await response.json();
        } catch (e) {
            throw Error(response.statusText);
        }
        throw Error(errorResponse?.error);
    }
    return response;
};

const parseJson = (response) => {
    try {
        return response.json();
    } catch (e) {
        console.error("Cannot parse:", response);
        throw Error("Can not parse");
    }
};


const fetchGet = async (url, isAuth = true, userPermissions = null) => {
    return fetch(url, { headers: await getHeaders(isAuth, userPermissions) })
        .then(handleErrors)
        .then(parseJson);
};

const jsonToQueryParam = (json) => {
    let result = "";
    if (json) {

        Object.entries(json).forEach(([key, value]) => {
            if (value !== "" && value !== null && value !== undefined) {
                if (Array.isArray(value)) {
                    value.forEach((element) => {
                        result += `${result ? "&" : ""}${key}[]=${element}`;
                    });
                } else {
                    result += `${result ? "&" : ""}${key}=${value}`;
                }
            }
        });
    }

    return result;
};

export {
    fetchGet,
    handleErrors,
    parseJson,
    jsonToQueryParam
};
