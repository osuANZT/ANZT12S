const textareaEl = document.getElementById("textarea")
let teams = []
function submit() {
    const textareaElValue = textareaEl.value
    const textareaElValueIndividual = textareaElValue.split("\n")
    for (let i = 0; i < textareaElValueIndividual.length; i++) {
        const textareaElValueIndividualSeparated = textareaElValueIndividual[i].split(",")
        const teamData = {
            "team_name": textareaElValueIndividualSeparated[0],
            "silver_amp": Number(textareaElValueIndividualSeparated[1]),
            "gold_amp": Number(textareaElValueIndividualSeparated[2]),
            "pris_amp": Number(textareaElValueIndividualSeparated[3])
        }
        teams.push(teamData)
    }

    const jsonString = JSON.stringify(teams, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "teams.json";
    link.click();
}