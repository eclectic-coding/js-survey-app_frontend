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
    await fetch(`http://localhost:3000/surveys/${ this.id }`, {
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
    // TODO disable buttons in survey card
    document.querySelector('.submit').setAttribute('disabled', 'disabled')
    document.querySelector('.delete').setAttribute('disabled', 'disabled')
    this.renderResults()

    // this.getResults(this.id)
    //   let myData = null
    //   .then(data => myData => data)
    // console.log(myData.title)
  }

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
    })
      .then(resp => resp.json())
      .then(answer => {
        new Answer(answer.id, answer.responded)
      })
  }

  closeResults() {
    console.log('We are done!')
    document.getElementById('survey-container').removeChild(document.getElementById(this.id))
    document.getElementById('survey-container').removeChild(document.getElementById(`results-${this.id}`))
    fetchSurveys()
  }

  async getResults() {
    let response = await fetch('http://localhost:3000/answers')
    let data = await response.json()
    return data
    // let firstQuestion = (dataArr.filter(a => a.surveys_id === id && a.responded === 'question1')).length
    // let secondQuestion = (dataArr.filter(a => a.surveys_id === id && a.responded === 'question2')).length
    // let thirdQuestion = (dataArr.filter(a => a.surveys_id === id && a.responded === 'question3')).length
    // return `Return: ${firstQuestion} ${secondQuestion} ${thirdQuestion}`
    // return dataArr.filter(a => a.surveys_id === id && a.responded === 'question1').length
  }

  // Render surveys
  surveyListHTML() {
    return `
    <div class="card__content">
      <div class="card__title">
        <h3>${ this.title }</h3>
      </div>
    </div>
    <button class="card__btn">Take Survey</button>
    `
  }

  surveyHTML() {
    let ask1 = this.question1 ? `<input type="radio" name="answer_question" value="question1"> ${ this.question1 }` : ''
    let ask2 = this.question2 ? `<input type="radio" name="answer_question" value="question2"> ${ this.question2 }` : ''
    let ask3 = this.question3 ? `<input type="radio" name="answer_question" value="question3"> ${ this.question3 }` : ''
    return `
    <div class="card__content">
      <div class="card__title">
        <h3>${ this.title }</h3>
      </div>
      <div class="card__summary">
        <form id="answer-form">
          ${ ask1 }<br>
          ${ ask2 }<br>
          ${ ask3 }<br><br>
      </form>
      </div>
    </div>
    <button class="card__btn submit">Submit</button>
    <button class="card__btn delete">Delete</button>
    `
  }

  resultsHTML() {
    return `
    <div id="results">
        <h4>Results:</h4>
        <span>${ this.question1 }: <strong></strong></span><br>
        <span>${ this.question2 }: <strong></strong></span><br>
        <span>${ this.question3 }: <strong></strong></span><br><br>
     </div>
     <button class="card__btn done">Done</button>
    `
  }

  // Render Survey Results
  renderResults() {
    const resultsContainer = document.getElementById('survey-container')
    const resultsCard = document.createElement('div')
    resultsCard.classList.add('survey-card')
    resultsCard.id = `results-${this.id}`
    resultsCard.innerHTML += this.resultsHTML()
    resultsContainer.appendChild(resultsCard)
    resultsCard.addEventListener('click', e => {
      document.querySelector('survey-card')
      if (e.target.className.includes('done')) this.closeResults()
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
