function formatInput(inputText) {
    const trimmed = inputText.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

export default formatInput;