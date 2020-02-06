let questionArr = []

class Survey {
  constructor(id, title, question1, question2, question3) {
    this.id = id
    this.title = title
    this.question1 = question1
    this.question2 = question2
    this.question3 = question3

    this.renderSurveyList(id, title, question1, question2, question3)
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
    document.querySelector('.submit').setAttribute('disabled', 'disabled')
    document.querySelector('.delete').setAttribute('disabled', 'disabled')
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
        const { id, responded } = answer
        const arr = new Answer(id, responded)
        questionArr.push(arr)
      })
  }

  surveyListHTML(id, title) {
    return `
    <div class="card__content">
      <div class="card__title">
        <h3 id=${id} class="survey-title">${title}</h3>
      </div>
    </div>
    <button class="card__btn" id=${id}>Take Survey</button>
    `
  }

  surveyHTML(myId, title) {
    let questionArr = allSurveys.find(a => a.id === myId)
    let ask1 = questionArr.question1 ? `<input type="radio" name="answer_question" value="question1"> ${questionArr.question1}` : ''
    let ask2 = questionArr.question2 ? `<input type="radio" name="answer_question" value="question2"> ${questionArr.question2}` : ''
    let ask3 = questionArr.question3 ? `<input type="radio" name="answer_question" value="question3"> ${questionArr.question3}` : ''
    return `
    <div class="card__content">
      <div class="card__title">
        <h3>${title}</h3>
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

  // Render Index Survey List
  renderSurveyList(id, title, question1, question2, question3)  {
    const surveyContainer = document.getElementById('survey-container')
    const surveyCardList = document.createElement('div')
    surveyCardList.classList.add('survey-card')
    surveyCardList.classList.add('card__effect')
    surveyCardList.id = id
    surveyCardList.innerHTML += this.surveyListHTML(id, title)
    surveyContainer.appendChild(surveyCardList)
    surveyCardList.addEventListener('click', e => {
      if (e.target.className.includes('card__btn')) this.renderSurvey(id, title, question1, question2, question3)
    })
  }

  // Show Survey
  renderSurvey(id, title) {
    document.querySelectorAll('.survey-card').forEach(e => e.parentNode.removeChild(e))
    const surveyContainer = document.getElementById('survey-container')
    const surveyCard = document.createElement('div')
    surveyCard.classList.add('survey-card')
    surveyCard.id = id
    surveyCard.innerHTML += this.surveyHTML(id, title)
    surveyContainer.appendChild(surveyCard)
    surveyCard.addEventListener('click', e => {
      document.querySelector('survey-card')
      if (e.target.className.includes('submit')) this.submitSurvey()
      if (e.target.className.includes('delete')) this.deleteSurvey(e)
    })
  }

  static sortingSurvey() {
    allSurveys.sort((a, b) => (a.title > b.title) ? 1 : -1)
    console.log(allSurveys)
    document.querySelectorAll('.survey-card').forEach(e => e.parentNode.removeChild(e))
    allSurveys.forEach(survey => {
      const { id, title, question1, question2, question3 } = survey
      this.prototype.renderSurveyList(id, title, question1, question2, question3)
    })
  }



}
