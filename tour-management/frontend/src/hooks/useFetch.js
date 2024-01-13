
import { useState, useEffect } from 'react';


const useFetch = url =>{

    const [data, setData] = useState ([]);
    const [error, setError] = useState ([null]);
    const [loading, setLoading] = useState (true);

    useEffect(()=>{

        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await fetch(url);

                if(!res.ok){
                    //throw new Error(`Failed to fetch: ${res.statusText}`);
                    setError('failed to fetch');
                    //alert('failed to fetch');
                }
                const result = await res.json();
                console.log('API Response:', result); 
                setData(result.data || null);
                //setData(result.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    },[url])

    return{
        data,
        error,
        loading,
    };
};

export default useFetch;