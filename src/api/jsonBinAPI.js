// src/api/jsonBinAPI.js

const BIN_ID = "690cbda743b1c97be99cf966";
const MASTER_KEY = "$2a$10$75ufuKZ3syLH/TbK6mdqcu7NDMT3BCSt/o/kbU5MS087q7iYvPstC";

const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export const fetchData = async () => {
  const res = await fetch(`${BASE_URL}/latest`, {
    headers: {
      "X-Master-Key": MASTER_KEY,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch data from JSONBin");
  const data = await res.json();
  return data.record || [];
};

export const updateData = async (newData) => {
  const res = await fetch(BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": MASTER_KEY,
    },
    body: JSON.stringify(newData),
  });

  if (!res.ok) throw new Error("Failed to update data to JSONBin");
  return await res.json();
};
