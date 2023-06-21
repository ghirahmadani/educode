import React from "react";

import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setData(data)
      })
      .catch(error => {
        console.log("Error")
      })
    }, [url])

    return {data}
}

export default useFetch;