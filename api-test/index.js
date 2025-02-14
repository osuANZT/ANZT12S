let player1ID = 11141578
let player1Score = 897543
let player1Combo = 876
let player1Acc = 98.57
let player1Misses = 2
let player1Mods = "EZNF"

let player2ID = 12872893
let player2Score = 764123
let player2Combo = 735
let player2Acc = 99.35
let player2Misses = 6
let player2Mods = "NF"

let player3ID = 12784319
let player3Score = 973212
let player3Combo = 1012
let player3Acc = 99.67
let player3Misses = 0
let player3Mods = "NF"

let player4ID = 17133127
let player4Score = 643284
let player4Combo = 532
let player4Acc = 98.65
let player4Misses = 11
let player4Mods = "EZNF"

// Get address
let address = ""
async function getAddress() {
    const response = await fetch("../_data/api-address.json")
    const responseJson = await response.json()
    address = responseJson.address
}

main()
let sleepTimer = 10

async function initialize() {
    if (address === "") {
        await getAddress()
    }

    // The Carry I
    amplifierID = 1
    runAPITest(1, amplifierID, "Dabble", Math.round(player1Score * 1.2 + player2Score), player3Score + player4Score)
    await sleep(sleepTimer)
    runAPITest(2, amplifierID, "Okay lets go", player1Score + player2Score, Math.round(player3Score * 1.2 + player4Score))
    await sleep(sleepTimer)

    // The Carry II
    amplifierID = 2
    runAPITest(3, amplifierID, "Dabble", Math.round(player1Score * 1.3 + player2Score), player3Score + player4Score)
    await sleep(sleepTimer)
    runAPITest(4, amplifierID, "Okay lets go", player1Score + player2Score, Math.round(player3Score * 1.3 + player4Score))
    await sleep(sleepTimer)

    // The Carry III
    amplifierID = 3
    runAPITest(5, amplifierID, "Dabble", Math.round(player1Score * 1.5 + player2Score), player3Score + player4Score)
    await sleep(sleepTimer)
    runAPITest(6, amplifierID, "Okay lets go", player1Score + player2Score, Math.round(player3Score * 1.5 + player4Score))
    await sleep(sleepTimer)

    // Poison I
    amplifierID = 4
    runAPITest(7, amplifierID, "Dabble", player1Score + player2Score, (player3Score + player4Score) * 2)
    await sleep(sleepTimer)
    runAPITest(8, amplifierID, "Okay lets go", (player1Score + player2Score) * 2, player3Score + player4Score)
    await sleep(sleepTimer)

    // Poison II
    amplifierID = 5
    runAPITest(9, amplifierID, "Dabble", player1Score + player2Score, (player3Score + player4Score) * 1.75)
    await sleep(sleepTimer)
    runAPITest(10, amplifierID, "Okay lets go", Math.round((player1Score + player2Score) * 1.75), player3Score + player4Score)
    await sleep(sleepTimer)

    // Poison III
    amplifierID = 6
    runAPITest(11, amplifierID, "Dabble", player1Score + player2Score, (player3Score + player4Score) * 1.75)
    await sleep(sleepTimer)
    runAPITest(12, amplifierID, "Okay lets go", Math.round((player1Score + player2Score) * 1.75), player3Score + player4Score)
    await sleep(sleepTimer)

    // Limit Break
    amplifierID = 7
    runAPITest(13, amplifierID, "Dabble", player1Combo + player2Combo, player3Combo + player4Combo); await sleep(sleepTimer)
    runAPITest(14, amplifierID, "Okay lets go", player1Combo + player2Combo, player3Combo + player4Combo); await sleep(sleepTimer)

    // The King I
    amplifierID = 8
    runAPITest(15, amplifierID, "Dabble", Math.round((player1Score + player2Score) * 1.75), player3Score + player4Score); await sleep(sleepTimer)
    runAPITest(16, amplifierID, "Okay lets go", player1Score + player2Score, (player3Score + player4Score) * 1.75); await sleep(sleepTimer)

    // The King II
    amplifierID = 9
    runAPITest(17, amplifierID, "Dabble", (player1Score + player2Score) * 2, player3Score + player4Score); await sleep(sleepTimer)
    runAPITest(18, amplifierID, "Okay lets go", player1Score + player2Score, (player3Score + player4Score) * 2); await sleep(sleepTimer)

    // Dude That Fingerlock
    amplifierID = 10
    runAPITest(19, amplifierID, "Dabble", 906518+787047, 1616496); await sleep(sleepTimer)
    runAPITest(20, amplifierID, "Okay lets go", 1661666, 973212 + 678665); await sleep(sleepTimer)

    // Cold Clear Eyes I
    amplifierID = 11
    runAPITest(21, amplifierID, "Dabble", Math.round((player1Score + player2Score) * 1.05), player3Score + player4Score); await sleep(sleepTimer)
    runAPITest(22, amplifierID, "Okay lets go", player1Score + player2Score, Math.round((player3Score + player4Score) * 1.05)); await sleep(sleepTimer)

    // Cold Clear Eyes II
    amplifierID = 12
    runAPITest(23, amplifierID, "Dabble", Math.round((player1Score + player2Score) * 1.15), player3Score + player4Score); await sleep(sleepTimer)
    runAPITest(24, amplifierID, "Okay lets go", player1Score + player2Score, Math.round((player3Score + player4Score) * 1.15)); await sleep(sleepTimer)

    // Cold Clear Eyes III
    amplifierID = 13
    runAPITest(amplifierID * 2 - 1, amplifierID, "Dabble", Math.round((player1Score + player2Score) * 1.2), player3Score + player4Score); await sleep(sleepTimer)
    runAPITest(amplifierID * 2, amplifierID, "Okay lets go", player1Score + player2Score, Math.round((player3Score + player4Score) * 1.2)); await sleep(sleepTimer)

    // Turn It Up
    amplifierID = 14
    runAPITest(amplifierID * 2 - 1, amplifierID, "Dabble", Math.round(player1Score * 1.9) + player2Score, player3Score + Math.round(player4Score * 1.9)); await sleep(sleepTimer)
    runAPITest(amplifierID * 2, amplifierID, "Okay lets go", Math.round(player1Score * 1.9) + player2Score, player3Score + Math.round(player4Score * 1.9)); await sleep(sleepTimer)
    
    // Gambler
    amplifierID = 15
    runAPITest(amplifierID * 2 - 1, amplifierID, "Dabble", 2077083, 1616496); await sleep(sleepTimer)
    runAPITest(amplifierID * 2, amplifierID, "Okay lets go", 1661666, 2020620); await sleep(sleepTimer)

    // // Make It Rock
    amplifierID = 18
    player4Score = 643284
    runAPITest(31, amplifierID, "Dabble", 1661666, 2020620); await sleep(sleepTimer)
    runAPITest(32, amplifierID, "Okay lets go", 2077083, 1616496); await sleep(sleepTimer)

    // // Yin And Yang I
    amplifierID = 19
    runAPITest(33, amplifierID, "Dabble", 936294, 960074); await sleep(sleepTimer)
    runAPITest(34, amplifierID, "Okay lets go", 891709, 1008077); await sleep(sleepTimer)

    // // Yin And Yang II
    amplifierID = 20
    runAPITest(35, amplifierID, "Dabble", 980880, 960074); await sleep(sleepTimer)
    runAPITest(36, amplifierID, "Okay lets go", 891709, 1056081); await sleep(sleepTimer)

    // // Yin And Yang III
    amplifierID = 21
    runAPITest(37, amplifierID, "Dabble", 1025465, 960074); await sleep(sleepTimer)
    runAPITest(38, amplifierID, "Okay lets go", 891709, 1104085); await sleep(sleepTimer)

    // Trickster 2
    amplifierID = 23
    runAPITest(39, amplifierID, "Dabble", player1Score + player2Score, Math.round((player3Score + player4Score) / 53 * 50)); await sleep(sleepTimer)
    runAPITest(40, amplifierID, "Okay lets go", Math.round((player1Score + player2Score) / 53 * 50), player3Score + player4Score); await sleep(sleepTimer)

    // AccDance
    amplifierID = 24
    runAPITest(41, amplifierID, "Dabble", 98.96, 99.16); await sleep(sleepTimer)
    runAPITest(42, amplifierID, "Okay lets go", 98.96, 99.16); await sleep(sleepTimer)

    // Synchronised I
    amplifierID = 25
    let accDifferenceTeam1 = Math.abs(player1Acc - player2Acc)
    let multiplierTeam1 = Math.max(1, 1.1 - 0.0025 * accDifferenceTeam1)
    let accDifferenceTeam2 = Math.abs(player3Acc - player4Acc)
    let multiplierTeam2 = Math.max(1, 1.1 - 0.0025 * accDifferenceTeam2)
    runAPITest(43, amplifierID, "Dabble", Math.round((player1Score + player2Score) * multiplierTeam1), 1616496); await sleep(sleepTimer)
    runAPITest(44, amplifierID, "Okay lets go", 1661666, Math.round((player3Score + player4Score) * multiplierTeam2)); await sleep(sleepTimer)

    // Synchronised II
    amplifierID = 26
    let multiplierTeam3 = Math.max(1, 1.2 - 0.0025 * accDifferenceTeam1)
    let multiplierTeam4 = Math.max(1, 1.2 - 0.0025 * accDifferenceTeam2)
    runAPITest(45, amplifierID, "Dabble", Math.round((player1Score + player2Score) * multiplierTeam3), 1616496); await sleep(sleepTimer)
    runAPITest(46, amplifierID, "Okay lets go", 1661666, Math.round((player3Score + player4Score) * multiplierTeam4)); await sleep(sleepTimer)

    // Go with the flow
    amplifierID = 27
    runAPITest(47, amplifierID, "Dabble", Math.round((player1Score + player2Score) * 1.15), 1616496); await sleep(sleepTimer)
    runAPITest(48, amplifierID, "Okay lets go", 1661666, Math.round((player3Score + player4Score) * 1.15)); await sleep(sleepTimer)

    // Loadbearer I
    amplifierID = 28
    const scoreDifferenceTeam1 = Math.min(Math.round(Math.abs(player1Score - player2Score) * 0.2), 150000)
    const scoreDifferenceTeam2 = Math.min(Math.round(Math.abs(player3Score - player4Score) * 0.2), 150000)
    runAPITest(49, amplifierID, "Dabble", player1Score + player2Score + scoreDifferenceTeam1, 1616496); await sleep(sleepTimer)
    runAPITest(50, amplifierID, "Okay lets go", 1661666, player3Score + player4Score + scoreDifferenceTeam2); await sleep(sleepTimer)

    // Loadbearer II
    amplifierID = 29
    const scoreDifferenceTeam3 = Math.min(Math.round(Math.abs(player1Score - player2Score) * 0.4), 250000)
    const scoreDifferenceTeam4 = Math.min(Math.round(Math.abs(player3Score - player4Score) * 0.4), 250000)
    runAPITest(51, amplifierID, "Dabble", player1Score + player2Score + scoreDifferenceTeam3, 1616496); await sleep(sleepTimer)
    runAPITest(52, amplifierID, "Okay lets go", 1661666, player3Score + player4Score + scoreDifferenceTeam4); await sleep(sleepTimer)

    // Loadbearer III
    amplifierID = 30
    const scoreDifferenceTeam5 = Math.min(Math.round(Math.abs(player1Score - player2Score) * 0.6), 350000)
    const scoreDifferenceTeam6 = Math.min(Math.round(Math.abs(player3Score - player4Score) * 0.6), 350000)
    runAPITest(53, amplifierID, "Dabble", player1Score + player2Score + scoreDifferenceTeam5, 1616496); await sleep(sleepTimer)
    runAPITest(54, amplifierID, "Okay lets go", 1661666, player3Score + player4Score + scoreDifferenceTeam6); await sleep(sleepTimer)

    // The Dragon Consumes I
    amplifierID = 33
    runAPITest(55, amplifierID, "Dabble", 1827832, 1616496); await sleep(sleepTimer)
    runAPITest(56, amplifierID, "Okay lets go", 1661666, 1778145); await sleep(sleepTimer)

    // The Dragon Consumes II
    amplifierID = 34
    runAPITest(57, amplifierID, "Dabble", 1994000, 1616496); await sleep(sleepTimer)
    runAPITest(58, amplifierID, "Okay lets go", 1661666, 1939795); await sleep(sleepTimer)

    // The Dragon Consumes III
    amplifierID = 35
    runAPITest(59, amplifierID, "Dabble", Math.round((player1Score + player2Score) * 1.3), 1616496); await sleep(sleepTimer)
    runAPITest(60, amplifierID, "Okay lets go", 1661666, Math.round((player3Score + player4Score) * 1.3)); await sleep(sleepTimer)

    // JTBFREAKS
    amplifierID = 37
    runAPITest(61, amplifierID, "Dabble", player1Combo + player2Combo, player3Combo + player4Combo); await sleep(sleepTimer)
    runAPITest(62, amplifierID, "Okay lets go", player1Combo + player2Combo, player3Combo + player4Combo); await sleep(sleepTimer)

     // Desperation I
    amplifierID = 38
    runAPITest(63, amplifierID, "Dabble", Math.round((player1Score + player2Score) * 0.7), player3Score + player4Score); await sleep(sleepTimer)
    runAPITest(64, amplifierID, "Okay lets go", player1Score + player2Score, Math.round((player3Score + player4Score) * 0.7)); await sleep(sleepTimer)
    
    // Desperation II
    amplifierID = 39
    runAPITest(65, amplifierID, "Dabble", Math.round((player1Score + player2Score) * 0.85), player3Score + player4Score); await sleep(sleepTimer)
    runAPITest(66, amplifierID, "Okay lets go", player1Score + player2Score, Math.round((player3Score + player4Score) * 0.85)); await sleep(sleepTimer)
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function runAPITest(index, amplifierID, teamName, team1_score, team2_score) {
    let test = new XMLHttpRequest()
    test.open("GET", `${address}/score?team_name=${teamName}` + 
                        `&amplifier_id=${amplifierID}` +
                        `&player1_id=${player1ID}&player1_score=${player1Score}&player1_combo=${player1Combo}&player1_acc=${player1Acc}&player1_misses=${player1Misses}&player1_mods=${player1Mods}` +
                    `&player2_id=${player2ID}&player2_score=${player2Score}&player2_combo=${player2Combo}&player2_acc=${player2Acc}&player2_misses=${player2Misses}&player2_mods=${player2Mods}` +
                    `&player3_id=${player3ID}&player3_score=${player3Score}&player3_combo=${player3Combo}&player3_acc=${player3Acc}&player3_misses=${player3Misses}&player3_mods=${player3Mods}` +
                    `&player4_id=${player4ID}&player4_score=${player4Score}&player4_combo=${player4Combo}&player4_acc=${player4Acc}&player4_misses=${player4Misses}&player4_mods=${player4Mods}`, true)
    test.onreadystatechange = function() {
        if (test.readyState === XMLHttpRequest.DONE) {
            if (test.status === 200) {
                var responseData = JSON.parse(test.responseText);
                if (responseData.team1_score == team1_score && responseData.team2_score == team2_score) document.body.append(`TEST ${index} PASSED`, document.createElement("br"))
                else {
                    document.body.append(`TEST ${index} FAILED`, document.createElement("br"))
                    console.log(index, team1_score, responseData.team1_score, team2_score, responseData.team2_score)
                }
            } else document.body.append(`ERROR ${index}: ${test.status}`, document.createElement("br"))
        }
    }
    test.send()
}

let responseTimes = []; // Array to store response times

function runAPITest(index, amplifierID, teamName, team1_score, team2_score) {
    const startTime = Date.now(); // Record start time
    let test = new XMLHttpRequest();

    test.open("GET", `${address}/score?team_name=${teamName}` + 
                        `&amplifier_id=${amplifierID}` +
                        `&player1_id=${player1ID}&player1_score=${player1Score}&player1_combo=${player1Combo}&player1_acc=${player1Acc}&player1_misses=${player1Misses}&player1_mods=${player1Mods}` +
                    `&player2_id=${player2ID}&player2_score=${player2Score}&player2_combo=${player2Combo}&player2_acc=${player2Acc}&player2_misses=${player2Misses}&player2_mods=${player2Mods}` +
                    `&player3_id=${player3ID}&player3_score=${player3Score}&player3_combo=${player3Combo}&player3_acc=${player3Acc}&player3_misses=${player3Misses}&player3_mods=${player3Mods}` +
                    `&player4_id=${player4ID}&player4_score=${player4Score}&player4_combo=${player4Combo}&player4_acc=${player4Acc}&player4_misses=${player4Misses}&player4_mods=${player4Mods}`, true);

    test.onreadystatechange = function () {
        if (test.readyState === XMLHttpRequest.DONE) {
            const endTime = Date.now(); // Record end time
            const responseTime = endTime - startTime; // Calculate response time
            responseTimes.push(responseTime); // Add to the array

            if (test.status === 200) {
                var responseData = JSON.parse(test.responseText);
                if (responseData.team1_score == team1_score && responseData.team2_score == team2_score) {
                    document.body.append(`TEST ${index} PASSED in ${responseTime}ms`, document.createElement("br"));
                } else {
                    document.body.append(`TEST ${index} FAILED in ${responseTime}ms`, document.createElement("br"));
                    console.log(index, team1_score, responseData.team1_score, team2_score, responseData.team2_score);
                }
            } else {
                document.body.append(`ERROR ${index}: ${test.status} in ${responseTime}ms`, document.createElement("br"));
            }
        }
    };

    test.send();
}

// After all tests are done, calculate and display the statistics
function displayStatistics() {
    if (responseTimes.length > 0) {
        const average = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
        const max = Math.max(...responseTimes);
        const min = Math.min(...responseTimes);

        console.log(`Average Response Time: ${average.toFixed(2)}ms`);
        console.log(`Max Response Time: ${max}ms`);
        console.log(`Min Response Time: ${min}ms`);
    }
}

// Run `displayStatistics` after all iterations in `main`
async function main() {
    let count = 0;
    let iterations = 1;

    while (count < iterations) {
        await initialize();
        console.log(`Iteration ${count + 1} completed`);
        count++;
    }

    displayStatistics(); // Show stats after all tests
}

main();