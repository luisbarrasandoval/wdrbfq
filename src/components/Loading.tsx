import React, { FC } from "react";

type LoadingProps = React.HTMLAttributes<HTMLDivElement> & {
  show?: boolean;
}
;

const Loading: FC<LoadingProps> = ({
  show = true,
}) => {

  if (!show) {
    return <div style={{
      width: 30,
      height: 30,
    }}/>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <div
        style={{
          border: "8px solid rgba(0, 0, 0, 0.1)",
          borderTopColor: "#fff",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          animation: "spin 1s ease-in-out infinite",
        }}
      ></div>
      <style>
        {`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}
      </style>
    </div>
  );
};

export default Loading;
