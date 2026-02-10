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
const qtAzul = document.getElementById('qt-azul');
const qtVerde = document.getElementById('qt-verde');
const qtSemColar = document.getElementById('qt-sem-colar');

qtAmarelo.addEventListener('input', atualizarTotal);
qtAzul.addEventListener('input', atualizarTotal);
qtVerde.addEventListener('input', atualizarTotal);
qtSemColar.addEventListener('input', atualizarTotal);




// Função para atualizar o total de animais e litros de sucedâneo
function atualizarTotal() {
    var qtAmareloInt = parseInt(qtAmarelo.value);
    var qtAzulInt = parseInt(qtAzul.value);
    var qtVerdeInt = parseInt(qtVerde.value);
    var qtSemColarInt = parseInt(qtSemColar.value);
    var totalAnimais = qtAmareloInt + qtAzulInt + qtVerdeInt + qtSemColarInt;

    // 2. LÓGICA DE CÁLCULO 
    // Dosagens Unitárias Manhã
    const doseAmareloManha = 3;
    const doseAzulManha = 4;
    const doseVerdeManha = 4;
    const  doseSemColarManha = 2;

    // Dosagens Unitárias Manhã
    const doseAmareloTarde = 3;
    const doseAzulTarde = 4;
    const doseVerdeTarde = 0;
    const doseSemColarTarde = 0;

    // Cálculos Manhã
    let volManhaAmarelo = qtAmareloInt * doseAmareloManha;
    let volManhaAzul = qtAzulInt * doseAzulManha;
    let volManhaVerde = qtVerdeInt * doseVerdeManha;
    let volManhaSemColar = qtSemColarInt * doseSemColarManha;
    
    let volManhaOutros = volManhaAzul + volManhaVerde + volManhaSemColar;
    let volTotalManha = volManhaAmarelo + volManhaAzul + volManhaVerde + volManhaSemColar;

    // Cálculos Tarde (Verde e Sem Colar não bebem à tarde)
    let volTardeAmarelo = qtAmareloInt * doseAmareloTarde;
    let volTardeAzul = qtAzulInt * doseAzulTarde;
    let volTardeVerde = qtVerdeInt * doseVerdeTarde;
    let volTardeSemColar = qtSemColarInt * doseSemColarTarde;

    let volTotalTarde = volTardeAmarelo + volTardeAzul + volTardeVerde + volTardeSemColar;

    //Cálculo do total geral
    let volTotalGeral = volTotalManha + volTotalTarde;

    //calculo g/L de sucedâneo em cada preparo
    let volTotalAmarelo = volManhaAmarelo + volTardeAmarelo;
    let volTotalAzul = volManhaAzul + volTardeAzul;
    let volTotalVerde = volManhaVerde + volTardeVerde;
    let volTotalSemColar = volManhaSemColar + volTardeSemColar;

    
    let volTamborA_Manha = volManhaAmarelo;
    let volTamborB_Manha = volManhaOutros;

    let volTamborA_Tarde = volTardeAmarelo;
    let volTamborB_Tarde = volTardeAzul;
    
   
    let volTamborA = volTamborA_Manha + volTamborA_Tarde;
    let volTamborB = volTamborB_Manha + volTamborB_Tarde;
    let qtSucTamborA = volTamborA * 135;
    let qtSucTamborB = volTamborB * 125;
    let qtSucGeral = qtSucTamborA + qtSucTamborB;
    /*

    //Cálculo do consumo diário de sucedâneo em gramas
    let qtSucedaneoA = (parseFloat(volTamborA) * 135);
    let qtSucedaneoB = (parseFloat(volTamborB) * 125);
    let qtSucedaneoGeral = qtSucedaneoA + qtSucedaneoB;
    */

    document.querySelector('h1.text-3xl').textContent = `Total de animais: ${totalAnimais} e ${volTotalGeral} Litros.`;
    document.querySelector('#pela-manha').classList.replace('card-pela-tarde', 'card-pela-manha');
    document.querySelector('#pela-manha').textContent = `Pela manhã: ${volTotalManha} Litros`;    
    document.querySelector('#tambor-a').textContent = `Tambor A (135 g/L): Preparar ${volTamborA_Manha}L para Amarelo. Total sucedâneo ${parseFloat(volTamborA_Manha * 135).toFixed(0)}g`;
    document.querySelector('#tambor-b').textContent = `Tambor B (125 g/L): Preparar ${volTamborB_Manha}L para os demais. Total sucedâneo ${parseFloat(volTamborB_Manha * 125).toFixed(0)}g`;
    document.querySelector('#tambor-b').textContent = `Tambor B (125 g/L): Preparar ${volTamborB_Manha}L para os demais. Total sucedâneo ${parseFloat(volTamborB_Manha * 125).toFixed(0)}g`;
    document.querySelector('#tambor-b').textContent = `Tambor B (125 g/L): Preparar ${volTamborB_Manha}L para os demais. Total sucedâneo ${parseFloat(volTamborB_Manha * 125).toFixed(0)}g`;
    document.querySelector('#totalLeiteDiario').textContent = `Total de Leite Diário: ${volTotalGeral} L`;
    document.querySelector('#conSucDiario').textContent = `Consumo sucedâneo diário: ${qtSucGeral} g`;
    document.querySelector('#totalAnimais').textContent = `Total de animais: ${totalAnimais}`;
    return {volTotalManha, volTotalTarde, volTotalGeral,volTamborA_Manha,volTamborA_Tarde,volTamborB_Manha,volTamborB_Tarde};
}

btnManha.addEventListener('click', function(){
    valores = atualizarTotal();
    document.querySelector('#pela-manha').classList.replace('card-pela-tarde', 'card-pela-manha');
    document.querySelector('#pela-manha').textContent = `Pela manhã: ${valores.volTotalManha} Litros`;    
    document.querySelector('#tambor-a').textContent = `Tambor A (135 g/L): Preparar ${valores.volTamborA_Manha}L para Amarelo. Total sucedâneo ${parseFloat(valores.volTamborA_Manha * 135).toFixed(0)}g`;
    document.querySelector('#tambor-b').textContent = `Tambor B (125 g/L): Preparar ${valores.volTamborB_Manha}L para os demais. Total sucedâneo ${parseFloat(valores.volTamborB_Manha * 125).toFixed(0)}g`;
    
});

btnTarde.addEventListener('click', function(){
    valores = atualizarTotal();
    document.querySelector('#pela-manha').classList.replace('card-pela-manha', 'card-pela-tarde');
    document.querySelector('#pela-manha').textContent = `Pela tarde: ${valores.volTotalTarde} Litros`;
    document.querySelector('#tambor-a').textContent = `Tambor A (135 g/L): Preparar ${valores.volTamborA_Tarde}L para Amarelo. Total sucedâneo ${parseFloat(valores.volTamborA_Tarde * 135).toFixed(0)}g`;
    document.querySelector('#tambor-b').textContent = `Tambor B (125 g/L): Preparar ${valores.volTamborB_Tarde}L para o Azul. Total sucedâneo ${parseFloat(valores.volTamborB_Tarde * 125).toFixed(0)}g`;
    
    
});
