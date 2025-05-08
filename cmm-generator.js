// Project-specific URL. Requires authentication key; paste yours into auth.js.
let url = 'https://api.airtable.com/v0/appdmDfLN7DRq7ore/indicators?filterByFormula=Status%3D%22%22&sort%5B0%5D%5Bfield%5D=Indicator&sort%5B0%5D%5Bdirection%5D=asc';

// AirTable endpoint url creation tool: https://codepen.io/airtable/pen/MeXqOg

let cmmIndicators; // a place to store the json


function setKey() {
    let apikey = document.getElementById("api-key");
    key = apikey.value;
    document.getElementById("buildcmm").disabled = true;
    getCmmData();
}

function getCmmData() {
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + key);

    fetch(url, {
        method: 'GET',
        headers: headers,
    })
        .then(response => response.json())
        .then(json => buildDocument(json.records));
}

function buildDocument(indicators) {
    cmmIndicators = indicators;

    let capability;
    let tocID;

    let indicatorSection = document.getElementById("cmm-indicators");
    document.querySelector("title").innerText = "WIC MIS Capability Maturity Model";
    indicatorSection.insertAdjacentHTML("beforebegin", `<h1>WIC MIS Capability Maturity Model</h1>`);
    indicatorSection.innerHTML += `<nav id="toc-main"><ul></ul></nav>`;

    indicators.forEach(indicator => {

        // if we're starting a new capability, add a header and TOC
        if (capability != indicator.fields["Capability Name"][0]) {
            let capabilityAnchor = indicator.fields["Capability Name"][0].split(".")[0];
            capability = indicator.fields["Capability Name"][0];
            indicatorSection.innerHTML += `<h2 id="cap${capabilityAnchor}">${capability}</h2>`;
            tocID = "toc-" + capabilityAnchor;
            indicatorSection.innerHTML += `<nav id="${tocID}"><ul></ul></nav>`;
            document.querySelector("#toc-main ul").innerHTML += `<li><a href="#cap${capabilityAnchor}">${capability}</a></li>`;
        }

        // note: all styles have to be inline in order for formatting to paste correctly into Google Docs.

        let indicatorAnchor = indicator.fields.Indicator.split(":")[0];

        // build a bulleted list of sources
        let sources = "";
        indicator.fields["Source (from Sources)"].forEach(source => {
            sources += `<li>${source}</li>`;
        });

        indicatorSection.innerHTML += `<h3 id="${indicatorAnchor}">${indicator.fields.Indicator}</h3>`;
        indicatorSection.innerHTML += `<p>${indicator.fields["Why is it important to measure as an indicator of maturity?"]}</p>`;
        indicatorSection.innerHTML += `<table class="maturity" border=1>
                                <thead>
                                    <tr><td style="background-color:#FFF2CC; width:25%;">Emerging</td><td style="background-color:#D9EAD3; width:25%;">Established</td><td style="background-color:#B7D7A8; width:25%;">Leading</td><td>Sources</td></tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${indicator.fields.Emerging}</td><td>${indicator.fields.Established}</td><td>${indicator.fields.Leading}</td><td><ul>${sources}</ul></td>
                                    </tr>
                                </tbody>
                            </table>`;
        document.querySelector(`#${tocID} ul`).innerHTML += `<li><a href="#${indicatorAnchor}">${indicator.fields.Indicator}</a></li>`;
    });
    document.getElementById("intro").remove();
}

key && getCmmData();