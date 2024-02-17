"use client"

import Fetchani from "@/utilities/fetchani";
import { useEffect, useState } from "react";
import { success, error } from "@/utilities/tosthandler"


const My = ({ persons, mounthId }) => {
  const [data, setData] = useState({
    name: "fg",
    hazira: "",
    rate: "",
    khoraki: "",
    barti: "",
    gotoMAs: "",
  });
  const [mot, setMot] = useState("");
  const [paona, setPaona] = useState("");
  const [fetchs, setfetch] = useState(false);
  useEffect(() => {
    setData({
      name: persons['name'],
      hazira: persons['hazira'],
      rate: persons['rate'],
      khoraki: persons['khoraki'],
      barti: persons['barti'],
      gotoMAs: persons['gotoMAs']
    })
  }, [persons])
  useEffect(() => {
    setMot((parseInt(data["hazira"]) * parseInt(data["rate"])).toString());
    setPaona(
      (
        parseInt(mot) +
        parseInt(data["gotoMAs"]) -
        (parseInt(data["khoraki"]) + parseInt(data["barti"]))
      ).toString()
    );
  }, [data, mot]);
  function onChange(name, value) {
    setData((pre) => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

  async function dataSubmit() {
    setfetch(true);
    const res = await fetch(`/api/alls/person`, {
      method: "POST",
      body: JSON.stringify({
        id: persons['id'],
        name: data['name'],
        hazira: data['hazira'],
        rate: data['rate'],
        mot: mot,
        khoraki: data['khoraki'],
        barti: data['barti'],
        gotoMAs: data['gotoMAs'],
        motAll: paona,
        mounthId: mounthId
      }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store"
    });
    const result = await res.json()
    console.log(result)
    if (result["status"] === "success") {
      success("data create successfully");
    } else {
      error("data create fail");
    }
    setfetch(false);
  }
  return (
    <div className="w-screen">
      <div className="flex gap-1">
        <p onSelect={(e) => {
          onChange("name", e.target.textContent)
        }}
          contentEditable="true"
          className="w-36 outline-none  border-solid border-sky-400 p-2 rounded-md border"
        >
          {data['name']}
        </p>
        <p onSelect={(e) => {
          onChange("hazira", e.target.textContent)
        }}
          contentEditable="true"
          className="w-36 outline-none  border-solid border-sky-400 p-2 rounded-md border"
        >
          {data['hazira']}
        </p>
        <p onSelect={(e) => {
          onChange("rate", e.target.textContent)
        }}
          contentEditable="true"
          className="w-36 outline-none  border-solid border-sky-400 p-2 rounded-md border"
        >
          {data['rate']}
        </p>
        <p
          className="w-36 outline-none  border-solid border-sky-400 p-2 rounded-md border"
        >
          {mot}
        </p>
        <p onSelect={(e) => {
          onChange("khoraki", e.target.textContent)
        }}
          contentEditable="true"
          className="w-36 outline-none  border-solid border-sky-400 p-2 rounded-md border"
        >
          {data['khoraki']}
        </p>
        <p onSelect={(e) => {
          onChange("barti", e.target.textContent)
        }}
          contentEditable="true"
          className="w-36 outline-none  border-solid border-sky-400 p-2 rounded-md border"
        >
          {data['barti']}
        </p>
        <p onSelect={(e) => {
          onChange("gotoMAs", e.target.textContent)
        }}
          contentEditable="true"
          className="w-36  outline-none  border-solid border-sky-400 p-2 rounded-md border"
        >
          {data['gotoMAs']}
        </p>
        <p
          className="w-36 outline-none  border-solid border-sky-400 p-2 rounded-md border"
        >
          {paona}
        </p>
        {fetchs ? <Fetchani /> : <button onClick={dataSubmit} className=" pl-2 pr-2 h-8 ml-1 mt-1 rounded-lg  font-bold shadow-md shadow-gray-500 bg-emerald-500">
          save
        </button>}
      </div>
      <hr className="w-full h-0.5 mt-0.5 bg-emerald-500" />
    </div>
  );
};

export default My;