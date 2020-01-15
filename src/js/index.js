fetch('http://localhost:3000/surveys')
  .then(res => res.json())
  .then(surveys => {
    surveys.forEach(survey => {
      const { id, title } = survey
      new Survey(id, title)
    })
  })
document.querySelector('#survey-form').addEventListener('submit', addSurvey)

function addSurvey(e) {
  e.preventDefault()
  let data = {
    'title': e.target.title.value,
    'question': e.target.question.value,
  }

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
      new Survey(survey.id, survey.title)
      document.getElementById('survey-form').reset()
    })
}


