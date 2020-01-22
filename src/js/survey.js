class Survey {
  constructor(id, title, question1, question2, question3) {
    this.id = id
    this.title = title
    this.question1 = question1
    this.question2 = question2
    this.question3 = question3
    this.renderSurveyList()
  }

  // Survey methods
  async deleteSurvey() {
    await fetch(`http://localhost:3000/surveys/${this.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        document.getElementById('survey-container')
          .removeChild(document.getElementById(this.id))
      })
    fetchSurveys()
  }

  submitSurvey() {
    const elem = document.getElementsByName('answer_question')
    for (let i = 0; i < elem.length; i++) {
      if (elem[i].checked) {
        let responded = elem[i].value
        this.postAnswer(this.id, responded)
      }
    }
    // Disable buttons
    document.querySelector('.submit').setAttribute('disabled', 'disabled')
    document.querySelector('.delete').setAttribute('disabled', 'disabled')
    // Render Results card
    this.renderResults()
  }

  // Post answers to DB
  postAnswer(surveys_id, responded) {
    let data = {
      surveys_id,
      responded
    }

    fetch('http://localhost:3000/answers/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        return Promise.reject(response)
      }
    })
      .then(answer => {
        new Answer(answer.id, answer.responded)
      })
  }

  getResults(myId) {
    const fetchPromise = fetch(`http://localhost:3000/answers`)
    const resultsReport1 = document.getElementById('q1')
    const resultsReport2 = document.getElementById('q2')
    const resultsReport3 = document.getElementById('q3')
    fetchPromise.then(response => response.json())
      .then(questionResults => {
        const myResults1 = questionResults.filter(a => a.surveys_id === myId && a.responded === 'question1').length
        resultsReport1.innerHTML += myResults1
        const myResults2 = questionResults.filter(a => a.surveys_id === myId && a.responded === 'question2').length
        resultsReport2.innerHTML += myResults2
        const myResults3 = questionResults.filter(a => a.surveys_id === myId && a.responded === 'question3').length
        resultsReport3.innerHTML += myResults3
      })
  }

  surveyListHTML() {
    return `
    <div class="card__content">
      <div class="card__title">
        <h3>${this.title}</h3>
      </div>
    </div>
    <button class="card__btn">Take Survey</button>
    `
  }

  surveyHTML() {
    let ask1 = this.question1 ? `<input type="radio" name="answer_question" value="question1"> ${this.question1}` : ''
    let ask2 = this.question2 ? `<input type="radio" name="answer_question" value="question2"> ${this.question2}` : ''
    let ask3 = this.question3 ? `<input type="radio" name="answer_question" value="question3"> ${this.question3}` : ''
    return `
    <div class="card__content">
      <div class="card__title">
        <h3>${this.title}</h3>
      </div>
      <div class="card__summary">
        <form id="answer-form">
          ${ask1}<br>
          ${ask2}<br>
          ${ask3}<br><br>
      </form>
      </div>
    </div>
    <button class="card__btn submit">Submit</button>
    <button class="card__btn delete">Delete</button>
    `
  }

  resultsHTML() {
    return `
    <div id="results-card">
      <h3>Results:</h3>
        <ul class="report-list">
          <li>${this.question1}: <span id="q1"></span></li>
          <li>${this.question2}: <span id="q2"></span></li>
          <li>${this.question3}: <span id="q3"></span></li>
        </ul>
     </div>
     <button class="card__btn done">Done</button>
    `
  }

  renderResults() {
    const resultsContainer = document.getElementById('survey-container')
    const resultsCard = document.createElement('div')
    resultsCard.classList.add('survey-card')
    resultsCard.id = `results-${this.id}`
    resultsCard.innerHTML += this.resultsHTML()
    resultsContainer.appendChild(resultsCard)
    this.getResults(this.id)
    resultsCard.addEventListener('click', e => {
      document.querySelector('survey-card')
      if (e.target.className.includes('done')) {
        document.getElementById('survey-container').removeChild(document.getElementById(this.id))
        document.getElementById('survey-container').removeChild(document.getElementById(`results-${this.id}`))
        fetchSurveys()
      }
    })
  }

  // Render Index Survey List
  renderSurveyList() {
    const surveyContainer = document.getElementById('survey-container')
    const surveyCardList = document.createElement('div')
    surveyCardList.classList.add('survey-card')
    surveyCardList.classList.add('card__effect')
    surveyCardList.id = this.id
    surveyCardList.innerHTML += this.surveyListHTML()
    surveyContainer.appendChild(surveyCardList)
    surveyCardList.addEventListener('click', e => {
      if (e.target.className.includes('card__btn')) this.renderSurvey(e)
    })
  }

  // Show Survey
  renderSurvey() {
    document.querySelectorAll('.survey-card').forEach(e => e.parentNode.removeChild(e))
    const surveyContainer = document.getElementById('survey-container')
    const surveyCard = document.createElement('div')
    surveyCard.classList.add('survey-card')
    surveyCard.id = this.id
    surveyCard.innerHTML += this.surveyHTML()
    surveyContainer.appendChild(surveyCard)
    surveyCard.addEventListener('click', e => {
      document.querySelector('survey-card')
      // TODO add submit to write data for survey response
      if (e.target.className.includes('submit')) this.submitSurvey()
      if (e.target.className.includes('delete')) this.deleteSurvey(e)
    })
  }
}
