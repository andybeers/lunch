'use strict';

const $experienceForm = $('#experience-form');

$experienceForm.on('submit', e => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const input = {};
  input.name = $('#vendor-name').val();
  input.time = $('#time').val();
  input.howFast = $('input[name="howFast"]').val();
  if ($('#calledAhead').is(':checked')) {
    input.calledAhead = true;
  } else {
    input.calledAhead = false;
  }
  input.cost = $('input[name="cost"]').val();
  input.worthIt = $('input[name="worthIt"]').val();
  input.advice = $('#advice').val();
  console.log('what we\'re sending', token);

  superagent
    .post('/lunch/experiences')
    .set({'Authorization': token})
    .send(input)
    .end((err, res) => {
      console.log(res);
    });
});