/*-------------------------------------------*\
   http.js

  Class constructor to handle our historic queries
\*-------------------------------------------*/
import tableDataInstance from '../Components/Table.js'

let subtract_minutes = function(dt, minutes) {
    return new Date(Date.now() - minutes * 60000);
}

class HTTP {

    constructor() {
        this.resultData = []
        this.sortValue = true
        this.response = {
            responsedata: "ya"
        };
    }

     /**
     * setSortValue
     * handles sorting value for results
     * @{bool} sortValue 
     *  - true = ascending
     *  - false = descending
     */

   
    setSortValue (requestedSort) {
      httpInstance.sortValue = requestedSort;
      tableDataInstance.switchDataSource();
      let oldArr = [...httpInstance.resultData];
      httpInstance.resultData.splice(0, httpInstance.resultData.length)
      if (httpInstance.sortValue) {
          //ascending sort if sortvalue = true
          oldArr.sort((a, b) => a.timestamp - b.timestamp);
      } else {
          // descending sort if sortvalue = false
          oldArr.sort((a, b) => b.timestamp - a.timestamp);

      }

        oldArr.map(dataPoint => {
                    httpInstance.resultData.push(dataPoint)
                    tableDataInstance.addRow(dataPoint)
        })
      return;
   }

     

    /**
     * handles http request
     * @param{string} @param{string} points - string of points, seperated by ,
     */
    handleRequest = (points) => {
        httpInstance.resultData.splice(0, httpInstance.resultData.length)
        tableDataInstance.switchDataSource()
        if (!points) {
            return console.log("no points sent")
        }
        const arrofPoints = points.split(",");
        let start = Date.parse(subtract_minutes(new Date(Date.now()), 15))
        let end = Date.now()
        let resultArr = [];

        Promise.all(arrofPoints.map(point => fetch(`http://localhost:8080/history/${point}?start=${start}&end=${end}`))).then(responses =>
            Promise.all(responses.map(res => res.json()))
        ).then(json => {
            resultArr.push(...json)
            if (json.length > 1) {
                resultArr = [...json[0], ...json[1]]

                if (httpInstance.sortValue) {
                    //ascending sort if sortvalue = true
                    resultArr.sort((a, b) => a.timestamp - b.timestamp);
                } else {
                    // descending sort if sortvalue = false
                    resultArr.sort((a, b) => b.timestamp - a.timestamp);

                }
                resultArr.map(dataPoint => {
                    httpInstance.resultData.push(dataPoint)
                    tableDataInstance.addRow(dataPoint)
                })

                return resultArr;
            }

            const flatenResult = resultArr.flat(1);
            if (httpInstance.sortValue) {
                //ascending sort if sortvalue = true
              flatenResult.sort((a, b) => a.timestamp - b.timestamp);
            } else {
              flatenResult.sort((a, b) => b.timestamp - a.timestamp);
            }

            flatenResult.map(dataPoint => {
                httpInstance.resultData.push(dataPoint)
                tableDataInstance.addRow(dataPoint)
            })
            return flatenResult;
        })
    }
}


let httpInstance = new HTTP();
//Object.freeze(httpInstance);
export default httpInstance;