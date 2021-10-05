
// document.getElementById("output").innerHTML += Object.keys(unitjs.string("example"));
// console.log(unitjs.string("example"));
// document.getElementById("output").innerHTML += (unitjs.string(5) === null ? "Test Passed" : "Test Failed");


try {
    document.getElementById("output").innerHTML +=("unitjs.string(5): &nbsp;");
    unitjs.string(5);
    document.getElementById("output").innerHTML += "<span style='color: #239937;'>Test Passed</span></br>";
} catch(e) {
    document.getElementById("output").innerHTML += "<span style='color: #e64843;'>Test failed</span><br>";
}




