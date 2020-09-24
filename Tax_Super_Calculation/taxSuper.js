var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//calculate the tax contributions, dependent on the bracket the employee is in
function calcTax(sal) {
    //switch case statement for each tax bracket returns tax fixed to 2 decimal places
    switch(true) {
        case sal <= 18200:
            return 0
            break;
        case sal >= 18200 && sal <= 37000:
            return ((sal - 18200) * .19)
            break;
        case sal >= 37001 && sal <= 90000:
            return (((sal - 37000) * .325) + 3572)
            break;
        case sal >= 90001 && sal <= 180000:
            return (((sal - 90000) * .37) + 20797)
            break;
        case sal >= 180001:
            return (((sal - 180000) * .45) + 54097)
            break;
      }
}

//calculate super contributions
//=========================================================================
//ASSUMPTION ==> The company subtracts super from the salary (as opposed to it being on top of the salary)
//=========================================================================
function calcSuper(gSal) {
   return (gSal * .095)
}

//calculate the tax payed on the employees super
function calcSuperTax(superA, gSal) {
    switch(true) {
        case gSal <= 37000:
            return 0
            break;
        case gSal >= 37001 && gSal <= 250000:
            return (superA * .15)
            break;
        case gSal >= 250001:
            return (superA * .3)
            break;
      }
}


//kept unit testing in same file for simplicity
//=========================================
var results = {
    total: 0,
    bad: 0
};
function test(input, expected) {
    results.total++;
    var result = main(input);
    if (result !== expected) {
        results.bad++;
        console.log("Expected=> " + expected + ", but was=> " + result);
    }
}
//=========================================

function main(gSal) {
    if (gSal == "test") {
        test(11000, "Tax (inc Super tax):$0.00" + "\nSuper Contribution:$1045.00");
        test(28000, "Tax (inc Super tax):$1356.60" + "\nSuper Contribution:$2660.00");
        test("hello", "\n\nPlease Input a Valid Salary (Digits Only)");
        test(90000, "Tax (inc Super tax):$19300.75" + "\nSuper Contribution:$7267.50");
        test(540000, "Tax (inc Super tax):$208402.00" + "\nSuper Contribution:$35910.00");
        return "Of " + results.total + " tests, " + results.bad + " failed, " + (results.total - results.bad) + " passed."          
    } else if (gSal.toString().match(/^[0-9]*$/)) { //ensure the input is only digits
        //superAnnuation is taken out before tax AND tax bracket are calculated then taxed separately
        var superA = calcSuper(gSal)
        //taxable income = Gross salary - super
        var sal = gSal - superA
        var superTax = calcSuperTax(superA, gSal)
        //add tax on super to tax on income
        var totalTax = (calcTax(sal) + superTax)

        return "Tax (inc Super tax):$" + totalTax.toFixed(2) + "\nSuper Contribution:$" + (superA - superTax).toFixed(2)
    } else {
        // console.log("\n\nPlease Input a Valid Salary (Digits Only)")
        return "\n\nPlease Input a Valid Salary (Digits Only)"
    }
}

//gSal is Gross Salary
var readLine = function () {
    rl.question("\nEnter the Employees Gross Salary Per Annum \nOr Enter 'test' to run some unit tests:\n ", gSal => {
        console.log(main(gSal))
    })
}

readLine();

