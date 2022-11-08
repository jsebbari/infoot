import React from "react";
import Head from "next/head";

interface IProps {
  title: string;
  content: string;
}

const UseHead = (props: IProps) => {
  const { title, content } = props;
  return (
    <Head>
      <title>Infoot | {title}</title>
      <meta name="description" content={content} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default UseHead;
