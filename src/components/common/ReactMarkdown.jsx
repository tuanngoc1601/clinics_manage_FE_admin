import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const ReactMakedown = ({ content }) => {
    return (
        <>
            <ReactMarkdown children={content} rehypePlugins={[rehypeRaw]} />
        </>
    );
};

export default ReactMakedown;
