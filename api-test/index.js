let player1ID = 9383377
let player1Score = 897543
let player1Combo = 876
let player1Acc = 98.57
let player1Misses = 2
let player1Mods = "EZNF"

let player2ID = 8530809
let player2Score = 764123
let player2Combo = 735
let player2Acc = 99.35
let player2Misses = 6
let team1BaseScore = 1661666
let player2Mods = "NF"

let player3ID = 11189608
let player3Score = 973212
let player3Combo = 1012
let player3Acc = 99.67
let player3Misses = 0
let player3Mods = "NF"

let player4ID = 8379046
let player4Score = 643284
let player4Combo = 532
let player4Acc = 98.65
let player4Misses = 11
let team2BaseScore = 1616496
let player4Mods = "EZNF"

// Get address
let address = ""
async function getAddress() {
    const response = await fetch("../_data/api-address.json")
    const responseJson = await response.json()
    address = responseJson.address
}

initialize()

async function initialize() {
    await getAddress()

    // The Carry I
    amplifierID = 1
    runAPITest(1, amplifierID, "chili con carne", Math.round(player1Score * 1.2 + player2Score), player3Score + player4Score)
    await sleep(100)
    runAPITest(2, amplifierID, "qc kp", player1Score + player2Score, Math.round(player3Score * 1.2 + player4Score))
    await sleep(100)

    // The Carry II
    amplifierID = 2
    runAPITest(3, amplifierID, "chili con carne", Math.round(player1Score * 1.3 + player2Score), player3Score + player4Score)
    await sleep(100)
    runAPITest(4, amplifierID, "qc kp", player1Score + player2Score, Math.round(player3Score * 1.3 + player4Score))
    await sleep(100)

    // The Carry III
    amplifierID = 3
    runAPITest(5, amplifierID, "chili con carne", Math.round(player1Score * 1.5 + player2Score), player3Score + player4Score)
    await sleep(100)
    runAPITest(6, amplifierID, "qc kp", player1Score + player2Score, Math.round(player3Score * 1.5 + player4Score))
    await sleep(100)

    // Poison I
    amplifierID = 4
    runAPITest(7, amplifierID, "chili con carne", player1Score + player2Score, (player3Score + player4Score) * 2)
    await sleep(100)
    runAPITest(8, amplifierID, "qc kp", (player1Score + player2Score) * 2, player3Score + player4Score)
    await sleep(100)

    // Poison II
    amplifierID = 5
    runAPITest(9, amplifierID, "chili con carne", player1Score + player2Score, (player3Score + player4Score) * 1.75)
    await sleep(100)
    runAPITest(10, amplifierID, "qc kp", Math.round((player1Score + player2Score) * 1.75), player3Score + player4Score)
    await sleep(100)

    // Poison III
    amplifierID = 6
    runAPITest(11, amplifierID, "chili con carne", player1Score + player2Score, (player3Score + player4Score) * 1.75)
    await sleep(100)
    runAPITest(12, amplifierID, "qc kp", Math.round((player1Score + player2Score) * 1.75), player3Score + player4Score)
    await sleep(100)

    // Limit Break
    amplifierID = 7
    runAPITest(13, amplifierID, "chili con carne", player1Combo + player2Combo, player3Combo + player4Combo); await sleep(100)
    runAPITest(14, amplifierID, "qc kp", player1Combo + player2Combo, player3Combo + player4Combo); await sleep(100)

    // The King I
    amplifierID = 8
    runAPITest(15, amplifierID, "chili con carne", Math.round((player1Score + player2Score) * 1.75), player3Score + player4Score); await sleep(100)
    runAPITest(16, amplifierID, "qc kp", player1Score + player2Score, (player3Score + player4Score) * 1.75); await sleep(100)

    // The King II
    amplifierID = 9
    runAPITest(17, amplifierID, "chili con carne", (player1Score + player2Score) * 2, player3Score + player4Score); await sleep(100)
    runAPITest(18, amplifierID, "qc kp", player1Score + player2Score, (player3Score + player4Score) * 2); await sleep(100)

    // Dude That Fingerlock
    amplifierID = 10
    runAPITest(19, amplifierID, "chili con carne", 906518+787047, 1616496); await sleep(100)
    runAPITest(20, amplifierID, "qc kp", 1661666, 973212 + 678665); await sleep(100)

    // Cold Clear Eyes I
    amplifierID = 11
    runAPITest(21, amplifierID, "chili con carne", Math.round((player1Score + player2Score) * 1.05), player3Score + player4Score); await sleep(100)
    runAPITest(22, amplifierID, "qc kp", player1Score + player2Score, Math.round((player3Score + player4Score) * 1.05)); await sleep(100)

    // Cold Clear Eyes II
    amplifierID = 12
    runAPITest(23, amplifierID, "chili con carne", Math.round((player1Score + player2Score) * 1.15), player3Score + player4Score); await sleep(100)
    runAPITest(24, amplifierID, "qc kp", player1Score + player2Score, Math.round((player3Score + player4Score) * 1.15)); await sleep(100)

    // Cold Clear Eyes III
    amplifierID = 13
    runAPITest(amplifierID * 2 - 1, amplifierID, "chili con carne", Math.round((player1Score + player2Score) * 1.2), player3Score + player4Score); await sleep(100)
    runAPITest(amplifierID * 2, amplifierID, "qc kp", player1Score + player2Score, Math.round((player3Score + player4Score) * 1.2)); await sleep(100)

    // Turn It Up
    amplifierID = 14
    runAPITest(amplifierID * 2 - 1, amplifierID, "chili con carne", Math.round(player1Score * 1.75) + player2Score, player3Score + Math.round(player4Score) * 1.75); await sleep(100)
    runAPITest(amplifierID * 2, amplifierID, "qc kp", Math.round(player1Score * 1.75) + player2Score, player3Score + Math.round(player4Score) * 1.75); await sleep(100)
    
    // Gambler
    amplifierID = 15
    runAPITest(amplifierID * 2 - 1, amplifierID, "chili con carne", 2077083, 1616496); await sleep(100)
    runAPITest(amplifierID * 2, amplifierID, "qc kp", 1661666, 2020620); await sleep(100)

    // // Make It Rock
    amplifierID = 18
    player4Score = 643284
    runAPITest(31, amplifierID, "chili con carne", 1661666, 2020620); await sleep(100)
    runAPITest(32, amplifierID, "qc kp", 2077083, 1616496); await sleep(100)

    // // Yin And Yang I
    amplifierID = 19
    runAPITest(33, amplifierID, "chili con carne", 936294, 960074); await sleep(100)
    runAPITest(34, amplifierID, "qc kp", 891709, 1008077); await sleep(100)

    // // Yin And Yang II
    amplifierID = 20
    runAPITest(35, amplifierID, "chili con carne", 980880, 960074); await sleep(100)
    runAPITest(36, amplifierID, "qc kp", 891709, 1056081); await sleep(100)

    // // Yin And Yang III
    amplifierID = 21
    runAPITest(37, amplifierID, "chili con carne", 1025465, 960074); await sleep(100)
    runAPITest(38, amplifierID, "qc kp", 891709, 1104085); await sleep(100)

    // Classic Farmer I
    amplifierID = 23
    runAPITest(39, amplifierID, "chili con carne", 1744749, 1616496); await sleep(100)
    runAPITest(40, amplifierID, "qc kp", 1661666, 1697321); await sleep(100)

    // AccDance
    amplifierID = 24
    runAPITest(41, amplifierID, "chili con carne", 98.96, 99.16); await sleep(100)
    runAPITest(42, amplifierID, "qc kp", 98.96, 99.16); await sleep(100)

    // Synchronised I
    amplifierID = 25
    let accDifferenceTeam1 = Math.abs(player1Acc - player2Acc)
    let multiplierTeam1 = Math.max(1, 1.1 - 0.0025 * accDifferenceTeam1)
    let accDifferenceTeam2 = Math.abs(player3Acc - player4Acc)
    let multiplierTeam2 = Math.max(1, 1.1 - 0.0025 * accDifferenceTeam2)
    runAPITest(43, amplifierID, "chili con carne", Math.round((player1Score + player2Score) * multiplierTeam1), 1616496); await sleep(100)
    runAPITest(44, amplifierID, "qc kp", 1661666, Math.round((player3Score + player4Score) * multiplierTeam2)); await sleep(100)

    // Synchronised II
    amplifierID = 26
    let multiplierTeam3 = Math.max(1, 1.2 - 0.0025 * accDifferenceTeam1)
    let multiplierTeam4 = Math.max(1, 1.2 - 0.0025 * accDifferenceTeam2)
    runAPITest(45, amplifierID, "chili con carne", Math.round((player1Score + player2Score) * multiplierTeam3), 1616496); await sleep(100)
    runAPITest(46, amplifierID, "qc kp", 1661666, Math.round((player3Score + player4Score) * multiplierTeam4)); await sleep(100)

    // Go with the flow
    amplifierID = 27
    runAPITest(47, amplifierID, "chili con carne", Math.round((player1Score + player2Score) * 1.15), 1616496); await sleep(100)
    runAPITest(48, amplifierID, "qc kp", 1661666, Math.round((player3Score + player4Score) * 1.15)); await sleep(100)

    // Loadbearer I
    amplifierID = 28
    const scoreDifferenceTeam1 = Math.min(Math.round(Math.abs(player1Score - player2Score) * 0.25), 150000)
    const scoreDifferenceTeam2 = Math.min(Math.round(Math.abs(player3Score - player4Score) * 0.25), 150000)
    runAPITest(49, amplifierID, "chili con carne", player1Score + player2Score + scoreDifferenceTeam1, 1616496); await sleep(100)
    runAPITest(50, amplifierID, "qc kp", 1661666, player3Score + player4Score + scoreDifferenceTeam2); await sleep(100)

    // Loadbearer II
    amplifierID = 29
    const scoreDifferenceTeam3 = Math.min(Math.round(Math.abs(player1Score - player2Score) * 0.5), 300000)
    const scoreDifferenceTeam4 = Math.min(Math.round(Math.abs(player3Score - player4Score) * 0.5), 300000)
    runAPITest(51, amplifierID, "chili con carne", player1Score + player2Score + scoreDifferenceTeam3, 1616496); await sleep(100)
    runAPITest(52, amplifierID, "qc kp", 1661666, player3Score + player4Score + scoreDifferenceTeam4); await sleep(100)

    // Loadbearer III
    amplifierID = 30
    const scoreDifferenceTeam5 = Math.min(Math.round(Math.abs(player1Score - player2Score) * 0.75), 400000)
    const scoreDifferenceTeam6 = Math.min(Math.round(Math.abs(player3Score - player4Score) * 0.75), 400000)
    runAPITest(53, amplifierID, "chili con carne", player1Score + player2Score + scoreDifferenceTeam5, 1616496); await sleep(100)
    runAPITest(54, amplifierID, "qc kp", 1661666, player3Score + player4Score + scoreDifferenceTeam6); await sleep(100)

    // The Dragon Consumes I
    amplifierID = 33
    runAPITest(55, amplifierID, "chili con carne", 1827832, 1616496); await sleep(100)
    runAPITest(56, amplifierID, "qc kp", 1661666, 1778145); await sleep(100)

    // The Dragon Consumes II
    amplifierID = 34
    runAPITest(57, amplifierID, "chili con carne", 1994000, 1616496); await sleep(100)
    runAPITest(58, amplifierID, "qc kp", 1661666, 1939795); await sleep(100)

    // The Dragon Consumes III
    amplifierID = 35
    runAPITest(59, amplifierID, "chili con carne", Math.round((player1Score + player2Score) * 1.3), 1616496); await sleep(100)
    runAPITest(60, amplifierID, "qc kp", 1661666, Math.round((player3Score + player4Score) * 1.3)); await sleep(100)

    // JTBFREAKS
    amplifierID = 37
    runAPITest(61, amplifierID, "chili con carne", player1Combo + player2Combo, player3Combo + player4Combo)
    runAPITest(62, amplifierID, "qc kp", player1Combo + player2Combo, player3Combo + player4Combo)

     // Desperation I
    amplifierID = 38
    runAPITest(63, amplifierID, "chili con carne", Math.round((player1Score + player2Score) * 0.7), player3Score + player4Score)
    runAPITest(64, amplifierID, "qc kp", player1Score + player2Score, Math.round((player3Score + player4Score) * 0.7))
    
    // Desperation II
    amplifierID = 39
    runAPITest(65, amplifierID, "chili con carne", Math.round((player1Score + player2Score) * 0.85), player3Score + player4Score)
    runAPITest(66, amplifierID, "qc kp", player1Score + player2Score, Math.round((player3Score + player4Score) * 0.85))
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