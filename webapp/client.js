
const WEBSITE_NAME = "ENTER WEBSITE URL or IP ADDRESS HERE";
console.log("Hello There");
// Use VUE js
doSearch();


function displayJSON(list) {

}

function displayMovie(movie) {
    console.log(movie);
}
function doSearch() {
    searchParam = "Hello World";
    console.log("doing search", searchParam);
    fetch(WEBSITE_NAME+"/"+searchParam).then((res) => {
        console.log("recieved answer");
        displayMovie(res);
    });
}