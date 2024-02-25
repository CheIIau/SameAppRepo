import { FC, PropsWithChildren } from "react";

interface AboutProps extends PropsWithChildren {}

const About: FC<AboutProps> = async () => {
    const response = await (await fetch("http://localhost:3000/api/kek/")).text();

    return <div>{response}</div>;
};

export default About;
