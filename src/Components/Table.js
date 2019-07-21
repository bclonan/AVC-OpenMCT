
import wsInstance from '../Services/ws.js'

class FetchTable {
    constructor(pageTitle) {
        this.currentTableObject = {};
        this.pageTitle = pageTitle;
    }
    init () {
        /**
         * initiate initial table object
         */
        this.currentTableObject = {
            columns: [
                {
                    text: "ID",
                    identifier: "id"
                },
                {
                    text: "Timestamp",
                    identifier: "timestamp"
                },
                {
                    text: "Value",
                    identifier: "value"
                }
            ],
            data: wsInstance.resultData
        }

        return this.render()
    }
    /**
     * set page title
     * @param{string} title
     */
    setPageTitle (title) {
        return this.pageTitle = title
    }
    /**
     * get page title
     */
    getPagetitle () {

        return this.pageTitle;
    }


    generateTableExtended (table, tblObj) {


        const newTable = `
        <table class="fixed_header" id="data-table">
        <thead>
            <tr class="trHeader">
           ${tblObj.columns.map((column) => `\t\t\t<th class="trHeader" onclick="sortBy('${column.text}')">${column.text}</th>`).join('\n ')}
            
            </tr>
        </thead>
        <tbody id="tableBody">
        ${tblObj.data.map((row, index) =>
            `\t\t\t<tr class="trself" data-id="${index}" id="${index}">
            <td>${row.id}</td> <td>${row.id}</td> <td>${index}</td>`)}
                   
        </tbody>
        </table>`;

        return newTable
    }

    /**
     * render initial table
     * 
     */
    render () {
        let tableObjectResponse = this.currentTableObject;
        let newTable = this.generateTableExtended(dataTable, tableObjectResponse)
        return newTable

    }
    /**
    * add rows to the table
    * @param{object} rowItem - item representing a table row
    */
    addRow (rowItem) {

        const baseRowContent = `<tr class="trself"><td>${rowItem.id}</td><td>${rowItem.timestamp}</td><td>${rowItem.value}</td></tr>`
        const tableRef = document.getElementById('data-table').getElementsByTagName('tbody')[0];

        const newRow = tableRef.insertRow(tableRef.rows.length);
        newRow.innerHTML = baseRowContent;


    }
    /**
     * switchDataSource
     * Used to remove all data from the table
     */
    switchDataSource () {
        const tableRef = document.getElementById('data-table').getElementsByTagName('tbody')[0];


        while (tableRef.firstChild) {
            tableRef.removeChild(tableRef.firstChild)
        }
    }
}

const tableDataInstance = new FetchTable();

export default tableDataInstance;
