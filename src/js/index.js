fetch('http://localhost:3000/surveys')
  .then(res => res.json())
  .then(surveys => {
    surveys.forEach(survey => {
      const { id, title, question } = survey
      const x = new Survey(id, title, question)
      console.log(x)
    })
  })
document.querySelector('#survey-form').addEventListener('submit', addSurvey)

function addSurvey(e) {
  e.preventDefault()
  let data = {
    title: document.getElementById('title').value,
    question: e.target.question.value,
  }
  console.log(data)

  let configObj = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  fetch('http://localhost:3000/surveys/', configObj)
    .then(response => response.json())
    .then(survey => {
      new Survey(survey.id, survey.title, survey.questions)
      document.getElementById('survey-form').reset()
    })
}


