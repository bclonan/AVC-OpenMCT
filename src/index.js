/*-------------------------------------------*\
   index.js

   Imports used modules throughout the application
   
   Global Config variables
   - baseurl
   - socket base
   - http base
   
   App Shell wrappers
   - dashWrapper
   - leftPane
   - rightPane
   - propertiesPane
   - dataTable
   - navWrapper
   
   UI Elements
   - leftPaneControl.js 

   Index
   - https.js
   - App
\*-------------------------------------------*/

import LeftPaneControll from './Components/LeftPaneControl.js';
import PropertiesPaneControl from './Components/PropertiesPaneControl.js';
import RightPaneControl from './Components/RightPaneControl.js';
import NavigationBarControl from './Components/NavigationButtonControl.js';


/**
 * Base url's
 * 
 */
let baseurl = 'http://localhost:8080/';
let socketBaseUrl = 'ws://localhost:8080/realtime';
let httpBaseUrl = 'http://localhost:8080/history';

/**
 * Target App Shell elements by id
 * 
 */
  const dashWrapper = null || document.getElementById('dash_wrapper');
  const leftPane = null || document.getElementById('left_pane');
  const rightPane = null || document.getElementById('right_pane');
  const propertiesPane = null || document.getElementById('properties_pane');
  const dataTable = null || document.getElementById('dataTable');
  const navWrapper = null || document.getElementById('nav_wrapper');


/**
 * Setup View Elements
 */

const setupScreens = async () => {

/**
 * leftPaneControl.js
 * serves as the primary controls handling requests
 */

leftPane.innerHTML = await LeftPaneControll.render();
await LeftPaneControll.attach_listeners();


/**
 * propertiesPaneControl.js
 * serves as a slide out menu allowing users to enter custom domain objects
 */

propertiesPane.innerHTML = await PropertiesPaneControl.render();
await PropertiesPaneControl.attach_listeners();

/**
 * rightPane.js
 * serves as a slide main dashboard content area
 */

rightPane.innerHTML = await RightPaneControl.render();
await RightPaneControl.attach_listeners();

/**
 * navWrapper.js
 * serves as a buttons within navigation wrapper
 */

navWrapper.innerHTML = await NavigationBarControl.render();
await NavigationBarControl.attach_listeners();


}

window.onload = function() {
  setupScreens()
};
  