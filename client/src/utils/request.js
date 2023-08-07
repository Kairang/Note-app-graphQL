export const graphQLRequest = async (payload, option = {}) => {
    if (localStorage.getItem('accessToken')) {
        const res = await fetch(`${import.meta.env.VITE_GRAPHQL_SERVER}/graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                ...option,
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            if (res.status === 403)
                return null;
        }

        const { data } = await res.json();
        return data;
    }

    return null;
}