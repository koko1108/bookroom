import React, { useEffect, useState } from "react";
import axios from "axios";

// useFetch統一處理axios.get資料的api
const useFetch = (url) => {
  const [data, setData] = useState([]); //取得的資料
  const [loading, setLoading] = useState(false); //紀錄連線狀態，方便後的載入畫面呈現
  const [error, setError] = useState(""); //回報錯誤
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  },[url])
  return { data, loading, error };
};

export default useFetch;
