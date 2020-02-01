// Projeto - Pig Dice Game

/*

Regras do Jogo

- O jogo tem 2 jogadores, jogando em rodadas.
- Em cada rodada, um jogador joga um dado quantas vezes quiser. Cada resultado é adicionado à sua pontuação.
- Mas, se o jogador obtiver o valor 1 ao jogar o dado, toda a sua pontuação será perdida naquela rodada. Depois disso, é a vez do próximo jogador.
- O jogador pode optar por 'Passar a vez', o que significa que sua pontuação atual é adicionada à sua pontuação global. Depois disso, é a vez do próximo jogador.
- O primeiro jogador a atingir 100 pontos na pontuação global vence o jogo.

*/

var scores, roundScore, activePlayer;

init();

document.querySelector('.dice').style.display = 'none';

//rola o dado
document.querySelector('.btn-roll').addEventListener('click', function(){
        if(gamePlaying){

                // 1- Número randômico 
                var dice = Math.floor(Math.random() * 6) + 1;

                // 2- Mostra o resultado
                var diceDOM = document.querySelector('.dice');
                diceDOM.style.display = 'block';
                diceDOM.src = 'dice-' + dice + '.png';

                // 3- Atualiza a pontuação da rodada SE o número rolado NÃO for 1
                if(dice !== 1){
                        document.querySelector('#current-' + activePlayer).textContent = (roundScore += dice);
                }else{
                        nextPlayer();
                }
        }
});

//passa a vez - escolhido pelo usuário
document.querySelector('.btn-hold').addEventListener('click', function(){
        if(gamePlaying){
                scores[activePlayer] += roundScore;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                if(scores[activePlayer] >= 10){
                        document.querySelector('#name-' + activePlayer).textContent = 'Vencedor';
                        document.querySelector('.dice').style.display = 'none';
                        document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
                        document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
                        gamePlaying = false;
                }else{
                        nextPlayer();
                }
        }
});

document.querySelector('.btn-new').addEventListener('click', init);


//passa a vez se cair 1 no dado
const nextPlayer = () => {

        // define a pontuação do jogador atual para 0 e passa a vez para o próximo jogador
        document.getElementById('current-' + activePlayer).textContent = '0';
        document.querySelector('.player-'+ activePlayer + '-panel').classList.toggle('active');
        
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        //novo jogador de acordo com a condição acima
        document.getElementById('current-' + activePlayer).textContent = '0';
        document.querySelector('.player-'+ activePlayer + '-panel').classList.toggle('active');

        //seta o dado para nenhum quando é a vez do próximo jogador
        document.querySelector('.dice').style.display = 'none';
};

function init() {
        scores = [0, 0];
        activePlayer = 0;
        roundScore = 0;
        gamePlaying = true;
        
        document.querySelector('.dice').style.display = 'none';
    
        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.getElementById('name-0').textContent = 'Jogador 1';
        document.getElementById('name-1').textContent = 'Jogador 2';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
    }