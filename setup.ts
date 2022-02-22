import Database from "better-sqlite3";

const db = new Database("./interviewers.db", {
  verbose: console.log,
});

const applicants =[
    {
        name: "Artiola Caka",
        email: "artiola@hotmail.com"
    },
    {
        name: "Arita Osmani",
        email: "arita@hotmail.com"
    },
    {
        name: "Desintila Luzi",
        email: "desintila@hotmail.com"
    },
    {
        name: "Ed Putans",
        email: "edputans@hotmail.com"
    }
]
const interviewers =[
    {
        name: "Nicolas Marcora",
        email: "nicolas@email.com"
    },
    {
        name: "Geri Meta",
        email: "geri@email.com"
    },
    {
        name: "Elidon Morina",
        email: "elidon@email.com"
    }
]

const interviews = [
    {
        applicantsId: 1,
        interviewersId: 1,
        date: "13.03.2022",
        score: 10
    },
    {
        applicantsId: 1,
        interviewersId: 2,
        date: "14.03.2022",
        score: 9
    },
    {
        applicantsId: 1,
        interviewersId: 3,
        date: "15.03.2022",
        score: 10
    },
    {
        applicantsId: 2,
        interviewersId: 1,
        date: "13.03.2022",
        score: 10
    },
    {
        applicantsId: 3,
        interviewersId: 3,
        date: "15.03.2022",
        score: 7
    }
]
db.exec(`
DROP TABLE IF EXISTS interviews;
DROP TABLE IF EXISTS interviewers;
DROP TABLE IF EXISTS applicants;


CREATE TABLE IF NOT EXISTS interviews(
    id INTEGER,
    applicantsId INTEGER NOT NULL,
    interviewersId INTEGER NOT NULL,
    date INTEGER NOT NULL,
    score NUMBER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (applicantsId) REFERENCES applicants(id),
    FOREIGN KEY (interviewersId) REFERENCES interviewers(id)
);

CREATE TABLE IF NOT EXISTS interviewers(
id INTEGER,
name TEXT NOT NULL,
email TEXT NOT NULL,
PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS applicants(
id INTEGER,
name TEXT NOT NULL,
email TEXT NOT NULL,
PRIMARY KEY(id)

);


`);

const createInterviewers = db.prepare(`
INSERT INTO interviewers (name, email) VALUES (?, ?);
`);

const createApplicants = db.prepare(`
INSERT INTO applicants (name, email) VALUES (? , ?);
`)

const createInterviews = db.prepare(`
INSERT INTO interviews (applicantsId, interviewersId, date, score ) VALUES (?, ? , ? , ?);
`)

for(const applicant of applicants){
    createApplicants.run(applicant.name, applicant.email)
}

for (const interviewer of interviewers){
    createInterviewers.run(interviewer.name, interviewer.email)
}
for( const interview of interviews){
    createInterviews.run(interview.applicantsId, interview.interviewersId, interview.date, interview.score)
}