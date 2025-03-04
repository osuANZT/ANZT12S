const textarea = document.getElementById("textarea")
let teams = []
function submit() {
    const textareaValue = textarea.value
    const textareaSplit = textareaValue.split("\n")
    for (let i = 0; i < textareaSplit.length; i++) {
        const textareaSplitValues = textareaSplit[i].split(",")
        const team = {
            "teamName": textareaSplitValues[0],
            "player1Name": textareaSplitValues[1],
            "player2Name": textareaSplitValues[2]
        }
        teams.push(team)
    }

    const jsonString = JSON.stringify(teams, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "amplifier-rolls-teams.json";
    link.click();
}