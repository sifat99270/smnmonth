"use client";

import { useEffect, useState } from "react";
import { error, success } from "@/utilities/tosthandler";
import Fetchani from "@/utilities/fetchani";
import Link from "next/link";

const Add = ({ mounthName,dataSubmit }) => {
  const [name, setName] = useState("no name");
  const [mounthId, setMounthId] = useState(0)
  const [data, setData] = useState({
    name: "",
    hazira: "",
    rate: "",
    khoraki: "",
    barti: "",
    gotoMAs: "",
  });

  const [mot, setMot] = useState("");
  const [paona, setPaona] = useState("");
  useEffect(() => {
    if (mounthName instanceof Array && mounthName.length > 0) {
      setMounthId(mounthName[0]['id'])
      setName(mounthName[0]['name'])
    }
  }, [mounthName])
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

  const [fetchs, setfetch] = useState(false);
  useEffect(() => {
    if (mounthName && mounthName.length > 0) {
      setName(mounthName[mounthName.length - 1]["name"]);
    } else {
      setName("no name");
    }
  }, [mounthName]);

  const handleChange = (name, value) => {
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  function nameSet(item) {
    setMounthId(item['id'])
    setName(item['name']);
  }
  return (
    <div className="w-screen">
      <div className="flex justify-center items-center mt-3 mb-2 gap-3">
        <p className=" bg-teal-200 w-40 p-3 font-black rounded-md text-center">
          {name}
        </p>
        <Link
          href="/new"
          className=" p-3 rounded-lg bg-emerald-500 h-10 leading-3 text-cyan-700 font-bold"
        >
          new
        </Link>
      </div>
      <div className="w-screen flex justify-evenly items-center ">
        <input
          value={data.name}
          type="text"
          className="w-s bg-slate-200 outline-none  border-solid border-sky-400 p-2 rounded-md border focus:border-teal-300 shadow-md shadow-gray-500"
          placeholder="name"
          onChange={(e) => {
            handleChange("name", e.target.value);
          }}
        />
        <input
          value={data.hazira}
          type="text"
          className="w-s bg-slate-200 outline-none  border-solid border-sky-400 p-2 rounded-md border focus:border-teal-300 shadow-md shadow-gray-500"
          placeholder="hazira"
          onChange={(e) => {
            handleChange("hazira", e.target.value);
          }}
        />
        <input
          value={data.rate}
          type="text"
          className="w-s bg-slate-200 outline-none  border-solid border-sky-400 p-2 rounded-md border focus:border-teal-300 shadow-md shadow-gray-500"
          placeholder="rate"
          onChange={(e) => {
            handleChange("rate", e.target.value);
          }}
        />
        <input readOnly
          value={mot}
          type="text"
          className="w-s bg-slate-200 outline-none  border-solid border-sky-400 p-2 rounded-md border focus:border-teal-300 shadow-md shadow-gray-500"
          placeholder="mot"
        />
        <input
          value={data.khoraki}
          type="text"
          className="w-s bg-slate-200 outline-none  border-solid border-sky-400 p-2 rounded-md border focus:border-teal-300 shadow-md shadow-gray-500"
          placeholder="khoraki"
          onChange={(e) => {
            handleChange("khoraki", e.target.value);
          }}
        />
        <input
          value={data.barti}
          type="text"
          className="w-s bg-slate-200 outline-none  border-solid border-sky-400 p-2 rounded-md border focus:border-teal-300 shadow-md shadow-gray-500"
          placeholder="barti"
          onChange={(e) => {
            handleChange("barti", e.target.value);
          }}
        />
        <input
          value={data.gotoMAs}
          type="text"
          className="w-s bg-slate-200 outline-none  border-solid border-sky-400 p-2 rounded-md border focus:border-teal-300 shadow-md shadow-gray-500"
          placeholder="goto mas"
          onChange={(e) => {
            handleChange("gotoMAs", e.target.value);
          }}
        />
        <input readOnly
          value={paona}
          type="text"
          className="w-s bg-slate-200 outline-none  border-solid border-sky-400 p-2 rounded-md border focus:border-teal-300 shadow-md shadow-gray-500"
          placeholder="paona"

        />
      </div>
      {fetchs ? (
        <Fetchani />
      ) : (
        <button
          className="flex ml-auto mr-auto bg-emerald-400  pl-2 pr-2 py-1 rounded-lg mt-10 font-bold shadow-md shadow-gray-500"
          onClick={async ()=>{
              setfetch(true)
              const result=await dataSubmit({...data,mot:mot,motAll:paona,mounthId:mounthId});
              if(result['status']==='success'){
                success('data submitted successfully')
              }else{
                error('data submitted failed')
              }
              setfetch(false)
          }}
        >
          submit
        </button>
      )}

      <div className="w-40 rounded-md flex  flex-col gap-1  bg-slate-300 h-auto ml-auto shadow-md shadow-gray-300">
        <div className=" w-full  bg-emerald-500 rounded-md px-4 h-7 font-bold ">
          mounth name
        </div>
        {mounthName ? (
          mounthName.map((item, index) => {
            return (
              <div
                onClick={() => {
                  nameSet(item);
                }}
                key={item['id']}
                className=" text-center bg-slate-400 font-mono px-3 text-gray-800 font-bold rounded-lg cursor-pointer shadow-lg"
              >
                {item["name"]}
              </div>
            );
          })
        ) : (
          <p className=" font-bold text-center text-rose-800">no mounth</p>
        )}
      </div>
    </div>
  );
};

export default Add;