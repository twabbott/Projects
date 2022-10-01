import { useContext } from "react";
import CounterContext from "./CounterContext";

export default function ShowCount() {
    const ctx = useContext(CounterContext);

    return <div>{ctx.count}</div>;
}