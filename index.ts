import cors from 'cors'
import express  from "express";
import Database from 'better-sqlite3'


const db = new Database('./interviewers.db', {
    verbose: console.log
})


const app = express()
app.use(cors())
app.use(express.json())

const PORT = 4000;

const getApplicants = db.prepare(`
SELECT * FROM applicants;
`)

const getApplicantsById = db.prepare(`
SELECT * FROM applicants WHERE id=?;
`)

const getInterviewers = db.prepare(`
SELECT * FROM interviewers;
`)

const getInterviewersById = db.prepare(`
SELECT * FROM applicants WHERE id=?;
`)

const createApplicants = db.prepare(`
INSERT INTO applicants (name, email) VALUES (? , ?);
`)

const createInterviewers = db.prepare(`
INSERT INTO interviewers (name, email) VALUES (?, ?);
`);

const getInterviews = db.prepare(`
INSERT INTO interviews (applicantsId, interviewersId, date, score ) VALUES (?, ? , ? , ?);
`);

const getInterviewsById = db.prepare(`
SELECT * FROM interviews WHERE id=?;
`)


// app.get('/applicants', (req, res) => {
// const applicants = getApplicants.all()
// for(const applicant of applicants){
//     const interviewers = getInterviewers.all(applicant.id)
//     getInterviewers.all()
//     applicant.interviewers = interviewers
// }
// res.send(applicants);
// })

app.get('/applicants/:id', (req, res) => {
    const id = req.params.id
    const applicants = getApplicantsById.all(id)
    for(const applicant of applicants){
        const interviewers = getInterviewers.all()
        getInterviewers.all()
        applicant.interviewers = interviewers
    }
    res.send(applicants)
})

app.get('/interviewers', (req, res) => {
    const interviewers = getInterviewers.all()
    for(const interviewer of interviewers){
        const applicants =  getApplicants.all()
        interviewer.applicants = applicants
    }
    res.send(interviewers);
})


app.post('/applicants', (req, res) =>{
    const {name, email } = req.body;
    const errors = []

    if(typeof name !== "string"){
        errors.push({ error: "Name missing or not a string!"})
    }
    if(typeof email !== "string"){
        errors.push({ error: "Email missing or not a string!"})
    }

    if(errors.length === 0){
        const result = createApplicants.run(name, email)
        const newApplicant = getApplicantsById.get(result.lastInsertRowid)
        res.send(newApplicant)
    }else {
        res.status(400).send(errors)
    }
})

app.post('/interviewers', (req, res) => {

    const { name, email} = req.body
    const errors = []

    if(typeof name !== "string"){
        errors.push({ error: "Name missing or not a string!"})
    }
    if(typeof email !== "string"){
        errors.push({ error: "Email missing or not a string!"})
    }

    if(errors.length === 0){
        const result = createInterviewers.run(name, email)
        const newInterviewer = getInterviewersById.get(result.lastInsertRowid)
        res.send(newInterviewer)
    }else {
        res.status(400).send(errors)
    }

})



app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON https://localhost:${PORT}`)
});