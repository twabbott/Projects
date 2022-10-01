import React, { createContext, useEffect, useState } from "react";
import {
	getAllAttributeTypes,
	getAllScanSteps,
	getCurrentConfiguration,
	getIdentifiers,
	postTenantConfiguration,
} from "api/dim-config-api";

import { createCustomAttribute } from "api/dim-custom-attribute-api";

const initialCustomerConfiguration = {
	attributeCaptureSteps: [],
	scanSteps: [],
	productionSettings: {},
};

const initialState = {
	isLoading: true,
	errors: [],
	customerConfiguration: initialCustomerConfiguration,
	identifiers: [],
	attributeTypes: [],
	scanSteps: [],
	mainIdentifierTypeChanged: () => {},
	attributeCaptureStepsChanged: () => {},
	attributeCaptureStepAdded: () => {},
	attributeCaptureStepRemoved: () => {},
	attributeCaptureStepMoved: () => {},
	scanStepsChanged: () => {},
	scanStepAdded: () => {},
	scanStepRemoved: () => {},
	scanStepMoved: () => {},
	customAttributeCreated: () => {},
	productionSettingsJobTitleChecked: () => {},
	productionSettingsLpnChecked: () => {},
	hasLoadSucceeded: () => {},
	hasLoadFailed: () => {},
	reload: () => {},
	saveCustomerConfiguration: () => {},
	scanJobTitleRequired: () => {},
	scanLicensePlateNumberRequired: () => {},
};

// prettier-ignore
const columnSelectors = {
  upc: (obj) => obj.identifiers.upc,
  gtin: (obj) => obj.identifiers.gtin,
  gtin_8: (obj) => obj.identifiers.gtin_8,
  gtin_12: (obj) => obj.identifiers.gtin_12,
  gtin_13: (obj) => obj.identifiers.gtin_13,
  gtin_14: (obj) => obj.identifiers.gtin_14,
  ean: (obj) => obj.identifiers.ean,
  mpn: (obj) => obj.identifiers.mpn,
  isbn: (obj) => obj.identifiers.isbn,
  isbn_10: (obj) => obj.identifiers.isbn_10,
  isbn_13: (obj) => obj.identifiers.isbn_13,
  sku: (obj) => obj.identifiers.sku,
  itemnumber: (obj) => obj.identifiers.itemNumber,
  name: (obj) => obj.name,
  description: (obj) => obj.description,
  productImage: (obj) => obj.productImage,
  dimensions: (obj) => `${obj.dimensions.length}x${obj.dimensions.width}x${obj.dimensions.height}`,
  quantity: (obj) => obj.quantity,
  manufacturer: (obj) => obj.manufacturer,
  weight: (obj) => obj.weight,
};

const DimDataContext = createContext(initialState);

export function DimDataProvider({ children }) {
	const [isLoading, setIsLoading] = useState(initialState.isLoading);
	const [errors, setErrors] = useState(initialState.errors);
	const [customerConfiguration, setCustomerConfiguration] = useState(initialState.customerConfiguration);
	const [identifiers, setIdentifiers] = useState(initialState.identifiers);
	const [attributeTypes, setAttributeTypes] = useState(initialState.attributeTypes);
	const [scanSteps, setScanSteps] = useState(initialState.scanSteps);

	function buildColumnConfig(config) {
		const columnConfig = [];
		config.attributeCaptureSteps.forEach((step) => {
			const stepType = step.name.toLowerCase();
			if (stepType in columnSelectors) {
				const colConfig = {
					name: step.name,
					selector: columnSelectors[stepType],
				};
				columnConfig.push(colConfig);
			}
		});

		config.scanSteps.forEach((step) => {
			const stepType = step.name.toLowerCase();
			if (stepType in columnSelectors) {
				const colConfig = {
					name: step.name,
					selector: columnSelectors[stepType],
				};
				columnConfig.push(colConfig);
			}
		});

		config.columnConfig = columnConfig;
	}

	async function fetchCurrentConfiguration() {
		try {
			const config = await getCurrentConfiguration();
			config.hasChanges = false;
			buildColumnConfig(config);
			setCustomerConfiguration(config);
		} catch (err) {
			addErrorMessage(`Error loading customer configuration: ${err.message}`);
		}
	}

	async function fetchIdentifiers() {
		try {
			const ids = await getIdentifiers();
			setIdentifiers(ids);
		} catch (err) {
			addErrorMessage(`Error loading list of product identifier types: ${err.message}`);
		}
	}

	async function fetchAllAttributeTypes() {
		try {
			const attributeTypes = await getAllAttributeTypes();
			setAttributeTypes(attributeTypes);
		} catch (err) {
			addErrorMessage(`Error loading list of default attribute capture steps: ${err.message}`);
		}
	}

	async function fetchAllScanSteps() {
		try {
			const scanSteps = await getAllScanSteps();
			setScanSteps(scanSteps);
		} catch (err) {
			addErrorMessage(`Error loading list of default scan capture steps: ${err.message}`);
		}
	}

	async function onLoad() {
		setIsLoading(true);

		const results = await Promise.allSettled([
			fetchCurrentConfiguration(),
			fetchIdentifiers(),
			fetchAllAttributeTypes(),
			fetchAllScanSteps(),
		]);
		if (results[0].status === "rejected") {
			const config = {
				attributeCaptureSteps: attributeTypes.filter((step) => step.isRequired),
				scanSteps: scanSteps,
				mainIdentifierType: "UPC",
				hasChanges: false,
			};
			buildColumnConfig(config);
			setCustomerConfiguration(config);
		}

		setIsLoading(false);
	}

	useEffect(() => {
		onLoad();
	}, []);

	function addErrorMessage(message) {
		setErrors([...errors, message]);
		alert(message);
	}

	function mainIdentifierTypeChanged(value) {
		let idx = -1;
		/* prettier-ignore */
		const newSteps = customerConfiguration.attributeCaptureSteps
      .map((step, i) => {
        if (step.name === customerConfiguration.mainIdentifierType) {
          return {...step, isRequired: false};
        }

        if (step.name === value) {
          idx = i;
          return {...step, isRequired: true};
        }

        return step;
      });

		if (idx < 0) {
			const newId = attributeTypes.find((t) => t.name === value);
			newSteps.unshift(newId);
		}

		setCustomerConfiguration({
			...customerConfiguration,
			attributeCaptureSteps: newSteps,
			mainIdentifierType: value,
			hasChanges: true,
		});
	}

	function attributeCaptureStepsChanged(steps) {
		setCustomerConfiguration({
			...customerConfiguration,
			attributeCaptureSteps: steps,
			hasChanges: true,
		});
	}

	function attributeCaptureStepAdded(step) {
		// prettier-ignore
		const newSteps = [
      ...customerConfiguration.attributeCaptureSteps, 
      step
    ];

		attributeCaptureStepsChanged(newSteps);
	}

	function attributeCaptureStepRemoved(step) {
		// prettier-ignore
		const newSteps = customerConfiguration.attributeCaptureSteps
      .filter((currentStep) => currentStep.name !== step.name);

		attributeCaptureStepsChanged(newSteps);
	}

	function attributeCaptureStepMoved(index, isMovedDown) {
		const newSteps = [...customerConfiguration.attributeCaptureSteps];
		const direction = isMovedDown ? 1 : -1;
		let temp = newSteps[index];
		newSteps[index] = newSteps[index + direction];
		newSteps[index + direction] = temp;
		attributeCaptureStepsChanged(newSteps);
	}

	async function customAttributeCreated(newAttribute) {
		try {
			var result = await createCustomAttribute(newAttribute);
			await fetchAllAttributeTypes();
			attributeCaptureStepAdded(result.data);
		} catch (err) {
			const message = err?.response?.data?.errors ? err.response.data.errors.join("\n") : err.message;
			addErrorMessage(message);

			throw Error("Error creating new custom attribute: " + message);
		}
	}

	function scanStepsChanged(steps) {
		setCustomerConfiguration({
			...customerConfiguration,
			scanSteps: steps,
			hasChanges: true,
		});
	}

	function scanStepAdded(step) {
		// prettier-ignore
		const newSteps = [
      step,
      ...customerConfiguration.scanSteps
    ];

		scanStepsChanged(newSteps);
	}

	function scanStepRemoved(step) {
		// prettier-ignore
		const newSteps = customerConfiguration.scanSteps
      .filter((currentStep) => currentStep.name !== step.name);

		scanStepsChanged(newSteps);
	}

	function scanStepMoved(index, isMovedDown) {
		const newSteps = [...customerConfiguration.scanSteps];
		const direction = isMovedDown ? 1 : -1;
		let temp = newSteps[index];
		newSteps[index] = newSteps[index + direction];
		newSteps[index + direction] = temp;
		scanStepsChanged(newSteps);
	}

	function productionSettingsJobTitleChecked(checked) {
		setCustomerConfiguration({
			...customerConfiguration,
			productionSettings: {
				...customerConfiguration.productionSettings,
				aliasRequired: checked,
			},
			hasChanges: true,
		});
	}

	function productionSettingsLpnChecked(checked) {
		setCustomerConfiguration({
			...customerConfiguration,
			productionSettings: {
				...customerConfiguration.productionSettings,
				lpnRequired: checked,
			},
			hasChanges: true,
		});
	}

	async function saveCustomerConfiguration() {
		try {
			await postTenantConfiguration(customerConfiguration);

			setCustomerConfiguration({
				...customerConfiguration,
				hasChanges: false,
			});
		} catch (err) {
			alert("something bad happened. Send help.");
		}
	}

	function scanJobTitleRequired() {
		return !isLoading && !!customerConfiguration.scanSteps.find((step) => step.name === "Job Title");
	}

	function scanLicensePlateNumberRequired() {
		return !isLoading && !!customerConfiguration.scanSteps.find((step) => step.name === "License Plate Number");
	}

	return (
		<DimDataContext.Provider
			value={{
				isLoading,
				errors,
				customerConfiguration,
				identifiers,
				attributeTypes,
				scanSteps,
				mainIdentifierTypeChanged,
				attributeCaptureStepsChanged,
				attributeCaptureStepAdded,
				attributeCaptureStepRemoved,
				attributeCaptureStepMoved,
				scanStepsChanged,
				scanStepAdded,
				scanStepRemoved,
				scanStepMoved,
				customAttributeCreated,
				productionSettingsJobTitleChecked,
				productionSettingsLpnChecked,
				hasLoadSucceeded: (_) => !isLoading && errors.length === 0,
				hasLoadFailed: (_) => !isLoading && errors.length > 0,
				reload: onLoad,
				saveCustomerConfiguration,
				scanJobTitleRequired,
				scanLicensePlateNumberRequired,
			}}
		>
			{children}
		</DimDataContext.Provider>
	);
}

export default DimDataContext;
