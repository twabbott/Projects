import { useContext } from "react";
import CounterContext from "./CounterContext";

export default function IncDecCount() {
    const {
        countIncremented,
        countDecremented
    } = useContext(CounterContext);

    return (
        <>
            <button type="button" onClick={countIncremented}>+</button>
            <button type="button" onClick={countDecremented}>-</button>
        </>
    )
}
