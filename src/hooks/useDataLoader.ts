import React from "react";

const headers = new Headers();
headers.append("Content-Type", "application/json");


const useDataLoader = (url: string) => {
    const [data, setData] = React.useState<[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);


    const loadData = async () => {
        setLoading(true);
            await fetch(url,{
                    method: 'GET',
                    headers: headers,
                    mode: 'cors',
                    cache: 'default',
            })
                .then((response) => response.json())
                .then((data) => {
                    setData(data);
                            setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    setError(error.message);
                    setLoading(false);
                });
    };

    React.useEffect(() => {
        loadData()
    }, [url]);

    return { data, error, loading };
};

export default useDataLoader;

