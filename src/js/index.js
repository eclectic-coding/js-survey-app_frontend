const allSurveys = []

function fetchSurveys() {
  fetch('http://localhost:3000/surveys')
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        return Promise.reject(response)
      }
    })
    .then(surveys => {
      surveys.forEach(survey => {
        const { id, title, question1, question2, question3 } = survey
        const arr = new Survey(id, title, question1, question2, question3)
        allSurveys.push(arr)
      })
    })
}

fetchSurveys()
document.getElementById('sort_button').addEventListener('click', () => Survey.sortingSurvey())
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
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        return Promise.reject(response)
      }
    })
    .then(survey => {
      const { id, title, question1, question2, question3 } = survey
      new Survey(id, title, question1, question2, question3)
      document.getElementById('survey-form').reset()
    })
}

