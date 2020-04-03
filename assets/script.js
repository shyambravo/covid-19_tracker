function defaultValue() {

    var data = null;
    var result;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    var countries = ["All"];
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            result = JSON.parse(this.responseText);
            result.affected_countries.forEach(movie => {
                // Log each movie's title
                countries.push(movie);
            });
            autocomplete(document.getElementById("myInput"), countries);
        }
    });

    xhr.open("GET", "https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php");
    xhr.setRequestHeader("x-rapidapi-host", "coronavirus-monitor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "3b2e16011amsh787b40938858041p1ddd68jsn46def3d82fd8");
    xhr.send(data);
    //api call
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    var totalcases = 10;
    var totaldeaths = 20;
    var totalrecovered = 30;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var data = JSON.parse(this.responseText);
            totalcases = data.total_cases;
            totaldeaths = data.total_deaths;
            totalrecovered = data.total_recovered;
            document.getElementById("total").textContent = totalcases;
            document.getElementById("deaths").textContent = totaldeaths;
            document.getElementById("recovered").textContent = totalrecovered;
            let deathPercent = (parseInt(data.total_deaths.replace(/,/g, '')) / parseInt(data.total_cases.replace(/,/g, ''))) * 100;
            var n = deathPercent.toFixed(2);
            document.getElementById("deathpercent").textContent = n;
            graphy(totalcases, totaldeaths, totalrecovered);
        }
    });

    xhr.open("GET", "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php");
    xhr.setRequestHeader("x-rapidapi-host", "coronavirus-monitor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "3b2e16011amsh787b40938858041p1ddd68jsn46def3d82fd8");

    xhr.send(data);
}


var myChart;
var ctx = document.getElementById('myChart');
// graph libarary
function graphy(x, y, z) {
    var total = x.replace(",", "");
    var deaths = y.replace(",", "");
    var recovered = z.replace(",", "");
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Number of Infected', 'Number of deaths', 'Number of recovered'],
            datasets: [{
                label: '# of cases',
                data: [parseInt(total), parseInt(deaths), parseInt(recovered)],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(74, 231, 223, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(74, 231, 223, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}

function countrychange() {

    var country = document.getElementById("myInput").value;
    if (country == "All") {

        var data = null;
        var result;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        var countries = ["All"];
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                result = JSON.parse(this.responseText);
                result.affected_countries.forEach(movie => {
                    // Log each movie's title
                    countries.push(movie);
                });
                autocomplete(document.getElementById("myInput"), countries);
            }
        });

        xhr.open("GET", "https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php");
        xhr.setRequestHeader("x-rapidapi-host", "coronavirus-monitor.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "3b2e16011amsh787b40938858041p1ddd68jsn46def3d82fd8");
        xhr.send(data);
        //api call
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        var totalcases = 10;
        var totaldeaths = 20;
        var totalrecovered = 30;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                var data = JSON.parse(this.responseText);
                totalcases = data.total_cases;
                totaldeaths = data.total_deaths;
                totalrecovered = data.total_recovered;
                document.getElementById("total").textContent = totalcases;
                document.getElementById("deaths").textContent = totaldeaths;
                document.getElementById("recovered").textContent = totalrecovered;
                let deathPercent = (parseInt(data.total_deaths.replace(/,/g, '')) / parseInt(data.total_cases.replace(/,/g, ''))) * 100;
                var n = deathPercent.toFixed(2);
                document.getElementById("deathpercent").textContent = n;
                myChart.data.datasets[0].data = [parseInt(totalcases.replace(/,/g, '')), parseInt(totaldeaths.replace(/,/g, '')), parseInt(totalrecovered.replace(/,/g, ''))];
                myChart.update();
            }
        });

        xhr.open("GET", "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php");
        xhr.setRequestHeader("x-rapidapi-host", "coronavirus-monitor.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "3b2e16011amsh787b40938858041p1ddd68jsn46def3d82fd8");

        xhr.send(data);

    } else {

        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                var res = JSON.parse(this.responseText);
                document.getElementById("total").textContent = res.latest_stat_by_country[0].total_cases;
                document.getElementById("deaths").textContent = res.latest_stat_by_country[0].total_deaths;
                document.getElementById("recovered").textContent = res.latest_stat_by_country[0].total_recovered;
                var totalCase = parseInt(res.latest_stat_by_country[0].total_cases.replace(/,/g, ''));
                var totalDeath = parseInt(res.latest_stat_by_country[0].total_deaths.replace(/,/g, ''));
                var totalRecovered = parseInt(res.latest_stat_by_country[0].total_recovered.replace(/,/g, ''));
                let deathpercent = (totalDeath / totalCase) * 100;
                var n = deathpercent.toFixed(2);
                document.getElementById("deathpercent").textContent = n;
                myChart.data.datasets[0].data = [totalCase, totalDeath, totalRecovered];
                myChart.update();

            }
        });

        xhr.open("GET", "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=" + country);
        xhr.setRequestHeader("x-rapidapi-host", "coronavirus-monitor.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "3b2e16011amsh787b40938858041p1ddd68jsn46def3d82fd8");
        xhr.send(data);

    }


}


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
