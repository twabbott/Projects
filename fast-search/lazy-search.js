

function newTable() {
    return {
        "0": [],
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
        "7": [],
        "8": [],
        "9": [],
        "a": [],
        "b": [],
        "c": [],
        "d": [],
        "e": [],
        "f": [],
        "g": [],
        "h": [],
        "i": [],
        "j": [],
        "k": [],
        "l": [],
        "m": [],
        "n": [],
        "o": [],
        "p": [],
        "q": [],
        "r": [],
        "s": [],
        "t": [],
        "u": [],
        "v": [],
        "w": [],
        "x": [],
        "y": [],
        "z": [],
    }
}



export default function createIndex() {

    const index = newTable();

    void addItem(key, data) {
        key = key.toLowerCase();
        const usedLetters = {};

        const wrapper = { key, data };
        for (let i = 0; i < key.length; i++) {
            const char = key[i];

            if (!(char >= '0' && char <= '9' || char >= 'a' && char <= 'z'))
                continue;
            if (usedLetters[char])
                continue;
            
            index[char][i] = wrapper;
            usedLetters[char] = true;
        }
    }
}





