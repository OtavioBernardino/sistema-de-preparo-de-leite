tailwind.config = {
    plugins: [
        function({ addComponents }){
            addComponents({'.btn-premium-blue': {'@apply bg-blue-500 hover:bg-blue-800 transition-all duration-300 rounded-md p-3 text-white font-bold active:scale-95': {},},
                '.btn-premium-red': {'@apply bg-red-500 hover:bg-red-800 transition-all duration-300 rounded-md p-3 text-white font-bold active:scale-95': {},},
                '.card-pela-manha': {'@apply h-auto p-4 bg-blue-100 m-auto rounded-md font-bold text-2xl': {},},
                '.card-pela-tarde': {'@apply h-auto p-4 bg-red-100 m-auto rounded-md font-bold text-2xl': {},}
            })   
        }
    ]
}


// Variáveis para os botões e elementos de texto
btnManha = document.getElementById('btn-manha');
btnTarde = document.getElementById('btn-tarde');   

pelaManha = document.getElementById('pela-manha');



//Contagem dos valores do inputs
const qtAmarelo = document.getElementById('qt-amarelo');
const qtAzul1 = document.getElementById('qt-azul1');
const qtVerde = document.getElementById('qt-verde');
const qtSemColar = document.getElementById('qt-sem-colar');
const qtAzul2 = document.getElementById('qt-azul2');

qtAmarelo.addEventListener('input', atualizarTotal);
qtAzul1.addEventListener('input', atualizarTotal);
qtVerde.addEventListener('input', atualizarTotal);
qtSemColar.addEventListener('input', atualizarTotal);
qtAzul2.addEventListener('input', atualizarTotal);




// Função para atualizar o total de animais e litros de sucedâneo
function atualizarTotal() {
    var qtAmareloInt = parseInt(qtAmarelo.value);
    var qtAzulInt1 = parseInt(qtAzul1.value);
    var qtAzulInt2 = parseInt(qtAzul2.value);
    var qtVerdeInt = parseInt(qtVerde.value);
    var qtSemColarInt = parseInt(qtSemColar.value);
    var totalAnimais = qtAmareloInt + qtAzulInt1 + qtAzulInt2 + qtVerdeInt + qtSemColarInt;

    // 2. LÓGICA DE CÁLCULO 
    // Dosagens Unitárias Manhã em litros
    const doseAmareloManha = 3;
    const doseAzul1Manha = 4;
    const doseAzul2Manha = 4;
    const doseVerdeManha = 4;
    const  doseSemColarManha = 2;

    // Dosagens Unitárias Tarde em litros
    const doseAmareloTarde = 3;
    const doseAzul1Tarde = 4;
    const doseAzul2Tarde = 4;
    const doseVerdeTarde = 0;
    const doseSemColarTarde = 0;

    // Cálculos Manhã de litros para cada grupo
    let volManhaAmarelo = qtAmareloInt * doseAmareloManha;
    let volManhaAzul1 = qtAzulInt1 * doseAzul1Manha;
    let volManhaAzul2 = qtAzulInt2 * doseAzul2Manha;
    let volManhaVerde = qtVerdeInt * doseVerdeManha;
    let volManhaSemColar = qtSemColarInt * doseSemColarManha;

    // volume total de leite em litros para a manhã
    let volTotalManha = volManhaAmarelo + volManhaAzul1 + volManhaAzul2 + volManhaVerde + volManhaSemColar;

    // Cálculos Tarde (Verde e Sem Colar não bebem à tarde) de litros para cada grupo
    let volTardeAmarelo = qtAmareloInt * doseAmareloTarde;
    let volTardeAzul1 = qtAzulInt1 * doseAzul1Tarde;
    let volTardeAzul2 = qtAzulInt2 * doseAzul2Tarde;
    let volTardeVerde = qtVerdeInt * doseVerdeTarde;
    let volTardeSemColar = qtSemColarInt * doseSemColarTarde;

    //volume total de leite em litros para a tarde
    let volTotalTarde = volTardeAmarelo + volTardeAzul1 + volTardeAzul2 + volTardeVerde + volTardeSemColar;

    //Cálculo do volume em L geral, manhã e tarde
    let volTotalGeral = volTotalManha + volTotalTarde;


    //calculo do total de litros de leite do dia por grupo
    let volTotalAmarelo = volManhaAmarelo + volTardeAmarelo;
    let volTotalAzul1 = volManhaAzul1 + volTardeAzul1;
    let volTotalAzul2 = volManhaAzul2 + volTardeAzul2;
    let volTotalVerde = volManhaVerde + volTardeVerde;
    let volTotalSemColar = volManhaSemColar + volTardeSemColar;

    
   // ***** Cálculo do total de sucedâneo em gramas para cada tambor e total geral *****
   let qtSucTotalTarde = volTotalTarde * 135;
   let qtSucTotalManha = volTotalManha * 135;


    //Quantidade de sucedâneo utilizado para o preparo do leite do dia
    let qtSucGeral = qtSucTotalTarde + qtSucTotalManha;

    //calculo dos tambores completos e o restante da manhã
    var tamborInteiroManha = Math.trunc(volTotalManha/50);
    var sucTamborInteiroManha = ((tamborInteiroManha*50)*135).toFixed(0);
    var tamborRestanteManha = (volTotalManha/50)-tamborInteiroManha;
    var sucTamborRestanteManha = ((tamborRestanteManha*50)*135).toFixed(0);
    var litrosTamborRestanteManha = (tamborRestanteManha*50).toFixed(1);
    

    //calculo dos tambores completos e o restante da tarde
    var tamborInteiroTarde = Math.trunc(volTotalTarde/50);
    var sucTamborInteiroTarde = ((tamborInteiroTarde*50)*135).toFixed(0);
    var tamborRestanteTarde = (volTotalTarde/50)-tamborInteiroTarde;
    var sucTamborRestanteTarde = ((tamborRestanteTarde*50)*135).toFixed(0);
    var litrosTamborRestanteTarde = (tamborRestanteTarde*50).toFixed(1);

  
    //atualizando o primeiro texto que mostra a quantidade de animais e litros de leite
    document.querySelector('h1.text-3xl').textContent = `Total de animais: ${totalAnimais} e ${volTotalGeral} Litros.`;

    document.querySelector('#pela-manha').classList.replace('card-pela-tarde', 'card-pela-manha');
    
    document.querySelector('#pela-manha').textContent = `Pela manhã: ${volTotalManha} litros usando ${qtSucTotalManha}g ou ${(qtSucTotalManha)/1000}kg de sucedâneo para ${totalAnimais} animais.
    Fazer ${tamborInteiroManha} tambor usando ${sucTamborInteiroManha}g de sucedâneo; e ${litrosTamborRestanteManha}L usando ${sucTamborRestanteManha}g de sucedâneo.`;    
   
    return {volTotalManha, volTotalTarde, volTotalGeral, qtSucGeral,totalAnimais,qtSucTotalTarde,qtSucTotalManha, tamborInteiroManha, tamborRestanteManha, tamborInteiroTarde, tamborRestanteTarde, sucTamborInteiroManha, sucTamborInteiroTarde, sucTamborRestanteManha, sucTamborRestanteTarde, litrosTamborRestanteManha, litrosTamborRestanteTarde};
}

btnManha.addEventListener('click', function(){
    alert('Botão manhã clicado');

    //chamada da função atualizarTotal() para conseguir os valores.
    valores = atualizarTotal();

    document.querySelector('#pela-manha').classList.replace('card-pela-tarde', 'card-pela-manha');
 

    
    document.querySelector('#pela-manha').textContent = `Pela manhã: ${valores.volTotalManha} litros usando ${valores.qtSucTotalManha}g ou ${(valores.qtSucTotalManha)/1000}kg de sucedâneo para ${valores.totalAnimais} animais.
    Fazer ${valores.tamborInteiroManha} tambor usando ${valores.sucTamborInteiroManha}g de sucedâneo; e ${valores.litrosTamborRestanteManha}L usando ${(tamborRestanteManha*50)*135}g de sucedâneo.`;    
   
    
});

btnTarde.addEventListener('click', function(){
    alert('Botão tarde clicado');

    valores = atualizarTotal();

    document.querySelector('#pela-manha').classList.replace('card-pela-manha', 'card-pela-tarde');
  

    document.querySelector('#pela-manha').textContent = `Pela manhã: ${valores.volTotalTarde} litros usando ${valores.qtSucTotalTarde}g ou ${(valores.qtSucTotalTarde)/1000}kg de sucedâneo para ${valores.totalAnimais} animais.
    Fazer ${valores.tamborInteiroTarde} tambor usando ${(valores.tamborInteiroTarde*50)*135}g de sucedâneo; e ${valores.litrosTamborRestanteTarde}L usando ${valores.sucTamborRestanteTarde}g de sucedâneo.`; 
    
}); 
