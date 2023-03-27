import React, { forwardRef, ForwardRefRenderFunction, useEffect } from "react";
import { useState, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "./Loading";
import NewData from "./NewData";

export type ColumnProps = React.HTMLAttributes<HTMLDivElement> & {
  url: string;
  name: string;
  backgroundColor: string;
  width?: number;
};

const Column: ForwardRefRenderFunction<HTMLUListElement, ColumnProps> = (
  {
    url,
    name,
    onScroll,
    onMouseOver,
    onMouseUp,
    backgroundColor,
    color,
    width,
  },
  ref
) => {
  const [limit, setLimit] = useState(20);
  const [loadingMoreData, setLoadingMoreData] = useState(false);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery([name], async () => {
    return (await fetch(url)).json();
  });

  // se debe llamar en onSucess de la mutacion
  const handleAddItem = ({ id, title }: { id: number; title: string }) => {
    queryClient.setQueryData([name], (oldData: any) => {
      return [
        {
          id: id,
          name: title,
        },
        ...oldData,
      ];
    });
  };

  // se debe llamar en onSucess de la mutacion
  const handleRemoveItem = (itemId: any) => {
    queryClient.setQueryData([name], (oldData: any) => {
      return oldData.filter((i: any) => {
        const remove = i.id !== itemId;
        return remove;
      });
    });
  };

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (ref) {
      (ref as any)(listRef.current);
    }
  }, [ref, listRef.current, isLoading]);

  // Simulate loading more data
  const getMoreData = async () => {
    setLoadingMoreData(true);
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(Math.random() * 5000 + 1000);
    setLoadingMoreData(false);
    return limit + 20;
  };

  const handleMoreData = async () => {
    if (loadingMoreData) return;
    const newData = await getMoreData();
    setLimit(newData);
  };

  if (isLoading) {
    return <Loading />;
  }

  const renderData = (
    <ul
      ref={listRef}
      style={{
        height: "calc(100vh - 320px)",
        overflow: "scroll",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      onScroll={(args) => {
        const { scrollTop, scrollHeight, clientHeight } =
          listRef.current as HTMLUListElement;
        if (limit >= data.length) return;
        const scrollPercentage =
          (scrollTop / (scrollHeight - clientHeight)) * 100;
        if (scrollPercentage > 80) {
          handleMoreData();
        }
        onScroll?.(args as any);
      }}
    >
      {data?.slice(0, limit).map((value: any) => (
        <li
          key={value.id}
          style={{
            borderBottom: "1px solid #222",
            padding: "5px 0px",
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          {value.title || value.name}
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "red",
              cursor: "pointer",
              fontSize: 20,
              marginLeft: 10,
            }}
            onClick={() => handleRemoveItem(value.id)}
          >
            X
          </button>
          <span
            className={name + value.id}
            style={{
              display: "inline",
              left: -20,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "white",
              position: "absolute",
              border: "1px solid #222",
            }}
          >
            <style>
              {`
        @keyframes blink {

          50% {
            opacity: 0;
          }
        }
      `}
            </style>
          </span>
        </li>
      ))}
      <Loading show={loadingMoreData} />
      {data.length === 0 && <h1>No hay datos</h1>}
      {limit >= data.length && <h1>No hay mas datos</h1>}
    </ul>
  );

  return (
    <div
      style={{
        padding: 5,
        transition: "all 1s",
        backgroundColor,
        color,
        minWidth: width,
        maxWidth: width,
        boxShadow: "0px 0px 5px 0px #000000",
        boxSizing: "border-box",
        border: "1px solid #111",
      }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseUp}
    >
      <NewData
        open={open}
        onClosed={() => setOpen(!open)}
        column={name}
        onSaved={(data) => {
          setOpen(!open);
          handleAddItem(data);
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span>
          {limit}
          <span
            style={{
              fontSize: 10,
            }}
          >{`/${data.length}`}</span>
        </span>
        <h3>
          {name}{" "}
          <button
            style={{
              fontSize: 20,
              padding: 0,
              margin: 0,
              border: "none",
              backgroundColor: "transparent",
              color,
            }}
            onClick={() => {
              setOpen(!open);
            }}
          >
            +
          </button>
        </h3>
        <span>{listRef.current?.scrollTop}Y</span>
      </div>
      {renderData}
    </div>
  );
};

export default forwardRef(Column);
