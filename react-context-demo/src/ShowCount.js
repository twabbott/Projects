import { useContext } from "react";
import CounterContext from "./CounterContext";

export default function ShowCount() {
    const { count } = useContext(CounterContext);

    return <div>{count}</div>;
}
