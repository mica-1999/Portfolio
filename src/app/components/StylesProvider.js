"use client";

export default function StylesProvider({ stylesheets = [] }) {
  return (
    <>
      {stylesheets.map((stylesheet, index) => (
        <link key={index} rel="stylesheet" href={stylesheet} />
      ))}
    </>
  );
}
