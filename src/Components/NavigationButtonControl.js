/*-------------------------------------------*\
   NavigationButtonControl.js

   Serves as buttons and titles within the navigation bar

   
\*-------------------------------------------*/

import { getMenu, changeMenu } from '../components/LeftPaneControl.js'


let NavigationButtonControl = {
   render: async () => {
      let view = `
      <ul id="nav_wrapper">
         <li class="navLink">OpenMCT Exam - </li>
          <li class="navLink toggleButton is-active"  data-menu="realTime">Toggle Real-Time </li>
          <li class="navLink toggleButton"  data-menu="historic">Toggle Historic </li>      
      </ul>
      `
      return view
   },
   attach_listeners: async () => {

      /**
       * Setup dom targets used in toggling leftPanel menus
       */
      const toggleButtons = document.getElementsByClassName("toggleButton");
      let navButtons = Array.from(toggleButtons);


      
        /**
         * click function handling switching between real time and historic
         */
      const handleClick = (e) => {
         e.preventDefault();
         navButtons.forEach(node => {
            node.classList.remove('is-active');
         });
         e.currentTarget.classList.add('is-active');
         changeMenu(e.currentTarget.getAttribute("data-menu"));

      }

      navButtons.forEach(node => {
         node.addEventListener('click', handleClick)
      });

   }

}

export default NavigationButtonControl;