import React, { createContext, useState } from "react";

import { productState } from "../scan/product-state";
import { useIntl } from "react-intl";

const initialPageStatus = {
	status: productState.NONE,
	message: "",
};

const initialState = {
	pageStatus: initialPageStatus,
	pageStatusChanged: () => {},
};

const ScanPageStatusContext = createContext(initialState);

export function ScanPageStatusProvider({ children }) {
	const intl = useIntl();
	const [pageStatus, setPageStatus] = useState(initialPageStatus);

	function pageStatusChanged(status, message = "", isLocaleId = true) {
		const m = message && isLocaleId ? intl.formatMessage({ id: message }) : message;
		setPageStatus({
			status,
			message: m,
		});
	}

	return (
		<ScanPageStatusContext.Provider
			value={{
				pageStatus,
				pageStatusChanged,
			}}
		>
			{children}
		</ScanPageStatusContext.Provider>
	);
}

export default ScanPageStatusContext;
