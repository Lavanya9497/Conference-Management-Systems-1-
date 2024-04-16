const express = require("express")
const { userCollection, orgCollection, publicationCollection } = require("./server")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/", cors(), (req, res) => {

})

app.post("/", async (req, res) => {
    const { role, uname, password } = req.body
    let check = null

    try {
        if (role === 'user') {
            check = await userCollection.findOne({ username: uname })
        } else {
            check = await orgCollection.findOne({ username: uname })
        }

        if (check && check.password === password) {
            res.json("exists")
        }
        else {
            res.json("Does not exist")
        }
    }
    catch {
        res.json("Does not exist")

    }
})

app.post("/getusers", async (req, res) => {
    try {
        const check = await userCollection.find({ status: 'Pending Approval' })

        if (check) {
            res.json(check)
        }
        else {
            res.json("notexist")
        }
    }
    catch {
        res.json("Does not exist")

    }
})

app.post("/getpapers", async (req, res) => {
    try {
        const check = await publicationCollection.find({ user: req.body.user})

        if (check) {
            res.json(check)
        }
        else {
            res.json("notexist")
        }
    }
    catch {
        res.json("Does not exist")

    }
})

app.post("/signup", async (req, res) => {
    const { name, affiliation, affiliation_address, email, contact_no, website, image, username, password } = req.body
    const data = {
        name: name,
        affiliation: affiliation,
        affiliation_address: affiliation_address,
        email: email,
        contact_no: contact_no,
        website: website,
        image: image,
        username: username,
        password: password,
        status: 'Pending Approval'
    }

    try {
        const check = await userCollection.findOne({ email: email })
        const check2 = await userCollection.findOne({ username: username })

        if (check || check2) {
            res.json("exist")
        }
        else {
            await userCollection.insertMany([data])
            res.json("notexist")
        }
    }
    catch {
        res.json("Does not exist")

    }
})

app.post("/changeStatus", async (req, res) => {
    const { uname, decision } = req.body

    //Change status to decision of given uname 
    const user = await userCollection.findOneAndUpdate(
        { name: uname },
        { status: decision },
        { new: true }
    ).then(updatedUser => {
        res.json('Success')
    }).catch(error => {
        console.log(error);
        res.json('Fail')
    });

})

app.post("/savePaper", async (req, res) => {
    const { id, uname, title, authors, keywords, abstract, pdf, submit } = req.body
    const data = {
        user: uname,
        title: title,
        authors: authors,
        keywords: keywords,
        abstract: abstract,
        pdf: pdf,
        status: submit
    }

    try {
        if (id) {
            const filter = { _id: id };

            await publicationCollection.findOneAndUpdate(filter, data, { new: true })
                .then(r => {
                    res.json("updated");
                }).catch(error => {
                    console.log(error);
                    res.json('Fail')
                });;
        } else {
            await publicationCollection.insertMany([data])
            res.json("notexist")
        }
    }
    catch (e) {
        console.log(e);
        res.json("Does not exist")

    }

})

app.post("/userDetails", async (req, res) => {
    const { uname } = req.body

    const check = await userCollection.findOne({ username: uname })

    if (check) {
        res.json(check)
    } else {
        res.json('User does not exist')
    }


})

app.listen(8000, () => {
    console.log("Port connected");
})
