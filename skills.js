function calculateNumbers(var1, var2) {
    var field1 = document.getElementById("num1").value;
    var field2 = document.getElementById("num2").value;
    var result = parseInt(field1) * parseInt(field2);
    if (!isNaN(result)) {
        document.getElementById("answer").innerHTML = "The answer is " + result;
    }
}  