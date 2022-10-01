import React, { createContext, useEffect, useRef, useState } from "react";
import { readLocalStorage, writeLocalStorage } from "api/local-storage";

const LOCAL_STORAGE_SCAN_MODE = "dimension-scan-mode";
const LOCAL_STORAGE_SCANNED = "dimension-scanned-products";

const DISTO_DETECT_DELAY = 1000;
export const distoUnits = {
	" in": 0,
	" mm": 0,
};

export const scanStepNames = {
	licensePlateNumber: "License Plate Number",
	jobTitle: "Job Title",
	uniqueIdentifier: "Unique Identifier",
};

export function isDistoInput(input) {
	return input && input.length > 3 && input.substring(input.length - 3).toLowerCase() in distoUnits;
}

const initialState = {
	scanCode: "",
	isSingleScan: true,
	isDistoVisible: false,
	licensePlateNumber: "",
	jobTitle: "",
	sendBusy: false,
	setScanCode: () => {},
	singleScanChanged: () => {},
	distoClosedHandler: () => {},
	setDistoOpeningCallback: () => {},
	setLicensePlateNumber: () => {},
	setJobTitle: () => {},
	setSendBusy: () => {},
};

const ScanPageContext = createContext(initialState);

export function ScanPageProvider({ children }) {
	const [scanCode, setScanCode] = useState("");
	const [isSingleScan, setIsSingleScan] = useState(true);
	const [isDistoVisible, setIsDistoVisible] = useState(false);
	const distoTimerRef = useRef(undefined);
	const distoOpeningHandlerCallback = useRef(() => false);
	const [licensePlateNumber, setLicensePlateNumber] = useState("");
	const [jobTitle, setJobTitle] = useState("");
	const [sendBusy, setSendBusy] = useState(false);

	function singleScanChanged(isSingleScan) {
		setIsSingleScan(isSingleScan);
		writeLocalStorage(LOCAL_STORAGE_SCAN_MODE, isSingleScan ? "single" : "multiple");

		if (isSingleScan) {
			writeLocalStorage(LOCAL_STORAGE_SCANNED, JSON.stringify([]));
		}

		setScanCode("");
		setLicensePlateNumber("");
		setJobTitle("");
	}

	function distoClosedHandler() {
		setScanCode("");
		setIsDistoVisible(false);
	}

	function setDistoOpeningCallback(callback = () => false) {
		distoOpeningHandlerCallback.current = callback;
	}

	useEffect(() => {
		const scanModeState = readLocalStorage(LOCAL_STORAGE_SCAN_MODE);
		setIsSingleScan(scanModeState === "single");
	}, []);

	function _distoCheckHandler() {
		if (isDistoInput(scanCode)) {
			if (distoOpeningHandlerCallback.current()) {
				setIsDistoVisible(true);
			}
		}
	}

	useEffect(() => {
		distoTimerRef.current = setTimeout(_distoCheckHandler, DISTO_DETECT_DELAY);

		return () => {
			clearTimeout(distoTimerRef.current);
		};
	}, [scanCode]);

	return (
		<ScanPageContext.Provider
			value={{
				scanCode,
				isSingleScan,
				isDistoVisible,
				licensePlateNumber,
				jobTitle,
				sendBusy,
				setScanCode,
				singleScanChanged,
				distoClosedHandler,
				setDistoOpeningCallback,
				setLicensePlateNumber,
				setJobTitle,
				setSendBusy,
			}}
		>
			{children}
		</ScanPageContext.Provider>
	);
}

export default ScanPageContext;
