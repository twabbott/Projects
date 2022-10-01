import { useContext } from "react";
import CounterContext from "./CounterContext";

export default function IncDecCount() {
    const ctx = useContext(CounterContext);

    return (
        <>
            <button type="button" onClick={() => ctx.setCount(ctx.count + 1)}>+</button>
            <button type="button" onClick={() => ctx.setCount(ctx.count - 1)}>-</button>
        </>
    )
}