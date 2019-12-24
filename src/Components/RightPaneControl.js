/*-------------------------------------------*\
   RightPaneControl.js

   Serves as the dashboard content area
 
   Includes
   - Table.js
   
\*-------------------------------------------*/

import tableDataInstance from './Table.js'


let RightPaneControl = {
  
   render: async () => {
      let view = `
        <div id="rightPanelWrapper">
           <h2>current table</h2>
             <table id="dataTable">
                     <!-- Data Appears Here -->
            </table>
         </div>
        `
      return view
   },
   attach_listeners: async () => {
      
   const tableWrapper = document.getElementById('rightPanelWrapper');
       tableWrapper.innerHTML =  tableDataInstance.init()

   }

}

export default RightPaneControl;

