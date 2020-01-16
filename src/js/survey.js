class Survey {
  constructor(id, title, question1, question2, question3) {
    this.id = id
    this.title = title
    this.question1 = question1
    this.question2 = question2
    this.question3 = question3
    this.renderSurveyList()
  }

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
    // TODO - Should fetch from model where responses are handled
    console.log('Submit survey')
    console.log(this.id)
    // fetch(`http://localhost:3000/responses/${this.id}`, {
    //   method: 'POST'
    // })
    //   .then(() => {
    //     console.log('In then')
    //   })
  }

  // Index List of Surveys
  surveyListHTML() {
    return `
    <div class="card__content">
      <div class="card__title">
        <h3>${this.title}</h3>
      </div>
      <div class="card__summary">
      Add questions<br>
      </div>
    </div>
    <button class="card__btn">Take Survey</button>
    `
  }

  // Individual Survey
  surveyHTML() {
    return `
    <div class="card__content">
      <div class="card__title">
        <h3>${this.title}</h3>
      </div>
      <div class="card__summary">
        <form action="/action_page.php">
          <input type="radio" name="vehicle1" value="Bike"> ${this.question1}<br>
          <input type="radio" name="vehicle2" value="Car"> ${this.question2}<br>
          <input type="radio" name="vehicle3" value="Boat"> ${this.question3}<br><br>
      </form>
      </div>
    </div>
    <button class="card__btn submit">Submit</button>
    <button class="card__btn delete">Delete</button>
    `
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
      if (e.target.className.includes('submit')) this.submitSurvey(e)
      if (e.target.className.includes('delete')) this.deleteSurvey(e)
    })
  }
}
