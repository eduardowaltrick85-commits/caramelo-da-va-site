const PHONE = '5549998049610';
const BASE_MESSAGE = 'Olá! Vim pelo site e gostaria de agendar um atendimento com o Caramelo da Vã';
let pendingLead = null;

function whatsappUrl(message){
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

function bindWhatsappLinks(){
  document.querySelectorAll('[data-whatsapp]').forEach((link)=>{
    link.addEventListener('click',(event)=>{
      event.preventDefault();
      window.open(whatsappUrl(link.dataset.whatsapp || BASE_MESSAGE),'_blank','noopener');
    });
  });
  document.querySelectorAll('[data-plan]').forEach((link)=>{
    link.addEventListener('click',(event)=>{
      event.preventDefault();
      const plan = link.dataset.plan;
      const message = `Olá! Vim pelo site e gostaria de consultar o valor do plano ${plan} do Caramelo da Vã.`;
      window.open(whatsappUrl(message),'_blank','noopener');
    });
  });
}

function leadMessage(data, slot){
  return [
    'Novo lead pelo site Caramelo da Vã',
    '',
    `Nome: ${data.nome}`,
    `E-mail: ${data.email}`,
    `Telefone: ${data.telefone}`,
    `Nome do pet: ${data.pet}`,
    `Espécie: ${data.especie}`,
    `Serviço de interesse: ${data.servico}`,
    `Horário escolhido para ligação: ${slot}`,
    '',
    'Origem: site caramelodava.com'
  ].join('\n');
}

function setupForm(){
  const form = document.querySelector('#leadForm');
  const dialog = document.querySelector('#scheduleDialog');
  const custom = document.querySelector('#customSlot');
  const customConfirm = document.querySelector('#customConfirm');
  if(!form || !dialog) return;

  form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const formData = new FormData(form);
    pendingLead = Object.fromEntries(formData.entries());
    if(typeof dialog.showModal === 'function') dialog.showModal();
  });

  dialog.addEventListener('close',()=>{
    if(!pendingLead || dialog.returnValue === 'cancel') return;
    let slot = dialog.returnValue;
    if(slot === 'custom') slot = custom.value.trim() || 'Horário a combinar';
    window.open(whatsappUrl(leadMessage(pendingLead, slot)), '_blank', 'noopener');
    form.reset();
    custom.value = '';
    pendingLead = null;
  });

  customConfirm.addEventListener('click',(event)=>{
    event.preventDefault();
    dialog.close('custom');
  });
}

bindWhatsappLinks();
setupForm();
