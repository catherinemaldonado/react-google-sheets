import React, { Component } from 'react';

import GoogleSheetConnector from './google-sheet-connector'
import { log } from 'ruucm-util'


var googleSheet;

/* Components */
class ReactGoogleSheets extends Component {
	componentDidMount() {
		googleSheet = new GoogleSheetConnector({
			apiKey: this.props.apiKey,
			clientId: this.props.clientId,
			spreadsheetId: this.props.spreadsheetId
		}, function() {
				this.props.afterLoading();
		}.bind(this));
	}
	render() {
		return this.props.children || null
	}
}

export const connectToSpreadsheet = function(component) {
	return function(props) {
			var newProps = {
					getSheetsData: function(sheetName) {
							return googleSheet.getSheetsData(sheetName);
					},
					updateCell: function(column, row, value, successCallback, errorCallback) {
						return googleSheet.updateCell(column, row, value, successCallback, errorCallback);
					},
			};

			for (var i in props) {
					newProps[i] = props[i];
			}

			return React.createElement(component, newProps);
	};
};

export default ReactGoogleSheets;
