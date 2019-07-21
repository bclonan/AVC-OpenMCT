/*-------------------------------------------*\
   PropertiesPaneControl.js

   Slideout menu that allows users to enter custom domain identifiers
 
   Includes
   - HandleRequests
   
   
\*-------------------------------------------*/
import {
    toggleSlideMenu
} from '../components/LeftPaneControl.js'
import tableDataInstance from './Table.js'
import wsInstance from '../Services/ws.js';
/**
 * Static HTML IDs
 */
let movingMenu = "propertiesMenu";

let PropertiesPaneControl = {
  /**
 * Toggle the menu visibility
 */
    switchToggle(element, state) {
        let targetElemet = document.getElementById(`${element}`)
        return state ? targetElemet.classList.add("is-active") : targetElemet.classList.remove("is-active")

    },
    render: async () => {
        let view = `
<div id="propertiesMenu" class="propertiesMenu">
  <div class="propertiesMenuTitle">
    Custom-Queries
  </div>
  <!--MARK : Property Data-->
  <div class="proprtyFormContainer">
    <form class="propertyForm" id="message-form" action="#" method="post">
      <div class="propertiesPaneDescriptor">
        <h4>Enter PointId </h4>
        <p>single : pwr.c</p>
        <p>multi : pwr.v,pwr.c </p>
        
        <input id="customTextInput" placeholder="Enter your domain object here" required></input>
      </div>
      </form>
  </div>
   <button class="propertyFormButton connect" id="propertyFormSubmit">Connect</button>
    
  <div>
   <button id="propertiesCloseMenu" class="propertyFormButton connect">Close Panel</button>
  
  </div>
</div>
        `
        return view
    },
    attach_listeners: async () => {

        /* Setup Document Selectors */
        let toggleSlideButton = document.getElementById("propertiesCloseMenu");
        let submitCustomButton = document.getElementById("propertyFormSubmit");
        let customTextInput = document.getElementById('customTextInput');

        /**
         * Submit form of custom pointId
         * 
         * note: currently only supporting /realtime endpoint
         * to extend, add an extra paramater to handlesubscriptions
         */
        submitCustomButton.addEventListener("click", (e) => {
           event.preventDefault()
           let val = customTextInput.value;
           wsInstance.handleSubscriptions(val)
           val.innerhtml = ''
        })


        /**
         * close slideout
         */
        toggleSlideButton.addEventListener("click", () => {

            const current = toggleSlideMenu();
            PropertiesPaneControl.switchToggle(movingMenu, current)

        })
    }
}


export default PropertiesPaneControl;

export function handleSlideShow(state) {
    console.log("current from handleslideshow", state)
    PropertiesPaneControl.switchToggle(movingMenu, state)

}