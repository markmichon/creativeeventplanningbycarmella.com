const form = document.querySelector(".contact-form")
const nameField = document.querySelector("#contact-name")
const emailField = document.querySelector("#contact-email")
const phoneField = document.querySelector("#contact-phone")
const typeField = document.querySelector("#contact-type")
const dateField = document.querySelector("#contact-date")
const messageField = document.querySelector("#contact-message")
const secfield = document.querySelector("#auth")
const formWrapper = document.querySelector("#form-wrapper")
const sendData = data => {
  const request = new XMLHttpRequest()
  const url =
    "https://esr88cu6w4.execute-api.us-east-1.amazonaws.com/production/contact"

  let headers = new Headers()
  headers.append("Content-type", "application/json")

  const options = {
    mode: "cors",
    method: "post",
    headers: headers,
    body: JSON.stringify(data)
  }
  fetch(url, options)
    .then(res => {
      form.remove()
      formWrapper.innerHTML =
        "<p><b>Thank you!</b> Your inquery has been sent. We look forward to discussing your event in the near future.</p>"
    })
    .catch(err => {
      console.log(err)
      displayError({
        elem: messageField,
        error: "The message could not send. Please try again"
      })
    })
}

const processData = (name, email, phone, type, date, message) => {
  let security
  document.querySelectorAll(".error").forEach(el => {
    el.classList.toggle("error")
  })
  let errors = []
  if (!name.value && name.value.trim() === "") {
    errors.push({ elem: name, error: "Please enter your name" })
  }

  if (!email.value || !email.validity.valid) {
    errors.push({ elem: email, error: "Please enter a valid email address" })
  }

  if (!message.value) {
    errors.push({ elem: message, error: "Please enter your message." })
  }

  if (errors.length) {
    errors.forEach(error => {
      displayError(error)
    })

    return false
  }

  if (secfield.value) {
    security = true
  }

  return {
    name: name.value,
    email: email.value,
    phone: phone.value || "",
    type: type.value || "",
    date: date.value || "",
    message: message.value,
    _cmsc: security
  }
}

const displayError = data => {
  const { elem, error } = data

  elem.classList.toggle("error")
  elem.nextElementSibling.innerHTML = error
}

form.addEventListener("submit", e => {
  e.preventDefault()

  let data = processData(
    nameField,
    emailField,
    phoneField,
    typeField,
    dateField,
    messageField
  )

  if (data) {
    sendData(data)
  } else {
    console.log("Incomplete form")
  }
})
