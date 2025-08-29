const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Your details
const FULL_NAME = "ashrith_reddy_alumalla";  
const DOB = "13042005";                      
const EMAIL = "ashrithreddy2k5@gmail.com";
const ROLL_NUMBER = "22BCE3502";

// Function to reverse and alternate caps
function alternateCapsReverse(str) {
    let reversed = str.split("").reverse().join("");
    return reversed.split("").map((ch, i) => 
        i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
    ).join("");
}

// ✅ Health check route
app.get("/", (req, res) => {
    res.send("✅ Server is running! Use GET /bfhl or POST /bfhl with JSON body");
});

// ✅ GET version of /bfhl (browser-friendly)
app.get("/bfhl", (req, res) => {
    res.json({
        is_success: true,
        user_id: `${FULL_NAME}_${DOB}`,
        email: EMAIL,
        roll_number: ROLL_NUMBER
    });
});

// ✅ POST version of /bfhl (main logic)
app.post("/bfhl", (req, res) => {
    try {
        const inputArray = req.body.data;

        let evenNumbers = [];
        let oddNumbers = [];
        let alphabets = [];
        let specialChars = [];
        let sum = 0;

        inputArray.forEach(item => {
            if (/^\d+$/.test(item)) {
                let num = parseInt(item, 10);
                if (num % 2 === 0) {
                    evenNumbers.push(item);
                } else {
                    oddNumbers.push(item);
                }
                sum += num;
            } else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
            } else {
                specialChars.push(item);
            }
        });

        const concatString = alternateCapsReverse(alphabets.join(""));

        res.status(200).json({
            is_success: true,
            user_id: `${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialChars,
            sum: sum.toString(),
            concat_string: concatString
        });

    } catch (error) {
        res.status(500).json({ is_success: false, error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
