//RecipeCard.js
//USED FROM LAB 6
class RecipeCard extends HTMLElement {
    constructor() {
      // Part 1 Expose - TODO
      super()
      this.attachShadow({mode: 'open'});
  
      // You'll want to attach the shadow DOM here
    }
  
    set data(data) {
      // This is the CSS that you'll use for your recipe cards
      const styleElem = document.createElement('style');
      const styles = `
        * {
          margin: 0;
          padding: 0;
        }
  
        article {
          align-items: center;
          border: 1px solid black;
          border-radius: 8px;
          display: grid;
          grid-template-rows: 118px 56px 56px 56px 0px 0px;
          height: 300px;
  
          padding: 0 16px 16px 16px;
          background-color: #303030;
          width: 178px;
          filter: drop-shadow(20px 20px 10px rgba(0, 0, 0, 0.35));
        }
  
        article:hover{
          transform: scale(1.05);
      }
  
        article > img {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          height: 118px;
          object-fit: cover;
          margin-left: -16px;
          width: calc(100% + 32px);
        }
        
        h1.title {
          display: -webkit-box;
          height: 30px;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          color: white;
        }
  
        p.description{
          display: -webkit-box;
          font-size: 16px;
          overflow: hidden;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          color: white;
          font-family: Capriola;
          font-style: normal;
          font-weight: normal;
        }
  
        p.time{
          display: -webkit-box;
          font-size: 16px;
          height: 36px;
          line-height: 18px;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          color: white;
          font-family: Capriola;
          font-style: normal;
          font-weight: normal;
        }
      `;
      styleElem.innerHTML = styles;
  
      // Here's the root element that you'll want to attach all of your other elements to
      const card = document.createElement('article');
  
      // Some functions that will be helpful here:
      //    document.createElement()
      //    document.querySelector()
      //    element.classList.add()
      //    element.setAttribute()
      //    element.appendChild()
      //    & All of the helper functions below
  
      // Make sure to attach your root element and styles to the shadow DOM you
      // created in the constructor()
  
      // Part 1 Expose - TODO
      this.shadowRoot.appendChild(styleElem);;
  
      //set image src
      const image = document.createElement('img');
      let recipeImage = searchForKey(data, "image");
      image.setAttribute('src', recipeImage);
      //set image alt
      image.setAttribute('alt', "Can't find alt text");
      card.appendChild(image);
  
      //set title
      const title = document.createElement('h1');
      title.classList.add('title');
      const titleName = searchForKey(data, "name");
      title.textContent = titleName;
      card.appendChild(title);
  
      //set description
      const description = document.createElement('p');
      description.classList.add("description");
      const descriptionValue = searchForKey(data , "description");
      description.textContent = descriptionValue;
      card.appendChild(description);
  
      let br = document.createElement('br');
      card.appendChild(br);
      
      //set time
      const time = document.createElement('p');
      time.classList.add("time");
      const timeValue = searchForKey(data,"time");
      time.textContent = "Time: " + timeValue;
      card.appendChild(time);
      
  
      this.shadowRoot.appendChild(card);
      
  
    }
  }
  
  
  /*********************************************************************/
  /***                       Helper Functions:                       ***/
  /*********************************************************************/
  
  /**
   * Recursively search for a key nested somewhere inside an object
   * @param {Object} object the object with which you'd like to search
   * @param {string} key the key that you are looking for in the object
   * @returns {*} the value of the found key
   */
  function searchForKey(object, key) {
    var value;
    Object.keys(object).some(function (k) {
      if (k === key) {
        value = object[k];
        return true;
      }
      if (object[k] && typeof object[k] === 'object') {
        value = searchForKey(object[k], key);
        return value !== undefined;
      }
    });
    return value;
  }
  
  /**
   * Extract the URL from the given recipe schema JSON object
   * @param {Object} data Raw recipe JSON to find the URL of
   * @returns {string} If found, it returns the URL as a string, otherwise null
   */
  function getUrl(data) {
    if (data.url) return data.url;
    if (data['@graph']) {
      for (let i = 0; i < data['@graph'].length; i++) {
        if (data['@graph'][i]['@type'] == 'Article') return data['@graph'][i]['@id'];
      }
    };
    return null;
  }
  
  /**
   * Similar to getUrl(), this function extracts the organizations name from the
   * schema JSON object. It's not in a standard location so this function helps.
   * @param {Object} data Raw recipe JSON to find the org string of
   * @returns {string} If found, it retuns the name of the org as a string, otherwise null
   */
  function getOrganization(data) {
    if (data.publisher?.name) return data.publisher?.name;
    if (data['@graph']) {
      for (let i = 0; i < data['@graph'].length; i++) {
        if (data['@graph'][i]['@type'] == 'Organization') {
          return data['@graph'][i].name;
        }
      }
    };
    return null;
  }
  
  /**
   * Converts ISO 8061 time strings to regular english time strings.
   * Not perfect but it works for this lab
   * @param {string} time time string to format
   * @return {string} formatted time string
   */
  function convertTime(time) {
    let timeStr = '';
  
    // Remove the 'PT'
    time = time.slice(2);
  
    let timeArr = time.split('');
    if (time.includes('H')) {
      for (let i = 0; i < timeArr.length; i++) {
        if (timeArr[i] == 'H') return `${timeStr} hr`;
        timeStr += timeArr[i];
      }
    } else {
      for (let i = 0; i < timeArr.length; i++) {
        if (timeArr[i] == 'M') return `${timeStr} min`;
        timeStr += timeArr[i];
      }
    }
  
    return '';
  }
  
  /**
   * Takes in a list of ingredients raw from imported data and returns a neatly
   * formatted comma separated list.
   * @param {Array} ingredientArr The raw unprocessed array of ingredients from the
   *                              imported data
   * @return {string} the string comma separate list of ingredients from the array
   */
  function createIngredientList(ingredientArr) {
    let finalIngredientList = '';
  
    /**
     * Removes the quantity and measurement from an ingredient string.
     * This isn't perfect, it makes the assumption that there will always be a quantity
     * (sometimes there isn't, so this would fail on something like '2 apples' or 'Some olive oil').
     * For the purposes of this lab you don't have to worry about those cases.
     * @param {string} ingredient the raw ingredient string you'd like to process
     * @return {string} the ingredient without the measurement & quantity 
     * (e.g. '1 cup flour' returns 'flour')
     */
    function _removeQtyAndMeasurement(ingredient) {
      return ingredient.split(' ').splice(2).join(' ');
    }
  
    ingredientArr.forEach(ingredient => {
      ingredient = _removeQtyAndMeasurement(ingredient);
      finalIngredientList += `${ingredient}, `;
    });
  
    // The .slice(0,-2) here gets ride of the extra ', ' added to the last ingredient
    return finalIngredientList.slice(0, -2);
}

// Need this for unit tests please do not remove
module.exports = {searchForKey, getUrl, getOrganization, convertTime};

// Define the Class so you can use it as a custom element.
// This is critical, leave this here and don't touch it
customElements.define("recipe-card", RecipeCard);
