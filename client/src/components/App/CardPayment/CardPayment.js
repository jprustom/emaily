import React, { useEffect } from 'react';
import CardPaymentStyles from './CardPayment.module.css';


//CONSTS THAT WILL BE USED IN CARD


// eslint-disable-next-line no-undef
const tap = Tapjsli('pk_test_jrXegRzoSkUWNZhwm7TdIt10');
const elements = tap.elements({});
const cardLabels = {
    cardNumber:"CardPayment Number",
    expirationDate:"MM/YY",
    cvv:"CVV",
    cardHolder:"CardPayment Holder Name"
};
const paymentOptions = {
        currencyCode:["USD"],
        labels : cardLabels,
        TextDirection:'ltr'
    }
const cardStyle=
    {
        base: {
            color: '#525252',
            lineHeight: '18px',
            fontFamily: 'sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: 'rgba(0, 0, 0, 0.26)',
                fontSize:'15px'
            }
        },
        invalid: {
            color: 'red'
        }
    };

const card = elements.create('card', {style: cardStyle},paymentOptions);


//FUNCTIONS THAT WILL BE USED

function mountCard(){
    card.mount('#element-container');
    card.addEventListener('change', function(event) {
    const displayError = document.getElementById('error-handler');
    if (event.error) 
        displayError.textContent = event.error.message;
    else 
        displayError.textContent = '';
    
    });
}
async function onCardPaymentSubmit(event){
  event.preventDefault();
  const generatedToken=await tap.createToken(card);
  console.log(generatedToken);
  if (generatedToken.error){
       // Inform the user if there was an error
      const errorElement = document.getElementById('error-handler');
      errorElement.textContent = generatedToken.error.message;
  }
  else {
       // Send the token to your server
      const errorElement = document.getElementById('success');
      errorElement.style.display = "block";
      const tokenElement = document.getElementById('token');
      tokenElement.textContent = generatedToken.id;
      const formElement=event.target;
      tapTokenHandler(generatedToken,formElement)
  }
;
}
function tapTokenHandler(token,formElement) {
  // Insert the token ID into the form so it gets submitted to the server
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'tapToken');
  hiddenInput.setAttribute('value', token.id);
  formElement.appendChild(hiddenInput);
  formElement.submit();
}
export default function CardPayment(){
    useEffect(mountCard,[]);
    return <form onSubmit={onCardPaymentSubmit} id={CardPaymentStyles['form-container']} method="post" action="/api/payment/charge">
                <div style={{textAlign:'center',fontSize:'20px',marginTop:'10px'}}>Buy Five Credits With 5$</div>
                <div id="element-container"></div>
                <div id="error-handler" role="alert"></div>
                <div id="success" style={{display: 'none',position: 'relative',float: 'left'}}>
                    Success! Your token is <span id="token"></span>
                </div>
                <button id="tap-btn">Submit</button>
            </form>
}