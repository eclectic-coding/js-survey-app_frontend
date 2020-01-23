class Answer {
  constructor(id, responded) {
    this.id = id
    this.responded = responded
    this.renderResults(id)
  }

  renderResults(id) {
    const resultsContainer = document.getElementById('survey-container')
    const resultsCard = document.createElement('div')
    resultsCard.classList.add('survey-card')
    resultsCard.id = `results-${this.id}`
    resultsCard.innerHTML += this.resultsHTML()
    resultsContainer.appendChild(resultsCard)
    this.getResults(id)
    resultsCard.addEventListener('click', e => {
      document.querySelector('survey-card')
      if (e.target.className.includes('done')) {
        document.getElementById('survey-container').removeChild(document.getElementById(this.id))
        document.getElementById('survey-container').removeChild(document.getElementById(`results-${this.id}`))
        fetchSurveys()
      }
    })
  }

  async getAnswers(myId) {
    let response = await fetch(`http://localhost:3000/answers`)
    let data = await response.json()
    return data
  }

  async getSurvey(surveyId) {
    let response = await fetch(`http://localhost:3000/surveys/${surveyId}`)
    let data = await response.json()
    console.log(data)
    return data
  }

  resultsHTML() {
      return `
          <div id="results-card">
            <h3>Results:</h3>
              <dl class="inline-flex">
                <dt id="q1">q1: </dt><dd id="q1-results"></dd>
                <dt id="q2">q2: </dt><dd id="q2-results"></dd>
                <dt id="q3">q2: </dt><dd id="q3-results"></dd>
              </dl>
           </div>
           <button class="card__btn done">Done</button>
       `
  }

  renderQuestions(id) {
    this.getSurvey(id)
      .then(survey => {
        let q1 = survey.question1 + ': '
        let q2 = survey.question2 + ': '
        let q3 = survey.question3 + ': '
        document.getElementById('q1').innerHTML = q1
        document.getElementById('q2').innerHTML = q2
        document.getElementById('q3').innerHTML = q3
      })
  }

  getResults(myId) {
    const resultsReport1 = document.getElementById('q1-results')
    const resultsReport2 = document.getElementById('q2-results')
    const resultsReport3 = document.getElementById('q3-results')
    this.getAnswers(myId)
      .then(questionResults => {
        let surveyLoc = questionResults.find(a => a.id === myId).surveys_id
        console.log(surveyLoc)
        const myResults1 = questionResults.filter(a => a.surveys_id === surveyLoc && a.responded === 'question1').length
        resultsReport1.innerHTML += myResults1
        const myResults2 = questionResults.filter(a => a.surveys_id === surveyLoc && a.responded === 'question2').length
        resultsReport2.innerHTML += myResults2
        const myResults3 = questionResults.filter(a => a.surveys_id === surveyLoc && a.responded === 'question3').length
        resultsReport3.innerHTML += myResults3
        this.renderQuestions(surveyLoc)
      })

  }

}

