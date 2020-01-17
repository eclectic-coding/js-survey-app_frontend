function fetchSurveys() {
  fetch('http://localhost:3000/surveys')
    .then(res => res.json())
    .then(surveys => {
      surveys.forEach(survey => {
        const { id, title, question1, question2, question3 } = survey
        new Survey(id, title, question1, question2, question3)
      })
    })
}
fetchSurveys()

document.querySelector('#survey-form').addEventListener('submit', addSurvey)
function addSurvey(e) {
  e.preventDefault()
  let data = {
    'title': e.target.title.value,
    'question1': e.target.question1.value,
    'question2': e.target.question2.value,
    'question3': e.target.question3.value
  }

  let configObj = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  fetch('http://localhost:3000/surveys/', configObj)
    .then(resp => resp.json())
    .then(survey => {
      const { id, title, question1, question2, question3 } = survey
      new Survey(id, title, question1, question2, question3)
      document.getElementById('survey-form').reset()
    })
}

