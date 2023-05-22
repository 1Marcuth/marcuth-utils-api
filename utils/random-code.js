const letters = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
}

const digits = "0123456789"

function selectRandomChoice(iterable) {
    const randomIndex = Math.floor(Math.random()  * iterable.length)
    return iterable[randomIndex]
}

function selectRandomChoices(iterable, length) {
    let results = []

    for (let i = 0; i < length; i++) {
        const result = selectRandomChoice(iterable)
        results.push(result)
    }

    return results
}

function generateRandomCode(length) {
    const accetableCharacters = `${letters.lower}${digits}${letters.upper}`
    const randomCode = selectRandomChoices(accetableCharacters, length).join("")
    return randomCode
}

module.exports = {
    selectRandomChoice,
    selectRandomChoices,
    generateRandomCode
}