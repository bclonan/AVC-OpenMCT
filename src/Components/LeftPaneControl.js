/*-------------------------------------------*\
   LeftPaneControl.js

   Serves as the menu to handle different queries
 
   Includes
   - HandleRequests
   
\*-------------------------------------------*/

import httpInstance from '../Services/http.js'
import { handleSlideShow } from '../Components/PropertiesPaneControl.js'
import tableDataInstance from './Table.js'

import wsInstance from '../Services/ws.js';

export class leftPaneState {

   currentMenu = 'historic';
   toggleSideMenu = false;

   constructor(toggleSideMenu, currentMenu) {
      this.currentMenu = toggleSideMenu
      this.toggleSideMenu = currentMenu

   }

   get currentMenu () {
      return this._currentMenu
   }

   set currentMenu (menu) {
      this._currentMenu = menu
   }

   get toggleSideMenu () {
      return this._toggleSideMenu
   }

   set toggleSideMenu (val) {
      this._toggleSideMenu = val
   }

   get toggledSlideoutStatus () {
      let res = this.handlePropertiesSlideout()
      console.log(res)
      return res;
   }

   handlePropertiesSlideout () {
      return this.toggleSideMenu = !this.toggleSideMenu;
   }
}

let defaultState = new leftPaneState();
/**
 * Initiate default states
 */


let LeftPaneControll = {

   render: async () => {
      let view = `
            <div id="wcMenu" class="is-active">
                  <div class="leftPaneTitle" id="querylatest">
                            Real-Time Queries
                  </div>
                  <hr />
                  <div class="leftPaneControl is-active wsQuery" data-point="pwr.v,pwr.c">
                            Query Both
                  </div>
                  <div class="leftPaneControl wsQuery"  data-point="pwr.v" >
                            Query Voltage
                  </div>
                  <div class="leftPaneControl wsQuery" data-point="pwr.c">
                            Query Current
                  </div>
                  <div class="leftPaneControl wsQuery">
                            Reset
                  </div>
                  <div class="leftPaneTitle">
                            Toggle Custom Panel
                  </div>
                  <hr />
                  <div class="leftPaneControl" id="toggleCustomPanel">
                            Custom
                  </div>
            </div>
            <div id="httpMenu">
                  <div class="leftPaneTitle"  >
                            Historic Queries
                  </div>
                  <hr />
                  <div class="leftPaneControl is-active httpQuery" data-point="pwr.v,pwr.c">
                            Query Latest
                  </div>
                  <div class="leftPaneControl httpQuery" data-point="pwr.v">
                            Query One : A
                  </div>
                  <div class="leftPaneControl httpQuery" data-point="pwr.c">
                            Query One : B
                  </div>
                  <div class="leftPaneTitle">
                            Sorting
                  </div>
                  <hr />
                  <div class="leftPaneControlSort is-active-sort" id="httpSetSortAscending">
                            Sort Ascending
                  </div>
                  <div class="leftPaneControlSort is-active-sort" id="httpSetDescending">
                            Sort Descending
                  </div>
            </div>
        `
      return view
   },
   attach_listeners: async () => {

      changeMenu('realTime')
      
      // wsInstance.createSocketConnection('realtime')
      /* Setup Document Selectors */

      let toggleCustomMenu = document.getElementById("toggleCustomPanel");
      let toggleSortAscending = document.getElementById("httpSetSortAscending");
      let toggleSortDescending = document.getElementById("httpSetDescending");
      toggleSortDescending.classList.remove('is-active-sort');

      /**
       * Selectors for real-time subscritions
       */
      const allWSButtons = document.getElementsByClassName("wsQuery");
      let wsButton = Array.from(allWSButtons);

      /**
       * Selectors for historic 
       */
      const allHTTPButtons = document.getElementsByClassName("httpQuery");
      let httpButton = Array.from(allHTTPButtons);

      /**
       * Add event listeners to new realtime queries
       */
      const handleWSClick = (e) => {
         e.preventDefault();
         wsButton.forEach(node => {
            node.classList.remove('is-active');
         });
         e.currentTarget.classList.add('is-active');
         wsInstance.handleSubscriptions(e.currentTarget.getAttribute("data-point"))
      }

      wsButton.forEach(node => {
         node.addEventListener('click', handleWSClick)
      });

       /**
       * Add event listeners to new historic queries
       */
      const handleHTTPClick = (e) => {
         e.preventDefault();
         httpButton.forEach(node => {
            node.classList.remove('is-active');
         });
         e.currentTarget.classList.add('is-active');
         httpInstance.handleRequest(e.currentTarget.getAttribute("data-point"))
      }

      httpButton.forEach(node => {
         node.addEventListener('click', handleHTTPClick)
      });

       /**
       * Toggle custom paramater slide out menu
       */

      toggleCustomMenu.addEventListener("click", () => {
         leftPaneState.toggleSideMenu = !leftPaneState.toggleSideMenu
         const send = leftPaneState.toggleSideMenu;
         handleSlideShow(send)
      })

       /**
       * Handle sorting table by timestamp
       */
      toggleSortAscending.addEventListener("click", (e) => {
         toggleSortAscending.classList.add('is-active-sort');
         toggleSortDescending.classList.remove('is-active-sort');
         httpInstance.setSortValue(true)
      })

      toggleSortDescending.addEventListener("click", (e) => {
         
         toggleSortDescending.classList.add('is-active-sort');
         toggleSortAscending.classList.remove('is-active-sort');
         httpInstance.setSortValue(false)
      })
      


   }

}

export default LeftPaneControll;

export function changeMenu (menuName) {
   let wcMenu = document.getElementById("wcMenu");
   let httpMenu = document.getElementById("httpMenu");
   defaultState.currentMenu = menuName

   switch (menuName) {
      case "realTime": {

         wsInstance.createSocketConnection('realtime')
         wcMenu.classList.add('is-active');
         httpMenu.classList.remove('is-active');
         tableDataInstance.setPageTitle("Real Time Data");
         break;
      }
      case "historic": {
         wsInstance.closeSocket('realtime')
         wcMenu.classList.remove('is-active');
         httpMenu.classList.add('is-active');
         tableDataInstance.setPageTitle("Historic Data");
         break;
      }
      default: {
         console.log("Unknown data-type sent from navigationbuttoncontroller.js");
         break;
      }
   }
}


export function getMenu () {
   const menuActive = defaultState.currentMenu
   return menuActive
}

export function toggleSlideMenu () {
   leftPaneState.toggleSideMenu = false
   return false
}
